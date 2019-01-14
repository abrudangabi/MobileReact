import {IP} from '../constants';
import fetch from './fetchWithTimeout';

export default class SyncDishesRequest {
    constructor(userId,dishes,onSuccess,onFail){
        this.userId = userId;
        this.dishes = dishes;
        this.onSuccess = onSuccess;
        this.onFail = onFail;
    }

    send(){
        fetch('http://' + IP + ':8080/sync',{
            method: 'POST',
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            },
            body: JSON.stringify(this.buildJson())
        }, 1000).then((response)=>{
            if(response.status === 200){
                this.onSuccess();
            } else {
                this.onFail();
            }
        }).catch((error)=>{console.log(error)});
    }

    buildJson() {
        return {
            iduser: this.userId,
            dishes: this.dishes
        };
    }
}