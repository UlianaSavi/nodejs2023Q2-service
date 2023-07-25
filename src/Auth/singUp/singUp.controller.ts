import { Controller } from '@nestjs/common';
import { SingUpService } from './singUp.servise';

@Controller('api/singUp')
export class SingUpController {
  constructor(private readonly singUpService: SingUpService) {}

  // @Get()
  // init(): string {
  //   return this.singUpService.init();
  // }
}
