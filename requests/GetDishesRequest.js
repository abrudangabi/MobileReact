import {IP} from '../constants';

export default class GetDishesRequest {
    constructor(then) {
        this.thenIfSuccessful = then;
    }
    
    send() {
        fetch('http://' + IP + ':8080/dishes',{
            method: 'GET',
        }).then((response)=>this.handleResponse(response))
        .catch((error)=> console.log(error.message));
    }

    handleResponse(response){
        response.json().then((json) => {
            const dishes = json.dishes;
            this.thenIfSuccessful(dishes);
    });
    }
}