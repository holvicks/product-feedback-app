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
  category?: string; // e.g. 'UI' | 'UX' | 'ENHANCEMENT' | 'BUG' | 'FEATURE'
  status?: string;   // e.g. 'SUGGESTION' | 'PLANNED' | 'IN_PROGRESS' | 'LIVE'
  upvotes?: number;
  // Permit additional properties from API
  [key: string]: unknown;
};