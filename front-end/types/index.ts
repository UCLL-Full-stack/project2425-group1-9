export type User =  {
    id?: number,
    name?: string,
    email?: string,
    password?: string,
    role?: string,
}

export type Task = {
    id?: number;            
    title: string;           
    description: string;    
    priority: string
    deadline: Date;          
    status: string;
    tags: Tag[]   
    reminder?: Reminder; 
    user: User; 
};


export type Reminder = {
    id?: number;            
    reminderTime: Date;  
    reminderMessage: string;
};

export type Tag = {
    id?: number;             
    name: string;            
};

export type StatusMessage = {
    message: string;
    type: "error" | "success";
};