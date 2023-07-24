import { Controller, Get } from '@nestjs/common';
import { TrackService } from './track.service';

@Controller()
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Get()
  init(): string {
    return this.trackService.init();
  }
}
