import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {  ethers } from 'ethers';
import { Repository } from 'typeorm';
import { Account } from './account.entity';
import { CreateAccountDto } from './dto/create-account.dto';
import { User } from 'src/user/user.entity';

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(Account)
    private accountRepository: Repository<Account>,
  ) {}

  async createAccount(createAccountDto: CreateAccountDto) {
    const account = new Account();
    
    // TODO: Create a new account using ethers module
    account.id = createAccountDto.user.id;

    // Crates a new random Wallet instance
    const wallet = ethers.Wallet.createRandom();

    // Add the fields that are required to the Account class from wallet
    account.publicKey = wallet.publicKey;
    account.privateKey = wallet.privateKey;
    ///

    return this.accountRepository.save(account);
  }

  async findOne(id: number) {
    const user = await this.accountRepository.findOne({where: {id}});
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  async findAll() {
    return this.accountRepository.find();
  }
}
