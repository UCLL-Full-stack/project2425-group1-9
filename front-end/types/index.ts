export type User =  {
    id: number,
    name: string,
    email: string,
    password: string,
    tasks: Task[]
}

export type Task = {
    id?: number;            
    title: string;           
    description: string;    
    priority: 'low' | 'medium' | 'high';
    deadline: Date;          
    status: string;
    tags: Tag[]   
    reminder?: Reminder; 
};


export type Reminder = {
    id: number;            
    reminderTime: Date;  
};

export type Tag = {
    id: number;             
    name: string;            
};