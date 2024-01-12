import { Controller, Get, Post, Body, Res } from '@nestjs/common';
import { Response } from 'express';
import { AppService } from './app.service';
import { CheckInDto } from './dtos/checkin.dto'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('/check-in')
  checkIn(@Body() body: CheckInDto, @Res() res: Response) {
    const checkInResponse = {
      parkingSessionId: "UUID",
      parkingSpaceId: 1
    };
    res.status(201).json(checkInResponse);
  }
}
