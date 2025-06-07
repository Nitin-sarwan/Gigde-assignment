import { ADD_TO_CART } from "../constant";
export const addToCart=(itemData)=>{
    return {
        type:ADD_TO_CART,
        data:itemData
    }
}