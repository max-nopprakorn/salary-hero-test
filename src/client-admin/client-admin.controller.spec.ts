import { Test, TestingModule } from '@nestjs/testing';
import { ClientAdminController } from './client-admin.controller';
import { ClientAdminService } from './client-admin.service';

describe('ClientAdminController', () => {
  let controller: ClientAdminController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClientAdminController],
      providers: [ClientAdminService],
    }).compile();

    controller = module.get<ClientAdminController>(ClientAdminController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
