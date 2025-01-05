// Switch theme
document.body.className = localStorage.getItem("theme") || "";
const btnTheme = document.getElementById("theme");

function renderIcon() {
  document.body.classList == ""
    ? (btnTheme.innerHTML = `<i class="fa-solid fa-sun"></i>`)
    : (btnTheme.innerHTML = `<i class="fa-solid fa-moon"></i>`);
}
renderIcon();

btnTheme.addEventListener("click", () => {
  document.body.classList.toggle("light");
  renderIcon();
  localStorage.setItem("theme", document.body.className);
});

// Fix container position based on screen width or number of To-Do items
const container = document.querySelector(".container");
container.style.top = localStorage.getItem("top")
  ? localStorage.getItem("top") + "px"
  : "auto";

function fixContainer() {
  const rect = container.getBoundingClientRect();
  if (window.innerHeight <= 600) {
    container.style.top = "50px";
  } else {
    if (window.innerWidth > 1300) {
      if (todos.length > 8) {
        container.style.top = rect.top + "px";
        localStorage.setItem("top", rect.top);
      } else container.style.top = "auto";
    } else if (todos.length > 5) {
      container.style.top = rect.top + "px";
      localStorage.setItem("top", rect.top);
    } else {
      container.style.top = "auto";
    }
  }
}

// Handle Container flexibility
function updateHeight() {
  container.style.height = `${container.scrollHeight}px`;
}
updateHeight();

function decreaseHeight() {
  if (!todos.length) {
    container.style.height = "300px";
  } else {
    container.style.height =
      container.scrollHeight -
      (34 + ((todos.length - 1) * 16) / todos.length) +
      "px";
  }
}

// To-Do functionality
const btnReset = document.querySelector(".reset");
const h2Info = document.querySelector("h2");

let todos = localStorage.getItem("todos")
  ? JSON.parse(localStorage.getItem("todos"))
  : [];

function todoItem(item, index) {
  const li = document.createElement("li");
  li.innerHTML = `<div>
            <input type="checkbox" id="${index}" ${
    item.done ? "checked" : ""
  } onChange="handleCheck(${index})"/>
            <label style="text-decoration: ${
              item.done ? `line-through` : `none`
            }" for="${index}">${item.task}</label>
          </div>
          <i class="fa-solid fa-trash remove" title="حذفش کن" onClick="removeTodo(${index})"></i>`;

  return li;
}

function handleCheck(index) {
  const currentTodoItem = todos[index];
  todos[index] = {
    task: currentTodoItem.task,
    done: !currentTodoItem.done,
  };
  renderTodos();
}

function renderTodos() {
  const ul = document.createElement("ul");

  todos.forEach((item, index) => {
    ul.append(todoItem(item, index));
  });

  document.querySelector(".ul").innerHTML = ul.outerHTML;
  renderReset();
  infoVisibility();
  updateHeight();

  localStorage.setItem("todos", JSON.stringify(todos));
}

document.forms[0].addEventListener("submit", (e) => {
  e.preventDefault();
  const inputValue = e.target.elements[0].value;

  if (inputValue) {
    todos.push({
      task: inputValue,
      done: false,
    });
  } else {
    const input = document.querySelector("form input");
    input.classList.add("animate__animated", "animate__shakeX");
    input.addEventListener("animationend", () => {
      input.classList.remove("animate__animated", "animate__shakeX");
    });
  }

  fixContainer();

  renderTodos();
  updateHeight();
  e.target.elements[0].value = "";
});

renderTodos();

//Remove unique item

function removeTodo(index) {
  document.getElementsByTagName("li")[index].className =
    "animate__animated animate__backOutLeft";

  setTimeout(() => {
    todos = todos.filter((item, i) => i !== index);
    if (window.innerWidth > 1300) {
      if (todos.length <= 8) {
        localStorage.removeItem("top");
      }
    } else if (todos.length <= 5) {
      localStorage.removeItem("top");
    }

    fixContainer();
    renderTodos();
    renderReset();
    decreaseHeight();
  }, 380);
}

// Remove all todos - Rest button visibility

function renderReset() {
  !todos.length
    ? (btnReset.style.display = "none")
    : (btnReset.style.display = "flex");
}

renderReset();

btnReset.addEventListener("click", () => {
  const list = document.querySelector(".ul");
  list.classList.add("animate__animated", "animate__zoomOut");
  list.addEventListener("animationend", () => {
    list.classList.remove("animate__animated", "animate__zoomOut");
  });

  setTimeout(() => {
    todos = [];
    localStorage.removeItem("todos");
    localStorage.removeItem("top");
    renderTodos();
    fixContainer();
    renderReset();
    container.style.height = "300px";
  }, 400);
});

// Info text visibility

function infoVisibility() {
  todos.length
    ? (h2Info.style.display = "none")
    : (h2Info.style.display = "block");
}
