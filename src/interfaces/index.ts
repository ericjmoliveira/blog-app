export interface Post {
  id: string;
  userId: string;
  slug: string;
  title: string;
  subtitle?: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}
