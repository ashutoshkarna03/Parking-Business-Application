import { Module } from '@nestjs/common';
import { ParkingSpaceService } from './parkingBusiness.service';
import { ParkingSpaceController } from './parkingBusiness.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ParkingSpace, ParkingSession } from './parkingBusiness.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ParkingSpace, ParkingSession])],
  providers: [ParkingSpaceService],
  controllers: [ParkingSpaceController],
})
export class ParkingSpaceModule {}
