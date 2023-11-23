class TodoList {
  constructor() {
    this.inputBox = document.getElementById("input-box");
    this.todoList = document.getElementById("todo-list");
    this.itemCount = document.getElementById("itemCount");

    this.count = 0;

    this.init();
  }

  // Function to create a Todo list item
  createTask() {
    const addButton = document.getElementById("addButton");
    addButton.addEventListener("click", () => {
      if (this.inputBox.value === "") {
        alert("You must write something!");
        return;
      }

      const li = document.createElement("li");
      li.innerHTML = this.inputBox.value;
      this.todoList.appendChild(li);

      const span = document.createElement("span");
      span.innerHTML = "&#xe020;";
      span.classList.add("glyphicon");
      li.appendChild(span);

      this.inputBox.value = "";

      // update count
      this.count++;
      this.updateCount();

      this.saveData();
    });
  }

  toggleTaskState(e) {
    const target = e.target;
    if (target.tagName === "LI") {
      target.classList.toggle("checked");
      this.saveData();
    } else if (target.tagName === "SPAN") {
      target.parentElement.remove();

      // update count
      this.count--;
      this.updateCount();

      this.saveData();
    }
  }

  updateCount() {
    this.itemCount.innerText = this.count;
  }

  // Save data on page reload
  saveData() {
    localStorage.setItem("data", this.todoList.innerHTML);
  }

  showTask() {
    const savedData = localStorage.getItem("data");

    if (savedData) {
      this.todoList.innerHTML = savedData;
      this.count = this.todoList.querySelectorAll("li").length;

      this.updateCount();
    }
  }

  init() {
    this.createTask();
    this.showTask();

    this.todoList.addEventListener("click", this.toggleTaskState.bind(this));
  }
}

const todoList = new TodoList();
