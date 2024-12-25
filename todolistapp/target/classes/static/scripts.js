document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("todo-input");
  const addButton = document.getElementById("add-todo");
  const todoList = document.getElementById("todo-list");
  const completedCount = document.getElementById("completed-count");
  const totalCount = document.getElementById("total-count");

  let completed = 0;
  let total = 0;

  function updateCounts() {
      completedCount.textContent = completed;
      totalCount.textContent = total;
  }

  function addTodo() {
      console.log("Add todo clicked");
      const todoText = input.value.trim();
      if (!todoText) return;

      const todoData = { text: todoText, completed: false };

      fetch('/api/todos', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(todoData)
      })
      .then(response => response.json())
      .then(data => {
          const todoItem = document.createElement('li');
          todoItem.classList.add('todo-item');
          todoItem.setAttribute('data-id', data.id); // Store the ID for later use

          const textSpan = document.createElement('span');
          textSpan.textContent = data.text;
          textSpan.classList.add('todo-text');

          const actionsDiv = document.createElement('div');
          actionsDiv.classList.add('todo-actions');

          const completeButton = document.createElement('button');
          completeButton.innerHTML = "&#10003;";
          completeButton.classList.add('check-btn');
          completeButton.addEventListener('click', () => {
              const todoId = todoItem.getAttribute('data-id');
              updateTodoStatus(todoId, !data.completed, todoItem);
          });

          const deleteButton = document.createElement('button');
          deleteButton.innerHTML = "&#128465;";
          deleteButton.classList.add('delete-btn');
          deleteButton.addEventListener('click', () => {
              const todoId = todoItem.getAttribute('data-id');
              deleteTodoById(todoId, todoItem);
          });

          actionsDiv.appendChild(completeButton);
          actionsDiv.appendChild(deleteButton);
          todoItem.appendChild(textSpan);
          todoItem.appendChild(actionsDiv);
          todoList.appendChild(todoItem);
          total++;
          updateCounts();
          input.value = '';
      })
      .catch(error => console.error('Error:', error));
  }

  function updateTodoStatus(id, completedStatus, todoItem) {
      fetch(`/api/todos/${id}`, {
          method: 'PATCH',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({ completed: completedStatus })
      })
      .then(response => response.json())
      .then(data => {
          todoItem.classList.toggle('completed');
          if (completedStatus) {
              completed++;
              celebrate();
          } else {
              completed--;
          }
          updateCounts();
      })
      .catch(error => console.error('Error:', error));
  }

  function deleteTodoById(id, todoItem) {
      fetch(`/api/todos/${id}`, {
          method: 'DELETE'
      })
      .then(() => {
          if (todoItem.classList.contains('completed')) {
              completed--;
          }
          total--;
          todoItem.remove();
          updateCounts();
      })
      .catch(error => console.error('Error:', error));
  }

  // Confetti celebration function
  function celebrate() {
      confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
      });
  }

  addButton.addEventListener('click', addTodo);
  input.addEventListener('keypress', (event) => {
      if (event.key === 'Enter') {
          addTodo();
      }
  });
});
