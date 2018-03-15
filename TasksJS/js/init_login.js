
let login_form = new ValidateLogin('login-form', {
    method: 'POST',
    url: "https://easycode-test-auth-server.herokuapp.com/login"
});

login_form.init();