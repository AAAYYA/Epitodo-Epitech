const input = document.querySelector("input");
const ul = document.querySelector("ul");

input.addEventListener("keypress", function (event) {
  if (event.keyCode === 13 && input.value !== "") {
    addTask(input.value);
    input.value = "";
  }
});

async function addTask(task) {
  let database_id;

  const li = document.createElement("li");
  const checkbox = document.createElement("input");
  const span = document.createElement("span");
  const deleteButton = document.createElement("button");
  const editButton = document.createElement("button");

  checkbox.type = "checkbox";
  span.textContent = task;
  deleteButton.textContent = "Delete";
  deleteButton.className = "delete";
  editButton.textContent = "Edit";
  editButton.className = "edit";

  deleteButton.addEventListener("click", function () {
    deleteTask(database_id, li);
  });

  editButton.addEventListener("click", function () {
    const newTitle = prompt("Enter the new task title:");
    if (newTitle !== null && newTitle.trim() !== "") {
      editTask(database_id, newTitle.trim());
    }
  });

  li.appendChild(checkbox);
  li.appendChild(span);
  li.appendChild(editButton);
  li.appendChild(deleteButton);

  ul.appendChild(li);

  fetch('http://127.0.0.1:8080/todos', {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title: task }),
  })
    .then((response) => response.json())
    .then((data) => {
      database_id = data.id;
      console.log(data);
    })
    .catch((error) => console.error(error));
}

async function deleteTask(database_id, li) {
  fetch(`http://127.0.0.1:8080/todos/${database_id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      ul.removeChild(li);
    })
    .catch((error) => console.error(error));
}

async function editTask(taskId, newTitle) {
  const span = document.getElementById(taskId);
  if (span) {
    span.textContent = newTitle;

    const data = { title: newTitle };
    fetch(`/todos/${taskId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error(error));
  }
}
