import { Test } from '@nestjs/testing';
import { ApiOrmServicesController } from './api-orm-services.controller';
import { ApiOrmServicesService } from './api-orm-services.service';

describe('ApiOrmServicesController', () => {
  let controller: ApiOrmServicesController;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [ApiOrmServicesService],
      controllers: [ApiOrmServicesController],
    }).compile();

    controller = module.get(ApiOrmServicesController);
  });

  it('should be defined', () => {
    expect(controller).toBeTruthy();
  });
});
