import {
  Body,
  Controller,
  Get,
  Post,
  Res,
  Request
} from '@nestjs/common';
import { Response } from 'express';
import { ParkingSpace, ParkingSession } from './parkingSpace.entity';
import { ParkingSpaceService } from './parkingSpace.service';
import { CheckInRequestDto } from './../dtos/checkin.dto';
import { OccupationResponseDto } from './../dtos/occupation.dto';

@Controller('parkingSpace')
export class ParkingSpaceController {
  constructor(private parkingSpaceService: ParkingSpaceService) {}

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
  }

  @Get('/occupation')
  async getOccupation(@Request() request): Promise<OccupationResponseDto[]> {
    return await this.parkingSpaceService.paginate({
      page: request.query.hasOwnProperty('page') ? request.query.page : 0,
      limit: request.query.hasOwnProperty('limit') ? request.query.limit : 10,
    });
  }
}
