import { LOGIN,LOGOUT, USER_ID } from "../actions/types";

const initialState = {
    token: null,
    userId: null,
}

const securityReducer = (state= initialState, action) => {
    switch(action.type){
        case LOGIN:
            console.log('TOKEN->' + action.payload)
            return {
                ...state,
                token: action.payload.token,
            }
        case LOGOUT:
            return {
                ...state,
                token: null,
            }
        case USER_ID:
            return {
                ...state,
                userId: action.payload.userId,
            }
        default:
            return state;
    }
}

export default securityReducer;