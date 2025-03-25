import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class Order {
   
    
        @Prop({required:true})
        titulo:string;
    
        @Prop({required:true})
        clienteId:string
    
        @Prop({required:true})
        descripcion:string;
    
        @Prop({default:Date.now})
        fechaAlta:Date

        @Prop()
        fechaEntrega:Date

        @Prop({enum:['pendiente', 'en proceso', 'entregado'], default:'pendiente'})
        estatus:string
    
    
    
    
    
}

export const OrderSchema = SchemaFactory.createForClass(Order);
