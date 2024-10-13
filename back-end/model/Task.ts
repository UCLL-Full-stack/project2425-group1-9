class Task {
    title: string;
    priority: string;
    deadline: Date;
    status: string;
    description: string;

    constructor(title: string, priority: string, deadline: Date, status: string, description: string) {
        this.title = title;
        this.priority = priority;
        this.deadline = deadline;
        this.status = status;
        this.description = description;
    }
}

export default Task;
