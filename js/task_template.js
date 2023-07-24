async function taskTemplate(task) {
    return /*html*/ `
        <div draggable="true" ondragstart="startDragging(${task['id']})" onclick="openTask(${task['id']})" class="content">
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

async function taskUserTemplate(randomColor,firstLetter,secondLetter) {
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
            <div class="taskdescriptionbig"><b>${task['name']}</b></div>
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
