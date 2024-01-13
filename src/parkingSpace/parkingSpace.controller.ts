import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Res,
  Request
} from '@nestjs/common';
import { Response } from 'express';
import { ParseIntPipe } from '@nestjs/common/pipes/parse-int.pipe';
import { ParkingSpace, ParkingSession } from './parkingSpace.entity';
import { ParkingSpaceService } from './parkingSpace.service';
import { CheckInRequestDto } from './../dtos/checkin.dto';

@Controller('parkingSpace')
export class ParkingSpaceController {
  constructor(private parkingSpaceService: ParkingSpaceService) {}

  // @Get()
  // findAll() {
  //   return this.parkingSpaceService.getParkingSpace();
  // }

  @Post('/checkIn')
  async checkIn(@Body() body: CheckInRequestDto, @Res() res: Response) {
    try {
      // determine category
      let category: string
      if (body.isResident) {
        category = 'resident'
      } else {
        if (body.vehicleType === 'CAR') {
          category = 'car'
        } else if (body.vehicleType === 'MOTORCYCLE'){
          category = 'motorcycle'
        } else {
          return res.status(404).json({message: "Invalid vehicle type"})
        }
      }
      let availableSpace: ParkingSpace = await this.parkingSpaceService.getParkingSpaceByCategory(category);
      if (!availableSpace) {
        return res.status(404).json({
          message: "Parking Space not available"
        })
      }
      let session : ParkingSession =  await this.parkingSpaceService.createParkingSession(availableSpace.spaceId)
      res.status(201).json({
        parkingSessionId: session.sessionId,
        parkingSpaceId: availableSpace.spaceId
      })

    } catch (err) {
      console.log(err)
    }
    
    // res.status(201).json(checkInResponse);
  }

  @Get('/occupation')
  // @HttpCode(HttpStatus.OK)
  async getOccupation(@Request() request): Promise<OccupationResponseDto[]> {
    // return this.parkingSpaceService.getParkingSpace();
    return await this.parkingSpaceService.paginate({
      page: request.query.hasOwnProperty('page') ? request.query.page : 0,
      limit: request.query.hasOwnProperty('limit') ? request.query.limit : 10,
    });
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
