function taskTemplate(task) {
    return /*html*/ `
        <div draggable="true" ondragstart="startDragging(${task['id']})" onclick="openTask(${task['id']})" class="content">
            <div class="category">${task['category']}</div>
            <div class="taskdescription"><b>${task['subtask']}</b></div>
            <div class="tasktext">${task['tasktext']}</div>
            <div class="progresscontainer">
                <div class="taskprogressbar"></div>
                <div class="taskprogress">1/2 Done</div>
            </div>
            <div class="taskfooter">${task['user']}
                <div class="priority">
                    <img src="${task['priority']}">
                </div>
            </div>
        </div>
    `;
}

async function generateTaskDetailsHTML(index) {
    // Retrieves the task with the given index
    let task = tasks[index];
    // Generate the HTML content for the task details
    return /*html*/ `
        <div class="bigtask" id="task${index}">
            <div class="taskheader">
                <div class="category">${task['category']}</div>
                <div onclick="closeTask()"><img id="closeimg" src="/assets/img/close.png"></div>
            </div>
            <div class="taskdescriptionbig"><b>${task['subtask']}</b></div>
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
                <div class="users">${task['user']}</div>
            </div>
            <div class="buttoncontainer">
                <img id="deleteimg" onclick="deleteTask(${index})" src="/assets/img/delete.png">
                <img id="editimg" onclick="editTask(${index})" src="/assets/img/edit.png">
            </div>
        </div>
    `;
}
