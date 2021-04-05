var taskList = new TaskList();
var validation = new Validation();
getlocalstorage();
getEle("addItem").addEventListener("click", function () {
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

    arr.forEach(function (item) {
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
function changMonthToString(m) {
    switch (m) {
        case 1:
            return "January";
        case 2:
            return "February";
        case 3:
            return "March";
        case 4:
            return "April";
        case 5:
            return "May";
        case 6:
            return "June";
        case 7:
            return "July";
        case 8:
            return "August";
        case 9:
            return "September";
        case 10:
            return "October";
        case 11:
            return "November";
        case 12:
            return "December";
    }
}
var today = new Date();
getEle('date').innerHTML = `${changMonthToString(today.getMonth())} ${today.getDate()} ${today.getFullYear()}`;
const $ = document.querySelector.bind(document);
const $$ = (sel, con) => Array.prototype.slice.call((con || document).querySelectorAll(sel));
const DEG = Math.PI / 180;

function rotate({x, y}, a) {
  const { sin, cos } = Math;
  return {
    x: x * cos(a) - y * sin(a),
    y: x * sin(a) + y * cos(a)
  };
}

function translate({x, y}, tx, ty) {
  return {
    x: x + tx,
    y: y + ty
  }
}
let mode = 'light';
$('.darkmode-checkbox').addEventListener('click', () => {
  document.body.classList.toggle('darkmode');
  // old msedge compatibility:
  const isDarkmode = (document.body.classList.contains('darkmode'));
  const shadow = $('.moon-shadow');
  shadow.setAttribute('cx', isDarkmode ? '40' : '60');
  const rays = document.querySelectorAll('.rays');
  if(mode==='light'){
    for(i=0;i<rays.length;i++){
        rays[i].style.strokeDashoffset='12';
        rays[i].style.strokeDasharray='12';
    }
    mode = 'dark'
    console.log(mode);
  }
  else{
    for(i=0;i<rays.length;i++){
        rays[i].style.strokeDashoffset='24';
        rays[i].style.strokeDasharray='12';
    }
    mode = 'light'
    console.log(mode);
  } 
});
console.log(mode);

// I could not get the transforms in buggy safari to work
// Workaround: calculate the transformed coords to absolute ones:
const removeTransforms = true;

if (removeTransforms) {
  const rays = $$('.rays path');
  rays.map((ray, i) => {
    const p0 = translate(rotate({x: 0, y: -28}, i * 45 * DEG), 32, 32);
    const p1 = translate(rotate({x: 0, y: -16}, i * 45 * DEG), 32, 32);
    ray.removeAttribute('transform-origin');
    ray.removeAttribute('transform');
    ray.setAttribute('d', `M${p0.x} ${p0.y} L${p1.x} ${p1.y}`);
  });  
}
