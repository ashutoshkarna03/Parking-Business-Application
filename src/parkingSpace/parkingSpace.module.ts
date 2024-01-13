import { Module } from '@nestjs/common';
import { ParkingSpaceService } from './parkingSpace.service';
import { ParkingSpaceController } from './parkingSpace.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ParkingSpace, ParkingSession } from './parkingSpace.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ParkingSpace, ParkingSession])],
  providers: [ParkingSpaceService],
  controllers: [ParkingSpaceController],
})
export class ParkingSpaceModule {}
