import { Module } from '@nestjs/common';
import { ParkingSpaceService } from './parkingSpace.service';
import { ParkingSpaceController } from './parkingSpace.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ParkingSpace } from './parkingSpace.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ParkingSpace])],
  providers: [ParkingSpaceService],
  controllers: [ParkingSpaceController],
})
export class ParkingSpaceModule {}
