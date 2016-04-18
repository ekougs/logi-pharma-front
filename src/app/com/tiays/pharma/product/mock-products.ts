import {Product} from "./product.service.ts";

export let PRODUCTS:Product[] = [
    {
        categoryCode: "medicine",
        code: "A290ZC",
        label: "Paracetamol",
        price: 350.,
        contraindication: "Eviter en cas de grossesse.",
        stock: 350
    },
    {categoryCode: "medicine", code: "A291ZC", label: "Doliprane", price: 1000., stock: 150}
];