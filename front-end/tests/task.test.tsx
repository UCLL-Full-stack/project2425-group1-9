import { render, screen, fireEvent } from '@testing-library/react';
import TaskTable from '../components/tasks/taskTable';
import { Task } from '../types';

jest.mock('@/services/TaskService', () => ({
    updateTask: jest.fn(),
    deleteTask: jest.fn(),
}));

describe('TaskTable Component', () => {
    const currentDate = new Date(); 
    const futureDate = new Date(currentDate);
    futureDate.setDate(futureDate.getDate() + 5); 

    const mockTasks: Task[] = [
        {
            id: 1,
            title: 'Task 1',
            description: 'Description for task 1',
            priority: 'High',
            deadline: futureDate,
            tags: [{ name: 'Urgent' }],
            status: 'not done',
            reminder: null,
            user: { name: 'John Doe' },
        },
        {
            id: 2,
            title: 'Task 2',
            description: 'Description for task 2',
            priority: 'Medium',
            deadline: futureDate,
            tags: [{ name: 'Important' }],
            status: 'done',
            reminder: { reminderTime: new Date(currentDate.getTime() + 2 * 60 * 60 * 1000), reminderMessage: "test" },
            user: { name: 'Jane Smith' },
        },
    ];

    test('Given the user is an admin, When the TaskTable is rendered, Then the table shows task details including "User" column', () => {
        // Given
        const isAdmin = true;
        const onEdit = jest.fn();

        // When
        render(<TaskTable tasks={mockTasks} onEdit={onEdit} />);

        // Then
        expect(screen.getByText('User'))
        expect(screen.getByText('Task 1'))
        expect(screen.getByText('John Doe'))
        expect(screen.getByText('Task 2')) 
        expect(screen.getByText('Jane Smith'))
    });

    test('Given the user is not an admin, When the TaskTable is rendered, Then the "User" column is not shown', () => {
        // Given
        const isAdmin = false;
        const onEdit = jest.fn();

        // When
        render(<TaskTable tasks={mockTasks} onEdit={onEdit} />);

        // Then
        expect(screen.queryByText('User')).toBeNull();
        expect(screen.getByText('Task 1'))
        expect(screen.getByText('Task 2'))
    });

    test('Given the user clicks on the description, When the description is clicked, Then the full description modal should open', () => {
        // Given
        const isAdmin = true;
        const onEdit = jest.fn();

        render(<TaskTable tasks={mockTasks} onEdit={onEdit} />);

        // When
        fireEvent.click(screen.getByText('Description for task 1'));

        // Then
        expect(screen.getByText('Full Description'))
        expect(screen.getByText('Description for task 1'))
    });

    test('Given the user clicks the delete button, When the delete button is clicked, Then the deleteTask function should be called with the correct task ID', () => {
        // Given
        const isAdmin = true;
        const onEdit = jest.fn();
        const mockDeleteTask = jest.fn();

        render(<TaskTable tasks={mockTasks} onEdit={onEdit} />);

        // When
        fireEvent.click(screen.getByText('Delete Task'))

        // Then
        expect(mockDeleteTask).toHaveBeenCalledWith(1)
    });

    test('Given the user clicks the toggle status button, When the status toggle button is clicked, Then the task status should be updated', async () => {
        // Given
        const isAdmin = true;
        const onEdit = jest.fn();
        const mockUpdateTask = jest.fn();
        const task = mockTasks[0];

        render(<TaskTable tasks={mockTasks} onEdit={onEdit} />);

        // When
        fireEvent.click(screen.getByText('not done'));

        // Then
        expect(mockUpdateTask).toHaveBeenCalledWith(expect.objectContaining({ status: 'done' })); 
    });
});
