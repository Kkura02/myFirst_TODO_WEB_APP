const todosUl = document.querySelector('.todos');
const todoTitle = document.querySelector('#todoTitle');
const todoDesc = document.querySelector('#todoDesc');
const saveBtn = document.querySelector('#addTodo');

//Banner Use
let todoColor1; //global variable for color gradient 1
let todoColor2; //global variable for color gradient 1

//Banner Use
//function for the color option button in the addTodomodal
function getColor(color1,color2){
    todoColor1 = color1;
    todoColor2 = color2;
    document.getElementById("colorIcon").style.background = "linear-gradient(90deg, "+color1.toLocaleString()+", "+color2.toLocaleString()+")";
    console.log(todoColor1,todoColor2)
    
    return {todoColor1,todoColor2};
}
//Banner Use
//object variable that does the fetching of the todo array.
const getTodos = () => {
    let todos;//the array, this is our local database
    if(localStorage.getItem('todos') === null){
        todos = [];
    }else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    return todos;
}

//Banner Use
//object variable model that does the saving of the data to the todo array.
const saveTodos = (TodoTitle,TodoDesc,TodoColor1,TodoColor2) => {
    const todos = getTodos();
    todos.push([TodoTitle,TodoDesc,TodoColor1,TodoColor2]);
    localStorage.setItem('todos', JSON.stringify(todos));
}

//Banner Use
//object variable that does the adding of the Todos data to the todos array thru saveTodos().
const addTodos = () => {

    saveTodos(todoTitle.value,todoDesc.value,todoColor1,todoColor2);//passes the files to the saveTodos object variable to perform the saving of the data to the todos array.

    //reset the values of the TODO title and desc input
    todoTitle.value = '';
    todoDesc.value = '';
}

function saveTODO(){

    addTodos();//calls the object addTodos to perform the saving of data to todos array when saveTODO function is called.

    //a delayed function at 0.5 second: to hide the addTodoModal, and refreshes the page so the new todo will show up.
    setTimeout(function(){
        document.getElementById("addmodal").style.display = "none";
        location.reload();
    },500);
}

//function in the + button at header to show the addModal
function showAddTodo(){
    document.getElementById("addmodal").style.display = "flex";
}

//function in the addModal cancel btn to hide the addModal
function hideAddTodo(){
    document.getElementById("addmodal").style.display = "none";
    document.querySelector('#todoTitle').value = "";
    document.querySelector('#todoDesc').value = "";
}

//function called on body onload to display the Todo Lists on the main tag
function displayTODOlist(){

    //the array looks like -  [["title","desc","color1","color2"],["title","desc","color1","color2"]]
    let listtodo = getTodos(); //passing the array getTodos() to the new variable listtodo

    //if the todos array is empty show the div that shows "No TODO List"
    if(listtodo.length == 0){ 
        document.querySelector("#yesTodos").classList.add("hidden")
        document.querySelector("#noTodos").classList.remove("hidden")
    }
    //if the todos array is not empty show the div that shows the TODO List"
    else if(listtodo.length > 0){
        document.querySelector("#noTodos").classList.add("hidden")
        document.querySelector("#yesTodos").classList.remove("hidden")

       //Loop that calls all data into the card
        for (var i = 0; i < listtodo.length; i++){
            let title = listtodo[i][0];//contains the data
            let desc = listtodo[i][1];//contains the desc
            let color1 = listtodo[i][2];//contains the color 1
            let color2 = listtodo[i][3];//contains the color 2
            document.getElementById("yesTodos").innerHTML += "<li class='flex-auto'><div onclick='todocardtoggle("+i+")' id='chkX"+i+"' class='relative rounded-md cursor-pointer shadow-md p-4 flex flex-col justify-around items-start' style='background: linear-gradient(90deg,"+color1+","+color2+");'><button id='delbtn"+i+"' onclick='removeTODO("+i+")' class='absolute hidden top-0 right-0 px-2 py-0 hover:bg-red-500 rounded-full'><i class='fa-solid fa-xmark'></i></button><b class='text-xl font-bold'>"+title+"</b><p class='text-base italic'>"+desc+"</p></div></li>";

            
        }
    }
}

//for clearing all data in the localstorage then refrehses the page.
function clearAll(){
    todos = []
    localStorage.setItem('todos',JSON.stringify(todos));
    location.reload();
}

function todocardtoggle(cnt){
    var div = document.getElementById("chkX"+cnt);
    var btn = document.getElementById("delbtn"+cnt);
    if (btn.style.display === "none"){
        btn.style.display = "block";
        div.classList.add("border-2");
        div.classList.add("border-black");

      } else{
        btn.style.display = "none";
        div.classList.remove("border-2");
        div.classList.remove("border-black");
      }
}

const deleteTodos = (todos, cnt) => {
    todos.splice(cnt, 1); //(index, deletecount)
    localStorage.setItem('todos', JSON.stringify(todos));
}

function removeTODO(ind){
    let todos = getTodos();
    deleteTodos(todos,ind);
    location.reload();
}