import { Test, TestingModule } from '@nestjs/testing';
import { ethers } from 'ethers';
import { AccountService } from './account.service';
// Added some imports
import { TypeOrmModule, getRepositoryToken } from '@nestjs/typeorm';
import { Account } from './account.entity';
import { Repository } from 'typeorm';
import fetchmock from 'jest-fetch-mock'
import { BadRequestException } from '@nestjs/common';
import { User } from 'src/user/user.entity';
import { createMock, DeepMocked } from '@golevelup/ts-jest';
import { HttpService } from '@nestjs/axios';

const mockUser = {
  id: 1,
  username: "user",
  password: "123",
  accounts: []
};
const dto = {
  user: mockUser
};


describe('AccountService', () => {
  let service: AccountService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AccountService, 
      {
        provide: AccountService,
        useValue: createMock<HttpService>()
      }]
    }).compile();

    service = module.get<AccountService>(AccountService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create an Ethereum account', async () => {

    // TODO: Create a new account using ethers module
    
    expect(await service.createAccount(dto)).toBeDefined();
  });
});
