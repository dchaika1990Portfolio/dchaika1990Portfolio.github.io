let create_task = new CreateTask('create-task-form', {
    method: 'POST',
    url: 'https://easycode-test-auth-server.herokuapp.com/create-task'
});

let edit_task = new CreateTask('edit-task-form', {
    method: 'POST',
    url: 'https://easycode-test-auth-server.herokuapp.com/edit-task'
});

let verify = new Verify({
    method: 'POST',
    url: 'https://easycode-test-auth-server.herokuapp.com/verify'
});



create_task.init();
edit_task.init();
verify.init();