import Task from './task.js';

class Tasks {
  /**
   * _list
   * { 'uuiddsadsadaas1': { id: 1, desc: 'description', completedAt: 'completed at date}},
   * { 'uuiddsadsadaas2': { id: 2, desc: 'description', completedAt: 'completed at date}},
   * { 'uuiddsadsadaas3': { id: 3, desc: 'description', completedAt: 'completed at date}},
   */

  _list = {};

  constructor() {
    this._list = {};
  }

  deleteTask(id = '') {
    if (this._list[id]) {
      delete this._list[id];
    }
  }

  get listArr() {
    const taskList = [];
    Object.keys(this._list).forEach((key) => {
      const task = this._list[key];
      taskList.push(task);
    });

    return taskList;
  }

  createTask(desc = '') {
    const task = new Task(desc);
    this._list[task.id] = task;
  }

  loadDataFromDB(tasks = []) {
    tasks.forEach((task) => {
      this._list[task.id] = task;
    });
  }

  listAll() {
    console.log();
    this.listArr.forEach((task, index) => {
      const idx = `${index + 1}.`.green;
      const { desc, completedAt } = task;
      const status = completedAt ? 'Completed'.green : 'Pending'.red;

      console.log(`${idx} ${desc} :: ${status}`);
    });
  }

  listCompletedPending(completed = true) {
    console.log();

    let index = 0;
    this.listArr.forEach((task) => {
      const { desc, completedAt } = task;
      const status = completedAt ? 'Completed'.green : 'Pending'.red;

      if (completed) {
        if (completedAt) {
          index += 1;
          console.log(`${(index + '.').green} ${desc} :: ${completedAt.green}`);
        }
      } else {
        if (!completedAt) {
          index += 1;
          console.log(`${(index + '.').green} ${desc} :: ${status}`);
        }
      }
    });
  }

  toggleCompleted = (ids = []) => {
    ids.forEach((id) => {
      const task = this._list[id];

      if (!task.completedAt) {
        task.completedAt = new Date().toISOString();
      }
    });

    this.listArr.forEach((task) => {
      if (!ids.includes(task.id)) {
        this._list[task.id].completedAt = null;
      }
    });
  };
}

export default Tasks;
