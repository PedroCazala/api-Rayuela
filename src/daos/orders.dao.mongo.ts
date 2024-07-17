import { IOrder } from "../interfaces/orders.interface";
import { OrderModel } from "../models/order.model";

export class OrdersDaoMongo {
    static async getOneById(idOrder: string) {
        const order = await OrderModel.findById(idOrder);
        return order;
    }
    static async getAll() {
        const orders = await OrderModel.find();
        return orders;
    }
    static async getByState(state:string) {
        const orders = await OrderModel.find({state});
        return orders;
    }
    static async create(newOrder:IOrder){
        const order = await  OrderModel.create(newOrder)
        return order
    }
}
