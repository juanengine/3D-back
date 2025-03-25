import { ForbiddenException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './entities/user.entity';
import { Model } from 'mongoose';
import * as argon2 from "argon2";
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {

  constructor(@InjectModel(User.name) private userModel: Model<User>, private jwtService:JwtService){}

  async login(user:any){
   const {email, password} = user;

    const currentUser = await this.userModel.findOne({email:email});

    if(!currentUser) return {success:false, status:404};

    const isPasswordCorrect = await this.comparePasswords(password, currentUser.password);

    if(!isPasswordCorrect){

      return {success:false, status:401}
    } 


     const payload = {email:user.email, sub:currentUser.id}

    return{ success:true, token: this.jwtService.sign(payload)}
  }




  async create(createUserDto: CreateUserDto) {

    try {
    const userExist =  await this.userModel.findOne({email:createUserDto.email})

    if(userExist){
      return  new ForbiddenException("El email asociado al usuario ya existe...")
    }

    const newUser = new this.userModel(createUserDto);

    newUser.password = await argon2.hash(createUserDto.password);

    return newUser.save();

   
    } catch (error) {
      console.log(error);
      
    }

    
  }

  async findAll() {
    return await this.userModel.find({});
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async comparePasswords(password: string, hashedPassword: string): Promise<boolean> {
    return await argon2.verify(hashedPassword, password);
  }
}
