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

        document.getElementById('contact-list').innerHTML += `
            <div class="contact-container">
                <div class="contact">
                    <div class="imgcontainer"><span id="firstletter">${contact['name'].charAt(0).toUpperCase()}</span><span id="secondletter">${contact['name'].charAt(1).toUpperCase()}</span></div>
                    <div class="contactinfo"><span id="name">${contact['name']}</span><a href="mailto:${contact['mail']}" id="email">${contact['mail']}</a></div>
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