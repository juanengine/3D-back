import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class Order {
   
    
        @Prop({required:true})
        IDOrder:string;
    
        @Prop({required:true})
        clienteId:string
    
        @Prop({required:true})
        descripcion:string;
    
        @Prop({default:Date.now})
        fechaAlta:Date

        @Prop()
        fechaPedido:Date

        @Prop()
        articulosCantidad:Date

        @Prop({enum:['pendiente', 'en proceso', 'entregado'], default:'pendiente'})
        estatus:string
    
    
    
    
    
}

export const OrderSchema = SchemaFactory.createForClass(Order);
