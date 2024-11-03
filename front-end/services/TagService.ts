const API_URL = process.env.NEXT_PUBLIC_API_URL;
import { Tag } from "@/types";


export const getTags = async (): Promise<Tag[]> => {
  const response = await fetch(`${API_URL}/tags`);
  if (!response.ok) {
    throw new Error('Failed to fetch tags');
  }
  return response.json();
};
