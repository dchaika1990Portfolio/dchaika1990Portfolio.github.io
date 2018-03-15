'use strict';


class Verify{
    constructor( config ){
        this.token = localStorage.token || sessionStorage.token;
        this.sending_config = config;
        this.success_block = document.querySelector('.alert-success');
    }

    init(){
        let self = this;

        this.send_form();
    }

    send_form(self){

        http.send({
            url: this.sending_config.url,
            method: this.sending_config.method,
            data: JSON.stringify({'token': this.token}),
            success: this.handler_on_success.bind(this),
            error: this.on_error.bind(this)
        });
    }



    handler_on_success(res){
        this.success_block.innerHTML = `Welcome, ${res}`;
        this.success_block.classList.add('show');
    }

    on_error(err){
        window.location = './login.html';
    }

}


