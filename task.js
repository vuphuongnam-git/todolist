let btnAddTask = document.querySelector('button')
let taskName = document.querySelector('#content')


let tasks = getTaskFromLocalStorage()

renderTasks(tasks)

btnAddTask.addEventListener('click', function() {
    if(!taskName.value){
        alert("please add your work!")
        return false
    }

    let taskId = this.getAttribute('id')
    let tasks = getTaskFromLocalStorage()
    let task = {name: taskName.value}

    if(taskId == 0 || taskId){
        tasks[taskId] = task
        this.removeAttribute('id')
    }else{
        tasks.push(task)
    }
    
    taskName.value=''

    localStorage.setItem('tasks', JSON.stringify(tasks))

    renderTasks(tasks)
})
function editTask(id){
    let tasks = getTaskFromLocalStorage()

    if(tasks.length > 0){
        taskName.value = tasks[id].name
        btnAddTask.setAttribute('id', id)
    }
}

function deleteTask(id){
    if (confirm('Are U sure?')){
       let tasks = getTaskFromLocalStorage()
       tasks.splice(id, 1)
       localStorage.setItem('tasks', JSON.stringify(tasks))
       renderTasks(getTaskFromLocalStorage())
    }
}

function renderTasks(tasks = []){
    let content = '<ul>'

    tasks.forEach((task, index) => {
        content +=`<li>
            <div class="task-name">${task.name}</div>
            <a href="#" onclick="editTask(${index})">Edit</a>
            <a href="#" onclick="deleteTask(${index})">X</a>
        </li>`
    })

    content +='</ul>'

    document.querySelector('#result').innerHTML = content
}

function getTaskFromLocalStorage() {
    return localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : []
}