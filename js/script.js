/**
 * Initialize the Summary functions.
 * Load HTML, retrieve time, get user name, add black color to the sidebar, and update the summary.
 */
function initSummary() {
    loadUsers();
    includeHTML(() => {
        getTime();
        getName();
        colorSummary();
        updateSummary();
    });
}

/**
 * Adds the class 'sidebar-color-black' to the 'summary' element.
 */
function colorSummary() {
    document.getElementById('summary').classList.add('sidebar-color-black');
}

/**
 * Fetches and sets the current user's name. 
 * If no user is logged in, sets the name as 'Guest'.
 */
async function getName() {
    if (currentUser == 'Guest') {
        document.getElementById('currentUser').innerHTML = `Guest`;
    } else {
        currentUser = JSON.parse(await getItem('currentUser'));
        document.getElementById('currentUser').innerHTML = `${currentUser}`;
    }
}

/**
 * Changes the image displayed for a specified element.
 * @param {string} i - The id of the element.
 */
function changeImage(i) {
    const container = document.getElementById(i);
    const whiteImage = container.querySelector('.white');
    whiteImage.classList.remove('d-none');
    const blackImage = container.querySelector('.black');
    blackImage.classList.add('d-none');
}

/**
 * Resets the image displayed for a specified element.
 * @param {string} i - The id of the element.
 */
function resetImage(i) {
    const container = document.getElementById(i);
    const whiteImage = container.querySelector('.white');
    whiteImage.classList.add('d-none');
    const blackImage = container.querySelector('.black');
    blackImage.classList.remove('d-none');
}

/**
 * Retrieves the current time and sets a greeting based on the time of day.
 */
function getTime() {
    const date = new Date();
    let t = date.getHours();
    if (t > 4.59 && t < 12) {
        document.getElementById('greeting').innerHTML = 'Good morning,';
    }
    if (t > 11.59 && t < 18) {
        document.getElementById('greeting').innerHTML = 'Good afternoon,';
    }
    if (t > 17.59 || t === 0 || t > 0 && t < 5) {
        document.getElementById('greeting').innerHTML = 'Good evening,';
    }
}


// BOARD START

/**
 * Initialize the Board functions.
 * Load HTML, add black color to the sidebar, and render the tasks.
 */
async function initBoard() {
    await includeHTML(() => {
        colorBoard();
        renderTasks();
    });
}

/**
 * Adds the class 'sidebar-color-black' to the 'board' element.
 */
function colorBoard() {
    document.getElementById('board').classList.add('sidebar-color-black');
}

// BOARD END

// ADDTASK START

/**
 * Initialize the Add Task functions.
 * Load HTML and add black color to the 'tasks' element.
 */
async function initAddTask() {
    await includeHTML(async () => {
        await colorAddTask();
        await renderTaskContacts();
        
    });
}

/**
 * Clicks on the name on add_task when before clicked on addtask on a specific Contact.
 */
function clickName() {
    let name = localStorage.getItem('contactName');
    if (name !== null) {

        let checkbox = document.querySelector(`input[name="${name}"]`);
        if (checkbox !== null) {
            checkbox.checked = true;
            checkbox.dispatchEvent(new Event('click'));
        }
        localStorage.removeItem('contactName');
    }
}

/**
 * Adds the class 'sidebar-color-black' to the 'tasks' element.
 */
function colorAddTask() {
    document.getElementById('tasks').classList.add('sidebar-color-black');
}

// ADDTASK END

// CONTACTS START

/**
 * Initialize the Contacts functions.
 * Load HTML, add black color to the 'contacts' element, and render the contacts.
 */
function initContacts() {
    includeHTML(() => {
        colorContacts();
        renderContacts();
    });
}

/**
 * Adds the class 'sidebar-color-black' to the 'contacts' element.
 */
function colorContacts() {
    document.getElementById('contacts').classList.add('sidebar-color-black');
}

// CONTACTS END

// LEGAL NOTICE START

/**
 * Initialize the Legal Notice functions.
 * Load HTML and add black color to the 'legalnotice' element.
 */
function initLegal_Notice() {
    includeHTML(() => {
        colorLegalNotice();
    });
}

/**
 * Adds the class 'sidebar-color-black' to the 'legalnotice' element.
 */
function colorLegalNotice() {
    document.getElementById('legalNotice').classList.add('sidebar-color-black');
}

// LEGAL NOTICE END

function showMenu() {
    document.getElementById('menu').classList.add('show-overlay-menu');
    document.getElementById('hideMenu').classList.remove('hide');
}

function hideMenu() {
    document.getElementById("menu").classList.remove("show-overlay-menu");
    document.getElementById('hideMenu').classList.add("hide");
}

// TASK MOBILE BOARD

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

function closeEditTaskModal() {
    document.getElementById('showTask').classList.add('d-none');
}