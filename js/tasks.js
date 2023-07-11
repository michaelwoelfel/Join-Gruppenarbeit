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
