document.querySelector('form').addEventListener('submit', function(e){

    // Stop page from reloading
    e.preventDefault();

    document.getElementById('loader').innerHTML = '<img src="images/loader.gif" />';

    // Get form data
    var email = document.getElementById('email');
    var pass = document.getElementById('pass');

    // Put it to an object
    var user = {
        email: email.value,
        pass: pass.value,
    } 
    
    // Firebase
    firebase.auth().signInWithEmailAndPassword(user.email, user.pass)
        .then((response) => {
            if (response) {
                document.getElementById('loader').innerHTML = '';
                window.location = 'index.html'; 
            }
        })
        .catch((err) => {
            if (err) {
                document.getElementById('loader').innerHTML = '';
                showMessage(`<div class="alert alert-danger">${err.message}</div>`);
            }
        })

});




