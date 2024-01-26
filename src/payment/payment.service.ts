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

  async create(createPaymentDto: CreatePaymentDto): Promise<Payment> {
    const payment = new Payment();

    // TODO: Create a new payment using ethers module
    payment.id = new Date().valueOf();
    payment.amount = createPaymentDto.amount;
    payment.from = (await this.findOne(createPaymentDto.from)).from;
    payment.to = (await this.findOne(createPaymentDto.to)).to;

    let privateKey = payment.from.privateKey;
    let wallet = new ethers.Wallet(privateKey)

    const provider = new EtherscanProvider("HTTP://127.0.0.1:7545");
    console.log(provider.getBalance)
    
    
    return await this.paymentsRepository.save(payment);
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
