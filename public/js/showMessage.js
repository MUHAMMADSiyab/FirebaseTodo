// Message
var msg = document.getElementById('response');

function showMessage (message) {
    msg.innerHTML = message;
    // Clear message
    if (msg !== '') {
        setTimeout(() => {
            msg.innerHTML = '';
        }, 5000)
    }
}