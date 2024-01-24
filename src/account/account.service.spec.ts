import { Test, TestingModule } from '@nestjs/testing';
import { ethers } from 'ethers';
import { AccountService } from './account.service';
// Added some imports
import { User } from '../user/user.entity';
import { CreateAccountDto } from './dto/create-account.dto';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Account } from './account.entity';
import { Repository } from 'typeorm';
import { UserService } from 'src/user/user.service';


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
    expect(service.createAccount).toBeDefined()
    const user = new User();

    user.password = "password123";
    user.username = "user";

    const account = new CreateAccountDto();
    account.user = user;
    console.log(account.user)

    expect(account).toBeDefined();
    expect(!account.user).toEqual(false);
    // expect(service.createAccount(account)).toEqual({});
  });
});
