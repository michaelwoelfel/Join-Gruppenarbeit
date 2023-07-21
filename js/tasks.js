

let tasks = [];
let taskIdCounter = 0;
let currentDraggedElement;
let subtasks = [];
let colorIndex = 0;
let currentCategory;
let currentColorOfCategory;

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
    await loadselectedUsers();
    taskName = document.getElementById('add_task_title').value;
    let taskSubtask = document.getElementById('add_task_input_subtask').value;
    let taskDescription = document.getElementById('add_task_description').value;
    let taskCategory =  currentCategory;
    let taskCategorybc = currentColorOfCategory;
    let taskAssign = selectedUsers;
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
        categoryBackgroundColor: taskCategorybc,
        user: taskAssign,
        date: taskDate,
        priority: taskPrio,
        status: taskStatus,
    });
    await setItem('tasks', JSON.stringify(tasks));
    taskAddedToBoard();
    // Displays the animation in add Task
    selectedUsers = [];
    saveSelectedUsers();
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
    let taskCategory = currentCategory;
    let taskCategorybc = currentColorOfCategory;
    let taskAssign = selectedUsers;
    let taskDate = document.getElementById('add_task_input_date').value;
    let taskPrio = getTaskPrio();
    let taskStatus = task.status;
    task.id = taskId;
    task.name = taskName;
    task.subtask = taskSubtask;
    task.tasktext = taskDescription;
    task.category = taskCategory;
    task.categoryBackgroundColor = taskCategorybc,
    task.user = taskAssign;
    task.date = taskDate;
    task.priority = taskPrio;
    task.status = taskStatus;
    await setItem('tasks', JSON.stringify(tasks));
    taskAddedToBoard();
    selectedUsers = [];
    saveSelectedUsers();
    // Displays the animation in add Task
};

/**
 * Prepares the user interface to edit an existing task.
 * @param {number} i - The index of the task to be edited in the 'tasks' list.
 */
async function editTask(i) {
    let task = tasks[i];
    closeTask();
    await addTaskPopUp();
    let taskprio = task['priority'];
    getTaskPrio(taskprio);
    document.getElementById('add_task_h1').innerHTML = `Edit Task`;
    document.getElementById('add_task_title').value = task.name;
    document.getElementById('add_task_input_subtask').value = task.subtask;
    document.getElementById('add_task_description').value = task.tasktext;
    document.getElementById('add_task_category_select').value = task.category;

    /**
     *Hier müssen die user gerendert werden.
     */

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
    document.getElementById('show-subtasks').innerHTML = '';
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
async function renderToDo() {
    let toDo = tasks.filter(t => t['status'] == 'todo');
    document.getElementById('todo').innerHTML = '';
    for (let index = 0; index < toDo.length; index++) {
        const task = toDo[index];
        document.getElementById('todo').innerHTML += await taskTemplate(task);
        renderUsersInTask(task);


    }
}

async function renderUsersInTask(task) {
    await loadContacts(); // Kontakte werden benötigt, um auf die gespeicherte Farbe zuzugreifen
    userTasks = task['user'];
    let idTask = task.id;
    let userContainer = document.getElementById(`usersintask${idTask}`);

    for (let i = 0; i < userTasks.length; i++) {
        const element = userTasks[i];

        console.log(`Task ID: ${idTask}`);
        let nameParts = element.split(' '); // Name in Teile aufteilen
        let firstLetter = nameParts[0].charAt(0); // Erster Buchstabe des Vornamens
        let secondLetter = nameParts.length > 1 ? nameParts[1].charAt(0) : '';

        let contact = getContactFromName(nameParts.join(' ')); // Suche nach Name
        let randomColor = contact ? contact.color : getRandomColor(); // Wenn Name da, dann contact.color, wenn nicht function ... 

        userContainer.innerHTML += `<div class="contact-container">
            <div class="imgcontainer" style="background-color: ${randomColor};">
                <span id="firstletter">${firstLetter}</span>
                <span id="secondletter">${secondLetter}</span>
            </div>
        </div>`;
    };
}

function getContactFromName(name) {
    return contacts.find(contact => contact.name === name);
}

function renderUsersInOpenTask(index) {
    let task = tasks[index];
    const userTasks = task['user'];
    const userContainer = document.getElementById(`usersInOpenTask${task.id}`);


    for (let i = 0; i < userTasks.length; i++) {
        const element = userTasks[i];
        let nameParts = element.split(' '); // Name in Teile aufteilen
        let firstLetter = nameParts[0].charAt(0); // Erster Buchstabe des Vornamens
        let secondLetter = nameParts.length > 1 ? nameParts[1].charAt(0) : '';

        // Suche nach dem Namen im Kontakt und erhalte die Farbe (oder eine zufällige Farbe, wenn der Name nicht gefunden wird)
        let contact = getContactFromName(nameParts.join(' '));
        let randomColor = contact ? contact.color : getRandomColor();

        // Erstelle den User-Container und füge ihn direkt in den Task-Details-Container ein
        const userElement = document.createElement('div');
        userElement.classList.add('contact-container');
        userElement.innerHTML = `
            <div class="imgcontainer" style="background-color: ${randomColor};">
                <span id="firstletter">${firstLetter}</span>
                <span id="secondletter">${secondLetter}</span>
            </div>
            <div class="name">${nameParts.join(' ')}</div>
        `;

        userContainer.appendChild(userElement);
    };
}







/// ALT 

// async function renderUsersInBigTask(task) {
//     userTasks = task['user'];
//     let idTask = task.id;
//     let userContainer = document.getElementById(`usersinbigtask${idTask}`);

//     for (let i = 0; i < userTasks.length; i++) {
//         const element = userTasks[i];

//         console.log(`Task ID: ${idTask}`);
//         let nameParts = element.split(' '); // split the name into parts
//         let firstLetter = nameParts[0].charAt(0); // first letter of first name
//         let secondLetter = nameParts.length > 1 ? nameParts[1].charAt(0) : '';
//         let randomColor = getRandomColor();

//         userContainer.innerHTML += `<div class="contact-container">
//     <div class="imgcontainer" style="background-color: ${randomColor};">
//         <span id="firstletter">${firstLetter}</span>
//         <span id="secondletter">${secondLetter}</span>
//     </div>
//     <span id="name">${element}</span>


//     </div>
//     </div>
// </div>`;

//     };


// }

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
async function renderInProgress() {
    let inprogress = tasks.filter(t => t['status'] == 'inprogress');
    document.getElementById('inprogress').innerHTML = '';
    for (let index = 0; index < inprogress.length; index++) {
        const task = inprogress[index];
        document.getElementById('inprogress').innerHTML += await taskTemplate(task);
        renderUsersInTask(task);
    }
}

/**
 * Updates the HTML representation of the 'awaitingfb' tasks.
 */
async function renderAwaitFb() {
    let awaitingfb = tasks.filter(t => t['status'] == 'awaitingfb');
    document.getElementById('awaitingfb').innerHTML = '';
    for (let index = 0; index < awaitingfb.length; index++) {
        const task = awaitingfb[index];
        document.getElementById('awaitingfb').innerHTML += await taskTemplate(task);
        renderUsersInTask(task);

    }
}

/**
 * Updates the HTML representation of the 'done' tasks.
 */
async function renderDone() {
    let done = tasks.filter(t => t['status'] == 'done');
    document.getElementById('done').innerHTML = '';
    for (let index = 0; index < done.length; index++) {
        const task = done[index];
        document.getElementById('done').innerHTML += await taskTemplate(task);
        renderUsersInTask(task);

    }
}


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

async function openTask(i) {
    // Removes the 'd-none' class to make the task details visible
    document.getElementById('showtask').classList.remove('d-none');
    // Finds the index of the task with the given ID
    let index = tasks.findIndex(task => task.id === i);
    // Generate the HTML for task details using the separate function
    let taskDetailsHTML = await generateTaskDetailsHTML(index);
    // Insert the task details HTML into the 'showtask' element
    document.getElementById('showtask').innerHTML = await taskDetailsHTML;
    // Calls a function to display the task's priority level
    colorUrgency(index);
    renderUsersInOpenTask(index);
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


// Adds new Subtasks under subtask-field
function addNewSubtask() {
    const newSubtask = document.getElementById('add_task_input_subtask').value;
    let currentSubtasks = document.getElementById('show-subtasks');
    if (newSubtask === '')
        alert('Bitte Feld ausfüllen!!')
    else {
        if (subtasks.length >= 3) {
            alert('Maximal drei Subtasks erstellen');
        } else {
            renderSubtask(currentSubtasks, newSubtask);
            subtasks.push(newSubtask);
            document.getElementById('add_task_input_subtask').value = '';
        }
    }
}


function renderSubtask(currentSubtasks, newSubtask) {
    currentSubtasks.innerHTML += /*html*/`
    <div>
        <img onclick="addDoneSignToSquare(event)" src="/assets/img/subtask_square.png" alt="Subtasks">
        <span>${newSubtask}</span> 
    </div>    
    `;
    return;
}


// ADDS 'done-sign'
function addDoneSignToSquare(event) {
    if (event.target.src.includes("subtask_square.png")) {
        event.target.src = "/assets/img/done_white.png";
    } else {
        event.target.src = "/assets/img/subtask_square.png";
    }
}



// Checkes if the field "new category is selected"
function handleCategoryChange(liElement) {
    if (liElement.textContent === 'New category') {
        addNewCategory();
    }
}


//  opens a popup to give a name to a new category and fills in the new category
function addNewCategory() {
    const newCategoryDiv = document.createElement('div');
    newCategoryDiv.className = 'new-category-popup';
    newCategoryDiv.innerHTML = '<input type="text" max-length="15" id="new-category-input" placeholder="Enter new category"><button onclick="submitNewCategory()">Submit</button><img onclick="closeCategoryPopup()" src="/assets/img/close.png">';
    document.body.appendChild(newCategoryDiv);
}


// Creates a new category and closes popup by click on the submit btn
function submitNewCategory() {
    const newCategory = document.getElementById('new-category-input').value;
    const newLi = document.getElementById('add_task_category_select');
    setColorForNewCategory(newLi);

    newLi.innerHTML += /*html*/`
        <li class="liElement" onclick="closeDropdown(this)">${newCategory}<div style="background-color: ${currentColorOfCategory}" class="color_dot"></div></li>
    `;
    const popup = document.querySelector('.new-category-popup');
    document.body.removeChild(popup);
    saveNewCategory(newCategory);
}


function setColorForNewCategory() {
    let newColor = getRandomColorDot();
    currentColorOfCategory = newColor;
}


// Choses a random color for the new category
function getRandomColorDot() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}


function saveNewCategory(newCategory) {
    setItem('newCategory', JSON.stringify(newCategory));
    loadNewCategory(newCategory);
}


function loadNewCategory(newCategory) {

}


function openDropdownMenu() {
    let dropdownMenu = document.getElementById('add_task_category_select');
    dropdownMenu.classList.toggle('d-block');

    let dropdown = document.getElementById('dropdown');
    dropdown.classList.toggle('border-radius');
}


function closeDropdown(liElement) {
    let dropdownMenu = document.getElementById('add_task_category_select');
    dropdownMenu.classList.remove('d-block');
    let dropdown = document.getElementById('dropdown');
    dropdown.classList.remove('border-radius');
    readNameOfCategoryInBoard(liElement);
    renderSelectedCategoryInCategoryfield(liElement);
}


function readNameOfCategoryInBoard(liElement) {
    if (liElement.textContent === 'New category') {
        addNewCategory();
    } else {
        let selectedCategory = liElement.textContent;
        currentCategory = selectedCategory;
    }
}


function renderSelectedCategoryInCategoryfield(liElement) {
    let selectedCategory = document.getElementById('dropdown');
    let selectedColor = liElement.querySelector('.color_dot').style.backgroundColor; 
    selectedCategory.innerHTML = /*html*/`
        <li class="liElement">${currentCategory} 
            <div style="background-color: ${selectedColor}" class="color_dot"></div>
        </li> 
    `;
    currentColorOfCategory = selectedColor;
}

function closeCategoryPopup() {
    const popup = document.querySelector('.new-category-popup');
    document.body.removeChild(popup);
}




