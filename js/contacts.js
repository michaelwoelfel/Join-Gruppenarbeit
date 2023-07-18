/**
 * List of contacts.
 */
let contacts;

/**
 * Collects the input values, pushes a new contact to the list and saves the list in the local storage.
 * Notifies the user about the added contact and re-renders the contact list.
 * @returns {Promise<void>}
 */
async function addContact() {
    let ContactName = document.getElementById('contactname').value;
    let ContactMail = document.getElementById('contactmail').value;
    let ContactPhone = document.getElementById('contactphone').value;
    // Create a new contact and push it to the list
    contacts.push({
        name: ContactName,
        mail: ContactMail,
        phone: ContactPhone,
    });
    // Save the updated list to the local storage
    await setItem('contacts', JSON.stringify(contacts));
    // Show the "Added to board information"
    taskAddedToBoard();
    // Update the view
    renderContacts();
};

/**
 * Renders the contact list after sorting it in alphabetical order.
 * For each contact creates a new contact container and adds it to the page.
 * @returns {Promise<void>}
 */
async function renderContacts() {
    // Load the contact list from the local storage
    await loadContacts();
    // Sort the contact list alphabetically
    contacts.sort((a, b) => a.name.localeCompare(b.name));

    // Variable to keep track of the first letter of the current contact's name
    let currentLetter = '';
    document.getElementById('contact-list').innerHTML = '';
    for (let i = 2; i < contacts.length; i++) {
        const contact = contacts[i];
        const firstLetter = contact['name'].charAt(0).toUpperCase();
        
        // If the first letter of the name is new, create a new letter header
        if (firstLetter !== currentLetter) {
            currentLetter = firstLetter;
            document.getElementById('contact-list').innerHTML += `
                <div class="contact-container">
                    <div class="contactheader">
                    <h1 id="letter">${currentLetter}</h1>
                    </div>
                </div>`;
        } 

        // If the name is made of two words, get the first letter of the second word
        let secondLetter = '';
        let nameParts = contact['name'].split(' ');
        if (nameParts.length > 1 && nameParts[1].length > 0) {
            secondLetter = nameParts[1].charAt(0).toUpperCase();
        }
        let randomColor = getRandomColor();
        // Create a new contact container and add it to the page
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

/**
 * Shows a notification about the added contact.
 */
function taskAddedToBoard() { 
    const container = document.querySelector('.addedTaskToBoard_content');
    container.classList.add('show');

    setTimeout(() => {
        container.classList.remove('show');
    }, 3000);
}

/**
 * Shows the selected contact details.
 * @param {number} i - The index of the selected contact in the 'contacts' list.
 * @param {string} randomColor - The background color of the contact avatar.
 * @param {string} secondLetter - The second letter in the contact avatar.
 */
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

/**
 * Opens the edit contact form and fills in the current values.
 * @param {number} i - The index of the contact to be edited in the 'contacts' list.
 * @param {string} firstLetter - The first letter in the contact avatar.
 * @param {string} secondLetter - The second letter in the contact avatar.
 * @param {string} randomColor - The background color of the contact avatar.
 */
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

/**
 * Updates the contact values and saves the updated list in the local storage.
 * Re-renders the contact list and closes the edit form.
 * @param {number} i - The index of the contact to be updated in the 'contacts' list.
 * @returns {Promise<void>}
 */
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

/**
 * Deletes the contact and saves the updated list in the local storage.
 * Re-renders the contact list and closes the edit form.
 * @param {number} i - The index of the contact to be deleted in the 'contacts' list.
 * @returns {Promise<void>}
 */
async function deleteContact(i) {
    contacts.splice(i, 1);
    await setItem('contacts', JSON.stringify(contacts));
    await renderContacts();
    closeEditContact();
}

/**
 * Opens the add contact form.
 */
function openAddContact() {
    document.getElementById('modal-one').classList.remove('d-none');

}

/**
 * Opens the edit contact form.
 */
function openEditContact() {
    document.getElementById('modal-one-edit').classList.remove('d-none');

}

/**
 * Closes the edit contact form.
 */
function closeEditContact() {
    document.getElementById('modal-one-edit').classList.add('d-none');

}

/**
 * Closes the add contact form.
 */
function closeAddContact (){
    document.getElementById('modal-one').classList.add('d-none');

}

/**
 * Loads the contact list from the local storage.
 * @returns {Promise<void>}
 */
async function loadContacts() {
    try {
        contacts = JSON.parse(await getItem('contacts'));
    } catch (e) {
        console.error('Loading error:', e);

    }
}

/**
 * Returns a random integer between the given minimum and maximum values.
 * @param {number} min - The minimum value.
 * @param {number} max - The maximum value.
 * @returns {number} - A random integer.
 */
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Returns a random RGB color.
 * @returns {string} - A random RGB color.
 */
function getRandomColor() {
    const colors = [
        'rgb(1, 144, 224)', 
        'rgb(255, 92, 0)', 
        'rgb(238, 0, 214)', 
        'rgb(2, 207, 47)', 
        'rgb(147, 39, 255)', 
        'rgb(78, 150, 61)', 
        'rgb(50, 218, 255)', 
        'rgb(0, 124, 238)'
    ];
    let randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
}