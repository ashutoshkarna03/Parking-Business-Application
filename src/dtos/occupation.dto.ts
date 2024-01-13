import { Type } from 'class-transformer';
import { IsInt, Max, Min } from 'class-validator';

export class PageOptionsDto {
    @Type(() => Number)
    @IsInt()
    @Min(1)
    readonly page?: number = 1;

    @Type(() => Number)
    @IsInt()
    @Min(1)
    @Max(50)
    readonly take?: number = 10;

    get skip(): number {
        return (this.page - 1) * this.take;
    }
}