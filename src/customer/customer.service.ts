import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Customer } from './entities/customer.entity';

@Injectable()
export class CustomerService {

  constructor(@InjectModel(Customer.name) private customerModel: Model<Customer>,){}

  async create(createCustomerDto: CreateCustomerDto) {
    try {
        const userExist =  await this.customerModel.findOne({email:createCustomerDto.email})
    
        if(userExist){
          return  new ForbiddenException("El email asociado al cliente ya existe...")
        }
    
        const newUser = new this.customerModel(createCustomerDto);
    
       
        
        return newUser.save();
    
       
        } catch (error) {
          console.log(error);
          
        }
    
  }

  findAll() {
    return `This action returns all customer`;
  }

  findOne(id: number) {
    return `This action returns a #${id} customer`;
  }

  update(id: number, updateCustomerDto: UpdateCustomerDto) {
    return `This action updates a #${id} customer`;
  }

  remove(id: number) {
    return `This action removes a #${id} customer`;
  }
}
