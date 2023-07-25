import { Controller } from '@nestjs/common';
import { SingInService } from './singIn.servise';

@Controller('api/singIn')
export class SingInController {
  constructor(private readonly singInService: SingInService) {}

  // @Get()
  // init(): string {
  //   return this.singInService.init();
  // }
}
