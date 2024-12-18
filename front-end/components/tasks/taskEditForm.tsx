import { useState, useEffect } from 'react';
import taskService from '../../services/TaskService';
import tagService from '../../services/TagService'; 
import { Task, Tag } from '../../types';

type EditTaskFormProps = {
    task: Task;
    onClose: () => void;
};

const EditTaskForm: React.FC<EditTaskFormProps> = ({ task, onClose }) => {
    const [title, setTitle] = useState(task.title);
    const [description, setDescription] = useState(task.description);
    const [priority, setPriority] = useState(task.priority);
    const [deadline, setDeadline] = useState<Date | null>(new Date(task.deadline));
    const [selectedTags, setSelectedTags] = useState<Tag[]>(task.tags);
    const [availableTags, setAvailableTags] = useState<Tag[]>([]); 
    const [errors, setErrors] = useState<string[]>([]);

    useEffect(() => {
        const fetchTags = async () => {
            try {
                const tags = await tagService.getAllTags();
                setAvailableTags(tags);
            } catch (error) {
                setErrors((prev) => [...prev, 'Failed to fetch available tags.']);
            }
        };
        fetchTags();
    }, []);

    const validate = () => {
        const errorsList = [];
        if (!title.trim()) errorsList.push('Title is required.');
        if (!deadline) errorsList.push('Deadline is required.');
        setErrors(errorsList);
        return errorsList.length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;

        const updatedTask: Task = {
            ...task,
            title,
            description,
            priority,
            deadline: deadline as Date,
            tags: selectedTags,
        };

        try {
            await taskService.updateTask(updatedTask);
            onClose(); 
        } catch (err: any) {
            setErrors(Array.isArray(err.message) ? err.message : [err.message]);
        }
    };

    const toggleTagSelection = (tag: Tag) => {
        setSelectedTags((prev) =>
            prev.some((t) => t.id === tag.id)
                ? prev.filter((t) => t.id !== tag.id)
                : [...prev, tag]
        );
    };

    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md"
            >
                <h2 className="text-xl font-bold mb-4">Edit Task</h2>

                {errors.length > 0 && (
                    <ul className="text-red-600 mb-4">
                        {errors.map((error, index) => (
                            <li key={index}>{error}</li>
                        ))}
                    </ul>
                )}

                <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">Title</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full px-4 py-2 border rounded-md"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">Description</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full px-4 py-2 border rounded-md"
                    ></textarea>
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">Priority</label>
                    <select
                        value={priority}
                        onChange={(e) => setPriority(e.target.value)}
                        className="w-full px-4 py-2 border rounded-md"
                    >
                        <option value="low">low</option>
                        <option value="medium">medium</option>
                        <option value="high">high</option>
                    </select>
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">Deadline</label>
                    <input
                        type="datetime-local"
                        value={deadline ? new Date(deadline).toISOString().slice(0, 16) : ''}
                        onChange={(e) => setDeadline(new Date(e.target.value))}
                        className="w-full px-4 py-2 border rounded-md"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">Tags</label>
                    <div className="flex flex-wrap gap-2">
                        {availableTags.map((tag) => (
                            <button
                                key={tag.id}
                                type="button"
                                onClick={() => toggleTagSelection(tag)}
                                className={`px-3 py-1 rounded-md ${
                                    selectedTags.some((t) => t.id === tag.id)
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-gray-200 text-gray-800'
                                }`}
                            >
                                {tag.name}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="flex justify-between">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-500 text-white rounded-md"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="px-4 py-2 bg-blue-600 text-white rounded-md"
                    >
                        Save Changes
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditTaskForm;
