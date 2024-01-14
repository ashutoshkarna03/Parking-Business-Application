import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ParkingSpaceModule } from './parkingSpace/parkingSpace.module';

@Module({
  imports: [TypeOrmModule.forRoot(), ParkingSpaceModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
