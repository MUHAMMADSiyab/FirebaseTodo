// Read todos from RTDB
function readTodos () {
    // Empty todos list before before replacing with the updated one
    document.querySelector('.todos').innerHTML = '';
    firebase.database().ref('/todos').on('value', (todos) => {
        // Todos list
        let data = todos.val();

        // Iterate through todos list
        for (todoKey of Object.keys(data)) {
            let todo = data[todoKey];
            
            document.querySelector('.todos').innerHTML += `
                    <li class="list-group-item" onclick="makeItemActive(this)" ondblclick="edit(this)">
                        <input type="hidden" value="${todoKey}">
                        <h6>${todo.title}</h6>
                        <small><i class="fa fa-calendar"></i> ${todo.date}</small>
                        <button class="btn btn-light btn-sm" title="Remove" onclick="remove(this)"><i class="fa fa-trash-o"></i></button>
                        <button class="btn btn-success btn-sm update" style="display: none">Update</button>

                    </li>
                `;                    
            
        }
        
    })
}

// Make todo item active
function makeItemActive (elem) {
    // Remove existing classes
    var items = document.getElementsByTagName('li');
    for (item of items) {
        item.classList.remove('active');
    }
    // Add active class to the selected item
    elem.classList.add('active');
}

// Edit todo
function edit (elem) {

    // Make it editable
    elem.setAttribute('contentEditable', true);

    // Make update button visible
    elem.querySelector('.update').style.display = 'block';
    
    const updatedData = {};

    elem.addEventListener('input', function(e) {
        // Todo data
        let id = elem.querySelector('input[type=hidden]').value;
        let title = elem.querySelector('h6').innerText;
        let date = elem.querySelector('small').innerText;

        updatedData[id] = {
            title: title,
            date: date
        }
        
    });
    
    // Update todo
    elem.querySelector('.update').addEventListener('click', function() {
        // Replace the data with the updated one
        if (document.querySelector('.todos').innerHTML != '') {
            document.querySelector('.todos').innerHTML = '';
            firebase.database().ref('todos/').update(updatedData);
        }
        
    })
       
}

// Remove todo
function remove (elem) {
    if (confirm('Are you sure you want to delete this todo ?')) {
        // Todo ID
        let id = document.querySelector('input[type=hidden]').value;
        // Delete the specific todo and replace the data with the updated one
        if (document.querySelector('.todos').innerHTML != '') {
            document.querySelector('.todos').innerHTML = '';
            firebase.database().ref(`todos/${id}`).remove();
        }

    }
}

readTodos();