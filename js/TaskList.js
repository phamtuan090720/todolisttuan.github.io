function TaskList() {
    this.arr = [];
    this.addTask = function(task) {
        this.arr.push(task);
    };
    this._findIndex = function(id) {
        return this.arr.findIndex(function(item) {
            return item.id === id;
        });
    };
    this.deleteTask = function(id) {
        index = this._findIndex(id);
        if (index !== -1) {
            this.arr.splice(index, 1);
        }
    }
    this.getTaskById = function(id) {
        var task;
        this.arr.forEach(function(item) {
            if (item.id === id)
                task = item;
        })
        return task;
    }
    this.updateTask = function(task) {
        index = this._findIndex(task.id);
        if (index !== -1) {
            this.arr[index] = task;
        }
    }
}