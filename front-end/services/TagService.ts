const API_URL = process.env.NEXT_PUBLIC_API_URL;
import { Tag } from "@/types";


const getAllTags = async (): Promise<Tag[]> => {
  const token = JSON.parse(localStorage.getItem('loggedInUser'))?.token;
  const response = await fetch(`${API_URL}/tags`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch tasks');
  }
  return response.json(); 
};


const tagService = {
  getAllTags,
};

export default tagService;