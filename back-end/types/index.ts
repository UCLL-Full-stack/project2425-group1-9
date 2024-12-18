type UserInput = {
    id?: number;            
    name: string;            
    email: string;           
    password: string; 
    role: Role;
};


type ReminderInput = {
    id?: number;            
    reminderTime: Date; 
    reminderMessage: string; 
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

type AuthenticationResponse = {
    token: string;
    name: string;
    role: string;
};

type Role = 'admin' | 'user' | 'guest';


export {
    UserInput,
    ReminderInput,
    TagInput,
    TaskInput,
    Role,
    AuthenticationResponse,
};
