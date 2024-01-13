import { BaseEntity, Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import { IsString } from 'class-validator';

@Entity()
export class ParkingSpace extends BaseEntity {
  @PrimaryColumn()
  spaceId: number;

  @Column()
  buildingId: number;

  @Column()
  floorId: number;

  @Column()
  isOccupied: boolean;

  @IsString()
  @Column()
  category: string;
}

@Entity()
export class Session extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  sessionId: string;

  @Column('decimal')
  totalCost: number;

  @Column()
  spaceId: number;

  @Column()
  startTime: string;

  @Column()
  endTime: string;

  @IsString()
  @Column()
  category: string;
}
