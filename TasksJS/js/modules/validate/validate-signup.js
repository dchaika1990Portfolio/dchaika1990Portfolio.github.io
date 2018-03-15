class ValidateSignup extends Validate{
    constructor(form_name, form_type, config){
        super(form_name, form_type, config);
        console.log(this)
    }

    init(){
        super.init();

        this.input_password = this.form.elements['password'];
        this.input_confirm_password = this.form.elements['confirmPassword'];

        if (sessionStorage.token || localStorage.token){
            window.location = './home.html';
        } else {
            this.events(self);
        }

    }

    events(self){
        super.events(self);

        this.form.addEventListener('submit', (e) => {

            if ( this.input_password.value !== this.input_confirm_password.value ) return this.show_error('Password and confirm password have to be the same');

            if ( !this.form_valid_toggle ) return this.show_error('Incorrect email or password');

            delete this.sending_data.confirmPassword;
            // console.log(this.sending_data);
            super.send_form();
        });
    }

    handler_on_success(res){
        sessionStorage.setItem('token', res);
        window.location = './home.html';
    }

}

