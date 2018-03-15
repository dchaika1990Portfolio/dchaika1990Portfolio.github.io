/**
 * Class Validate
 * @param {String} form_name
 */
class Validate{
    constructor(form_name, config){
        this.form = document.forms[form_name];
        this.sending_config = config;
    }

    init(){

        let self = this;

        if ( !this.form ) return console.error('Form tag not found');

        this.form_inputs = [].slice.call(this.form.elements);
        this.inputs_required = this.form_inputs.filter( input => input.hasAttribute('data-required') );
        this.error_block = document.querySelector('.error-info');
        this.sending_data = {};
        this.form_valid_toggle = true;

    }


    events(self){

        this.form.addEventListener('submit', (e) => {

            e.preventDefault();
            this.form_valid_toggle = this.validate_inputs();

            if (this.form_valid_toggle) this.remove_error_msg();
        })

    }

    validate_inputs(){
        return this.inputs_required.every( input => {

            this.sending_data[input.name] = input.value;

            if ( !input.dataset.required ){
                return input.value;
            } else {
                let reqExp = new RegExp(input.dataset.required, 'g');
                return reqExp.test(input.value);
            }
        } );
    }

    send_form(self){

        http.send({
            url: this.sending_config.url,
            method: this.sending_config.method,
            data: JSON.stringify(this.sending_data),
            success: this.handler_on_success.bind(this),
            error: this.show_error.bind(this)
        })

    }



    show_error(err){
        this.sending_data = {};
        this.error_block.innerHTML = err;
        this.error_block.classList.add('show')
    }

    remove_error_msg(){
        this.error_block.classList.remove('show')
    }

    clear_inputs(){
        this.inputs_required.forEach( input => input.value = '' );
    }


}



