import React, { useState } from 'react';
import { Calendar, Clock, ArrowRight, Search, TrendingUp, Sparkles, Eye, BookOpen } from 'lucide-react';

// Sample blog data
const allBlogs = [
  {
    id: 1,
    slug: "ai-powered-web-development",
    title: "AI-Powered Web Development: The Future is Now",
    excerpt: "Discover how AI is revolutionizing the way we build modern web applications and what it means for developers",
    author: "Alex Rivera",
    authorImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
    date: "2024-11-18",
    readTime: "8 min",
    category: "AI & Development",
    tags: ["AI", "Web Development", "Future Tech"],
    views: "12.5K",
    featured: true,
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=500&fit=crop",
    content: `
      <p>Artificial Intelligence is transforming every aspect of web development, from code generation to user experience optimization. In this deep dive, we explore the cutting-edge tools and techniques that are reshaping our industry.</p>
      
      <h2>The AI Revolution in Development</h2>
      <p>Modern AI tools are not just assistants—they're collaborative partners in the development process. From GitHub Copilot to advanced design systems, AI is enabling developers to build faster and smarter than ever before.</p>
      
      <h3>Key Benefits</h3>
      <ul>
        <li>Faster prototyping and development cycles</li>
        <li>Automated code review and optimization</li>
        <li>Intelligent error detection and debugging</li>
        <li>Enhanced user personalization</li>
      </ul>
      
      <h2>Real-World Applications</h2>
      <p>Companies like Vercel, OpenAI, and Anthropic are leading the charge in creating development tools that leverage AI to streamline workflows and enhance productivity.</p>
      
      <h3>What This Means for Your Agency</h3>
      <p>Adopting AI-powered development tools can significantly reduce project timelines while improving code quality. It's not about replacing developers—it's about amplifying their capabilities.</p>
      
      <h2>Getting Started</h2>
      <p>Start by integrating AI code completion tools into your workflow. Experiment with AI-powered design tools, and gradually expand your usage as you become comfortable with the technology.</p>
    `
  },
  {
    id: 2,
    slug: "nextjs-performance-optimization",
    title: "Next.js 15 Performance: Squeeze Every Millisecond",
    excerpt: "Master advanced optimization techniques to make your Next.js applications lightning fast",
    author: "Sarah Chen",
    authorImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    date: "2024-11-15",
    readTime: "12 min",
    category: "Performance",
    tags: ["Next.js", "Performance", "Optimization"],
    views: "8.2K",
    featured: false,
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=500&fit=crop"
  },
  {
    id: 3,
    slug: "design-systems-scale",
    title: "Building Design Systems That Scale",
    excerpt: "Learn how to create and maintain design systems that grow with your organization",
    author: "Marcus Johnson",
    authorImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus",
    date: "2024-11-12",
    readTime: "10 min",
    category: "Design",
    tags: ["Design Systems", "UI/UX", "Scalability"],
    views: "15.3K",
    featured: true,
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=500&fit=crop"
  },
  {
    id: 4,
    slug: "typescript-advanced-patterns",
    title: "TypeScript Patterns Every Senior Dev Should Know",
    excerpt: "Advanced TypeScript patterns and techniques for building robust applications",
    author: "Emma Wilson",
    authorImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma",
    date: "2024-11-10",
    readTime: "15 min",
    category: "Development",
    tags: ["TypeScript", "Patterns", "Best Practices"],
    views: "9.8K",
    featured: false,
    image: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&h=500&fit=crop"
  },
  {
    id: 5,
    slug: "serverless-architecture-guide",
    title: "Serverless Architecture: Complete Guide for 2024",
    excerpt: "Everything you need to know about building serverless applications in the modern era",
    author: "David Park",
    authorImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
    date: "2024-11-08",
    readTime: "14 min",
    category: "Architecture",
    tags: ["Serverless", "Cloud", "Architecture"],
    views: "11.1K",
    featured: false,
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=500&fit=crop"
  },
  {
    id: 6,
    slug: "api-security-best-practices",
    title: "API Security: Protecting Your Digital Assets",
    excerpt: "Essential security practices every API developer needs to implement today",
    author: "Nina Patel",
    authorImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=Nina",
    date: "2024-11-05",
    readTime: "11 min",
    category: "Security",
    tags: ["Security", "API", "Best Practices"],
    views: "13.7K",
    featured: false,
    image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&h=500&fit=crop"
  }
];

const categories = ["All", "AI & Development", "Performance", "Design", "Security", "Architecture"];

export default function BlogSystem() {
  const [view, setView] = useState('listing'); // 'listing' or 'single'
  const [selectedBlog, setSelectedBlog] = useState(allBlogs[0]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredBlogs = allBlogs.filter(blog => {
    const matchesCategory = selectedCategory === 'All' || blog.category === selectedCategory;
    const matchesSearch = blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         blog.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredBlogs = allBlogs.filter(blog => blog.featured);
  const relatedBlogs = allBlogs
    .filter(blog => blog.id !== selectedBlog.id && 
            blog.tags.some(tag => selectedBlog.tags.includes(tag)))
    .slice(0, 3);

  if (view === 'single') {
    return (
      <div className="min-h-screen bg-black text-white">
        {/* Back Navigation */}
        <div className="border-b border-gray-800">
          <div className="max-w-6xl mx-auto px-6 py-4">
            <button 
              onClick={() => setView('listing')}
              className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
            >
              <ArrowRight className="w-4 h-4 rotate-180" />
              Back to all articles
            </button>
          </div>
        </div>

        {/* Hero Section */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-b from-purple-600/20 to-transparent" />
          <div className="max-w-4xl mx-auto px-6 py-16 relative">
            <div className="flex items-center gap-3 mb-6">
              <span className="px-4 py-1.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full text-sm font-bold uppercase tracking-wide">
                {selectedBlog.category}
              </span>
              <span className="flex items-center gap-1 text-gray-400">
                <Eye className="w-4 h-4" />
                {selectedBlog.views} views
              </span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-black mb-6 leading-tight bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              {selectedBlog.title}
            </h1>
            
            <p className="text-xl text-gray-400 mb-8 leading-relaxed">
              {selectedBlog.excerpt}
            </p>
            
            <div className="flex items-center gap-6">
              <img 
                src={selectedBlog.authorImage} 
                alt={selectedBlog.author}
                className="w-14 h-14 rounded-full border-2 border-purple-600"
              />
              <div>
                <p className="font-bold text-lg">{selectedBlog.author}</p>
                <div className="flex items-center gap-4 text-sm text-gray-400">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {new Date(selectedBlog.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {selectedBlog.readTime} read
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Featured Image */}
        <div className="max-w-5xl mx-auto px-6 mb-12">
          <img 
            src={selectedBlog.image} 
            alt={selectedBlog.title}
            className="w-full h-[400px] object-cover rounded-2xl border border-gray-800"
          />
        </div>

        {/* Content */}
        <div className="max-w-3xl mx-auto px-6 pb-16">
          <article 
            className="prose prose-invert prose-lg max-w-none
              prose-headings:font-black prose-headings:bg-gradient-to-r prose-headings:from-white prose-headings:to-gray-400 prose-headings:bg-clip-text prose-headings:text-transparent
              prose-h2:text-4xl prose-h2:mt-16 prose-h2:mb-6
              prose-h3:text-2xl prose-h3:mt-12 prose-h3:mb-4
              prose-p:text-gray-300 prose-p:leading-relaxed prose-p:mb-6
              prose-ul:my-6 prose-li:text-gray-300 prose-li:marker:text-purple-500
              prose-a:text-purple-400 prose-a:no-underline hover:prose-a:text-purple-300
              prose-strong:text-white prose-strong:font-bold"
            dangerouslySetInnerHTML={{ __html: selectedBlog.content }}
          />

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-16 pt-8 border-t border-gray-800">
            {selectedBlog.tags.map((tag, index) => (
              <span 
                key={index}
                className="px-4 py-2 bg-gray-900 border border-gray-800 rounded-full text-sm font-medium hover:border-purple-600 transition-colors cursor-pointer"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* Author CTA */}
          <div className="mt-16 p-8 bg-gradient-to-r from-purple-600/10 to-pink-600/10 border border-gray-800 rounded-2xl">
            <div className="flex items-center gap-4 mb-4">
              <img 
                src={selectedBlog.authorImage} 
                alt={selectedBlog.author}
                className="w-20 h-20 rounded-full border-2 border-purple-600"
              />
              <div>
                <h3 className="text-2xl font-bold">{selectedBlog.author}</h3>
                <p className="text-gray-400">Senior Software Engineer</p>
              </div>
            </div>
            <p className="text-gray-300 mb-6">
              Passionate about building scalable applications and sharing knowledge with the developer community. Follow for more insights!
            </p>
            <button className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg font-bold hover:opacity-90 transition-opacity">
              Follow Author
            </button>
          </div>
        </div>

        {/* Related Articles */}
        {relatedBlogs.length > 0 && (
          <div className="border-t border-gray-800 bg-gray-950">
            <div className="max-w-6xl mx-auto px-6 py-16">
              <h2 className="text-3xl font-black mb-8">Continue Reading</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {relatedBlogs.map((blog) => (
                  <div 
                    key={blog.id}
                    onClick={() => {setSelectedBlog(blog); window.scrollTo(0, 0);}}
                    className="group bg-gray-900 border border-gray-800 rounded-xl overflow-hidden hover:border-purple-600 transition-all cursor-pointer"
                  >
                    <div className="relative h-48 overflow-hidden">
                      <img 
                        src={blog.image} 
                        alt={blog.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-6">
                      <span className="text-xs font-bold text-purple-400 uppercase tracking-wide">
                        {blog.category}
                      </span>
                      <h3 className="text-lg font-bold mt-2 mb-2 group-hover:text-purple-400 transition-colors">
                        {blog.title}
                      </h3>
                      <p className="text-sm text-gray-400 mb-4 line-clamp-2">
                        {blog.excerpt}
                      </p>
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <span>{blog.readTime} read</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden border-b border-gray-800">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 via-transparent to-pink-600/20" />
        <div className="max-w-6xl mx-auto px-6 py-24 relative">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-6 h-6 text-purple-400" />
            <span className="text-purple-400 font-bold uppercase tracking-wide">Insights & Innovation</span>
          </div>
          <h1 className="text-6xl md:text-7xl font-black mb-6 bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
            Our Blog
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl">
            Cutting-edge insights on web development, design, and technology. Stay ahead of the curve.
          </p>
        </div>
      </div>

      {/* Search & Filter */}
      <div className="border-b border-gray-800 bg-gray-950">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input 
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-gray-900 border border-gray-800 rounded-lg focus:outline-none focus:border-purple-600 transition-colors"
              />
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  selectedCategory === cat
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                    : 'bg-gray-900 border border-gray-800 text-gray-400 hover:border-purple-600'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Featured Articles */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="flex items-center gap-2 mb-8">
          <TrendingUp className="w-6 h-6 text-purple-400" />
          <h2 className="text-3xl font-black">Featured Articles</h2>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {featuredBlogs.map((blog) => (
            <div 
              key={blog.id}
              onClick={() => {setSelectedBlog(blog); setView('single'); window.scrollTo(0, 0);}}
              className="group relative bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden hover:border-purple-600 transition-all cursor-pointer"
            >
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={blog.image} 
                  alt={blog.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent" />
                <span className="absolute top-4 left-4 px-3 py-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full text-xs font-bold uppercase">
                  Featured
                </span>
              </div>
              <div className="p-6">
                <span className="text-xs font-bold text-purple-400 uppercase tracking-wide">
                  {blog.category}
                </span>
                <h3 className="text-2xl font-bold mt-2 mb-3 group-hover:text-purple-400 transition-colors">
                  {blog.title}
                </h3>
                <p className="text-gray-400 mb-4">
                  {blog.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img src={blog.authorImage} alt={blog.author} className="w-8 h-8 rounded-full" />
                    <div className="text-sm">
                      <p className="font-medium">{blog.author}</p>
                      <p className="text-gray-500">{blog.readTime} read</p>
                    </div>
                  </div>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* All Articles */}
        <div className="flex items-center gap-2 mb-8">
          <BookOpen className="w-6 h-6 text-purple-400" />
          <h2 className="text-3xl font-black">All Articles</h2>
          <span className="ml-2 px-3 py-1 bg-gray-900 rounded-full text-sm font-bold text-gray-400">
            {filteredBlogs.length}
          </span>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6">
          {filteredBlogs.map((blog) => (
            <div 
              key={blog.id}
              onClick={() => {setSelectedBlog(blog); setView('single'); window.scrollTo(0, 0);}}
              className="group bg-gray-900 border border-gray-800 rounded-xl overflow-hidden hover:border-purple-600 transition-all cursor-pointer"
            >
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={blog.image} 
                  alt={blog.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <span className="text-xs font-bold text-purple-400 uppercase tracking-wide">
                  {blog.category}
                </span>
                <h3 className="text-lg font-bold mt-2 mb-2 group-hover:text-purple-400 transition-colors">
                  {blog.title}
                </h3>
                <p className="text-sm text-gray-400 mb-4 line-clamp-2">
                  {blog.excerpt}
                </p>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <img src={blog.authorImage} alt={blog.author} className="w-6 h-6 rounded-full" />
                    <span className="text-gray-500">{blog.author}</span>
                  </div>
                  <span className="text-gray-500">{blog.readTime}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Newsletter */}
      <div className="border-t border-gray-800 bg-gradient-to-br from-purple-600/10 to-pink-600/10">
        <div className="max-w-4xl mx-auto px-6 py-16 text-center">
          <h2 className="text-4xl font-black mb-4">Never Miss an Update</h2>
          <p className="text-gray-400 mb-8 text-lg">
            Get the latest insights delivered straight to your inbox. No spam, just quality content.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="your@email.com"
              className="flex-1 px-6 py-4 bg-gray-900 border border-gray-800 rounded-lg focus:outline-none focus:border-purple-600 transition-colors"
            />
            <button className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg font-bold hover:opacity-90 transition-opacity whitespace-nowrap">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}