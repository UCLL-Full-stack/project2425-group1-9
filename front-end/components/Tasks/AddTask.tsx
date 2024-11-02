// components/AddTask.tsx
import React, { useState } from 'react';
import styles from '@styles/AddTask.module.css';

const AddTask: React.FC<{ onAdd: (task: any) => void; onCancel: () => void; tasks: any[] }> = ({ onAdd, onCancel, tasks }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('medium');
  const [deadline, setDeadline] = useState('');
  const [tags, setTags] = useState<string>('');
  const [status, setStatus] = useState('not finished');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Vind de hoogste ID in de huidige takenlijst
    const existingIds = tasks.map(task => task.id);
    const newId = existingIds.length > 0 ? Math.max(...existingIds) + 1 : 1; // Neem de hoogste ID en verhoog met 1

    // Verwerk de tags, maak een array van objecten met een unieke ID
    const tagsArray = tags.split(',')
      .map(tag => tag.trim())
      .filter(tag => tag) // Filter lege tags
      .map((tag, index) => ({ id: index + 1, name: tag })); // Geef elke tag een unieke ID

    const newTask = {
      id: newId, // Voeg de nieuwe ID toe
      title,
      description,
      priority,
      deadline,
      tags: tagsArray, // Gebruik de array van tag-objecten
      status,
    };

    onAdd(newTask); // Voeg de nieuwe taak toe
    resetForm(); // Reset het formulier
  };

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setPriority('medium');
    setDeadline('');
    setTags('');
    setStatus('not finished');
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h2>Add a New Task</h2>
      <div>
        <label>Title:</label>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
      </div>
      <div>
        <label>Description:</label>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
      </div>
      <div>
        <label>Priority:</label>
        <select value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>
      <div>
        <label>Deadline:</label>
        <input type="datetime-local" value={deadline} onChange={(e) => setDeadline(e.target.value)} />
      </div>
      <div>
        <label>Tags (comma separated):</label>
        <input type="text" value={tags} onChange={(e) => setTags(e.target.value)} />
      </div>
      <div>
        <label>Status:</label>
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="not finished">Not Finished</option>
          <option value="finished">Finished</option>
        </select>
      </div>
      <button type="submit">Save</button>
      <button type="button" onClick={onCancel}>Cancel</button>
    </form>
  );
};

export default AddTask;