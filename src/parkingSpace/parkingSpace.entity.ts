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
export class ParkingSession extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  sessionId: string;

  @Column('decimal', {nullable: true})
  totalCost: number;

  @Column()
  spaceId: number;

  @Column({nullable: true})
  startTime: string;

  @Column({nullable: true})
  endTime: string;

  @Column({nullable: true})
  category: string;
}
