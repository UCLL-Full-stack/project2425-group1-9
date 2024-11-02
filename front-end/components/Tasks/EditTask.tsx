// components/EditTask.tsx

import React, { useState } from 'react';
import styles from '@styles/EditTask.module.css';

const EditTask: React.FC<{ task: any; onUpdate: (task: any) => void; onCancel: () => void; }> = ({ task, onUpdate, onCancel }) => {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [priority, setPriority] = useState(task.priority);
  const [deadline, setDeadline] = useState(task.deadline);
  const [tags, setTags] = useState(task.tags.join(', ')); // Zorg ervoor dat tags worden weergegeven in een door komma's gescheiden formaat
  const [status, setStatus] = useState(task.status);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const updatedTask = {
      ...task,
      title,
      description,
      priority,
      deadline,
      tags: tags.split(',').map((tag: string) => tag.trim()), // Geef tag een expliciet type
      status,
    };

    onUpdate(updatedTask);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h2 className={styles.title}>Edit Task</h2>
      <div>
        <label className={styles.label}>Title:</label>
        <input 
          type="text" 
          className={styles.input} 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
          required 
        />
      </div>
      <div>
        <label className={styles.label}>Description:</label>
        <textarea 
          className={styles.textarea} 
          value={description} 
          onChange={(e) => setDescription(e.target.value)} 
        />
      </div>
      <div>
        <label className={styles.label}>Priority:</label>
        <select 
          className={styles.select} 
          value={priority} 
          onChange={(e) => setPriority(e.target.value)}
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>
      <div>
        <label className={styles.label}>Deadline:</label>
        <input 
          type="datetime-local" 
          className={styles.input} 
          value={deadline} 
          onChange={(e) => setDeadline(e.target.value)} 
        />
      </div>
      <div>
        <label className={styles.label}>Tags (comma separated):</label>
        <input 
          type="text" 
          className={styles.input} 
          value={tags} 
          onChange={(e) => setTags(e.target.value)} 
        />
      </div>
      <div>
        <label className={styles.label}>Status:</label>
        <select 
          className={styles.select} 
          value={status} 
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="not finished">Not Finished</option>
          <option value="finished">Finished</option>
        </select>
      </div>
      <button type="submit" className={styles.button}>Update</button>
      <button type="button" onClick={onCancel} className={styles.button}>Cancel</button>
    </form>
  );
};

export default EditTask;