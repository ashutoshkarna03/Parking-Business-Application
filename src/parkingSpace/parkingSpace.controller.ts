import {
  Body,
  Request,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ParseIntPipe } from '@nestjs/common/pipes/parse-int.pipe';
import { ParkingSpace } from './parkingSpace.entity';
import { ParkingSpaceService } from './parkingSpace.service';
import { Pagination } from '../pagination/pagination';
import { PageOptionsDto } from '../dtos/occupation.dto'

@Controller('parkingSpace')
export class ParkingSpaceController {
  constructor(private parkingSpaceService: ParkingSpaceService) { }

  @Get('/occupation')
  // @HttpCode(HttpStatus.OK)
  async getOccupation(@Request() request): Promise<Pagination<ParkingSpace>> {
    // return this.parkingSpaceService.getParkingSpace();
    return await this.parkingSpaceService.paginate({
      page: request.query.hasOwnProperty('page') ? request.query.page : 0,
      limit: request.query.hasOwnProperty('limit') ? request.query.limit : 10,
    });
  }

  // async index(@Request() request): Promise<Pagination<BlogEntity>> {
  //   return await this.blogSerparkingSpaceServicevice.paginate({
  //     limit: request.query.hasOwnProperty('limit') ? request.query.limit : 10,
  //     page: request.query.hasOwnProperty('page') ? request.query.page : 0,
  //   });
  // }

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
