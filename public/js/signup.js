document.querySelector('form').addEventListener('submit', function(e){

    // Stop page from reloading
    e.preventDefault();

    // Get form data
    var email = document.getElementById('email');
    var pass = document.getElementById('pass');
    var passRepeat = document.getElementById('pass-repeat');

    // Put it to an object
    var user = {
        email: email.value,
        pass: pass.value,
        passRepeat: passRepeat.value
    } 


    // Firebase
    firebase.auth().createUserWithEmailAndPassword(user.email, user.pass)
        .then((success) => {
            if (success) {
                showMessage('<div class="alert alert-success">Account created successfully</div>');
            }
        })
        .catch((err) => {
            if (err) {
                showMessage(`<div class="alert alert-danger">${err.message}</div>`);
            }
        })


});





