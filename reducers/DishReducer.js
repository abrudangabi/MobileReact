import { ADD_DISH, GET_DISHES, REMOVE_DISH, UPDATE_DISH } from '../actions/types';

const INITIAL_STATE = {
    dishes: [],
  };

const dishReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case ADD_DISH:
        return [...state, action.payload];
      case GET_DISHES:
        return action.payload.dishes;
      case REMOVE_DISH:
        return state.filter((dish)=> dish.id != action.payload.id);
      case UPDATE_DISH:
        state = state.filter((dish)=> dish.id != action.payload.id);
        return [...state, action.payload];
      default:
        return state
    }
};

export default dishReducer;