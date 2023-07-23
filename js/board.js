/**
 * Users for a specific task
 */

let selectedUsers = [];
/**
 * Displays the add task popup.
 */
async function addTaskPopUp() {
    let popup = document.getElementById('popup_add_task');
    popup.classList.remove('d-none');
 renderPopUp(popup);
 await renderTaskContacts();
    
}


/**
 * Renders the popup content for adding a task.
 * @param {Object} popup - The DOM object for the popup element.
 */
async function renderPopUp(popup) {
    popup.innerHTML = /*html*/`
    <div class="popup-background" onclick="closePopup()">
        <div class="popup-content" onclick="doNotClose(event)">
            <div class="projectheader_popUp">
                <img class="join-logo-mobile-header" src="/assets/img/logo_dark.png" alt="logo_dark">
            </div>
            <div class="headline_h1_cancel">
                <h1 id="add_task_h1" class="add_task_h1">Add Task</h1>
                <img class="closeimgpopup" src="./assets/img/add_task_cancel.png" alt="cancel" onclick="closePopup()">
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

                    <div class=" fd_column">
                        <span>Category</span>
                        <div class="category-select-down">
                            <div class="task_input_field_styling dropdown" id="dropdown">Select category</div>
                            <img class="category-down" onclick="openDropdownMenu()" src="./assets/img/category-down.svg"
                                alt="">
                        </div>
                        <ul class="task_input_field_styling dropdown-content" id="add_task_category_select">
                            <li onclick="handleCategoryChange(this)">New category</li>
                        </ul>
    
                    </div>
                        <span id="assignto">Assign to</span>
                    <div id="userselection" class="assign fd_column selectinneruser">
                    </div>  
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
                        <div onclick="getTaskPrio('urgent')" id="prio_urgent" class="prio-btn">Urgent <img  src="./assets/img/urgent_prio.png"
                                alt="urgent">
                        </div>
                        <div onclick="getTaskPrio('medium')" id="prio_medium" class="prio-btn">Medium <img  src="./assets/img/medium_prio.png"
                                alt="medium">
                        </div>
                        <div onclick="getTaskPrio('low')" id="prio_low" class="prio-btn">Low <img  src="./assets/img/low_prio.png" alt="low"></div>
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
                <div class="clear-btn btn" onclick="clearTask()">Clear <img src="./assets/img/add_task_cancel.png" alt="check"></div>
                <div id="buttonedit" class="create-btn btn" onclick="addTask()">Create Task <img src="./assets/img/add_task_check.png" alt="cancel"></div>
            </div>
               <div id="buttonafteredit"> 
               </div>
            <div class="animation-addedToBoard">
                <span class="addedTaskToBoard_content">Task added to board <img class="board"
                    src="./assets/img/board_img.png" alt="board"></span>
            </div>
    </div>
    `;
   
}


/**
 * Closes the add task popup and re-renders the tasks.
 */
function closePopup() {
    let popup = document.getElementById('popup_add_task');
    popup.classList.add('d-none');
    renderTasks();
}

/**
 * Prevents the popup from closing when clicking inside it.
 * @param {Event} event - The DOM event.
 */
function doNotClose(event) {
    event.stopPropagation();
}

/**
 * Changes the color of the priority to red when the "Urgent" button is clicked.
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
 * Changes the color of the priority to orange when the "Medium" button is clicked.
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
 * Changes the color of the priority to green when the "Low" button is clicked.
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
 * Renders the Contacts in the "Assign to" Selector on Add Task.
 */
async function renderTaskContacts() {
    await loadContacts();
   
    let userselection =  ` 
        <div id="selectinneruser">`;
    for (let i = 2; i < contacts.length; i++) {
        let contact = contacts[i]
        userselection += ` <input onclick="pushCurrentContact(event)" type="checkbox" id="name${i}" name="${contact['name']}" value="${contact['name']}">
        <label for="name${i}">${contact['name']}</label><br>`;
    }
    userselection += `</div>`;
    document.getElementById('userselection').innerHTML = '';
    document.getElementById('userselection').innerHTML += `${userselection}`;

}

function pushCurrentContact(event) {
    let checked = event.target.checked;
    let name = event.target.value;
    if (checked) {
        // Add the name to the array if the checkbox is checked
        selectedUsers.push(name);
    } else {
        // Remove the name from the array if the checkbox is unchecked
        selectedUsers = selectedUsers.filter(function(user) {
            return user !== name;
        });
    }

    saveSelectedUsers();
}

async function saveSelectedUsers() {
    await setItem('selectedUsers', JSON.stringify(selectedUsers));
}


async function loadselectedUsers() {
    try {
        selectedUsers= JSON.parse(await getItem('selectedUsers'));
    } catch (e) {
        console.error('Loading error:', e);

    }
}

