import 'colors';
import { inquirerMenu, pause, readInput, deleteTasksList, confirm, showCheckList} from './helpers/inquirer.js';
import { readDB, saveData } from './helpers/saveData.js';
import Tasks from './models/tasks.js';

const main = async () => {
  let opt = '';

  const tasks = new Tasks();
  const taskDB = readDB()

  if(taskDB) {
    tasks.loadDataFromDB(taskDB)
  }

  do {
    opt = await inquirerMenu();

    switch (opt) {
      case '1':
        const desc = await readInput('Description: ');
        tasks.createTask(desc);
        break;
      case '2':
        tasks.listAll()
        break;
      case '3':
        tasks.listCompletedPending()
        break;
      case '4':
        tasks.listCompletedPending(false)
        break;
      case '5':
        const ids = await showCheckList(tasks.listArr);
        console.log({ids});
        tasks.toggleCompleted(ids);
        break;
      case '6':
        const id = await deleteTasksList(tasks.listArr);

        if(id !== '0') {
          const confirmDelete = await confirm('Confirm Delete');
          if(confirmDelete) {
            tasks.deleteTask(id);
            console.log(`Task with id: ${id} deleted`.red);
          }
        }
        break;
    }

    saveData(tasks.listArr);

    if (opt !== '0') await pause();
  } while (opt !== '0');
};

main();
