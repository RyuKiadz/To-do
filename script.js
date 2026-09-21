     var todoInput = document.getElementById("todoInput");
    var addBtn = document.getElementById("addBtn");
    var todoList = document.getElementById("todoList");

    let todos = JSON.parse(localStorage.getItem("todos")) || [];

    function saveTodos() {
      localStorage.setItem("todos", JSON.stringify(todos));
    }

    function renderTodos() {
      todoList.innerHTML = "";

      if (todos.length === 0) {
        var emptyMessage = document.createElement("li");
        emptyMessage.className = "empty";
        emptyMessage.textContent = "No tasks yet. Add one above!";
        todoList.appendChild(emptyMessage);
        return;
      }

      todos.forEach((todo) => {
        var li = document.createElement("li");
        li.className = `todo-item ${todo.completed ? "completed" : ""}`;

        var checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = todo.completed;

        checkbox.addEventListener("change", () => {
          toggleTodo(todo.id);
        });

        var text = document.createElement("span");
        text.className = "todo-text";
        text.textContent = todo.text;

        text.addEventListener("click", () => {
          toggleTodo(todo.id);
        });

        var deleteBtn = document.createElement("button");
        deleteBtn.className = "delete-btn";
        deleteBtn.textContent = "Delete";

        deleteBtn.addEventListener("click", () => {
          deleteTodo(todo.id);
        });

        li.append(checkbox, text, deleteBtn);
        todoList.appendChild(li);
      });
    }

    function addTodo() {
      var text = todoInput.value.trim();

      if (!text) {
        todoInput.focus();
        return;
      }

      var todo = {
        id: crypto.randomUUID(),
        text,
        completed: false
      };

      todos.push(todo);
      saveTodos();
      renderTodos();

      todoInput.value = "";
      todoInput.focus();
    }

    function toggleTodo(id) {
      todos = todos.map((todo) =>
        todo.id === id
          ? { ...todo, completed: !todo.completed }
          : todo
      );

      saveTodos();
      renderTodos();
    }

    function deleteTodo(id) {
      todos = todos.filter((todo) => todo.id !== id);

      saveTodos();
      renderTodos();
    }

    addBtn.addEventListener("click", addTodo);

    todoInput.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        addTodo();
      }
    });

    renderTodos();