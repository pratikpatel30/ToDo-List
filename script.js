const inputBox = document.getElementById('inputBox');
const addBtn = document.getElementById('addBtn');
const todoList = document.getElementById('todoList');


const addTodo = ()=>{
    const inputText = inputBox.value.trim();
    if(inputText.length <= 0){
        alert("You must write something in your to do")
        return false; // you wite anything but not enter empty string
    }
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

    //Create delete button
      const deleteBtn = document.createElement("button");
      deleteBtn.innerText = "Remove";
      li.appendChild(deleteBtn);

    //create edit button
    const editBtn = document.createElement("button");
    editBtn.innerText = "Edit";
    li.appendChild(editBtn);

}
addBtn.addEventListener('click', addTodo);
