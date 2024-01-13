import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ParseIntPipe } from '@nestjs/common/pipes/parse-int.pipe';
import { ParkingSpace } from './parkingSpace.entity';
import { ParkingSpaceService } from './parkingSpace.service';

@Controller('parkingSpace')
export class ParkingSpaceController {
  constructor(private parkingSpaceService: ParkingSpaceService) {}

  @Get()
  findAll() {
    return this.parkingSpaceService.getParkingSpace();
  }

  // @Get(':id')
  // findOne(@Param('id', ParseIntPipe) id) {
  //   return this.parkingSpaceService.findOne(id);
  // }

  // @Post() create(@Body() parkingSpace: ParkingSpace) {
  //   return this.parkingSpaceService.createNote(parkingSpace);
  // }

  // @Patch(':id')
  // async editNote(@Body() parkingSpace: ParkingSpace, @Param('id') id: number): Promise<ParkingSpace> {
  //   const noteEdited = await this.parkingSpaceService.editNote(id, parkingSpace);
  //   return noteEdited;
  // }

  // @Delete(':id')
  // remove(@Param('id', ParseIntPipe) id) {
  //   this.parkingSpaceService.remove(id);
  // }
}
