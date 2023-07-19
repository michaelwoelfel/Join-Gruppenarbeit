// Updates the summary page
async function updateSummary() {
    await loadTasks();
    updateTaskCount();
    updateTasksToDo();
    updateTasksDone();
    updateTasksInProgress();
    updateTasksAwaitingFB();
    updateTasksUrgent();
    updateUrgentDate();
}

// Updates the count of tasks with status "todo"
async function updateTasksToDo() {
    await loadTasks(); // Fetch tasks
    const tasksToDo = tasks.filter((task) => task.status === 'todo'); // Filter tasks with status "todo"
    const tasksToDoCount = tasksToDo.length; // Get the count
    const tasksToDoNumberElement = document.getElementById('toDoNumber'); // Get the HTML element
    if (tasksToDoNumberElement) {
        tasksToDoNumberElement.textContent = tasksToDoCount.toString(); // Update the count in HTML
    }
}

// Updates the count of tasks with status "done"
async function updateTasksDone() {
    await loadTasks(); // Fetch tasks
    const tasksDone = tasks.filter((task) => task.status === 'done'); // Filter tasks with status "done"
    const tasksDoneCount = tasksDone.length; // Get the count
    const tasksDoneNumberElement = document.getElementById('doneNumber'); // Get the HTML element
    if (tasksDoneNumberElement) {
        tasksDoneNumberElement.textContent = tasksDoneCount.toString(); // Update the count in HTML
    }
}

// Updates the count of tasks with status "inprogress"
async function updateTasksInProgress() {
    await loadTasks(); // Fetch tasks
    const tasksInProgress = tasks.filter((task) => task.status === 'inprogress'); // Filter tasks with status "inprogress"
    const tasksInProgressCount = tasksInProgress.length; // Get the count
    const tasksInProgressNumberElement = document.getElementById('tasksInProgressNumber'); // Get the HTML element
    if (tasksInProgressNumberElement) {
        tasksInProgressNumberElement.textContent = tasksInProgressCount.toString(); // Update the count in HTML
    }
}

// Updates the count of tasks with status "awaitingfb"
async function updateTasksAwaitingFB() {
    await loadTasks(); // Fetch tasks
    const tasksAwaitingFB = tasks.filter((task) => task.status === 'awaitingfb'); // Filter tasks with status "awaitingfb"
    const tasksAwaitingFBCount = tasksAwaitingFB.length; // Get the count
    const tasksAwaitingFBNumberElement = document.getElementById('awaitFbNumber'); // Get the HTML element
    if (tasksAwaitingFBNumberElement) {
        tasksAwaitingFBNumberElement.textContent = tasksAwaitingFBCount.toString(); // Update the count in HTML
    }
}

// Updates the count of urgent tasks
async function updateTasksUrgent() {
    await loadTasks(); // Fetch tasks
    const tasksUrgent = tasks.filter((task) => task.priority === 'assets/img/priohigh.png'); // Filter urgent tasks
    const tasksUrgentCount = tasksUrgent.length; // Get the count
    const tasksUrgentNumberElement = document.getElementById('urgentNumber'); // Get the HTML element
    if (tasksUrgentNumberElement) {
        tasksUrgentNumberElement.textContent = tasksUrgentCount.toString(); // Update the count in HTML
    }
}

// Updates the closest date for urgent tasks
function updateUrgentDate() {
    const urgentDateElement = document.getElementById('urgentDate'); // Get the HTML element
    const closestDate = findClosestDate(); // Find the closest date
    if (closestDate) {
        urgentDateElement.textContent = closestDate; // If there's a closest date, update the HTML
    } else {
        urgentDateElement.textContent = 'No urgent tasks'; // If no closest date, display "No urgent tasks"
    }
}

// Finds the closest date from the list of tasks
function findClosestDate() {
    if (tasks.length > 0) { // If there are tasks
        let closestDate = null;
        for (let i = 0; i < tasks.length; i++) {
            if (tasks[i].priority === 'assets/img/priohigh.png' && (closestDate === null || tasks[i].date < closestDate)) { // If the task is urgent and the date is closer than the current closest date
                closestDate = tasks[i].date; // Update closest date
            }
        }
        return closestDate ? formatDate(closestDate) : null; // If there's a closest date, format and return it. If not, return null
    }
    return null; // If no tasks, return null
}

// Formats a date into the format "Month Day, Year"
function formatDate(date) {
    const options = { month: 'long', day: 'numeric', year: 'numeric' }; // Options for formatting
    return new Date(date).toLocaleDateString('en-US', options); // Format the date
}