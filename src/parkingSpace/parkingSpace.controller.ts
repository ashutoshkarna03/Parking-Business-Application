import { Body, Controller, Get, Post, Res, Request } from '@nestjs/common';
import { Response } from 'express';
import { ParkingSpace, ParkingSession } from './parkingSpace.entity';
import { ParkingSpaceService } from './parkingSpace.service';
import { CheckInRequestDto, CheckInResponseDto } from './../dtos/checkin.dto';
import {
  CheckOutRequestDto,
  CheckOutResponseDto,
} from './../dtos/checkout.dto';
import { OccupationResponseDto } from './../dtos/occupation.dto';

@Controller('parkingSpace')
export class ParkingSpaceController {
  constructor(private parkingSpaceService: ParkingSpaceService) {}

  @Post('/checkIn')
  async checkIn(@Body() body: CheckInRequestDto, @Res() res: Response) {
    try {
      // determine category
      let category: string;
      if (body.isResident) {
        category = 'resident';
      } else {
        if (body.vehicleType === 'CAR') {
          category = 'car';
        } else if (body.vehicleType === 'MOTORCYCLE') {
          category = 'motorcycle';
        } else {
          return res.status(404).json({ message: 'Invalid vehicle type' });
        }
      }
      const availableSpace: ParkingSpace = await this.parkingSpaceService.getParkingSpaceByCategory(
        category,
      );
      if (!availableSpace) {
        return res.status(404).json({
          message: 'Parking Space not available',
        });
      }
      const session: ParkingSession = await this.parkingSpaceService.createParkingSession(
        availableSpace.spaceId,
        category,
      );
      const response: CheckInResponseDto = {
        parkingSessionId: session.sessionId,
        parkingSpaceId: availableSpace.spaceId,
      };
      return res.status(201).json(response);
    } catch (err) {
      console.log(err);
    }
  }

  @Post('/checkOut')
  async checkOut(@Body() body: CheckOutRequestDto, @Res() res: Response) {
    try {
      const result: CheckOutResponseDto | null = await this.parkingSpaceService.endParkingSession(
        body.parkingSessionId,
      );
      if (!result) {
        return res.status(404).json({
          message: 'Session Id does not exist',
        });
      }
      return res.status(201).json(result);
    } catch (err) {
      console.log(err);
    }
  }

  @Get('/occupation')
  async getOccupation(@Request() request, @Res() res: Response) {
    const response: OccupationResponseDto[] = await this.parkingSpaceService.paginate(
      {
        page: request.query.hasOwnProperty('page') ? request.query.page : 0,
        limit: request.query.hasOwnProperty('limit') ? request.query.limit : 10,
      },
    );
    return res.status(201).json(response);
  }
}
