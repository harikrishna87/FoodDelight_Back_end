import express, {Request, Response} from "express"
import Database_Creation from "./Config/Database_Connection"
import router_cart_item from "./Routes/Routes_Cart_Items";
import payment_router from "./Routes/Razorpay_payment";
import cors from "cors"

const app = express();

app.get("/" , (req: Request, res: Response) => {
    res.send("Hello, Welcome to the WebPage")
})

// Database Connection 
Database_Creation

//Middlewares
app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(cors());

// Routes
app.use("/cart", router_cart_item)
app.use("/razorpay",payment_router)

app.listen(3000, ()=> {
    console.log("Server is Listening on Port 3000")
})

