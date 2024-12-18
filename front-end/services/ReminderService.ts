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
    const errorData = await response.json();
    const errorMessage = errorData?.error || 'Failed to create reminder. Please try again later.';
    throw new Error(errorMessage); 
  }
  return response.json();
};

const reminderService = {
  createReminder,
};

export default reminderService;