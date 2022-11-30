import { v4 as uuidv4 } from 'uuid';

class Task {
    id = '';
    desc = '';
    completedAt = null;

    constructor(desc){
        this.id = uuidv4();
        this.desc = desc;
    }
}

export default Task;