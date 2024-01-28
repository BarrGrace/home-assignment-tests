import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Contract, JsonRpcProvider, Result, ethers } from "ethers";
import { Repository } from 'typeorm';
import { Account } from './account.entity';
import { CreateAccountDto } from './dto/create-account.dto';
import migration from '../../build/contracts/Migrations.json';
import { User } from 'src/user/user.entity';
import { error } from 'console';


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
    const url = 'http://localhost:3000/user/' + createAccountDto.user.id.toString();
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
    account.privateKey = wallet.privateKey;
    // Can also create autimaticly an id by the @PrimaryGeneratedColumn decorator
    account.id = new Date().valueOf(); // Will give a different number 

    
    // const RPC = "HTTP://127.0.0.1:7545"
    // const provider = new JsonRpcProvider(RPC) 
    
    // const network_id = parseInt((await provider.getNetwork()).chainId.toString());
    // const network_address = migration.networks[network_id].address

    // const contract = new ethers.Contract(account.publicKey, migration.abi, provider);
    // contract.

    
  
    // return this.accountRepository.save(account);
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
