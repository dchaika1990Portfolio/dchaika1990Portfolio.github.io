let signup_form = new ValidateSignup('signup-form', {
    method: 'POST',
    url: 'https://easycode-test-auth-server.herokuapp.com/signup'
});

signup_form.init();