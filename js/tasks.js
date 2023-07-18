let tasks = [];
let taskIdCounter = 0;
let currentDraggedElement;

/**
 * Checks and updates the task ID based on the existing tasks.
 */
async function checkLastTaskId() {
    await loadTasks();
    if (tasks.length > 0) {
        const maxId = Math.max(...tasks.map(task => task.id));
        taskIdCounter = maxId + 1;
    }
}

/**
 * Adds a new task and stores it in the 'tasks' variable.
 * @returns {Promise<void>}
 */
async function addTask() {
    await checkLastTaskId();
    taskName = document.getElementById('add_task_title').value;
    let taskSubtask = document.getElementById('add_task_input_subtask').value;
    let taskDescription = document.getElementById('add_task_description').value;
    let taskCategory = document.getElementById('add_task_category_select').value;
    let taskAssign = document.getElementById('add_task_assign_select').value;
    let taskDate = document.getElementById('add_task_input_date').value;
    let taskPrio = getTaskPrio();
    let taskStatus = 'todo';
    let taskId = taskIdCounter++;
    tasks.push({
        id: taskId,
        name: taskName,
        subtask: taskSubtask,
        tasktext: taskDescription,
        category: taskCategory,
        user: taskAssign,
        date: taskDate,
        priority: taskPrio,
        status: taskStatus,
    });
    await setItem('tasks', JSON.stringify(tasks));
    taskAddedToBoard();
    // Displays the animation in add Task
};

/**
 * Modifies an existing task.
 * @param {number} i - The index of the task to be changed in the 'tasks' list.
 * @returns {Promise<void>}
 */
async function changeTask(i) {
    let task = tasks[i];
    let taskId = task.id;
    let taskName = document.getElementById('add_task_title').value;
    let taskSubtask = document.getElementById('add_task_input_subtask').value;
    let taskDescription = document.getElementById('add_task_description').value;
    let taskCategory = document.getElementById('add_task_category_select').value;
    let taskAssign = document.getElementById('add_task_assign_select').value;
    let taskDate = document.getElementById('add_task_input_date').value;
    let taskPrio = getTaskPrio();
    let taskStatus = task.status;
    task.id = taskId;
    task.name = taskName;
    task.subtask = taskSubtask;
    task.tasktext = taskDescription;
    task.category = taskCategory;
    task.user = taskAssign;
    task.date = taskDate;
    task.priority = taskPrio;
    task.status = taskStatus;
    await setItem('tasks', JSON.stringify(tasks));
    taskAddedToBoard();
    // Displays the animation in add Task
};

/**
 * Prepares the user interface to edit an existing task.
 * @param {number} i - The index of the task to be edited in the 'tasks' list.
 */
async function editTask(i) {
    let task = tasks[i];
    closeTask();
    addTaskPopUp();
    let taskprio = task['priority'];
    getTaskPrio(taskprio);
    document.getElementById('add_task_title').value = task.name;
    document.getElementById('add_task_input_subtask').value = task.subtask;
    document.getElementById('add_task_description').value = task.tasktext;
    document.getElementById('add_task_category_select').value = task.category;
    document.getElementById('add_task_assign_select').value = task.user;
    document.getElementById('add_task_input_date').value = task.date;
    taskStatus = task.status;
    taskId = task.id;
    document.getElementById('buttonedit').classList.add('d-none');
    document.getElementById('buttonafteredit').innerHTML = `<div id="buttonaftereditd-none"  class="create-btn btn d-none" onclick="changeTask(${i})">Change Task <img src="./assets/img/add_task_check.png" alt="cancel"></div>`;
    document.getElementById('buttonaftereditd-none').classList.remove('d-none');
};

/**
 * Removes all inputs in the task form.
 */
function clearTask() {
    document.getElementById('add_task_title').value = '';
    document.getElementById('add_task_input_subtask').value = '';
    document.getElementById('add_task_description').value = '';
    document.getElementById('add_task_category_select').value = '';
    document.getElementById('add_task_assign_select').value = '';
    document.getElementById('add_task_input_date').value = '';
}

/**
 * Returns the priority of the task based on the provided string.
 * @param {string} prio - The priority value as a string ('urgent', 'medium', 'low').
 */
function getTaskPrio(prio) {
    if (prio === 'urgent' || prio === `assets/img/priohigh.png`) {
        taskPrio = `assets/img/priohigh.png`;
        prioColorRed();
        
    }
    if (prio === 'medium' || prio === `assets/img/priomedium.png`) {
        taskPrio = `assets/img/priomedium.png`;
        prioColorOrange();
    }
    if (prio === 'low' || prio === `assets/img/priolow.png`) {
        taskPrio = `assets/img/priolow.png`;
        prioColorGreen();
    }
    return taskPrio;
}

/**
 * Loads the existing tasks.
 * @returns {Promise<void>}
 */
async function loadTasks() {
    try {
        const loadedTasks = JSON.parse(await getItem('tasks'));
        if (Array.isArray(loadedTasks)) {
            tasks = loadedTasks;
        } else if (typeof loadedTasks === 'object' && loadedTasks !== null) {
            tasks = Object.values(loadedTasks);
        } else {
            console.error('Loaded tasks are not an array:', loadedTasks);
        }
    } catch (e) {
        console.error('Loading error:', e);
    }
}

/**
 * Calls the 'loadTasks()' function and updates the HTML.
 * @returns {Promise<void>}
 */
async function renderTasks() {
    await loadTasks();
    updateHTML();
}

/**
 * Updates the HTML to display the tasks in the respective status columns.
 */
function updateHTML() {
    renderToDo();
    renderInProgress();
    renderAwaitFb();
    renderDone();
}

/**
 * Updates the HTML representation of the 'to-do' tasks.
 */
function renderToDo() {
    let toDo = tasks.filter(t => t['status'] == 'todo');
    document.getElementById('todo').innerHTML = '';
    for (let index = 0; index < toDo.length; index++) {
        const task = toDo[index];
        document.getElementById('todo').innerHTML += taskTemplate(task);
    }
}

/**
 * Changes the color of the priority symbol to red.
 */
function prioColorRed() {
    let urgent = document.getElementById('prio_urgent');
    let medium = document.getElementById('prio_medium');
    let low = document.getElementById('prio_low');
    urgent.classList.toggle('prio-btn-urgent-clicked');
    medium.classList.remove('prio-btn-medium-clicked');
    low.classList.remove('prio-btn-low-clicked');

}



/**
 * Changes the color of the priority symbol to orange.
 */
function prioColorOrange() {
    let urgent = document.getElementById('prio_urgent');
    let medium = document.getElementById('prio_medium');
    let low = document.getElementById('prio_low');
    urgent.classList.remove('prio-btn-urgent-clicked');
    medium.classList.toggle('prio-btn-medium-clicked');
    low.classList.remove('prio-btn-low-clicked');
}

/**
 * Changes the color of the priority symbol to green.
 */
function prioColorGreen() {
    let urgent = document.getElementById('prio_urgent');
    let medium = document.getElementById('prio_medium');
    let low = document.getElementById('prio_low');
    urgent.classList.remove('prio-btn-urgent-clicked');
    medium.classList.remove('prio-btn-medium-clicked');
    low.classList.toggle('prio-btn-low-clicked');
}

/**
 * Updates the HTML representation of the 'in-progress' tasks.
 */
function renderInProgress() {
    let inprogress = tasks.filter(t => t['status'] == 'inprogress');
    document.getElementById('inprogress').innerHTML = '';
    for (let index = 0; index < inprogress.length; index++) {
        const task = inprogress[index];
        document.getElementById('inprogress').innerHTML += taskTemplate(task);
    }
}

/**
 * Updates the HTML representation of the 'awaitingfb' tasks.
 */
function renderAwaitFb() {
    let awaitingfb = tasks.filter(t => t['status'] == 'awaitingfb');
    document.getElementById('awaitingfb').innerHTML = '';
    for (let index = 0; index < awaitingfb.length; index++) {
        const task = awaitingfb[index];
        document.getElementById('awaitingfb').innerHTML += taskTemplate(task);
    }
}

/**
 * Updates the HTML representation of the 'done' tasks.
 */
function renderDone() {
    let done = tasks.filter(t => t['status'] == 'done');
    document.getElementById('done').innerHTML = '';
    for (let index = 0; index < done.length; index++) {
        const task = done[index];
        document.getElementById('done').innerHTML += taskTemplate(task);
    }
}

/**
 * Generates and returns the HTML template for a task.
 * @param {object} task - The task object to be rendered.
 * @returns {string} - The HTML template as a string.
 */
let taskTemplate = (task) => /*html*/ `
    <div draggable="true" ondragstart="startDragging(${task['id']})" onclick="openTask(${task['id']})" class="content">
        <div class="category">${task['category']}</div>
        <div class="taskdescription"><b>${task['subtask']}</b></div>
        <div class="tasktext">${task['tasktext']}</div>
        <div class="progresscontainer">
            <div class="taskprogressbar"></div>
            <div class="taskprogress">1/2 Done</div>
        </div>
        <div class="taskfooter">${task['user']}
            <div class="priority"><img src="${task['priority']}"></div>
        </div>
    </div>
`;

// GENERAL FUNCTIONS ....
/**
 * Allows for dropping an element.
 * @param {Event} ev - The drop event.
 */
function allowDrop(ev) {
    ev.preventDefault();
}

/**
 * Assigns a new status to the task depending on where it is moved.
 */
function moveTo(category) {
    tasks[currentDraggedElement]['status'] = category;
    updateHTML();
    updateTaskStatus(currentDraggedElement, category);
}

/**
 * Updates the status of a task when it's moved between categories.
 * @param {number} taskIndex - The index of the task in the 'tasks' list.
 * @param {string} newStatus - The new status of the task.
 */
function updateTaskStatus(taskIndex, newStatus) {
    tasks[taskIndex]['status'] = newStatus;
    setItem('tasks', JSON.stringify(tasks));
}

/**
 * Starts the dragging of an element.
 * @param {number} index - The index of the element to be dragged.
 */
function startDragging(index) {
    console.log(index);
    currentDraggedElement = index;
}

/**
 * Opens the detailed view of a specific task.
 * @param {number} i - The ID of the task to open.
 * @returns {Promise<void>}
 */
async function openTask(i) {
    // Removes the 'd-none' class to make the task details visible
    document.getElementById('showtask').classList.remove('d-none');

    // Finds the index of the task with the given ID
    let index = tasks.findIndex(task => task.id === i);

    // Retrieves the task with the found index
    let task = tasks[index];

    // Inserts the task details into the HTML
    document.getElementById('showtask').innerHTML =  /*html*/   `
    <div class="bigtask" id="task${index}">
    <div class="taskheader"><div class="category">${task['category']}</div><div onclick = closeTask()><img id="closeimg" src="/assets/img/close.png"></div></div>
    <div class="taskdescriptionbig"><b>${task['subtask']}</b></div>
    <div class="tasktext">${task['tasktext']}</div>
    <div class="datecontainer"><span><b>Due date:</b></span> <div class="date">${task['date']}</div></div>
    <div class="prioritycontainer"><span ><b>Priority:</b></span><div id="colorpriobigtask" class="prioritybigtask"><span id="priobigtask"></span><div id="urgencyimg"></div></div></div>
    <div class="bigtaskusers">
        <span><b>Assigned To:</b></span>
    <div class="users">${task['user']}</div></div>
    <div class="buttoncontainer"><img id="deleteimg" onclick="deleteTask(${index})" src="/assets/img/delete.png"><img id="editimg" onclick="editTask(${i})" src="/assets/img/edit.png"></div>
</div>` ;

    // Calls a function to display the task's priority level
    colorUrgency(index);
}

/**
 * Closes the detailed view of a task.
 */
function closeTask() {
    // Adds the 'd-none' class to hide the task details and removes it from the task container to make the tasks visible again
    document.getElementById('taskcontainer').classList.remove('d-none');
    document.getElementById('showtask').classList.add('d-none');
}

// Coloring the urgency level in the detailed view
function colorUrgency(index) {
    // Retrieves the task and its priority level
    task = tasks[index]
    prio = task['priority'];

    // Changes the display depending on the priority level
    if (prio === 'assets/img/priohigh.png') {
        document.getElementById('colorpriobigtask').classList.add('urgent');
        document.getElementById('priobigtask').innerHTML = `Urgent`;
        document.getElementById('urgencyimg').innerHTML = `<img src="assets/img/prio.png">`;
    }
    if (prio === 'assets/img/priomedium.png') {
        document.getElementById('colorpriobigtask').classList.add('medium');
        document.getElementById('priobigtask').innerHTML = `Medium`;
        document.getElementById('urgencyimg').innerHTML = `=`;
    }
    if (prio === 'assets/img/priolow.png') {
        document.getElementById('colorpriobigtask').classList.add('low');
        document.getElementById('priobigtask').innerHTML = `Low`;
        document.getElementById('urgencyimg').innerHTML = `<img src="assets/img/priolowwhite.png">`;
    }
}

/**
 * Deletes a specific task and updates the view.
 * @param {number} i - The index of the task to be deleted in the 'tasks' list.
 * @returns {Promise<void>}
 */
async function deleteTask(i) {
    // Removes the task from the array
    tasks.splice(i, 1);

    // Updates the stored tasks and the displayed tasks
    await setItem('tasks', JSON.stringify(tasks));
    await renderTasks();

    // Closes the task details
    closeTask();
}

// Animates the addition of a task to the board
function taskAddedToBoard() {
    // Adds the 'show' class to animate the container
    const container = document.querySelector('.addedTaskToBoard_content');
    container.classList.add('show');

    // Removes the 'show' class after 3 seconds to end the animation
    setTimeout(() => {
        container.classList.remove('show');
    }, 3000);
}

// Updates the summary page
async function updateSummary() {
    await loadTasks();
    updateTaskCount();
    updateTasksToDo();
    updateTasksDone();
    updateTasksInProgress();
    updateTasksAwaitingFB();
    updateTasksUrgent();
    updateUrgentDate();
}

// Updates the count of tasks with status "todo"
async function updateTasksToDo() {
    await loadTasks(); // Fetch tasks
    const tasksToDo = tasks.filter((task) => task.status === 'todo'); // Filter tasks with status "todo"
    const tasksToDoCount = tasksToDo.length; // Get the count
    const tasksToDoNumberElement = document.getElementById('toDoNumber'); // Get the HTML element
    if (tasksToDoNumberElement) {
        tasksToDoNumberElement.textContent = tasksToDoCount.toString(); // Update the count in HTML
    }
}

// Updates the count of tasks with status "done"
async function updateTasksDone() {
    await loadTasks(); // Fetch tasks
    const tasksDone = tasks.filter((task) => task.status === 'done'); // Filter tasks with status "done"
    const tasksDoneCount = tasksDone.length; // Get the count
    const tasksDoneNumberElement = document.getElementById('doneNumber'); // Get the HTML element
    if (tasksDoneNumberElement) {
        tasksDoneNumberElement.textContent = tasksDoneCount.toString(); // Update the count in HTML
    }
}

// Updates the count of tasks with status "inprogress"
async function updateTasksInProgress() {
    await loadTasks(); // Fetch tasks
    const tasksInProgress = tasks.filter((task) => task.status === 'inprogress'); // Filter tasks with status "inprogress"
    const tasksInProgressCount = tasksInProgress.length; // Get the count
    const tasksInProgressNumberElement = document.getElementById('tasksInProgressNumber'); // Get the HTML element
    if (tasksInProgressNumberElement) {
        tasksInProgressNumberElement.textContent = tasksInProgressCount.toString(); // Update the count in HTML
    }
}

// Updates the count of tasks with status "awaitingfb"
async function updateTasksAwaitingFB() {
    await loadTasks(); // Fetch tasks
    const tasksAwaitingFB = tasks.filter((task) => task.status === 'awaitingfb'); // Filter tasks with status "awaitingfb"
    const tasksAwaitingFBCount = tasksAwaitingFB.length; // Get the count
    const tasksAwaitingFBNumberElement = document.getElementById('awaitFbNumber'); // Get the HTML element
    if (tasksAwaitingFBNumberElement) {
        tasksAwaitingFBNumberElement.textContent = tasksAwaitingFBCount.toString(); // Update the count in HTML
    }
}

// Updates the count of urgent tasks
async function updateTasksUrgent() {
    await loadTasks(); // Fetch tasks
    const tasksUrgent = tasks.filter((task) => task.priority === 'assets/img/priohigh.png'); // Filter urgent tasks
    const tasksUrgentCount = tasksUrgent.length; // Get the count
    const tasksUrgentNumberElement = document.getElementById('urgentNumber'); // Get the HTML element
    if (tasksUrgentNumberElement) {
        tasksUrgentNumberElement.textContent = tasksUrgentCount.toString(); // Update the count in HTML
    }
}

// Updates the closest date for urgent tasks
function updateUrgentDate() {
    const urgentDateElement = document.getElementById('urgentDate'); // Get the HTML element
    const closestDate = findClosestDate(); // Find the closest date
    if (closestDate) {
        urgentDateElement.textContent = closestDate; // If there's a closest date, update the HTML
    } else {
        urgentDateElement.textContent = 'No urgent tasks'; // If no closest date, display "No urgent tasks"
    }
}

// Finds the closest date from the list of tasks
function findClosestDate() {
    if (tasks.length > 0) { // If there are tasks
        let closestDate = null;
        for (let i = 0; i < tasks.length; i++) {
            if (tasks[i].priority === 'assets/img/priohigh.png' && (closestDate === null || tasks[i].date < closestDate)) { // If the task is urgent and the date is closer than the current closest date
                closestDate = tasks[i].date; // Update closest date
            }
        }
        return closestDate ? formatDate(closestDate) : null; // If there's a closest date, format and return it. If not, return null
    }
    return null; // If no tasks, return null
}

// Formats a date into the format "Month Day, Year"
function formatDate(date) {
    const options = { month: 'long', day: 'numeric', year: 'numeric' }; // Options for formatting
    return new Date(date).toLocaleDateString('en-US', options); // Format the date
}




