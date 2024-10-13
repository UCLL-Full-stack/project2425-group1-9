import Task from '../../model/Task';

test('should create a task object', () => {
    const task = new Task('Finish project', 'high', new Date(), 'not completed', 'Finish coding task');
    expect(task).toBeDefined();
    expect(task.title).toBe('Finish project');
    expect(task.priority).toBe('high');
});

