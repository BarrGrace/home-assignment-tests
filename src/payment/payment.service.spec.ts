import { Test, TestingModule } from '@nestjs/testing';
import { ethers } from 'ethers';
import { PaymentService } from './payment.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Payment } from './payment.entity';

describe('PaymentService', () => {
  let service: PaymentService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PaymentService, {
        provide: getRepositoryToken(Payment),
        useClass: Repository
      }],
    }).compile();

    service = module.get<PaymentService>(PaymentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should make a payment', async () => {

    // TODO: should make a payment between two accounts using ethers module
  
  });
});
