import {Injectable} from "angular2/core";
import {Product} from "../product/product.service";

export interface CartItem {
    product: Product;
    quantity: number;
}

@Injectable()
export class SellService {
    submitCart(cartItems:CartItem[]) {
        // TODO map to send only product code, price and quantity
        console.log("cart items", cartItems);
    }
}