import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaginationOptionsInterface } from '../pagination/pagination.options.interface'
import { OccupationResponseDto } from '../dtos/occupation.dto'
import { ParkingSpace, ParkingSession } from './parkingSpace.entity';
import { uuid } from 'uuidv4';

@Injectable()
export class ParkingSpaceService {
  constructor(
    @InjectRepository(ParkingSpace) private parkingSpaceRepository: Repository<ParkingSpace>,
  ) { }

  async paginate(
    options: PaginationOptionsInterface,
  ): Promise<OccupationResponseDto[]> {
    const [results, total] = await this.parkingSpaceRepository.findAndCount({
      take: options.limit,
      skip: options.page, // think this needs to be page * limit
    });
    let occupationData: OccupationResponseDto[] = []
    for (let i=0; i<results.length; i++) {
      occupationData.push({
        parkingSpaceId: results[i].spaceId,
        vehicleType: results[i].category,
        isOccupied: results[i].isOccupied,
      })
    }
    return occupationData;
  }

  async getParkingSpaceByCategory(category: string): Promise<ParkingSpace> {
    return await this.parkingSpaceRepository.findOne({
      where: {
        category: category,
        isOccupied: false
      },
    })
  }

  async createParkingSession(spaceId: number): Promise<ParkingSession> {
    // make given spaceId occupied
    let space: ParkingSpace = await this.parkingSpaceRepository.findOne({
      where: {
        spaceId
      }
    })
    space.isOccupied = true
    await space.save()

    // create session
    return await this.parkingSessionRepository.save({
      spaceId,
      sessionId: uuid().toString(),
      startTime: (Math.floor(+new Date() / 1000)).toString()
    })
  }

  // findOne(id: string): Promise<ParkingSpace> {
  //   return this.parkingSpaceRepository.findOne(id);
  // }

  // async createNote(parkingSpace: ParkingSpace) {
  //   this.parkingSpaceRepository.save(parkingSpace);
  // }

  // async remove(id: string): Promise<void> {
  //   await this.parkingSpaceRepository.delete(id);
  // }

  // async editNote(id: number, parkingSpace: ParkingSpace): Promise<ParkingSpace> {
  //   const editedNote = await this.parkingSpaceRepository.findOne(id);
  //   if (!editedNote) {
  //     throw new NotFoundException('Note is not found');
  //   }
  //   editedNote.description = parkingSpace.description;
  //   editedNote.title = parkingSpace.title;
  //   await editedNote.save();
  //   return editedNote;
  // }
}
