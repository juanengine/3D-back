import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
@Schema()
export class Customer {

    
   
    
        @Prop({required:true})
        nombre:string;
    
        @Prop({required:true})
        apellidos:string
    
        @Prop({required:true, unique:true})
        email:string;
    
        @Prop({required:true})
        telefono:string
    
    
    
    
    
    
}
export const CustomerSchema = SchemaFactory.createForClass(Customer)