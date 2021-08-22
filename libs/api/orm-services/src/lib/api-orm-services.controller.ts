import { Controller } from '@nestjs/common';
import { ApiOrmServicesService } from './api-orm-services.service';

@Controller('api-orm-services')
export class ApiOrmServicesController {
  constructor(private apiOrmServicesService: ApiOrmServicesService) {}
}
