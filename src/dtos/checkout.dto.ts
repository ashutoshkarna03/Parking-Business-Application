export class CheckOutRequestDto {
  parkingSessionId: string;
  isResident: boolean;
}

export class CheckOutResponseDto {
  sessionLengthInHoursMinutes: number;
  parkingSpaceId: number;
  parkingCost: number;
}
