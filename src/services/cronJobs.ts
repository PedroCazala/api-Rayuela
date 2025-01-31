import cron from "node-cron";
import { OrdersServices } from "./orders.services";


// Ejecutar cada hora en punto
cron.schedule("0 0 * * *", async () => {
  await OrdersServices.deleteOldOrders();
});