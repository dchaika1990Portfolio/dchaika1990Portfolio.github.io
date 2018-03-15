class ValidateLogin extends Validate{

    constructor(form_name, config){
        super(form_name, config);
    }

    init(){
        super.init();
        this.user_save_toggle = this.form.elements['stay-logged-in'];

        if (sessionStorage.token || localStorage.token){
            window.location = './home.html';
        } else {
            this.events(self);
        }
    }

    events(self){
        super.events(self);

        this.form.addEventListener('submit', (e) => {
            if ( !this.form_valid_toggle ) return this.show_error('Incorrect email or password');
            super.send_form();
        });


    }

    handler_on_success(res){
        // console.log(res);
        if (this.user_save_toggle.checked){
            localStorage.setItem('token', res);
        } else {
            sessionStorage.setItem('token', res);
        }
        window.location = './home.html';
    }

}