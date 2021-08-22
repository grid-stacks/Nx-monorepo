import { Module, Global } from '@nestjs/common';
import { ApiOrmServicesController } from './api-orm-services.controller';
import { ApiOrmServicesService } from './api-orm-services.service';

@Global()
@Module({
  controllers: [ApiOrmServicesController],
  providers: [ApiOrmServicesService],
  exports: [ApiOrmServicesService],
})
export class ApiOrmServicesModule {}
