/**
 * Displays the "Add Task" popup by removing the 'd-none' class from the popup element,
 * and calls the function to render the popup with HTML.
 */
function addTaskPopUp() {
    let popup = document.getElementById('popup_add_task');
    popup.classList.remove('d-none');
    renderPopUp(popup);
}

/**
 * Populates the given popup element with HTML code.
 *
 * @param {HTMLElement} popup - The popup element to be populated with HTML.
 */
function renderPopUp(popup) {
    popup.innerHTML = /*html*/`
    // Your HTML code
    `;
}

/**
 * Closes the popup by adding the 'd-none' class to the popup element,
 * and calls the function to render the tasks.
 */
function closePopup() {
    let popup = document.getElementById('popup_add_task');
    popup.classList.add('d-none');
    renderTasks();
}

/**
 * Prevents a click event from bubbling up to parent elements.
 *
 * @param {Event} event - The event to stop propagation for.
 */
function doNotClose(event) {
    event.stopPropagation();
}

/**
 * Changes the priority color to red when "Urgent" is selected,
 * removes the corresponding classes from "Medium" and "Low" buttons.
 */
function prioColorRed() {
    let urgent = document.getElementById('prio_urgent');
    let medium = document.getElementById('prio_medium');
    let low = document.getElementById('prio_low');
    urgent.classList.toggle('prio-btn-urgent-clicked');
    medium.classList.remove('prio-btn-medium-clicked');
    low.classList.remove('prio-btn-low-clicked');
}

/**
 * Changes the priority color to orange when "Medium" is selected,
 * removes the corresponding classes from "Urgent" and "Low" buttons.
 */
function prioColorOrange() {
    let urgent = document.getElementById('prio_urgent');
    let medium = document.getElementById('prio_medium');
    let low = document.getElementById('prio_low');
    urgent.classList.remove('prio-btn-urgent-clicked');
    medium.classList.toggle('prio-btn-medium-clicked');
    low.classList.remove('prio-btn-low-clicked');
}

/**
 * Changes the priority color to green when "Low" is selected,
 * removes the corresponding classes from "Urgent" and "Medium" buttons.
 */
function prioColorGreen() {
    let urgent = document.getElementById('prio_urgent');
    let medium = document.getElementById('prio_medium');
    let low = document.getElementById('prio_low');
    urgent.classList.remove('prio-btn-urgent-clicked');
    medium.classList.remove('prio-btn-medium-clicked');
    low.classList.toggle('prio-btn-low-clicked');
}
