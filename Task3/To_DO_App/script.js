const todoForm = document.querySelector("#todoForm");
const todoInput = document.querySelector("#todoInput");
const todoList = document.querySelector("#todoList");
const filterButtons = document.querySelectorAll(".filter-btn");

const STORAGE_KEY = "todos";

let todos = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
let currentFilter = "all";

// ------------------------------------
// Local Storage
// ------------------------------------

function saveTodos() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
}

// ------------------------------------
// Filtering
// ------------------------------------

function getFilteredTodos() {
    if (currentFilter === "active") {
        return todos.filter(todo => !todo.completed);
    }

    if (currentFilter === "completed") {
        return todos.filter(todo => todo.completed);
    }

    return todos;
}

// ------------------------------------
// Rendering
// ------------------------------------

function renderTodos() {
    todoList.innerHTML = "";

    const filteredTodos = getFilteredTodos();

    filteredTodos.forEach(todo => {

        // Create <li>
        const li = document.createElement("li");
        li.classList.add("todo-item");

        if (todo.completed) {
            li.classList.add("completed");
        }

        li.dataset.id = todo.id;

        // Create checkbox
        const checkbox = document.createElement("input");

        checkbox.type = "checkbox";
        checkbox.classList.add("complete-checkbox");
        checkbox.checked = todo.completed;

        // Create text
        const span = document.createElement("span");

        span.classList.add("todo-text");
        span.textContent = todo.text;

        // Create delete button
        const deleteButton = document.createElement("button");

        deleteButton.type = "button";
        deleteButton.classList.add("delete-btn");
        deleteButton.textContent = "Delete";

        // Add elements inside <li>
        li.append(
            checkbox,
            span,
            deleteButton
        );

        // Add <li> to <ul>
        todoList.append(li);
    });
}

// ------------------------------------
// Add Todo
// ------------------------------------

todoForm.addEventListener("submit", event => {

    event.preventDefault();

    const text = todoInput.value.trim();

    if (!text) {
        return;
    }

    const newTodo = {
        id: crypto.randomUUID(),
        text: text,
        completed: false
    };

    todos.push(newTodo);

    saveTodos();

    renderTodos();

    todoInput.value = "";

    todoInput.focus();
});

// ------------------------------------
// Delete Todo
// ------------------------------------

function deleteTodo(todoId) {

    todos = todos.filter(todo => {
        return todo.id !== todoId;
    });

    saveTodos();

    renderTodos();
}

// ------------------------------------
// Toggle Todo
// ------------------------------------

function toggleTodo(todoId) {

    todos = todos.map(todo => {

        if (todo.id === todoId) {

            return {
                ...todo,
                completed: !todo.completed
            };
        }

        return todo;
    });

    saveTodos();

    renderTodos();
}

// ------------------------------------
// Event Delegation
// ------------------------------------

todoList.addEventListener("click", event => {

    const todoItem = event.target.closest(".todo-item");

    if (!todoItem) {
        return;
    }

    const todoId = todoItem.dataset.id;

    // Delete Todo
    if (event.target.closest(".delete-btn")) {
        deleteTodo(todoId);
        return;
    }

    // Complete Todo
    if (event.target.matches(".complete-checkbox")) {
        toggleTodo(todoId);
    }
});

// ------------------------------------
// Filters
// ------------------------------------

filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        currentFilter = button.dataset.filter;

        filterButtons.forEach(btn => {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        renderTodos();
    });
});

// ------------------------------------
// Initial Render
// ------------------------------------

renderTodos();