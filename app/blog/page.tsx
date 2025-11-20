import BlogSystem from "@/components/BlogSystem";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

export const metadata = {
  title: "Blog | Bridge Homies",
  description: "Latest insights on web development, design, and technology",
};

export default function BlogPage() {
  return (
    <>
      <Navbar />
      <BlogSystem />
      <Footer />
    </>
  );
}
