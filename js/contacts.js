let contacts;

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

    
   


    let currentLetter = '';
    document.getElementById('contact-list').innerHTML = '';
    for (let i = 2; i < contacts.length; i++) {
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

        // Splitte den Namen und extrahiere den ersten Buchstaben des zweiten Worts, wenn es existiert
        let secondLetter = '';
        let nameParts = contact['name'].split(' ');
        if (nameParts.length > 1 && nameParts[1].length > 0) {
            secondLetter = nameParts[1].charAt(0).toUpperCase();
            
        }
        let randomColor = getRandomColor();
        document.getElementById('contact-list').innerHTML += `
            <div class="contact-container">
                <div onclick="showContact(${i},'${randomColor}','${secondLetter}')" class="contact">
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

function showContact(i,randomColor,secondLetter){
    const contact = contacts[i];
    const firstLetter = contact['name'].charAt(0).toUpperCase();
    document.getElementById('showcontact').innerHTML = `<div class="headinfo">
    <div id="bigcontactimg" class="bigcontactimg" style="background-color: ${randomColor};" >
        <span id="firstletter">${firstLetter}</span>
        <span id="secondletter">${secondLetter}</span>
    </div>
   <div class="name-and-editbutton"> <span id="bigname">${contact['name']}</span> <img  id="blueaddtask" src="assets/img/addtaskblue.png"></div>
</div>
<div class="contactinfobig">
    <div class="contactinfoedit"><span>Contact Information:</span><img onclick="editContact(${i},'${firstLetter}','${secondLetter}','${randomColor}')"  id="editcontactsimg" src="assets/img/editcontacts.png"></div>
    <div class="contactmailbig"><span><b>Email</b></span><a href="mailto:${contact['mail']}">${contact['mail']}</a></div>
    <div class="contactphonebig"><span><b>Phone</b></span><a>${contact['phone']}</a></div>
</div>`;
}

function editContact(i,firstLetter,secondLetter,randomColor){
    const contact = contacts[i];
    openEditContact();
    document.getElementById('contactnameedit').value = contact.name;
    document.getElementById('contactmailedit').value = contact.mail;
     document.getElementById('contactphoneedit').value = contact.phone;
     document.getElementById('img-add-contactedit').innerHTML = ` <span id="firstletter">${firstLetter}</span>
     <span id="secondletter">${secondLetter}</span>`;
     document.getElementById('img-add-contactedit').style.backgroundColor = `${randomColor}`;
     document.getElementById('editbuttons').innerHTML = `  <button onclick="deleteContact(${i})" class="cancel-btn">Delete</button>
     <button onclick="saveContact(${i})" class="create-btn">Save</button>
     <span class="addedTaskToBoard_content">Contact Added <img class="board"
             src="./assets/img/board_img.png" alt="board"></span>`
}

async function saveContact(i) {
    let contact = contacts[i];
    let ContactName = document.getElementById('contactnameedit').value;
    let ContactMail = document.getElementById('contactmailedit').value;
    let ContactPhone = document.getElementById('contactphoneedit').value;
        contact.name = ContactName;
        contact.mail = ContactMail;
        contact.phone = ContactPhone;
    await setItem('contacts', JSON.stringify(contacts));
    renderContacts();
    closeEditContact();

};

async function deleteContact(i) {
    contacts.splice(i, 1);
    await setItem('contacts', JSON.stringify(contacts));
    await renderContacts();
    closeEditContact();
}



function openAddContact() {
    document.getElementById('modal-one').classList.remove('d-none');

}

function openEditContact() {
    document.getElementById('modal-one-edit').classList.remove('d-none');

}

function closeEditContact() {
    document.getElementById('modal-one-edit').classList.add('d-none');

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