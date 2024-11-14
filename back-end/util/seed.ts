const tasks: Task[] = [ 
  new Task({
    id: 1,
    title: 'Complete project report',
    description: 'Finish the quarterly project report.',
    priority: 'high',
    deadline: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000),
    status: 'not finished',
    tags: [TagDb.getAllTags()[0], TagDb.getAllTags()[1]], 
    reminder: ReminderDb.getAllReminders()[0] 
  }),
  new Task({
    id: 2,
    title: 'Grocery shopping',
    description: 'Buy groceries for the week.',
    priority: 'medium',
    deadline: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000),
    status: 'not finished',
    tags: [TagDb.getAllTags()[1]], 
    reminder: ReminderDb.getAllReminders()[1] 
  }),

  new Task({
    id: 3,
    title: 'Prepare for meeting',
    description: 'Prepare slides for the upcoming client meeting.',
    priority: 'high',
    deadline: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000),
    status: 'not finished',
    tags: [TagDb.getAllTags()[2]]
  }),
];