function addTaskPopUp() {
    let popup = document.getElementById('popup_add_task');
    popup.classList.remove('d-none');
    renderPopUp(popup);
}


function renderPopUp(popup) {
    popup.innerHTML = /*html*/`
    <div class="popup-background" onclick="closePopup()">
        <div class="popup-content" onclick="doNotClose(event)">
            <div class="headline_h1_cancel">
                <h1 class="add_task_h1">Add Task</h1>
                <img src="./assets/img/add_task_cancel.png" alt="cancel" onclick="closePopup()">
            </div>
            <div class="add_task_container"> 
                 <form class="add_task_left">
                    <div class="title fd_column">
                        <span>Title</span>
                        <input class="task_input_field_styling" type="text" placeholder="Enter a title" id="add_task_title"
                         required>
                    </div>

                     <div class="description fd_column">
                        <span>Description</span>
                        <textarea class="task_input_field_styling" name="description" id="add_task_description" cols="30"
                        rows="5" placeholder="Enter a description" required></textarea>
                    </div>

                    <div class="fd_column">
                        <span>Category</span>
                        <select class="task_input_field_styling" name="category_select" id="add_task_category_select"
                        required>
                            <option value="Select task category">Select task category</option>
                            <option value="New category">New category</option>
                            <option value="Sales">Sales <img class="dot" src="./assets/img/dot_red.svg" alt="red"></option>
                            <option value="Backoffice">Backoffice <img class="dot" src="./assets/img/dot_green.svg" alt="green"></option>
                        </select>
                    </div>

                    <div class="assign fd_column">
                        <span>Assign to</span>
                        <select class="task_input_field_styling" name="Assigned to" id="add_task_assign_select">
                            <option value="Select contacts to assign">Select contacts to assign</option>
                            <option value="">You</option>
                            <option value="">Maximilian Vogel</option>
                            <option value="">invite new contact</option>
                        </select>
                    </div>
                </form>
                
                <div class="seperator fd_column"></div>

                <form type="submit" class="add_task_right">
                    <div class="date fd_column">
                        <span>Due date</span>
                        <input class="task_input_field_styling" type="date" name="" id="add_task_input_date" required
                            min="2023-07-20">
                    </div>
                    <div class="prio fd_column">
                        <span>Prio</span>
                        <div class="prio-btns-container">
                        <div onclick="getTaskPrio('urgent')" id="prio_urgent" class="prio-btn">Urgent <img onclick="getTaskPrio('urgent')" src="./assets/img/urgent_prio.png"
                                alt="urgent">
                        </div>
                        <div onclick="getTaskPrio('medium')" id="prio_medium" class="prio-btn">Medium <img onclick="getTaskPrio('medium')" src="./assets/img/medium_prio.png"
                                alt="medium">
                        </div>
                        <div onclick="getTaskPrio('low')" id="prio_low" class="prio-btn">Low <img onclick="getTaskPrio('low')" src="./assets/img/low_prio.png" alt="low"></div>
                    </div>
                    </div>
                    <div class="subtasks fd_column">
                        <span>Subtasks</span>
                        <input class="task_input_field_styling" type="text" name="" id="add_task_input_subtask"
                            placeholder="Add new subtask"><img src="" alt="">
                    </div>
                    <div class="show_subtask">
                    </div>
                </form>
            </div>
            <div class="buttons-clear-create">
                <div class="clear-btn btn" onclick="">Clear <img src="./assets/img/add_task_cancel.png" alt="check"></div>
                <div class="create-btn btn" onclick="addTask()">Create Task <img src="./assets/img/add_task_check.png" alt="cancel"></div>
            </div>
             <span class="addedTaskToBoard_content">Task added to board <img class="board" src="./assets/img/board_img.png" alt="board"></span>  

        </div>
    </div>
    `;
}


function closePopup() {
    let popup = document.getElementById('popup_add_task');
    popup.classList.add('d-none');
    renderTasks();
}


function doNotClose(event) {
    event.stopPropagation();
}



// PRIO COLORS CHANGING ONCLICK 

function prioColorRed() {
    let urgent = document.getElementById('prio_urgent');
    let medium = document.getElementById('prio_medium');
    let low = document.getElementById('prio_low');
    urgent.classList.toggle('prio-btn-urgent-clicked');
    medium.classList.remove('prio-btn-medium-clicked');
    low.classList.remove('prio-btn-low-clicked');
}


function prioColorOrange() {
    let urgent = document.getElementById('prio_urgent');
    let medium = document.getElementById('prio_medium');
    let low = document.getElementById('prio_low');
    urgent.classList.remove('prio-btn-urgent-clicked');
    medium.classList.toggle('prio-btn-medium-clicked');
    low.classList.remove('prio-btn-low-clicked');
}


function prioColorGreen() {
    let urgent = document.getElementById('prio_urgent');
    let medium = document.getElementById('prio_medium');
    let low = document.getElementById('prio_low');
    urgent.classList.remove('prio-btn-urgent-clicked');
    medium.classList.remove('prio-btn-medium-clicked');
    low.classList.toggle('prio-btn-low-clicked');
}