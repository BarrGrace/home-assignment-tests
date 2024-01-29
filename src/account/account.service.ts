import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ethers } from "ethers";
import { Repository } from 'typeorm';
import { Account } from './account.entity';
import { CreateAccountDto } from './dto/create-account.dto';
import CryptoJS from "crypto-js";
// Not exposing the URL
require('dotenv').config();
const URL = process.env.URL;// Your server's URL
import Web3 from 'web3';

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(Account)
    private accountRepository: Repository<Account>
  ) {}

  async createAccount(createAccountDto: CreateAccountDto) {
    const account = new Account();
    
    // TODO: Create a new account using ethers module
    // Validation: such account exists?
    const url = [URL + "/user/" + createAccountDto.user.id.toString()].join();// Concatenate at O(n)
    fetch(url)
      .then((data) => data.json())
        .then((user) => {
          if (user.id !== createAccountDto.user.id) {
            throw Error("error in validation of the user when creating account")
          }
        }).catch(() => {
          throw Error("User does not exists!")
        })
    
    // Crates a new random Wallet instance
    const wallet = ethers.Wallet.createRandom();

    // Add the fields that are required to the Account class from wallet
    account.publicKey = wallet.publicKey;
    // Keep privatekey a secret when sending it - no one can seal it
    account.privateKey = CryptoJS.AES.encrypt(
      wallet.privateKey, 
      createAccountDto.user.password
    ).toString();
    // Decrypt: in the client side
    // const decreypt = CryptoJS.AES.decrypt(encrypt_privateKey, 'password');
    // const privatekey = decreypt.toString(CryptoJS.enc.Utf8);

    // Can also create autimaticly an id by the @PrimaryGeneratedColumn decorator
    account.id = new Date().valueOf(); // Will give a different number 

    return await this.accountRepository.save(account);
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
