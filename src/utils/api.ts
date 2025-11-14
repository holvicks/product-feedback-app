export const BASE_URL = import.meta.env.VITE_BASE_URL as string;
export const TOKEN = import.meta.env.VITE_TOKEN as string;

export interface Comment {
  id: string;
  title?: string;
  content?: string;
  category: string; 
  status?: string;
  upvotes?: number;
  replies?: {
    content: string;
    replyingTo: string;
    user: {
      image?: string;
      name?: string;
      username?: string;
    };
  }[];
}

export interface Feedback {
  id: string;
  title: string;
  description: string;
  comments?: Comment[];
}

export interface postFeedack {
    id?:string;
    title:string;
    category?:string;
    content?:string;
}


export const fetchFeedbacks = async (): Promise<Comment[]> => {
  const res = await fetch(
    `${BASE_URL}/comments/679e3f91-3440-4b63-9685-45ba8bf17efc`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${TOKEN}`,
      },
    }
  );

  if (!res.ok) {
    throw new Error(`Failed to fetch feedbacks (${res.status})`);
  }

  const data = await res.json();

  // Return the comments array directly
  return data.data.productRequest?.comments || [];
};



export interface PostFeedback {
  title: string;
  content: string;  
  category: string; 
}

export const postFeedback = async (feedbackData: PostFeedback): Promise<any> => {
  
  const res = await fetch(`${BASE_URL}/comments/679e3f91-3440-4b63-9685-45ba8bf17efc`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${TOKEN}`,
    },
    body: JSON.stringify(feedbackData),
  });

  if (!res.ok) {
    throw new Error(`Failed to post feedback (${res.status})`);
  }

  const data = await res.json();
  return data;
};













