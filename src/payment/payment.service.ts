import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JsonRpcProvider, ethers } from 'ethers';
import { Repository } from 'typeorm';
import { Payment } from './payment.entity';
import { CreatePaymentDto } from './dto/create-payment.dto';
import migration from '../../build/contracts/Migrations.json';
// Not exposing the RPC server
require('dotenv').config()
const RPC = process.env.RPC // Your RPC server


@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(Payment)
    private paymentsRepository: Repository<Payment>,
  ) {}
  // async create(createPaymentDto: CreatePaymentDto): Promise<Payment> {
  async create(createPaymentDto: CreatePaymentDto) {
    
    const payment = new Payment();

    // TODO: Create a new payment using ethers module
    // Add the fields into the new payment:
    payment.id = new Date().valueOf();
    payment.amount = createPaymentDto.amount;
    
    // Two ways to make a transaction:
    // 1) Transaction via SOL:
    const provider = new JsonRpcProvider(RPC) 
    
    // Get the network adress from migration.json file:
    try {
      const network_id = parseInt((await provider.getNetwork()).chainId.toString());
      const network_address = migration.networks[network_id].address;

      // Create a contract:
      const singer = await provider.getSigner(createPaymentDto.from); 
      const contracts = new ethers.Contract(network_address, migration.abi, singer);

      // Change to the right amount that is needed to be sent:
      await contracts.changeValue({
        value: ethers.parseEther(createPaymentDto.amount.toString())
      })
    
      contracts.sendEther(createPaymentDto.to).then(() => console.log("Transacion was sent"));
      // 2) Transaction via ethers:
      // const provider = new JsonRpcProvider(RPC);
      // const singer = await provider.getSigner(createPaymentDto.from);
      // const transaction = {
      //   from: createPaymentDto.from.toString(),
      //   to: createPaymentDto.to.toString(),
      //   value: ethers.parseEther(createPaymentDto.amount.toString())
      // }
      // singer.sendTransaction(transaction).then(() => console.log("Transaction was sent"))

    }catch(err) {
      throw Error("Could't find address")
    }

    // return await this.paymentsRepository.save(payment);
  }

  async findOne(id: number) {
    const user = await this.paymentsRepository.findOne({where: {id}});
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  async findAll() {
    return this.paymentsRepository.find();
  }
}
