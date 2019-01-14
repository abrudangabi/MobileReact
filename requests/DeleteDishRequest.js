import {IP} from '../constants';
import fetch from './fetchWithTimeout';

export default class DeleteDishRequest {
    constructor(bishId,onSuccess,onFail, onNotAvailable){
        this.bishId = bishId;
        this.onSuccess = onSuccess;
        this.onFail = onFail;
        this.onNotAvailable = onNotAvailable;
    }

    send() {
        fetch('http://' + IP + ':8080/bish',{
            method: 'DELETE',
            body: JSON.stringify(this.bishId),
        }, 1000).then((response)=>{
            if(response.status === 200){
                this.onSuccess();
            } else {
                this.onFail();
            }
        }).catch(()=>{this.onNotAvailable(this);});
    }
}