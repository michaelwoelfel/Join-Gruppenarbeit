let contacts = [];

async function addContact() {
    let ContactName = document.getElementById('contactname').value;
    let ContactMail = document.getElementById('contactmail').value;
    let ContactPhone = document.getElementById('contactphone').value;

    contacts.push({
        name: ContactName,
        mail: ContactMail,
        phone: ContactPhone,
       
    });
    await setItem('contacts', JSON.stringify(contacts));
    taskAddedToBoard();
    renderContacts();

};


async function renderContacts() {
    await loadContacts();

    // Sortiere Kontakte alphabetisch nach dem Namen
    contacts.sort((a, b) => a.name.localeCompare(b.name));

    document.getElementById('contact-list').innerHTML = '';

    let currentLetter = '';
    for (let i = 0; i < contacts.length; i++) {
        const contact = contacts[i];
        const firstLetter = contact['name'].charAt(0).toUpperCase();
        let randomColor = getRandomColor();
        
        // Prüfe, ob wir zu einem neuen Buchstaben gewechselt haben
        if (firstLetter !== currentLetter) {
            currentLetter = firstLetter;
            document.getElementById('contact-list').innerHTML += `
                <div class="contact-container">
                    <div class="contactheader">
                    <h1 id="letter">${currentLetter}</h1>
                    </div>
                </div>`;
        } 

        // Splitte den Namen und extrahiere den ersten Buchstaben des zweiten Worts, wenn es existiert
        let secondLetter = '';
        let nameParts = contact['name'].split(' ');
        if (nameParts.length > 1 && nameParts[1].length > 0) {
            secondLetter = nameParts[1].charAt(0).toUpperCase();
        }

        document.getElementById('contact-list').innerHTML += `
            <div class="contact-container">
                <div class="contact">
                <div class="imgcontainer" style="background-color: ${randomColor};">
                    <span id="firstletter">${firstLetter}</span>
                    <span id="secondletter">${secondLetter}</span>
                </div>
                <div class="contactinfo">
                    <span id="name">${contact['name']}</span>
                    <a href="mailto:${contact['mail']}" id="email">${contact['mail']}</a>
                </div>
                </div>
            </div>`;
    }
}


function taskAddedToBoard() { 
    const container = document.querySelector('.addedTaskToBoard_content');
    container.classList.add('show');

    setTimeout(() => {
        container.classList.remove('show');
    }, 3000);
}



function openAddContact() {
    document.getElementById('modal-one').classList.remove('d-none');

}

function closeAddContact (){
    document.getElementById('modal-one').classList.add('d-none');

}

async function loadContacts() {
    try {
        contacts = JSON.parse(await getItem('contacts'));
    } catch (e) {
        console.error('Loading error:', e);

    }
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Diese Funktion generiert eine zufällige RGB-Farbe
function getRandomColor() {
    let r = getRandomInt(0, 255);
    let g = getRandomInt(0, 255);
    let b = getRandomInt(0, 255);
    return `rgb(${r},${g},${b})`;
}