async function taskTemplate(task) {
    return /*html*/ `
        <div draggable="true" ondragstart="startDragging(${task['id']})" onclick="handleTaskClick(${task['id']})"} class="content">
            <div style="background-color: ${task['categoryBackgroundColor']}" class="category">${task['category']}</div>
            <div class="taskdescription"><b>${task['name']}</b></div>
            <div class="subtaskdescription"><b>${task['subtask']}</b></div>
            <div class="tasktext">${task['tasktext']}</div>
            <div class="progresscontainer">
            
            <div class="taskfooter"><div class="usersintaks" id="usersintask${task['id']}"></div>
                <div class="priority">
                    <img src="${task['priority']}">
                </div>
            </div>
        </div>
    `;
}

async function taskUserTemplate(randomColor, firstLetter, secondLetter) {
    return /*html*/ `<div class="contact-container">
    <div class="imgcontainer" style="background-color: ${randomColor};">
        <span id="firstletter">${firstLetter}</span>
        <span id="secondletter">${secondLetter}</span>
    </div>
</div>`;

}


function createUserHTML(randomColor, firstLetter, secondLetter, nameParts) {
    return `
        <div class="imgcontainer" style="background-color: ${randomColor};">
            <span id="firstletter">${firstLetter}</span>
            <span id="secondletter">${secondLetter}</span>
        </div>
        <div class="name">${nameParts.join(' ')}</div>
    `;
}

async function generateTaskDetailsHTML(index) {
    // Retrieves the task with the given index
    let task = tasks[index];
    // Generate the HTML content for the task details
    return /*html*/ `
        <div class="bigtask" id="task${index}">
            <div class="taskheader">
                <div style="background-color: ${task['categoryBackgroundColor']}" class="category">${task['category']}</div>
                <div onclick="closeTask()"><img id="closeimg" src="assets/img/close.png"></div>
            </div>
            <div id="taskNameHeader" class="taskdescriptionbig"><b>${task['name']}</b></div>
            <div class="subtaskdescriptionbig"><b>${task['subtask']}</b></div>
            <div class="tasktext">${task['tasktext']}</div>
            <div class="datecontainer">
                <span><b>Due date:</b></span>
                <div class="date">${task['date']}</div>
            </div>
            <div class="prioritycontainer">
                <span><b>Priority:</b></span>
                <div id="colorpriobigtask" class="prioritybigtask">
                    <span id="priobigtask"></span>
                    <div id="urgencyimg"></div>
                </div>
            </div>
            <div class="bigtaskusers">
                <span><b>Assigned To:</b></span>
                <div id="usersInOpenTask${index}" class="users"></div>
            </div>
            <div class="buttoncontainer">
                <img id="deleteimg" onclick="deleteTask(${index})" src="assets/img/delete.png">
                <img id="editimg" onclick="editTask(${index})" src="assets/img/edit.png">
            </div>
        </div>
    `;
}

function editTaskResponsive(index) {
    let task = tasks[index];
    let modalContent = /*html*/ `
    <div id="editTaskModal" class="edit-task-popup">
        <div class="modal-content">
            <span class="edit-task-popup-header" id="taskNameHeader">${task['name']}</span>
            <div class="edit-task-popup-buttons">
            <span class="edit-task-popup-header-category">Change Status</span>
                <button class="edit-task-popup-button-style" onclick="editTaskStatus(${index}, 'todo')">To Do</button>
                <button class="edit-task-popup-button-style" onclick="editTaskStatus(${index}, 'inprogress')">In Progress</button>
                <button class="edit-task-popup-button-style" onclick="editTaskStatus(${index}, 'awaitingfb')">Awaiting Feedback</button>
                <button class="edit-task-popup-button-style" onclick="editTaskStatus(${index}, 'done')">Done</button>
                <span class="edit-task-popup-header-category">Task</span>
                <button class="edit-task-popup-button-style" onclick="openTask(${index})">Show Task</button>
                <button class="edit-task-popup-button-style" onclick="editTask(${index})">Edit Task</button>
                <button class="edit-task-popup-button-style" onclick="closeEditTaskModal(${index})">Back</button>
            </div>
        </div>
    </div>
`;
    document.getElementById('showtask').innerHTML = modalContent;
    document.getElementById('showtask').classList.remove('d-none');
}

function closeEditTaskModal() {
    document.getElementById('showtask').classList.add('d-none');
}


function editTaskStatus(index, newStatus) {
    let task = tasks[index];
    task.status = newStatus;
    updateHTML();
}

// Function to check the screen width
function isMobileWidth() {
    return window.innerWidth <= 800;
}

// Function to handle the task click event
function handleTaskClick(taskId) {
    if (isMobileWidth()) {
        editTaskResponsive(taskId); // For mobile devices, call openTask function
    } else {
        openTask(taskId); // For desktop devices, call editTaskResponsive function
    }
}
