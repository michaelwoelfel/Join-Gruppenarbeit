
// SUMMARY START


function initSummary() {
    // Load included HTML first
   
    includeHTML(() => {
        // After all includes are loaded, get the time and summary data
        getTime();
        getName();
        colorSummary();
        updateSummary();
    });


}

function colorSummary() {
    document.getElementById('summary').classList.add('sidebar-color-black');
}

function getName() {
    let currentUser = localStorage.getItem('currentUser');
    document.getElementById('currentuser').innerHTML = `${currentUser}`;
}


function changeImage(i) {
    const container = document.getElementById(i);
    const whiteImage = container.querySelector('.white');
    whiteImage.classList.remove('d-none');
    const blackImage = container.querySelector('.black');
    blackImage.classList.add('d-none');
}

function resetImage(i) {
    const container = document.getElementById(i);
    const whiteImage = container.querySelector('.white');
    whiteImage.classList.add('d-none');
    const blackImage = container.querySelector('.black');
    blackImage.classList.remove('d-none');
}

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

function updateTaskCount() {
    loadTasks();
    const taskCount = tasks.length;
    const taskCountElement = document.getElementById('tasksInBoardNumber');
    taskCountElement.textContent = taskCount.toString();
}

// SUMMARY END

// BOARD START
async function initBoard() {

    // Load included HTML first
    await includeHTML(() => {
        // After all includes are loaded, get the time and summary data
        colorBoard();
        renderTasks();
    });

}


function colorBoard() {
    document.getElementById('board').classList.add('sidebar-color-black');

}
// BOARD END
// ADDTASK START

function initAddTask() {
    // Load included HTML first
    includeHTML(() => {
        // After all includes are loaded, get the time and summary data
        colorAddTask();
    });
}

function colorAddTask() {
    document.getElementById('tasks').classList.add('sidebar-color-black');

}
// ADDTASK END
// CONTACTS START

function initContacts() {
    // Load included HTML first
    includeHTML(() => {
        // After all includes are loaded, get the time and summary data
        colorContacts();
    });
}

function colorContacts() {
    document.getElementById('contacts').classList.add('sidebar-color-black');

}
// CONTACTS END


// LEGAL NOTICE START

function initLegal_Notice() {
    // Load included HTML first
    includeHTML(() => {
        // After all includes are loaded, get the time and summary data
        colorLegalNotice();

    });
}

function colorLegalNotice() {
    document.getElementById('legalnotice').classList.add('sidebar-color-black');

}

// LEGAL NOTICE END


