import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ParkingSpace } from './parkingSpace.entity';

@Injectable()
export class ParkingSpaceService {
  constructor(
    @InjectRepository(ParkingSpace) private parkingSpaceRepository: Repository<ParkingSpace>,
  ) {}
  async getParkingSpace(): Promise<ParkingSpace[]> {
    return await this.parkingSpaceRepository.find();
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
