import { REMOVE_FROM_CART } from "../constant";
import{ Add_To_Cart } from "../Constants";
const initialState={
    cardData:[]
}
export const cardItems=(state=initialState,action)=>{ // reducer function take two parameters
    // state and action
    // state is the initial state of the reducer
    // action is the action that is dispatched to the reducer
    // action is an object that contains the type of action 
    // and the data to be passed to the reducer

    switch(action.type){
        case Add_To_Cart:
            return {
                ...state,
                cardData:action.data
            }
        case REMOVE_FROM_CART:
            return {
                ...state,
                cardData:state.cardData.filter((item)=>item.id!==action.id)
            }
        
    }

}