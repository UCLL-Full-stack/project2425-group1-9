import { Reminder } from "../model/Reminder";

type UserRole = 'admin' | 'user'

type UserInput = {
    id?: number;            
    name: string;            
    email: string;           
    password: string; 
    tasks: [];     
};


type ReminderInput = {
    id?: number;            
    reminderTime: Date;  
    taskId: number;    
};

type TagInput = {
    id?: number;             
    name: string;            
};

type TaskInput = {
    id?: number;            
    title: string;           
    description: string;    
    priority: 'low' | 'medium' | 'high';
    deadline: Date;          
    status: 'not finished' | 'finished';
    tags: []     
    reminder?: Reminder; 
};


export {
    UserInput,
    ReminderInput,
    TagInput,
    TaskInput,
};
