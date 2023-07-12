// Tasks rendern

let tasks = [];




async function addTask() {
    taskName = document.getElementById('add_task_title').value;
    let taskSubtask = document.getElementById('add_task_input_subtask').value;
    let taskDescription = document.getElementById('add_task_description').value;
    let taskCategory = document.getElementById('add_task_category_select').value;
    let taskAssign = document.getElementById('add_task_assign_select').value;
    let taskDate = document.getElementById('add_task_input_date').value;
    let taskPrio =  getTaskPrio();
   

    tasks.push({
        name: taskName,
        subtask: taskSubtask,
        tasktext: taskDescription,
        category: taskCategory,
        user: taskAssign,
        date: taskDate,
        priority: taskPrio,
        

    });
    await setItem('tasks', JSON.stringify(tasks));
};

function clearTask(){
 document.getElementById('add_task_title').innerHTML = '';
 document.getElementById('add_task_input_subtask').value;
  document.getElementById('add_task_description').value;
 document.getElementById('add_task_category_select').value;
 document.getElementById('add_task_assign_select').value;
document.getElementById('add_task_input_date').value;


}

function getTaskPrio(prio) {
    if (prio === 'urgent') {
        taskPrio = `assets/img/priohigh.png`;
    }
    if (prio ===  'medium') {
        taskPrio = `assets/img/priomedium.png`;
    }
    if (prio ===  'low') {
        taskPrio = `assets/img/priolow.png`;
    }
   return taskPrio;
}





async function loadTasks() {
    try {
        tasks = JSON.parse(await getItem('tasks'));
    } catch (e) {
        console.error('Loading error:', e);
        
    }
}




async function renderTasks() {
    await loadTasks();
    for (let i = 0; i < tasks.length; i++) {
        const task = tasks[i];
        document.getElementById('todo').innerHTML += `<div class="content">
        <div class="taskheader">${task['name']}</div>
        <div class="taskdescription"><b>${task['subtask']}</b></div>
        <div class="tasktext">${task['tasktext']}</div>
        <div class="progresscontainer"><div class="taskprogressbar"></div> <div class="taskprogress">1/2 Done</div></div>
        <div class="taskfooter">${task['user']} ${task['date']}</div><div class="priority"><img src="${task['priority']}"></div></div>
    </div>`;

    }
}

// Tasks rendern