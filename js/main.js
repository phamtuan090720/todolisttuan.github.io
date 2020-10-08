var validation = new Validation();
var taskList = new TaskList();
getlocalstorage();
getEle("addItem").addEventListener("click", function() {
    var newTask = getEle("newTask").value;
    var isValidation = true;
    isValidation &= validation.KiemTraRong("newTask", "notiInput", "(*)Không được để rỗng") && validation.KiemTraTrungTen("newTask", "notiInput", "(*)Không được trùng tên", taskList.arr);
    if (isValidation === false) return;
    if (isValidation) {
        var id = Math.random();
        var task = new Task(id, newTask, "todo");
        taskList.addTask(task);
        alert("Thêm Thành Công");
        resetInput();
    }
    drawList(taskList.arr);
    setlocalstorage();
});
// xóa Task
function deleteTask(id) {
    taskList.deleteTask(id);
    drawList(taskList.arr);
    setlocalstorage();
    alert("Xóa Thành Công");
}
//Update Status
function ChangeStatusTask(id) {
    var task = taskList.getTaskById(id);
    if (task.status === "todo") {
        task.status = "completed";
        taskList.updateTask(task);
    } else {
        task.status = "todo";
        taskList.updateTask(task);
    }
    drawList(taskList.arr);
    setlocalstorage();
    alert("Đổi Status Thành Công");
}
// reset value Input
function resetInput() {
    getEle("newTask").value = "";
}

function drawList(arr) {
    var contentTodo = "";
    var contentCompleted = "";
    getEle("todo").innerHTML = "";
    getEle("completed").innerHTML = "";

    arr.forEach(function(item) {
        if (item.status === "todo")
            contentTodo += renderListHtml(item);
        else if (item.status === "completed")
            contentCompleted += renderListHtml(item);
    });
    getEle("todo").innerHTML = contentTodo;
    getEle("completed").innerHTML = contentCompleted;

}

function renderListHtml(task) {
    return `<li>
    <span>${task.taskName}</span>
    <div class="button">
        <button class="remove"
        onclick="deleteTask(${task.id})">
        <i class="fa fa-trash-alt" ></i>
      </button>
        <button class="complete"
        onclick="ChangeStatusTask(${task.id})">
        <i class="fa fa-check-circle"></i>
      </button>
    </div>

</li>`;
};

function getlocalstorage() {
    if (localStorage.getItem("ListTask")) {
        taskList.arr = JSON.parse(localStorage.getItem("ListTask"));
    }
    drawList(taskList.arr, "todo");
};

function setlocalstorage() {
    localStorage.setItem("ListTask", JSON.stringify(taskList.arr));
};

function getEle(id) {
    return document.getElementById(id);
};