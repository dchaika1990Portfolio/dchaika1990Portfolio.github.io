'use strict';

class Tasks{
    constructor(){
        this.task_container = document.querySelector('.tasks-container');
        this.remove_task_btn = document.getElementsByClassName('remove-task-btn');
        this.edit_task_btn = document.getElementsByClassName('edit-task-btn');
        this.edit_modal_title = document.getElementById('edittitle');
        this.edit_modal_description = document.getElementById('editdescription');
        this.edit_modal_btn_submit = document.getElementById('editTask').querySelectorAll('[type="submit"]');
        this.tasks = null;
        this.id = '';
    }

    init(){
        let self = this;

        console.log(this.edit_modal_btn_submit);

        this.get_tasks(self);
    }

    validate_inputs(){
        super.validate_inputs();
    }

    get_tasks(self){

        http.send({
            url: "https://easycode-test-auth-server.herokuapp.com/tasks",
            method: "GET",
            success: this.render_tasks.bind(this),
            error: function (err) {
                console.log(err)
            }
        })

    }

    render_tasks(res){

        this.tasks = JSON.parse(res);

        this.tasks.forEach( (task) =>{
            let template = this.card_template(task);
            this.task_container.insertAdjacentHTML('beforeend',template )
        } );

        this.add_Listeners(this);

    }

    card_template(task){

        let taskHTML =`
            <div class="card" data-id=${task._id}>
                <div class="card-header">
                    ${task.title}
                </div>
                <div class="card-body">
                    <p class="card-text">${task.description}</p>
                    <button href="#" class="btn btn-danger remove-task-btn">Remove task</button>
                    <button href="#" class="btn btn-primary edit-task-btn" data-toggle="modal" data-target="#editTask">Edit task</button>
                </div>
            </div>
        `;

        return taskHTML;
    }

    add_Listeners(self){

        Array.prototype.slice.call(this.remove_task_btn).forEach( (btn) => {
            btn.addEventListener('click', (e) => {
                this.remove_task.call(btn, self)
            })
        } )

        Array.prototype.slice.call(this.edit_task_btn).forEach( (btn) => {
            btn.addEventListener('click', (e) => {
                this.edit_tasks.call(btn, self)
            })
        } )

        Array.prototype.slice.call(this.edit_modal_btn_submit).forEach( (btn) => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();

                http.send({
                    url: `https://easycode-test-auth-server.herokuapp.com/edit-task`,
                    method: "POST",
                    data: JSON.stringify({
                        'id': self.id,
                        'title': self.edit_modal_title.value,
                        'description': self.edit_modal_description.value,
                    }),
                    success: function (res) {
                        create_task.handler_on_success(res);
                        notification.show('Edit success!')
                    },
                    error: function (err) {
                        console.log(err)
                    }
                })

            })
        } )

    }

    remove_task(self){

        let card = this.closest('.card');
        let id = card.dataset.id;

        card.remove();

        http.send({
            url: `https://easycode-test-auth-server.herokuapp.com/remove${id}`,
            method: "POST",
            success: function (res) {
                notification.show('Remove success!');
            },
            error: function (err) {
                console.log(err)
            }
        })

    }

    re_render_tasks(){
        this.task_container.innerHTML = '';
        this.init();
    }

    edit_tasks(self){
        let card = this.closest('.card');
        self.id = card.dataset.id;

        self.tasks.find( elem => {
            if (elem._id === self.id) {
                self.edit_modal_title.value = elem.title;
                self.edit_modal_description.value = elem.description;
            }
        } );

    }

}

let tasks = new Tasks();
tasks.init();
