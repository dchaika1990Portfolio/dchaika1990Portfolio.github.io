class CreateTask extends Validate{

    constructor(form_name, config){
        super(form_name, config);
        console.log(this);
    }

    init(){
        super.init();
        // super.events(self);
        this.events(self);
    }

    events(self){
        super.events(self);

        this.form.addEventListener('submit', (e) => {
            if ( !this.form_valid_toggle ) return this.show_error('Incorrect title or description');
            super.send_form();
        });
    }

    handler_on_success(res){
        tasks.re_render_tasks();

        $('.modal').modal('hide');

        notification.show('New task add success!');

        super.clear_inputs();
    }


}