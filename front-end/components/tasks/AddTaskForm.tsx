import React, { useState } from 'react';
import { Task, Tag } from '../../types';
import taskService from '../../services/TaskService';

type Props = {
  userId: number;
  onTaskAdded: (newTask: Task) => void;
};

const AddTaskForm: React.FC<Props> = ({ userId, onTaskAdded }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('low');
  const [deadline, setDeadline] = useState<string>('');
  const [tags, setTags] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newTask: Task = {
      title,
      description,
      priority,
      deadline: new Date(deadline),
      status: 'not finished',
      tags: tags.split(',').map(tag => ({ id: Math.random(), name: tag.trim() })), // Create Tag objects
    };

    try {
      const createdTask = await taskService.createTask(newTask);
      onTaskAdded(createdTask);
      setTitle('');
      setDescription('');
      setPriority('low');
      setDeadline('');
      setTags('');
    } catch (error) {
      console.error('Failed to add task:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Title:</label>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
      </div>
      <div>
        <label>Description:</label>
        <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} required />
      </div>
      <div>
        <label>Priority:</label>
        <select value={priority} onChange={(e) => setPriority(e.target.value as 'low' | 'medium' | 'high')}>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>
      <div>
        <label>Deadline:</label>
        <input type="date" value={deadline} onChange={(e) => setDeadline(e.target.value)} required />
      </div>
      <div>
        <label>Tags (comma separated):</label>
        <input type="text" value={tags} onChange={(e) => setTags(e.target.value)} placeholder="tag1, tag2, tag3" />
      </div>
      <button type="submit">Add Task</button>
    </form>
  );
};

export default AddTaskForm;