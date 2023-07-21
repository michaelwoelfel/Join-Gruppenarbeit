function createLetterHeader(letter) {
    return `
        <div class="contact-container">
            <div class="contactheader">
                <h1 id="letter">${letter}</h1>
            </div>
        </div>
    `;
}

function createContact(index, contact, randomColor, secondLetter) {
    const name = contact.name;
    const mail = contact.mail;

    return `
        <div class="contact-container">
            <div onclick="showContact(${index},'${randomColor}','${secondLetter}')" class="contact">
                <div class="imgcontainer" style="background-color: ${randomColor};">
                    <span id="firstletter">${name.charAt(0).toUpperCase()}</span>
                    <span id="secondletter">${secondLetter}</span>
                </div>
                <div class="contactinfo">
                    <span id="name">${name}</span>
                    <a href="mailto:${mail}" id="email">${mail}</a>
                </div>
            </div>
        </div>
    `;
}

function createContactInfoHTML(i, contact, randomColor, firstLetter, secondLetter) {
    return `
        <div class="headinfo">
            <div id="bigcontactimg" class="bigcontactimg" style="background-color: ${randomColor};">
                <span id="firstletter">${firstLetter}</span>
                <span id="secondletter">${secondLetter}</span>
            </div>
            <div class="name-and-editbutton"> 
                <span id="bigname">${contact['name']}</span> 
                <img id="blueaddtask" src="assets/img/addtaskblue.png">
            </div>
        </div>
        <div class="contactinfobig">
            <div class="contactinfoedit">
                <span>Contact Information:</span>
                <img onclick="editContact(${i},'${firstLetter}','${secondLetter}','${randomColor}')" id="editcontactsimg" src="assets/img/editcontacts.png">
            </div>
            <div class="contactmailbig">
                <span><b>Email</b></span>
                <a href="mailto:${contact['mail']}">${contact['mail']}</a>
            </div>
            <div class="contactphonebig">
                <span><b>Phone</b></span>
                <a>${contact['phone']}</a>
            </div>
        </div>
    `;
}