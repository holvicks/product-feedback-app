export type Feedback = {
  id?: string;
  title?: string;
  description?: string;
  comments?: Comment[];
};

export type Comment = {
  id?: string;
  title: string;
  content?: string;
  description?: string;
  detail?: string;
  category?: string; 
  status?: string;   
  upvotes?: number;
  // Permit additional properties from API
  [key: string]: unknown;
};