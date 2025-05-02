import express from "express"
const router_cart_item = express.Router();
import {Add_Cart_item, Get_Cart_Items, Delete_Cart_Item, Update_Cart_Item_Quantity, Clear_Cart} from "../Controller/Control_Cart_Items";

router_cart_item.post("/add_item", Add_Cart_item);
router_cart_item.get("/get_cart_items", Get_Cart_Items);
router_cart_item.delete("/delete_cart_item/:name", Delete_Cart_Item)
router_cart_item.patch("/update_cart_quantity", Update_Cart_Item_Quantity)
router_cart_item.delete("/clear_cart", Clear_Cart)


export default router_cart_item