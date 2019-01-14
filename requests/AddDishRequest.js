import {IP} from '../constants';
import fetch from './fetchWithTimeout';

export default class AddDishRequest {
    constructor(newDish, onSuccess, onFail, onNotAvailable){
        this.newDish = newDish;
        this.onSuccess = onSuccess;
        this.onFail = onFail;
        this.onNotAvailable = onNotAvailable;
    }

    send(){
        fetch('http://' + IP + ':8080/dish',{
            method: 'POST',
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            },
            body: JSON.stringify(this.newDish), 
        }, 1000).then((response)=>{
            if(response.status === 200){
                this.onSuccess();
            } else {
                this.onFail();
            }
        }).catch(()=>{this.onNotAvailable(this);});
    }
}