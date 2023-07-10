function initPageSummary() {
    // Load included HTML first
    includeHTML(() => {
        // After all includes are loaded, get the time and summary data
        
        getTime();
        console.log('Funktioniert');
        getSummaryData();
        
       
    });
   
    
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

