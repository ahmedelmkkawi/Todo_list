

var addBtn = document.getElementById('addBtn')

var TaskInput = document.getElementById('taskInput')
var todos = localStorage.getItem('allTodos') ? JSON.parse(localStorage.getItem('allTodos')) : [];
var mySelect = document.getElementById('mySelect');
var searchInput = document.getElementById('searchInput')


if(localStorage.getItem('allTodos') != null){
todos = JSON.parse(localStorage.getItem('allTodos'))
displayData(todos)
}


addBtn.onclick = addTodo

function addTodo(){
    var task={
        taskDetails:TaskInput.value,
        isCompleted:false,
        id:`${Math.random()*10000}-${Math.random()*10000}`

    }

    todos.push(task)
    clear()
    localStorage.setItem('allTodos',JSON.stringify(todos))
    displayData(todos)
}


function displayData(arr){
    var crtoona = ''
    for(var task of arr){
        crtoona += `
        <li class="py-4">
            <div class="flex items-center ps-4 border border-gray-200 rounded-sm dark:border-gray-700 mx-10 ${task.isCompleted ? 'bg-red-400' : 'bg-green-400'} ">
                <input ${task.isCompleted ? 'checked' : ''} onClick="beCompleted('${task.id}')" type="checkbox" class="w-4 h-4 text-[#71c55d] border-gray-300 rounded-full dark:bg-gray-700 dark:border-gray-600">
                <span class="${task.isCompleted ? 'line-through' : ''} w-full py-4 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">${task.taskDetails}</span>
                <button type="button" onClick="updateTask('${task.id}')" class="text-white bg-yellow-400 hover:bg-yellow-600  font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-yellow-400 dark:hover:bg-yellow-500 dark:focus:ring-yellow-700 transition-all duration-200">Update
                </button>
                <button onclick="deleteTask('${task.id}')" type="button" class="rounded-full  font-medium text-lg me-4 p-2 ">
                    <svg class="w-6 h-6 text-white hover:text-gray-700" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                        <path fill-rule="evenodd" d="M8.586 2.586A2 2 0 0 1 10 2h4a2 2 0 0 1 2 2v2h3a1 1 0 1 1 0 2v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V8a1 1 0 0 1 0-2h3V4a2 2 0 0 1 .586-1.414ZM10 6h4V4h-4v2Zm1 4a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Zm4 0a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Z" clip-rule="evenodd"/>
                    </svg>
                </button>
            </div>
        </li>`
    }
    document.getElementById('tasks').innerHTML = crtoona

}


function beCompleted(id) {
    console.log(id);
    var foundedIndex = todos.findIndex(function (task) {
        return task.id == id;
    });
    todos[foundedIndex].isCompleted = todos[foundedIndex].isCompleted == true ? false : true;
    localStorage.setItem("allTodos", JSON.stringify(todos));
    displayAccordingSelectValue();
}



mySelect.onchange = function(){
    displayAccordingSelectValue()
} 

function displayAccordingSelectValue(){
    var selectedValue = mySelect.options[mySelect.options.selectedIndex].value;
    switch(selectedValue){
        case  'All':
            displayData(todos);
            break;
        case 'Completed':
            var  completedTask = todos.filter(function(task){
                return task.isCompleted == true;
            })  
            displayData(completedTask);
            // localStorage.setItem('completedTask', JSON.stringify(selectedValue))
            break;
        case 'UnCompleted':
            var  UnCompletedTask = todos.filter(function(task){
                return task.isCompleted == false;
            })  
            displayData(UnCompletedTask);
            break;

    }
}


function deleteTask(id){
    var foundedIndex = todos.findIndex(function(task){
        return task.id == id
    })

    todos.splice(foundedIndex,1)
    displayData(todos)
    localStorage.setItem('allTodos',JSON.stringify(todos))

}



searchInput.oninput = function(e){
    // console.log(e.target.value)
    var searchArray = []

    for(i=0;i<todos.length;i++){
        if(todos[i].taskDetails.includes(e.target.value)){
            searchArray.push(todos[i])

        }
    }
    displayData(searchArray)
}


function updateTask(id) {
    var taskToUpdate = todos.find(function(task) {
        return task.id == id;
    });

    TaskInput.value = taskToUpdate.taskDetails;
    var addBtn = document.getElementById('addBtn');
    addBtn.innerHTML = 'Update';
    addBtn.onclick = function() {
        taskToUpdate.taskDetails = TaskInput.value;
        addBtn.innerHTML = 'Add';
        addBtn.onclick = addTodo;
        clear();
        localStorage.setItem('allTodos', JSON.stringify(todos));
        displayData(todos);
    };
}


function clear(){
    TaskInput.value = ''
}







var themeToggleDarkIcon = document.getElementById('theme-toggle-dark-icon');
var themeToggleLightIcon = document.getElementById('theme-toggle-light-icon');

// Change the icons inside the button based on previous settings
if (localStorage.getItem('color-theme') === 'dark' || (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    themeToggleLightIcon.classList.remove('hidden');
} else {
    themeToggleDarkIcon.classList.remove('hidden');
}

var themeToggleBtn = document.getElementById('theme-toggle');

themeToggleBtn.addEventListener('click', function() {

    // toggle icons inside button
    themeToggleDarkIcon.classList.toggle('hidden');
    themeToggleLightIcon.classList.toggle('hidden');

    // if set via local storage previously
    if (localStorage.getItem('color-theme')) {
        if (localStorage.getItem('color-theme') === 'light') {
            document.documentElement.classList.add('dark');
            localStorage.setItem('color-theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('color-theme', 'light');
        }

    // if NOT set via local storage previously
    } else {
        if (document.documentElement.classList.contains('dark')) {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('color-theme', 'light');
        } else {
            document.documentElement.classList.add('dark');
            localStorage.setItem('color-theme', 'dark');
        }
    }
    
});