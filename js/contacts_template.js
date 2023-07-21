function createLetterHeader(letter) {
    return `
        <div class="contact-container">
            <div class="contactheader">
                <h1 id="letter">${letter}</h1>
            </div>
        </div>`;
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
        </div>`;
}