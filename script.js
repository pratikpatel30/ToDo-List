const inputBox = document.getElementById('inputBox');
const addBtn = document.getElementById('addBtn');
const todoList = document.getElementById('todoList');

//make one global variable
let editTodo = null;

//Function to add to do 
const addTodo = () => {
    const inputText = inputBox.value.trim();
    if (inputText.length <= 0) {
        alert("You must write something in your to do")
        return false; // you wite anything but not enter empty string
    }

    if (addBtn.value === "Edit") {
        // Passing the original text to editLocalTodos function before edit it in the todoList
        editLocalTodos(editTodo.target.previousElementSibling.innerHTML);
        editTodo.target.previousElementSibling.innerHTML = inputText;
        addBtn.value = "Add";
        inputBox.value = "";
    }
    else {

        //create p tag in li and put input value
        // it is called dom manupulation
        //appendChild means we want to add in creted element
        const li = document.createElement("li");
        const p = document.createElement("p");
        p.innerHTML = inputText;
        li.appendChild(p);
        todoList.appendChild(li);
        // after we want to black input box
        inputBox.value = "";

        //which data we sae in input text that save in local storage
        saveLocalTodos(inputText);


        //create edit button
        const editBtn = document.createElement("button");
        editBtn.innerText = "Edit";
        editBtn.classList.add("btn", "editBtn");
        li.appendChild(editBtn);

        //Create delete button
        const deleteBtn = document.createElement("button");
        deleteBtn.innerText = "Remove";
        deleteBtn.classList.add("btn", "deleteBtn");// add class for accees in css
        li.appendChild(deleteBtn);



    }

}

// Function to update(Edit / Delete ) to do 
const updateTodo = (e) => {
    // for remove/delete 
    //console.log(e.target.innerHTML);// print inner value when we click on button
    if (e.target.innerHTML === "Remove") {
        //console.log(e.target.parentElement);
        todoList.removeChild(e.target.parentElement);//remove entered value
        deleteLocalTodos(e.target.parentElement);
    }

    // for edit 
    if (e.target.innerHTML === "Edit") {
        inputBox.value = e.target.previousElementSibling.innerHTML;
        inputBox.focus();
        addBtn.value = "Edit";//convert add btn into edit btn
        editTodo = e;
    }
}

//we want to store data in local storage
//function to save data
const saveLocalTodos = (todo) => {
    let todos = [];
    // console.log(localStorage.getItem("todos"));
    // console.log(JSON.parse(localStorage.getItem("todos")));

    if (localStorage.getItem("todos") === null) {
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem("todos"));//convert json string to json object
    }
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));// json is convert object in to string, local storage store defaut as a object
    // console.log(todos);

}

//get data from local storage 
//function to get data
const getLocalTodos = () => {
    let todos = [];
    if (localStorage.getItem("todos") === null) {
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem("todos"));//convert json string to json object
        //show data in display
        todos.forEach(todo => {
            const li = document.createElement("li");
            const p = document.createElement("p");
            p.innerHTML = todo;
            li.appendChild(p);

            //create edit button
            const editBtn = document.createElement("button");
            editBtn.innerText = "Edit";
            editBtn.classList.add("btn", "editBtn");
            li.appendChild(editBtn);

            //Create delete button
            const deleteBtn = document.createElement("button");
            deleteBtn.innerText = "Remove";
            deleteBtn.classList.add("btn", "deleteBtn");// add class for accees in css
            li.appendChild(deleteBtn);

            todoList.appendChild(li);
        })
    }
}

//function to delete data from local storage
const deleteLocalTodos = (todo) =>{
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem("todos"));//convert json string to json object
    }

    let todoText = todo.children[0].innerHTML;
    let todoIndex = todos.indexOf(todoText);
    //for delete
    //slice function don't manupulate orignal array it is create new array than change the array
    //splice is direct change in orignal array
    todos.splice(todoIndex, 1);
    localStorage.setItem("todos", JSON.stringify(todos));//stringify convert object or array into string
    console.log(todoIndex);

}

//function to edit data from local storage
const editLocalTodos = (todo) => {
    let todos = JSON.parse(localStorage.getItem("todos"));
    let todoIndex = todos.indexOf(todo);
    todos[todoIndex] = inputBox.value;
    localStorage.setItem("todos", JSON.stringify(todos));
}

document.addEventListener('DOMContentLoaded', getLocalTodos); // run when load full page after run this function
addBtn.addEventListener('click', addTodo);//run when click on add
todoList.addEventListener('click', updateTodo)// run when click on edit delete
