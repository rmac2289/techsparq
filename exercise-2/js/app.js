window.onload = () => {
  let incompleteTasksHolder = document.getElementById("incomplete-tasks");
  let completedTasksHolder = document.getElementById("completed-tasks");
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  const createNewTaskElement = function (taskString) {
    listItem = document.createElement("li");
    let markup = `
    <input type="checkbox" />
    <label>${taskString}</label>
    <input type="text" />
    <button class="edit">Edit</button>
    <button class="delete">Delete</button>
  `;
    listItem.innerHTML = markup;

    return listItem;
  };

  if (localStorage.getItem("tasks")) {
    tasks.map((task) => {
      let newItem = createNewTaskElement(task.name);
      console.log(task);
      if (task.isCompleted) {
        completedTasksHolder.appendChild(newItem);
        newItem.children[0].checked = true;
      } else {
        incompleteTasksHolder.appendChild(newItem);
        newItem.children[0].checked = false;
      }
    });
  }
  const addTask = function (e) {
    e.preventDefault();
    let taskInput = document.getElementById("new-task");
    let listItemName = taskInput.value;
    if (listItemName === "") {
      alert("Cannot submit empty item");
    } else {
      listItem = createNewTaskElement(listItemName);
      incompleteTasksHolder.appendChild(listItem);
      bindTaskEvents(listItem, taskCompleted);
      taskInput.value = "";
    }
    if (listItemName != "") {
      const task = {
        id: new Date().getTime(),
        name: listItemName,
        isCompleted: false,
      };

      tasks.push(task);
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  };

  const editTask = function (e) {
    e.preventDefault();
    let listItem = this.parentNode;
    let editInput = listItem.querySelectorAll("input[type=text")[0];
    let label = listItem.querySelector("label");
    let button = listItem.getElementsByTagName("button")[0];

    let containsClass = listItem.classList.contains("editMode");
    if (containsClass) {
      label.innerText = editInput.value;
      button.innerText = "Edit";
    } else {
      editInput.value = label.innerText;
      button.innerText = "Save";
    }
    listItem.classList.toggle("editMode");
  };

  const deleteTask = function () {
    let listItem = this.parentNode;
    let ul = listItem.parentNode;
    ul.removeChild(listItem);
    let removedItem = listItem.children[1].innerText;
    let updatedTasks = tasks.filter((task) => {
      return task.name !== removedItem;
    });
    console.log(updatedTasks);
    tasks = updatedTasks;
    localStorage.setItem("tasks", JSON.stringify(tasks));
  };

  const taskCompleted = function () {
    let listItem = this.parentNode;
    let completedItem = listItem.children[1].innerText;
    console.log(completedItem);
    tasks.map((task) => {
      if (task.name === completedItem) {
        task.isCompleted = true;
      }
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
    completedTasksHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskIncomplete);
  };

  const taskIncomplete = function () {
    let listItem = this.parentNode;
    let incompleteItem = listItem.children[1].innerText;
    console.log(incompleteItem);
    tasks.map((task) => {
      if (task.name === incompleteItem) {
        task.isCompleted = false;
      }
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
    incompleteTasksHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);
  };

  const bindTaskEvents = function (taskListItem, checkBoxEventHandler) {
    let checkBox = taskListItem.querySelectorAll("input[type=checkbox]")[0];
    let editButton = taskListItem.querySelectorAll("button.edit")[0];
    let deleteButton = taskListItem.querySelectorAll("button.delete")[0];
    editButton.onclick = editTask;
    deleteButton.onclick = deleteTask;
    checkBox.onchange = checkBoxEventHandler;
  };

  let addButton = document.getElementById("add-button");

  addButton.addEventListener("click", addTask);

  for (let i = 0; i < incompleteTasksHolder.children.length; i++) {
    bindTaskEvents(incompleteTasksHolder.children[i], taskCompleted);
  }

  for (let i = 0; i < completedTasksHolder.children.length; i++) {
    bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
  }
};
