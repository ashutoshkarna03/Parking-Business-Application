import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ParkingSpace } from './parkingSpace.entity';
import { PaginationOptionsInterface } from '../pagination/pagination.options.interface'
import { OccupationResponseDto } from '../dtos/occupation.dto'

@Injectable()
export class ParkingSpaceService {
  constructor(
    @InjectRepository(ParkingSpace) private parkingSpaceRepository: Repository<ParkingSpace>,
  ) { }
  
  // async getParkingSpace(): Promise<ParkingSpace[]> {
  //   return await this.parkingSpaceRepository.find();
  // }

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
