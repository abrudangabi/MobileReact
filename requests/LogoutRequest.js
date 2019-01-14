import {IP} from '../constants';

export default class LogoutRequest {
    constructor(then, token) {
        this.then = then;
        this.token = token;
    }
    
    send() {
        fetch('http://' + IP + ':8080/logout',{
            method: 'POST',
            body: null,
            headers:{
                'token': this.token
              },
        }).then((response)=>{this.then();})
        .catch((error)=> console.log(error.message));
    }
}