import { Test, TestingModule } from '@nestjs/testing';
import { ethers } from 'ethers';
import { AccountService } from './account.service';
// Added some imports
import { User } from '../user/user.entity';
import { CreateAccountDto } from './dto/create-account.dto';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Account } from './account.entity';
import { Repository } from 'typeorm';


describe('AccountService', () => {
  let service: AccountService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AccountService, {
        provide: getRepositoryToken(Account),
        useClass: Repository
      }],
    }).compile();

    service = module.get<AccountService>(AccountService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create an Ethereum account', async () => {

    // TODO: Create a new account using ethers module
    const user = new User();
    user.id = 123;
    user.password = "password123";
    user.username = "user";

    const account = new CreateAccountDto();
    account.user = user;

    expect(service.createAccount(account)).toBeDefined();
  });
});
