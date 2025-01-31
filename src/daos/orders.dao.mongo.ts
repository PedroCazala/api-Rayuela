import { IOrder } from "../interfaces/orders.interface";
import { OrderModel } from "../models/order.model";

export class OrdersDaoMongo {
    static async getOneById(idOrder: string) {
        const order = await OrderModel.findById(idOrder);
        return order;
    }
    static async getAll() {
        const orders = await OrderModel.find().populate("userId");
        return orders;
    }
    static async getOrderByUser(idUser:string) {
        const orders = await OrderModel.find({userId:idUser}).populate("userId");
        // console.log('llego aca');
        
        // const orders = 'sd'
        return orders;
    }
    static async getByState(state: string) {
        const orders = await OrderModel.find({ state }).populate("userId");
        return orders;
    }
    static async updateByIdOrder(idOrder: string) {

        const orders = await OrderModel.findByIdAndUpdate(
            idOrder,
            { state: "En-preparación" },
            { new: true }
        ).populate("userId");
        return orders;
    }

    static async create(newOrder: IOrder) {
        const order = await OrderModel.create(newOrder);
        return order;
    }
    static async getEditeState({ idOrder, state }: IEditState) {
        const order = await OrderModel.findOneAndUpdate(
            {
                _id: idOrder,
            },
            { state }
        );
        return order;
    }
}
interface IEditState {
    idOrder: string;
    state: string;
}
