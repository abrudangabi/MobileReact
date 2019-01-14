import {IP} from '../constants';

export default class LoginRequest {
    constructor(username, password, thenIfSuccessful, thenIfReject){
        this.username = username;
        this.password = password;
        this.thenIfSuccessful = thenIfSuccessful;
        this.thenIfReject = thenIfReject;
    }
    
    send() {
         fetch('http://' + IP + ':8080/login',{
            method: 'POST',
            body: JSON.stringify(this.buildJson()),
        }).then((response)=>this.handleResponse(response))
        .catch((error)=> {});
    }

    handleResponse(response) {
       if(response.status===200){
            response.json().then((json) => {
                    const token = json.token;
                    const userId = json.id;
                    this.thenIfSuccessful(token, userId);
            });
        } else {
            this.thenIfReject();
        }
    }

    buildJson() {
        return {
            username: this.username,
            password: this.password,
        };
    }
}