import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JsonRpcProvider, Result, ethers } from "ethers";
import { Repository } from 'typeorm';
import { Account } from './account.entity';
import { CreateAccountDto } from './dto/create-account.dto';
import migration from '../../build/contracts/Migrations.json';


@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(Account)
    private accountRepository: Repository<Account>,
  ) {}

  async createAccount(createAccountDto: CreateAccountDto) {
    const account = new Account();
    
    // TODO: Create a new account using ethers module
    // Crates a new random Wallet instance
    const wallet = ethers.Wallet.createRandom();

    // Add the fields that are required to the Account class from wallet
    account.publicKey = wallet.publicKey;
    account.privateKey = wallet.privateKey;
    account.id = new Date().valueOf(); // Will give a different number every time
    account.user = createAccountDto.user;
    ///

    const RPC = "HTTP://127.0.0.1:7545"
    const provider = new JsonRpcProvider(RPC) 
    
    const network_id = parseInt((await provider.getNetwork()).chainId.toString());
    const network_address = migration.networks[network_id].address

    const singer = await provider.getSigner(0); 
    const contracts = new ethers.Contract(network_address, migration.abi, singer);
    await contracts.changeValue({
      value: ethers.parseEther('10')
    })
    
    contracts.sendEther("0xf1dAC20B7c8F6A5013CE07012db023866C7A6133").then(() => console.log("Sent"));


    // const singer = await provider.getSigner("0xf1dAC20B7c8F6A5013CE07012db023866C7A6133");
    // const transaction = {
    //   from: "0xf1dAC20B7c8F6A5013CE07012db023866C7A6133",
    //   to: "0x233Ca9680Ec827232D24efc2fF333aB74c377E9d",
    //   value: ethers.parseEther("10")
    // }
    // singer.sendTransaction(transaction).then(() => console.log("Send transaction"))

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
