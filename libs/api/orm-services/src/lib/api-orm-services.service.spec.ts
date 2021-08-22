import { Test } from '@nestjs/testing';
import { ApiOrmServicesService } from './api-orm-services.service';

describe('ApiOrmServicesService', () => {
  let service: ApiOrmServicesService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [ApiOrmServicesService],
    }).compile();

    service = module.get(ApiOrmServicesService);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });
});
