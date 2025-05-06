document.addEventListener('DOMContentLoaded', () => {

    const todoinput = document.getElementById("task-input");
    const addbutt = document.getElementById("add-btn");
    const todolist = document.getElementById("tasks-list");
    const emptyState = document.querySelector(".empty-state");


    let task = JSON.parse(localStorage.getItem("task")) || [];

    task.forEach((tasks) => rendertask(tasks));

    toggleEmptyState();

    addbutt.addEventListener("click", () => {
        const tasktext = todoinput.value.trim();
        if (tasktext === "") return;

        const newtask = {
            id: Date.now(),
            Text: tasktext,
            completed: false,
        }
        task.push(newtask);
        saveTask();
        rendertask(newtask);
        todoinput.value = "";
        toggleEmptyState();

    });


    function rendertask(tasks) {
        const li = document.createElement("li");
        li.classList.add("task");
        if (tasks.completed) li.classList.add("completed");
        li.setAttribute("data-id", tasks.id);

        li.innerHTML = `
            <input type="checkbox" class="task-checkbox" ${tasks.completed ? "checked" : ""}>
            <span class="task-text">${tasks.Text}</span>
            <button class="delete-btn">×</button>
        `;

        const checkbox = li.querySelector(".task-checkbox");
        const deleteBtn = li.querySelector(".delete-btn");

        // Toggle completed status
        checkbox.addEventListener("change", () => {
            tasks.completed = checkbox.checked;
            if (tasks.completed) {
                li.classList.add("completed");
            } else {
                li.classList.remove("completed");
            }
            saveTask();
        });


        deleteBtn.addEventListener("click", () => {
            task = task.filter(t => t.id !== tasks.id);
            saveTask();
            li.remove();
            toggleEmptyState();
        });

        todolist.appendChild(li);
    }


    function saveTask() {
        localStorage.setItem("task", JSON.stringify(task));
    }

    function toggleEmptyState() {
        if (task.length === 0) {
            emptyState.style.display = "block";
        } else {
            emptyState.style.display = "none";
        }
    }

});