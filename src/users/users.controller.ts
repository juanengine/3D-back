import { Controller, Get, Post, Body, Patch, Param, Delete, Res, Req, HttpStatus, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserLoginDto } from './dto/user-login.dto';
import { Response } from 'express';
import { JwtAuthGuard } from './jwt-auth-guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}


  @Post("/login")
  async loginUser(@Body() userLogin:UserLoginDto, @Res() response: Response, @Req() request:Request,){

    const loginResponse = await this.usersService.login(userLogin)

    if(!loginResponse.success && loginResponse.status == 404) return response.status(loginResponse.status).json({msg:"El usuario no existe."});

    if(!loginResponse.success && loginResponse.status == 401) return response.status(loginResponse.status).json({msg:"Password incorrecto."});

    return response.status(HttpStatus.OK).json({success:true, msg:"Usuario Autenticado Correctamente.", token:loginResponse.token});

  }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
