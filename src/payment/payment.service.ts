import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EtherscanProvider, ethers } from 'ethers';
import { Repository } from 'typeorm';
import { Payment } from './payment.entity';
import { CreatePaymentDto } from './dto/create-payment.dto';

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
    payment.id = new Date().valueOf();
    payment.amount = createPaymentDto.amount;
    const something = fetch("http://localhost:3000/account/3")
      .then((e) => e.json())
      .then((e) => console.log(e));
    
    // payment.to = (await this.findOne(createPaymentDto.to))  
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Transaction viea SOL
    // const RPC = "HTTP://127.0.0.1:7545"
    // const provider = new JsonRpcProvider(RPC) 
    
    // const network_id = parseInt((await provider.getNetwork()).chainId.toString());
    // const network_address = migration.networks[network_id].address

    // const singer = await provider.getSigner(0); 
    // const contracts = new ethers.Contract(network_address, migration.abi, singer);
    // await contracts.changeValue({
    //   value: ethers.parseEther('10')
    // })
    
    // contracts.sendEther("0xf1dAC20B7c8F6A5013CE07012db023866C7A6133").then(() => console.log("Sent"));
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Transaction via ethers:
    // const singer = await provider.getSigner("0xf1dAC20B7c8F6A5013CE07012db023866C7A6133");
    // const transaction = {
    //   from: "0xf1dAC20B7c8F6A5013CE07012db023866C7A6133",
    //   to: "0x233Ca9680Ec827232D24efc2fF333aB74c377E9d",
    //   value: ethers.parseEther("10")
    // }
    // singer.sendTransaction(transaction).then(() => console.log("Send transaction"))
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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
