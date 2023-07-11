 // Funktionen um Javascript der einzelnen Seiten zu laden. Man kann beliebige Funktionen mit einfügen ohne das eine Funktion die andere blockiert.

function initSummary() {
    // Load included HTML first
    includeHTML(() => {
        // After all includes are loaded, get the time and summary data
        getTime();
        getSummaryData();
    });
   
    
}

function initBoard() {
    // Load included HTML first
    includeHTML(() => {
        // After all includes are loaded, get the time and summary data
        getBoardData();
    });
   
    
}

function initAddTask() {
    // Load included HTML first
    includeHTML(() => {
        // After all includes are loaded, get the time and summary data
        getAddTaskData()
    });
   
    
}

function initContacts() {
    // Load included HTML first
    includeHTML(() => {
        // After all includes are loaded, get the time and summary data
        getContactsData()
    });
   
    
}
function initLegal_Notice() {
    // Load included HTML first
    includeHTML(() => {
        // After all includes are loaded, get the time and summary data
        getLegalNoticeData();
     
    });
   
    
}

function getBoardData() {
    document.getElementById('board').classList.add('sidebar-color-black');

}

function getAddTaskData() {
    document.getElementById('tasks').classList.add('sidebar-color-black');

}

function getContactsData() {
    document.getElementById('contacts').classList.add('sidebar-color-black');

}

function getLegalNoticeData() {
    document.getElementById('legalnotice').classList.add('sidebar-color-black');

}

function getSummaryData(){
    let currentUser = localStorage.getItem('currentUser'); 
    document.getElementById('currentuser').innerHTML = `${currentUser}`;
    document.getElementById('summary').classList.add('sidebar-color-black');
}

// SUMMARY START

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

// SUMMARY END

