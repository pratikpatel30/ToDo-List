const inputBox = document.getElementById('inputBox');
const addBtn = document.getElementById('addBtn');
const todoList = document.getElementById('todoList');

//make one global variable
let editTodo = null;

//functionality in add button
const addTodo = ()=>{
    const inputText = inputBox.value.trim();
    if(inputText.length <= 0){
        alert("You must write something in your to do")
        return false; // you wite anything but not enter empty string
    }

    if(addBtn.value === "Edit"){
        editTodo.target.previousElementSibling.innerHTML = inputText;
        addBtn.value = "Add";
        inputBox.value = "";
    }
    else{

    //create p tag in li and put input value
    // it is called dom manupulation
    //appendChild means we want to add in creted element
    const li = document.createElement("li");
    const p =document.createElement("p");
    p.innerHTML = inputText;
    li.appendChild(p);
    todoList.appendChild(li);
    // after we want to black input box
    inputBox.value = "";
        

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


// add functionality in edit  and delete button 
const updateTodo = (e)=>{  
    // for remove/delete 
    //console.log(e.target.innerHTML);// print inner value when we click on button
    if(e.target.innerHTML === "Remove"){
        //console.log(e.target.parentElement);
        todoList.removeChild(e.target.parentElement);//remove entered value
    }

    // for edit 
    if(e.target.innerHTML === "Edit"){
        inputBox.value = e.target.previousElementSibling.innerHTML;
        inputBox.focus();
        addBtn.value = "Edit";//convert add btn into edit btn
        editTodo = e;
    }
}


addBtn.addEventListener('click', addTodo);//run when click on add
todoList.addEventListener('click', updateTodo)// run when click on edit delete
