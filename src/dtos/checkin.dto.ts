export class CheckInRequestDto {
    vehicleType: string;
    isResident: boolean;
}

export class CheckInResponseDto {
    parkingSessionId: string;
    parkingSpaceId: number;
}