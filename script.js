let tasks = [];
let currentFilter = "all";

function addTask() {
    const input = document.getElementById("taskInput");
    const date = document.getElementById("taskDate").value;
    const time = document.getElementById("taskTime").value;

    if (input.value.trim() === "") return;

    tasks.unshift({
        id: Date.now(),
        text: input.value,
        completed: false,
        date,
        time
    });

    input.value = "";
    displayTasks();
    updateStats();
}

function toggleTask(id) {
    tasks = tasks.map(t => t.id === id ? {...t, completed: !t.completed} : t);
    displayTasks();
    updateStats();
}

function deleteTask(id) {
    tasks = tasks.filter(t => t.id !== id);
    displayTasks();
    updateStats();
}

function filterTasks(type) {
    currentFilter = type;

    document.querySelectorAll(".filter-buttons button")
        .forEach(btn => btn.classList.remove("active"));

    event.target.classList.add("active");
    displayTasks();
}

function getFilteredTasks() {
    const today = new Date().toISOString().split("T")[0];

    if (currentFilter === "pending") return tasks.filter(t => !t.completed);
    if (currentFilter === "completed") return tasks.filter(t => t.completed);
    if (currentFilter === "today") return tasks.filter(t => t.date === today);
    if (currentFilter === "overdue") return tasks.filter(t => t.date < today && !t.completed);

    return tasks;
}

function displayTasks() {
    const list = document.getElementById("tasksList");
    const filtered = getFilteredTasks();

    if (filtered.length === 0) {
        list.innerHTML = "<p style='text-align:center;'>✨ No tasks here</p>";
        return;
    }

    list.innerHTML = filtered.map(task => `
        <div class="task-item ${task.completed ? "completed" : ""}">
            <span onclick="toggleTask(${task.id})">${task.text}</span>
            <div class="task-actions">
                <button class="edit-btn" onclick="toggleTask(${task.id})">✔</button>
                <button class="delete-btn" onclick="deleteTask(${task.id})">✖</button>
            </div>
        </div>
    `).join("");
}

function updateStats() {
    document.getElementById("totalTasks").textContent = tasks.length;
    document.getElementById("completedTasks").textContent =
        tasks.filter(t => t.completed).length;
    document.getElementById("pendingTasks").textContent =
        tasks.filter(t => !t.completed).length;
}