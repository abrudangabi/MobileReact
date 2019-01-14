import { ADD_DISH, LOGIN, LOGOUT, USER_ID, GET_DISHES, REMOVE_DISH, UPDATE_DISH } from "./types";
import uuidv4 from 'uuid/v4';

export const addDish = ({id,name,description,venue}) => ({
    type: ADD_DISH,
    payload: {
        id,
        name,
        description,
        venue
    }
});

export const removeDish = (id) => ({
    type: REMOVE_DISH,
    payload: {
        id
    }
});

export const updateDish = ({id,name,description,venue}) => ({
    type: UPDATE_DISH,
    payload: {
        id,
        name,
        description,
        venue
    }
});

export const getDishes = (dishes) => ({
    type: GET_DISHES,
    payload: {
        dishes
    }
}); 

export const login = (token) => ({
    type: LOGIN,
    payload: {
        id: uuidv4(),
        token
    }
});

export const logout = () => ({
    type: LOGOUT,
    payload: {
        id: uuidv4()
    }
});

export const setUserId = (userId) => ({
    type: USER_ID,
    payload: {
        id:uuidv4(),
        userId
    }
});