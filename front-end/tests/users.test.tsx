import { render, screen, fireEvent } from '@testing-library/react';
import UserTable from '../components/users/userTable'; 
import userService from '../services/UserService';
import React from 'react'; 


jest.mock('../services/UserService', () => ({
    deleteUser: jest.fn(),
}));

describe('UserTable Component', () => {
    const mockUsers = [
        { id: 1, name: 'John Doe', email: 'john@example.com' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
    ];

    test('Given the user is not an admin, When the UserTable is rendered, Then the table shows names and emails without "Actions" column', () => {
        // Given
        const isAdmin = false;

        // When
        render(<UserTable users={mockUsers} isAdmin={isAdmin} />);

        // Then
        expect(screen.getByText('John Doe'))
        expect(screen.getByText('john@example.com'))
        expect(screen.getByText('Jane Smith'))
        expect(screen.getByText('jane@example.com'))
        expect(screen.queryByText('Actions'))
    });

    test('Given the user is an admin, When the UserTable is rendered, Then the table shows names, emails, and the "Actions" column with delete buttons', () => {
        // Given
        const isAdmin = true;

        // When
        render(<UserTable users={mockUsers} isAdmin={isAdmin} />);

        // Then
        expect(screen.getByText('Actions'))
        const deleteButtons = screen.getAllByText('Delete');
        expect(deleteButtons.length).toBe(mockUsers.length);  
    });

    test('Given the user is an admin and clicks the delete button, When the delete button is clicked and the user confirms, Then deleteUser is called with the correct user id', () => {
        // Given
        window.confirm = jest.fn(() => true); 
        const mockDeleteUser = jest.spyOn(userService, 'deleteUser');
        const isAdmin = true;

        render(<UserTable users={mockUsers} isAdmin={isAdmin} />);

        // When
        const deleteButtons = screen.getAllByText('Delete');
        fireEvent.click(deleteButtons[0]); 

        // Then
        expect(window.confirm).toHaveBeenCalledWith(
            'Are you sure you want to delete this user?'
        );
        expect(mockDeleteUser).toHaveBeenCalledWith(1); 
    });

    test('Given the user is an admin and clicks the delete button, When the delete button is clicked and the user cancels, Then deleteUser is not called', () => {
        // Given
        window.confirm = jest.fn(() => false); 
        const mockDeleteUser = jest.spyOn(userService, 'deleteUser');
        const isAdmin = true;

        render(<UserTable users={mockUsers} isAdmin={isAdmin} />);

        // When
        const deleteButtons = screen.getAllByText('Delete');
        fireEvent.click(deleteButtons[0]); 

        // Then
        expect(window.confirm).toHaveBeenCalledWith(
            'Are you sure you want to delete this user?'
        );
        expect(mockDeleteUser).not.toHaveBeenCalled(); 
    });
});
