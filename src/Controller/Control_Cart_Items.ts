import Cart, { ICartItem } from "../Models/Model_Cart_Items";
import { Request, Response } from "express";

const Add_Cart_item = async (req: Request, res: Response): Promise<void> => {
    try {
        const newItem = req.body as ICartItem;
        let cart = await Cart.findOne();
        if (!cart) {
            cart = new Cart({ items: [newItem] });
        } else {
            const exists = cart.items.some(item => item.name === newItem.name);
            if (exists) {
                res.status(400).send("Item Already Exists");
                return;
            }
            cart.items.push(newItem);
        }
        await cart.save();
        res.status(200).send({
            message: "Item added to Cart Successfully",
            items: cart.items
        });
    } catch (err) {
        res.status(400).send("Error Occurred While Adding Item to Cart");
    }
};

const Get_Cart_Items = async (req: Request, res: Response): Promise<void> => {
    try {
        const cart = await Cart.findOne();
        res.status(200).send({
            message: "Details Fetched Successfully",
            Cart_Items: cart?.items || []
        });
    } catch (err) {
        res.status(400).send("Error Occurred While Fetching the Details");
    }
};

const Delete_Cart_Item = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name } = req.params;
        const cart = await Cart.findOne();
        if (!cart) {
            res.status(404).send("Cart Not Found");
            return;
        }
        cart.items = cart.items.filter(item => item.name !== name);
        await cart.save();
        res.status(200).send({
            message: "Cart Item Deleted Successfully"
        });
    } catch (err) {
        res.status(400).send("Error Occurred While Deleting the Cart Item");
    }
};

const Update_Cart_Item_Quantity = async (req: Request, res: Response): Promise<void> => {
    try {
        const { _id, quantity } = req.body;
        if (!_id || typeof quantity !== 'number' || quantity < 1) {
            res.status(400).json({
                success: false,
                message: "Invalid _id or quantity. Quantity must be a positive number."
            });
            return;
        }
        const cart = await Cart.findOne()
        if (!cart) {
            res.status(404).json({
                success: false,
                message: "Cart not found"
            });
            return;
        }
        const itemIndex = cart.items.findIndex(item => item._id?.toString() === _id);
        if (itemIndex === -1) {
            res.status(404).json({
                success: false,
                message: "Item not found in cart"
            });
            return;
        }
        cart.items[itemIndex].quantity = quantity;
        await cart.save();
        res.status(200).json({
            success: true,
            message: "Cart item quantity updated successfully",
            item: cart.items[itemIndex]
        });
    } catch (err) {
        console.error("Error updating cart item quantity:", err);
        res.status(500).json({
            success: false,
            message: "Error occurred while updating the quantity"
        });
    }
};

const Clear_Cart = async (req: Request, res: Response): Promise<void> => {
    try {
        const cart = await Cart.findOne();
        if (!cart) {
            res.status(404).json({
                success: false,
                message: "Cart not found"
            });
            return;
        }
        cart.items = [];
        await cart.save();
        
        res.status(200).json({
            success: true,
            message: "Cart cleared successfully"
        });
    } catch (err) {
        console.error("Error clearing cart:", err);
        res.status(500).json({
            success: false,
            message: "Error occurred while clearing the cart"
        });
    }
};

export {
    Add_Cart_item,
    Get_Cart_Items,
    Delete_Cart_Item,
    Update_Cart_Item_Quantity,
    Clear_Cart
};