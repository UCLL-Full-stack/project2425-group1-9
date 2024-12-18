import database from '../repository/database';
import bcrypt from 'bcrypt';



const seedDatabase = async () => {
  await database.task.deleteMany({});
  await database.tag.deleteMany({});
  await database.reminder.deleteMany({});
  await database.user.deleteMany({});


  const user1 = await database.user.create({
    data: {
      name: 'Alice Smith',
      email: 'alice@example.com',
      password: await bcrypt.hash('password123', 12),
      role: 'admin'
    },
  });

  const user2 = await database.user.create({
    data: {
      name: 'Bob Johnson',
      email: 'bob@example.com',
      password: await bcrypt.hash('password123', 12),
      role: 'user'
    },
  });

  const tag1 = await database.tag.create({
    data: {
      name: 'Urgent',
    },
  });

  const tag2 = await database.tag.create({
    data: {
      name: 'Work',
    },
  });

  const tag3 = await database.tag.create({
    data: {
      name: 'Personal',
    },
  });

  const reminder1 = await database.reminder.create({
    data: {
      reminderTime: new Date(Date.now() + 3600000), // 1 hour from now
      reminderMessage: "Finish your task!",
      sent: false
    },
  });

  const reminder2 = await database.reminder.create({
    data: {
      reminderTime: new Date(Date.now() + 7200000), // 2 hours from now
      reminderMessage: "Finish your task!",
      sent: false
    },
  });

  const task1 = await database.task.create({
    data: {
      title: 'Finish project report',
      description: 'Complete the report for the project and submit it.',
      priority: 'high',
      deadline: new Date(Date.now() + 86400000), // 1 day from now
      status: 'not finished',
      user: { connect: { id: user1.id } },
      tags: { connect: [{ id: tag1.id }, { id: tag2.id }] },
    },
  });

  const task2 = await database.task.create({
    data: {
      title: 'Grocery shopping',
      description: 'Buy groceries for the week.',
      priority: 'medium',
      deadline: new Date(Date.now() + 43200000), // 12 hours from now
      status: 'not finished',
      user: { connect: { id: user2.id } },
      tags: { connect: [{ id: tag3.id }] },
    },
  });

  console.log('Database seeded successfully!');
};

(async () => {
  try {
    await seedDatabase();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  } finally {
    await database.$disconnect();
  }
})();