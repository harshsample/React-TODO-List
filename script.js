let taskList = [];
let taskIdCounter = 1;

document.addEventListener("DOMContentLoaded", function () {
    updateTaskCounter();
});

function addTask() {
    const newTaskInput = document.getElementById("new-task");
    const taskText = newTaskInput.value.trim();

    if (taskText !== "") {
        const task = {
            id: taskIdCounter++,
            text: taskText,
            completed: false
        };

        taskList.push(task);
        newTaskInput.value = "";
        renderTasks();
        updateTaskCounter();
    }
}

function renderTasks() {
    const taskListElement = document.getElementById("task-list");
    taskListElement.innerHTML = "";

    taskList.forEach(task => {
        const taskElement = document.createElement("li");
        taskElement.innerHTML = `
            <span class="task-text ${task.completed ? 'completed' : ''}">${task.text}</span>
            <div>
                <input type="checkbox" id="task-${task.id}" ${task.completed ? 'checked' : ''} onchange="toggleTaskCompletion(${task.id})">
                <button onclick="deleteTask(${task.id})">Delete</button>
            </div>
        `;
        taskListElement.appendChild(taskElement);
    });
}

function toggleTaskCompletion(taskId) {
    const taskIndex = taskList.findIndex(task => task.id === taskId);
    if (taskIndex !== -1) {
        taskList[taskIndex].completed = !taskList[taskIndex].completed;
        renderTasks();
        updateTaskCounter();
    }
}

function deleteTask(taskId) {
    taskList = taskList.filter(task => task.id !== taskId);
    renderTasks();
    updateTaskCounter();
}

function updateTaskCounter() {
    const pendingCount = taskList.filter(task => !task.completed).length;
    document.getElementById("pending-count").textContent = pendingCount;
}
