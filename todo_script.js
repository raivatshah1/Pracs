//ADD NEW ITEM IN LIST
var adds = document.getElementById("add-button");
adds.addEventListener("click", add_item)

function add_item(event) {
    event.preventDefault()
    var itemText = todoBox.value;
    newItem(itemText, false);
}

var todoList = document.getElementById("todo-list");
var todoBox = document.getElementById("todo-entry-box");

function newItem(itemText, completed) {
    var todoItem = document.createElement("li");
    var todoText = document.createTextNode(itemText);
    todoItem.appendChild(todoText);

    if (completed) {
        todoItem.classList.add("completed");
    }
    todoList.appendChild(todoItem);

    todoItem.addEventListener("dblclick", toggleState);
}

//CLEAR COMPLETED LIST ITEMS
var clr = document.getElementById("clear-completed-button");
clr.addEventListener("click", clearCompleted);

function clearCompleted() {
    var completedItems = todoList.getElementsByClassName("completed");
    while (completedItems.length > 0) {
        completedItems.item(0).remove();
    }
}

//EMPTY THE ENTIRE LIST
var emp = document.getElementById("empty-button");
emp.addEventListener("click", emptyList);

function emptyList() {
    var todoItems = todoList.children;
    while (todoItems.length > 0) {
        todoItems.item(0).remove();
    }
}

// TOGGLE STATE OF LIST ITEM
function toggleState() {
    if (this.classList.contains("completed")) {
        this.classList.remove("completed");
    } else {
        this.classList.add("completed");
    }
}

// SAVING LIST
var saveButton = document.getElementById("save-button");
saveButton.addEventListener("click", saveList);

function saveList() {
    var toDos = [];

    for (var i = 0; i < todoList.children.length; i++) {
        var toDo = todoList.children.item(i);

        var toDoInfo = {
            "task": toDo.innerText,
            "completed": toDo.classList.contains("completed")
        };

        toDos.push(toDoInfo);
    }
    localStorage.setItem("toDos", JSON.stringify(toDos));
}

function loadList() {
    if (localStorage.getItem("toDos") != null) {
        var toDos = JSON.parse(localStorage.getItem("toDos"));

        for (var i = 0; i < toDos.length; i++) {
            var toDo = toDos[i];
            newToDoItem(toDo.task, toDo.completed);
        }
    }
    else{
        newToDoItem("My", false);
        newToDoItem("to-do", true);
        newToDoItem("list", false);
    }
}

