document.getElementById('todoForm').addEventListener('submit', function(e) {
    e.preventDefault();

    var title = document.getElementById('title').value;
    var date = document.getElementById('date').value;

    // New todo key
    var newTodoKey = firebase.database().ref().child('todos').push().key;

    // Push it to an object
    var data = {};
  
    data[newTodoKey] =  {
        title: title, 
        date: date
    }
    
    // // Insert into firebase RTDB
    firebase.database().ref('todos/').update(data);
    
})
