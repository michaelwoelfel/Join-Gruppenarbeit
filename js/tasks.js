// Tasks rendern

let tasks = [];




async function addTask() {
    await loadTasks();
    taskName = document.getElementById('add_task_title').value;
    let taskSubtask = document.getElementById('add_task_input_subtask').value;
    let taskDescription = document.getElementById('add_task_description').value;
    let taskCategory = document.getElementById('add_task_category_select').value;
    let taskAssign = document.getElementById('add_task_assign_select').value;
    let taskDate = document.getElementById('add_task_input_date').value;
    let taskPrio = getTaskPrio();
    // NEW 4D+D
    let taskStatus = 'todo';


    tasks.push({
        name: taskName,
        subtask: taskSubtask,
        tasktext: taskDescription,
        category: taskCategory,
        user: taskAssign,
        date: taskDate,
        priority: taskPrio,

        // NEW 4D+D
        status: taskStatus,


    });
    await setItem('tasks', JSON.stringify(tasks));
};

function clearTask() {
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
    if (prio === 'medium') {
        taskPrio = `assets/img/priomedium.png`;
    }
    if (prio === 'low') {
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



// NEW 4 D+D
let currentDraggedElement;

function updateHTML() {
    let toDo = tasks.filter(t => t['status'] == 'todo');
    document.getElementById('todo').innerHTML = '';


    for (let index = 0; index < toDo.length; index++) {
        const task = toDo[index];
        document.getElementById('todo').innerHTML += /*html*/ `
        <div draggable="true" ondragstart="startDragging(${index})"  onclick="openTask(${index})" class="content" id="task${index}">
            <div class="taskheader">${task['category']}</div>
            <div class="taskdescription"><b>${task['subtask']}</b></div>
            <div class="tasktext">${task['tasktext']}</div>
            <div class="progresscontainer">
                <div class="taskprogressbar"></div>
                <div class="taskprogress">1/2 Done</div>
            </div>
            <div class="taskfooter">${task['user']}
                <div class="priority"><img src="${task['priority']}"></div>
            </div>
        </div>`;
    }


    let inprogress = tasks.filter(t => t['status'] == 'inprogress');
    document.getElementById('inprogress').innerHTML = '';


    for (let index = 0; index < inprogress.length; index++) {
        const task = inprogress[index];
        document.getElementById('inprogress').innerHTML += /*html*/ `
        <div draggable="true" ondragstart="startDragging(${index})" onclick="openTask(${index})" class="content" id="task${index}">
            <div class="taskheader">${task['category']}</div>
            <div class="taskdescription"><b>${task['subtask']}</b></div>
            <div class="tasktext">${task['tasktext']}</div>
            <div class="progresscontainer">
                <div class="taskprogressbar"></div>
                <div class="taskprogress">1/2 Done</div>
            </div>
            <div class="taskfooter">${task['user']}
                <div class="priority"><img src="${task['priority']}"></div>
            </div>
        </div>`;
    }

}

function allowDrop(ev) {
    ev.preventDefault();
}

function moveTo(category) {
    tasks[currentDraggedElement]['status'] = category;
    updateHTML();
}

function startDragging(id) {
    currentDraggedElement = id;
}
















async function renderTasks() {
    document.getElementById('todo').innerHTML = '';
    await loadTasks();
    for (let i = 0; i < tasks.length; i++) {
        const task = tasks[i];
        document.getElementById('todo').innerHTML += `<div onclick="openTask(${i})" class="content id="task${i}">
        <div class="taskheader">${task['category']}</div>
        <div class="taskdescription"><b>${task['subtask']}</b></div>
        <div class="tasktext">${task['tasktext']}</div>
        <div class="progresscontainer"><div class="taskprogressbar"></div> <div class="taskprogress">1/2 Done</div></div>
        <div class="taskfooter">${task['user']}<div class="priority"><img src="${task['priority']}"></div></div></div>
    </div>`;
    updateHTML();
    }
}


async function openTask(i) {

    document.getElementById('showtask').classList.remove('d-none');

    const task = tasks[i];
    document.getElementById('showtask').innerHTML = `<div class="bigtask" id="task${i}">
        <div class="taskheader">${task['category']}</div>
        <div class="taskdescription"><b>${task['subtask']}</b></div>
        <div class="tasktext">${task['tasktext']}</div>
        <div class="progresscontainer"><div class="taskprogressbar"></div> <div class="taskprogress">1/2 Done</div></div>
        <div class="taskfooter">${task['user']}<div class="priority"><img src="${task['priority']}"><div onclick = closeTask()>XXXX</div></div></div></div>
    </div>` ;

}

function closeTask() {
    document.getElementById('taskcontainer').classList.remove('d-none');
    document.getElementById('showtask').classList.add('d-none');
}

// Tasks rendern


// DRAG AND DROP



