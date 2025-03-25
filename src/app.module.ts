import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { OrderModule } from './order/order.module';
import { CustomerModule } from './customer/customer.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal:true
    }),
    MongooseModule.forRootAsync({

      useFactory: () => ({
       
        uri: process.env.MONGO_URI, 
      }),
    }),
    UsersModule,OrderModule,CustomerModule
  
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
