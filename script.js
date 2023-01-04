const todosUl = document.querySelector('.todos');
const todoTitle = document.querySelector('#todoTitle');
const todoDesc = document.querySelector('#todoDesc');
const saveBtn = document.querySelector('#addTodo');

const todolist = [];
const storedTodolist = JSON.parse(localStorage.getItem("todolist")); 

function saveTODO(){
    const todoTitled = document.querySelector('#todoTitle').value.toLocaleString();
    const todoDescd = document.querySelector('#todoDesc').value.toLocaleString();

    todolist.push({todoTitled,todoDescd});
    // todolist.push({desc:todoDescd});
    localStorage.setItem("todolist", JSON.stringify(todolist));
    
    console.log(todolist);

    setTimeout(function(){
        document.getElementById("addmodal").style.display = "none";
        document.querySelector('#todoTitle').value = "";
        document.querySelector('#todoDesc').value = "";
    },1000);
    
    // localStorage.setItem("todoTitle",todoTitled);
    // localStorage.setItem("todoDesc",todoDescd);

    // console.log(localStorage.length)
    // localStorage.setItem('todoTitle', 'todoDesc'); 
}
function showAddTodo(){
    document.getElementById("addmodal").style.display = "flex";
}
function hideAddTodo(){
    document.getElementById("addmodal").style.display = "none";
    document.querySelector('#todoTitle').value = "";
    document.querySelector('#todoDesc').value = "";
}
// function showlocalstorage(){
//     for (var i = 0; i < localStorage.length; i++){
//         console.log(localStorage.getItem(localStorage.key(i)));
//     }
// }


function displayTODOlist(){
    let todos;
    if(localStorage.length == 0){
        document.querySelector("#yesTodos").classList.add("hidden")
        document.querySelector("#noTodos").classList.remove("hidden")
    }
    else if(localStorage.length > 0){
        document.querySelector("#noTodos").classList.add("hidden")
        document.querySelector("#yesTodos").classList.remove("hidden")

       

        // for (var i = 0; i < localStorage.length; i++){
        //     console.log(localStorage.getItem(localStorage.key(i)));
        // }
    }
}