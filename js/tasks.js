// Tasks rendern

let tasks = [
  
];


async function addTask() {
    tasks.push({
        taskname: "Design",
        taskheader: "Website redesign",
        tasktext: "Modify the contents of the main website",
        category: "sales",
        user: ["Michael", "Matthias"],
        date: "21.07.2023",
        priority: `./assets/img/urgent_prio.png`,
        subtask: "color this and that",
    });
    await setItem('tasks', JSON.stringify(tasks));
};


async function loadTasks() {
    try {
        tasks = JSON.parse(await getItem('tasks'));
    } catch (e) {
        console.error('Loading error:', e);
    }
}

async function renderTasks(){
    await loadTasks();
    for (let i = 0; i < tasks.length; i++) {
        const task = tasks[i];
        document.getElementById('todo').innerHTML += `<div class="content">
        <div class="taskheader">${task['taskname']}</div>
        <div class="taskdescription"><b>Website redesign</b></div>
        <div class="tasktext">Modify the contents of the main website...</div>
        <div class="progresscontainer"><div class="taskprogressbar"></div> <div class="taskprogress">1/2 Done</div></div>
        <div class="taskfooter"><div class="userimgs"><img src="assets/img/userimg1.png"><img src="assets/img/userimg2.png"></div><div class="priority"><img src="assets/img/priolow.png"></div></div>
    </div>`;
        
    }
}

// Tasks rendern