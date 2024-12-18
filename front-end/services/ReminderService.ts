import { Reminder } from "@/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL;


const createReminder = async (reminderInput: Reminder): Promise<any> => {
  const token = JSON.parse(localStorage.getItem('loggedInUser'))?.token;
  const response = await fetch(`${API_URL}/reminders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(reminderInput),
  });
  
  if (!response.ok) {
    throw new Error('Failed to create reminder');
  }
  return response.json();
};

const reminderService = {
  createReminder,
};

export default reminderService;