import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class ChannelCreateDto {
  @ApiProperty({
    example: 'channelName',
    description: 'the name of the channel',
  })
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty({
    example: 'status',
    description: 'the status of the channel',
  })
  readonly status: boolean;
}
