import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaginationOptionsInterface } from '../pagination/pagination.options.interface';
import { OccupationResponseDto } from '../dtos/occupation.dto';
import { ParkingSpace, ParkingSession } from './parkingSpace.entity';
import { CheckOutResponseDto } from './../dtos/checkout.dto';
import { uuid } from 'uuidv4';

@Injectable()
export class ParkingSpaceService {
  constructor(
    @InjectRepository(ParkingSpace)
    private parkingSpaceRepository: Repository<ParkingSpace>,
    @InjectRepository(ParkingSession)
    private parkingSessionRepository: Repository<ParkingSession>,
  ) {}

  async paginate(
    options: PaginationOptionsInterface,
  ): Promise<OccupationResponseDto[]> {
    const [results, total] = await this.parkingSpaceRepository.findAndCount({
      take: options.limit,
      skip: options.page,
    });
    let occupationData: OccupationResponseDto[] = [];
    for (let i = 0; i < results.length; i++) {
      occupationData.push({
        parkingSpaceId: results[i].spaceId,
        vehicleType: results[i].category,
        isOccupied: results[i].isOccupied,
      });
    }
    return occupationData;
  }

  async getParkingSpaceByCategory(category: string): Promise<ParkingSpace> {
    return await this.parkingSpaceRepository.findOne({
      where: {
        category: category,
        isOccupied: false,
      },
    });
  }

  async createParkingSession(
    spaceId: number,
    category: string,
  ): Promise<ParkingSession> {
    // make given spaceId occupied
    let space: ParkingSpace = await this.parkingSpaceRepository.findOne({
      where: {
        spaceId,
      },
    });
    space.isOccupied = true;
    await space.save();

    // create session
    return await this.parkingSessionRepository.save({
      spaceId,
      sessionId: uuid().toString(),
      startTime: Math.floor(+new Date() / 1000).toString(),
      category,
    });
  }

  async endParkingSession(
    sessionId: string,
  ): Promise<CheckOutResponseDto | null> {
    // get given session
    let session: ParkingSession = await this.parkingSessionRepository.findOne({
      where: {
        sessionId,
      },
    });
    if (!session) {
      return null;
    }
    // calculate cost
    let endTime: number = Math.floor(+new Date() / 1000);
    let sessionLength = (endTime - parseInt(session.startTime)) / 3600; // in hrs
    let cost: number = 0;
    if (session.category !== 'resident') {
      cost = session.category === 'car' ? sessionLength * 5 : sessionLength * 3;
    }

    // end session
    session.endTime = endTime.toString();
    session.totalCost = cost;
    await session.save();

    // make given spaceId occupied: false
    let space: ParkingSpace = await this.parkingSpaceRepository.findOne({
      where: {
        spaceId: session.spaceId,
      },
    });
    space.isOccupied = false;
    await space.save();

    return {
      sessionLengthInHoursMinutes: Math.round(sessionLength * 100) / 100,
      parkingSpaceId: session.spaceId,
      parkingCost: Math.round(cost * 100) / 100,
    };
  }
}
