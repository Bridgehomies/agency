// app/blog/page.tsx
import BlogSystem from '@/components/BlogSystem';

export const metadata = {
  title: 'Blog | Your Agency Name',
  description: 'Latest insights on web development, design, and technology'
};

export default function BlogPage() {
  return <BlogSystem />;
}