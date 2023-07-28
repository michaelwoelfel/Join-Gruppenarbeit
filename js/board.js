/**
 * Users for a specific task
 */

let selectedUsers = [];
/**
 * Displays the add task popup.
 */
async function addTaskPopUp() {
    let popup = document.getElementById('popupAddTask');
    popup.classList.remove('d-none');
    renderPopUp(popup);
    await renderTaskContacts();
}

/**
 * Closes the add task popup and re-renders the tasks.
 */
function closePopup() {
    let popup = document.getElementById('popupAddTask');
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
    let urgent = document.getElementById('prioUrgent');
    let medium = document.getElementById('prioMedium');
    let low = document.getElementById('prioLow');
    urgent.classList.toggle('prio-btn-urgent-clicked');
    medium.classList.remove('prio-btn-medium-clicked');
    low.classList.remove('prio-btn-low-clicked');
}

/**
 * Changes the color of the priority to orange when the "Medium" button is clicked.
 */
function prioColorOrange() {
    let urgent = document.getElementById('prioUrgent');
    let medium = document.getElementById('prioMedium');
    let low = document.getElementById('prioLow');
    urgent.classList.remove('prio-btn-urgent-clicked');
    medium.classList.toggle('prio-btn-medium-clicked');
    low.classList.remove('prio-btn-low-clicked');
}

/**
 * Changes the color of the priority to green when the "Low" button is clicked.
 */
function prioColorGreen() {
    let urgent = document.getElementById('prioUrgent');
    let medium = document.getElementById('prioMedium');
    let low = document.getElementById('prioLow');
    urgent.classList.remove('prio-btn-urgent-clicked');
    medium.classList.remove('prio-btn-medium-clicked');
    low.classList.toggle('prio-btn-low-clicked');
}

// VERBESSERN XXXXXXXXXXXXXXXXXXXXXXXXX
/**
 * Renders the Contacts in the "Assign to" Selector on Add Task. 
 */
async function renderTaskContacts() {
    await loadContacts();
    let userSelection = `
        <div id="selectInnerUser">`;
    for (let i = 2; i < contacts.length; i++) {
        let contact = contacts[i];
        userSelection += `
            <input onclick="pushCurrentContact(event)" type="checkbox" id="name${i}" name="${contact['name']}" value="${contact['name']}">
            <label for="name${i}">${contact['name']}</label><br>`;
    }
    userSelection += `
        </div>`;
    document.getElementById('selectInnerUser').innerHTML = userSelection;
}


function pushCurrentContact(event) {
    let checked = event.target.checked;
    let name = event.target.value;
    if (checked) {
        // Add the name to the array if the checkbox is checked
        selectedUsers.push(name);
    } else {
        // Remove the name from the array if the checkbox is unchecked
        selectedUsers = selectedUsers.filter(function (user) {
            return user !== name;
        });
    }
    saveSelectedUsers();
}

async function saveSelectedUsers() {
    await setItem('selectedUsers', JSON.stringify(selectedUsers));
}

async function loadSelectedUsers() {
    try {
        selectedUsers = JSON.parse(await getItem('selectedUsers'));
    } catch (e) {
        console.error('Loading error:', e);
    }
}

// async function findTask() {
//     let search = document.getElementById('searchTaskInput').value;
//     search = search.toLowerCase();
//     await clearAllTasks();
//     for (let i = 0; i < tasks.length; i++) {
//         const task = tasks[i];
//         let searchTask = task['name'];
//         let taskStatus = task['status']
//         if (searchTask.toLowerCase().includes(search) && taskStatus == 'todo') {
//             document.getElementById('todo').innerHTML += await taskTemplate(task);
//         }
//         if (searchTask.toLowerCase().includes(search) && taskStatus == 'inprogress') {
//             document.getElementById('inprogress').innerHTML += await taskTemplate(task);
//         }
//         if (searchTask.toLowerCase().includes(search) && taskStatus == 'awaitingfb') {
//             document.getElementById('awaitingfb').innerHTML += await taskTemplate(task);
//         }
//         if (searchTask.toLowerCase().includes(search) && taskStatus == 'done') {
//             document.getElementById('done').innerHTML += await taskTemplate(task);
//         }
//         await renderUsersInTask(task);
//     }
//     if (search == '') {
//         await clearAllTasks();
//         renderTasks();
//     }
// }

async function findTask() {
    let search = document.getElementById('searchTaskInput').value.toLowerCase();
    await clearAllTasks();

    for (let i = 0; i < tasks.length; i++) {
        const task = tasks[i];
        let searchTask = task['name'].toLowerCase();
        let taskStatus = task['status'];

        if (searchTask.includes(search)) {
            document.getElementById(taskStatus).innerHTML += await taskTemplate(task);
        }
        await renderUsersInTask(task);
    }

    if (search === '') {
        await clearAllTasks();
        renderTasks();
    }
}




function clearAllTasks() {
    document.getElementById('inprogress').innerHTML = '';
    document.getElementById('todo').innerHTML = '';
    document.getElementById('awaitingfb').innerHTML = '';
    document.getElementById('done').innerHTML = '';
}