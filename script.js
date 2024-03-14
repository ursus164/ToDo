let todoInput; // miejsce na wpisaną treść
let errorInfo; // info o braku wpisanego zadania
let addBtn; // dodanie nowych elementów do listy
let ulList; // lista zadań
let newTask;
let popup;
let popupInfo; // info o dodaniu pustego taska w popup
let todoToEdit; // edytowany task
let popupInput; //input w popup
let popupAddBtn; // przycisk zatwierdz w popup
let popupCloseBtn; // przycisk anuluj w popup

const main = () => {
  prepareDOMElements();
  prepareDOMEvents();
};

const prepareDOMElements = () => {
  todoInput = document.querySelector(".todo-input");
  errorInfo = document.querySelector(".error-info");
  addBtn = document.querySelector(".btn-add");
  ulList = document.querySelector(".todo-list ul");
  popup = document.querySelector(".popup");
  popupInfo = document.querySelector(".popup-info");
  popupInput = document.querySelector(".popup-input");
  popupAddBtn = document.querySelector(".accept");
  popupCloseBtn = document.querySelector(".cancel");
};

const prepareDOMEvents = () => {
  addBtn.addEventListener("click", addNewTask);
  ulList.addEventListener("click", checkClick);
  popupCloseBtn.addEventListener('click',closePopup)
  popupAddBtn.addEventListener('click',acceptPopup)

};

const addNewTask = () => {
  if (todoInput.value !== "") {
    newTask = document.createElement("li");
    newTask.textContent = todoInput.value;
    addTools(newTask);

    ulList.append(newTask);

    todoInput.value = "";
    errorInfo.textContent = "";
  } else {
    errorInfo.textContent = "Wpisz treść zadania!";
  }
};

const addTools = (task) => {
  const divTools = document.createElement("div");

  const checkButton = document.createElement("button");
  const editButton = document.createElement("button");
  const cancelButton = document.createElement("button");

  editButton.textContent = "EDIT";

  divTools.classList.add("tools");
  checkButton.classList.add("complete");
  editButton.classList.add("edit");
  cancelButton.classList.add("delete");

  cancelButton.innerHTML = '<i class="fas fa-times"></i>';
  checkButton.innerHTML = '<i class="fas fa-check"></i>';

  divTools.appendChild(checkButton);
  divTools.appendChild(editButton);
  divTools.appendChild(cancelButton);

  task.appendChild(divTools);
};

const checkClick = (e) => {
  // targetujemy tylko przyciski a nie całą listę
  if (e.target.matches(".complete")) {
    e.target.closest("li").classList.toggle("completed");
    e.target.classList.toggle("completed");

  } else if (e.target.matches(".edit")) {
    popupInput.value = ''
    editTask();
    todoToEdit = e.target.closest('li')

  } else if (e.target.matches(".delete")) {
    todoToEdit = e.target.closest('li')
    todoToEdit.remove();

    const allTasks = document.querySelectorAll('li')
    if(allTasks.length == 0) {
        errorInfo.textContent = "Brak zadań na liście"
    }
  }
};

const editTask = () => {
  popup.style.display = "flex";
};

const closePopup = () => {
  popup.style.display = "none";
};

const acceptPopup = () => {
    if(popupInput.value !== '') {
        todoToEdit.textContent = popupInput.value
        addTools(todoToEdit)
        popupInfo.textContent = '';
        closePopup()
    } else {
        popupInfo.textContent = "Wprowadź treść zadania!"
    }
}

document.addEventListener("DOMContentLoaded", main); // skrypty nie uruchomią się jak cała strona nie zostanie wczytana -> dopiero wtedy odpal main()
