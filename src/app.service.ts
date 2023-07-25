import { Injectable } from '@nestjs/common';
import { HTML_START_PAGE } from './constants';

@Injectable()
export class AppService {
  init(): string {
    return HTML_START_PAGE;
  }
}
