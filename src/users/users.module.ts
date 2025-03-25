import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { Mongoose } from 'mongoose';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports:[
    ConfigModule,
    MongooseModule.forFeature([{name:User.name, schema:UserSchema}]),
    JwtModule.register({
      secret:process.env.SECRET,
      signOptions:{
        expiresIn:'24h'
      }
    }), 
  ],
  
  controllers: [UsersController],
  providers: [
    UsersService,
    {
      provide:JwtStrategy,
      useFactory:(configService:ConfigService)=>{ 
        return new JwtStrategy(configService);
      },
      inject:[ConfigService]
    },
  
  ],
})
export class UsersModule {}
