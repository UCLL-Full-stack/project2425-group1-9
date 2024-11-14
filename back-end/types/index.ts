import { Tag, User } from "@prisma/client";
import { Reminder } from "../model/Reminder";


type UserInput = {
    id?: number;            
    name: string;            
    email: string;           
    password: string; 
};


type ReminderInput = {
    id?: number;            
    reminderTime: Date;  
};

type TagInput = {
    id?: number;             
    name: string;            
};

type TaskInput = {
    id?: number;            
    title: string;           
    description: string;    
    priority: string;
    deadline: Date;          
    status: string;
    tags: TagInput[]
    reminder?: ReminderInput; 
    user: UserInput
};


export {
    UserInput,
    ReminderInput,
    TagInput,
    TaskInput,
};
