"use client"

import React, { useState } from 'react';
import { Calendar, Clock, ArrowRight, Search, TrendingUp, Sparkles, Eye, BookOpen, ChevronRight, Twitter, Linkedin, Github, Globe } from 'lucide-react';

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
    views: 12500,
    featured: true,
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=500&fit=crop",
    content: `
      <p>Artificial Intelligence is transforming every aspect of web development, from code generation to user experience optimization. In this deep dive, we explore the cutting-edge tools and techniques that are reshaping our industry.</p>
      
      <div class="mt-8 mb-8 border-l-4 border-purple-500 pl-6 py-4 bg-purple-50 rounded-r-2xl shadow-sm">
        <p class="italic text-gray-700 font-medium">"The future of development is collaborative - between humans and AI systems working together to create unprecedented solutions."</p>
      </div>
      
      <h2>The AI Revolution in Development</h2>
      <p>Modern AI tools are not just assistants—they're collaborative partners in the development process. From GitHub Copilot to advanced design systems, AI is enabling developers to build faster and smarter than ever before.</p>
      
      <div class="mt-6 p-6 bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200 rounded-2xl shadow-lg">
        <h3 class="text-xl font-bold mb-4 flex items-center gap-2 text-purple-700">
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M13 7h-2v4H7v2h4v4h2v-4h4v-2h-4V7zm-1-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/></svg>
          Key Benefits
        </h3>
        <ul class="space-y-3">
          <li class="flex items-start gap-3">
            <div class="mt-2 w-2 h-2 rounded-full bg-purple-600 flex-shrink-0"></div>
            <span class="text-gray-700">Faster prototyping and development cycles</span>
          </li>
          <li class="flex items-start gap-3">
            <div class="mt-2 w-2 h-2 rounded-full bg-purple-600 flex-shrink-0"></div>
            <span class="text-gray-700">Automated code review and optimization</span>
          </li>
          <li class="flex items-start gap-3">
            <div class="mt-2 w-2 h-2 rounded-full bg-purple-600 flex-shrink-0"></div>
            <span class="text-gray-700">Intelligent error detection and debugging</span>
          </li>
          <li class="flex items-start gap-3">
            <div class="mt-2 w-2 h-2 rounded-full bg-purple-600 flex-shrink-0"></div>
            <span class="text-gray-700">Enhanced user personalization</span>
          </li>
        </ul>
      </div>
      
      <h2 class="mt-12">Real-World Applications</h2>
      <p>Companies like Vercel, OpenAI, and Anthropic are leading the charge in creating development tools that leverage AI to streamline workflows and enhance productivity.</p>
      
      <div class="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="p-6 bg-white border-2 border-purple-200 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
          <h3 class="font-bold text-lg mb-2 text-purple-700">Performance Boost</h3>
          <p class="text-gray-600">AI-assisted code completion reduces development time by up to 40%</p>
        </div>
        <div class="p-6 bg-white border-2 border-purple-200 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
          <h3 class="font-bold text-lg mb-2 text-purple-700">Error Reduction</h3>
          <p class="text-gray-600">Automated testing catches 90% of common bugs before deployment</p>
        </div>
      </div>
      
      <h2 class="mt-12">Getting Started</h2>
      <p>Start by integrating AI code completion tools into your workflow. Experiment with AI-powered design tools, and gradually expand your usage as you become comfortable with the technology.</p>
      
      <div class="mt-8 p-6 bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-yellow-300 rounded-2xl shadow-lg">
        <h3 class="font-bold text-lg mb-3 flex items-center gap-2 text-orange-700">
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2z"/></svg>
          Pro Tip
        </h3>
        <p class="text-gray-700 leading-relaxed">Begin with small, non-critical components to understand AI capabilities before integrating into core systems.</p>
      </div>
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
    views: 8200,
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
    views: 15300,
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
    views: 9800,
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
    views: 11100,
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
    views: 13700,
    featured: false,
    image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&h=500&fit=crop"
  }
];

const categories = ["All", "AI & Development", "Performance", "Design", "Security", "Architecture"];

const formatViews = (views: number) => {
  if (views >= 1000) {
    return `${(views / 1000).toFixed(1)}K`;
  }
  return views.toString();
};

export default function BlogSystem() {
  const [view, setView] = useState('listing');
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
      <div className="min-h-screen bg-white text-gray-900">
        <div className="relative bg-gradient-to-br from-purple-50 via-white to-pink-50">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-purple-100/50 via-transparent to-transparent" />
          <div className="max-w-4xl mx-auto px-6 py-16 relative">
            <div className="flex items-center gap-3 mb-6">
              <span className="px-4 py-1.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full text-sm font-bold uppercase tracking-wide shadow-lg shadow-purple-200">
                {selectedBlog.category}
              </span>
              <span className="flex items-center gap-1 text-gray-600">
                <Eye className="w-4 h-4" />
                {formatViews(selectedBlog.views)} views
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-black mb-6 leading-tight bg-gradient-to-r from-purple-600 via-purple-700 to-pink-600 bg-clip-text text-transparent">
              {selectedBlog.title}
            </h1>
            
            <p className="text-lg md:text-xl text-gray-700 mb-8 leading-relaxed">
              {selectedBlog.excerpt}
            </p>
            
            <div className="flex items-center gap-6">
              <img 
                src={selectedBlog.authorImage} 
                alt={selectedBlog.author}
                className="w-14 h-14 rounded-full border-2 border-purple-600 shadow-lg"
              />
              <div>
                <p className="font-bold text-lg text-gray-900">{selectedBlog.author}</p>
                <div className="flex items-center gap-4 text-sm text-gray-600">
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

        <div className="max-w-5xl mx-auto px-6 mb-12">
          <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-gray-200">
            <div className="absolute inset-0 bg-gradient-to-t from-white/40 to-transparent z-10"></div>
            <img 
              src={selectedBlog.image} 
              alt={selectedBlog.title}
              className="w-full h-[400px] object-cover"
            />
          </div>
        </div>

        <div className="max-w-3xl mx-auto px-6 pb-16 relative">
          <article 
            className="prose prose-gray prose-lg max-w-none
              prose-headings:font-black prose-headings:bg-gradient-to-r prose-headings:from-purple-600 prose-headings:to-pink-600 prose-headings:bg-clip-text prose-headings:text-transparent
              prose-h2:text-3xl prose-h2:mt-16 prose-h2:mb-6 prose-h2:pb-4 prose-h2:border-b-2 prose-h2:border-purple-100
              prose-h3:text-xl prose-h3:mt-12 prose-h3:mb-4 prose-h3:text-gray-900
              prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-6 prose-p:text-lg
              prose-ul:my-6 prose-li:text-gray-700 prose-li:marker:text-purple-600
              prose-a:text-purple-600 prose-a:no-underline hover:prose-a:text-purple-700 prose-a:font-medium
              prose-strong:text-gray-900 prose-strong:font-bold
              prose-blockquote:border-l-4 prose-blockquote:border-purple-500 prose-blockquote:bg-purple-50 prose-blockquote:p-6 prose-blockquote:rounded-r-xl prose-blockquote:shadow-sm
              prose-code:bg-purple-50 prose-code:text-purple-700 prose-code:px-2 prose-code:py-1 prose-code:rounded-md prose-code:border prose-code:border-purple-200 prose-code:font-semibold
              prose-pre:bg-gray-50 prose-pre:p-6 prose-pre:rounded-2xl prose-pre:border-2 prose-pre:border-gray-200 prose-pre:shadow-inner"
              dangerouslySetInnerHTML={{ __html: selectedBlog.content ?? '' }}          />

          <div className="flex flex-wrap gap-2 mt-16 pt-8 border-t-2 border-purple-100">
            {selectedBlog.tags.map((tag, index) => (
              <span 
                key={index}
                className="px-4 py-2 bg-purple-50 border-2 border-purple-200 rounded-full text-sm font-bold text-purple-700 hover:border-purple-400 hover:bg-purple-100 transition-all cursor-pointer"
              >
                #{tag}
              </span>
            ))}
          </div>

          <div className="mt-16 p-8 bg-gradient-to-br from-purple-50 via-white to-pink-50 border-2 border-purple-200 rounded-3xl relative overflow-hidden shadow-xl">
            <div className="absolute -right-10 -top-10 w-32 h-32 rounded-full bg-purple-200/30"></div>
            <div className="absolute -right-6 -top-6 w-24 h-24 rounded-full bg-pink-200/30"></div>
            <div className="flex items-center gap-4 mb-4 relative z-10">
              <img 
                src={selectedBlog.authorImage} 
                alt={selectedBlog.author}
                className="w-20 h-20 rounded-full border-4 border-purple-300 shadow-lg"
              />
              <div>
                <h3 className="text-2xl font-black text-gray-900">{selectedBlog.author}</h3>
                <p className="text-gray-600 font-medium">Senior Software Engineer</p>
              </div>
            </div>
            <p className="text-gray-700 mb-6 relative z-10 leading-relaxed">
              Passionate about building scalable applications and sharing knowledge with the developer community. Let's connect!
            </p>
            <div className="flex gap-3 relative z-10">
              <a href="#" className="p-3 bg-white border-2 border-gray-200 rounded-xl hover:border-purple-500 hover:bg-purple-50 transition-all group shadow-sm">
                <Twitter className="w-5 h-5 text-gray-700 group-hover:text-purple-600" />
              </a>
              <a href="#" className="p-3 bg-white border-2 border-gray-200 rounded-xl hover:border-purple-500 hover:bg-purple-50 transition-all group shadow-sm">
                <Linkedin className="w-5 h-5 text-gray-700 group-hover:text-purple-600" />
              </a>
              <a href="#" className="p-3 bg-white border-2 border-gray-200 rounded-xl hover:border-purple-500 hover:bg-purple-50 transition-all group shadow-sm">
                <Github className="w-5 h-5 text-gray-700 group-hover:text-purple-600" />
              </a>
              <a href="#" className="p-3 bg-white border-2 border-gray-200 rounded-xl hover:border-purple-500 hover:bg-purple-50 transition-all group shadow-sm">
                <Globe className="w-5 h-5 text-gray-700 group-hover:text-purple-600" />
              </a>
            </div>
          </div>
        </div>

        {relatedBlogs.length > 0 && (
          <div className="border-t-2 border-purple-100 bg-gradient-to-b from-purple-50/50 to-white">
            <div className="max-w-6xl mx-auto px-6 py-16">
              <h2 className="text-3xl font-black mb-8 flex items-center gap-3 text-gray-900">
                <div className="w-1.5 h-8 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full"></div>
                Continue Reading
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                {relatedBlogs.map((blog) => (
                  <div 
                    key={blog.id}
                    onClick={() => {setSelectedBlog(blog); window.scrollTo(0, 0);}}
                    className="group bg-white border-2 border-gray-200 rounded-2xl overflow-hidden hover:border-purple-400 hover:shadow-xl transition-all cursor-pointer"
                  >
                    <div className="relative h-48 overflow-hidden">
                      <img 
                        src={blog.image} 
                        alt={blog.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    </div>
                    <div className="p-6">
                      <span className="text-xs font-bold text-purple-600 uppercase tracking-wide">
                        {blog.category}
                      </span>
                      <h3 className="text-lg font-bold mt-2 mb-2 text-gray-900 group-hover:text-purple-600 transition-colors">
                        {blog.title}
                      </h3>
                      <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                        {blog.excerpt}
                      </p>
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <span>{blog.readTime} read</span>
                        <ArrowRight className="w-4 h-4 text-purple-600 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        <div className="bg-white border-t-2 border-purple-100 py-12">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <button 
              onClick={() => setView('listing')}
              className="inline-flex items-center gap-3 text-white bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 transition-all px-8 py-4 rounded-2xl font-bold text-lg shadow-xl shadow-purple-200 hover:shadow-2xl hover:shadow-purple-300 hover:-translate-y-0.5 group"
            >
              <ArrowRight className="w-5 h-5 rotate-180 group-hover:-translate-x-1 transition-transform" />
              Back to all blogs
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-black to-gray-950 text-white">
      <div className="relative overflow-hidden border-b border-gray-800">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 via-transparent to-pink-600/20" />
        <div className="max-w-6xl mx-auto px-6 py-24 relative">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-6 h-6 text-purple-400" />
            <span className="text-purple-400 font-bold uppercase tracking-wide">Insights & Innovation</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-black mb-6 bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
            Our Blog
          </h1>
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl">
            Cutting-edge insights on web development, design, and technology. Stay ahead of the curve.
          </p>
        </div>
      </div>

      <div className="border-b border-gray-800 bg-gray-950/80 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input 
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-gray-900/80 border border-gray-800 rounded-lg focus:outline-none focus:border-purple-600 transition-colors backdrop-blur-sm"
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
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/20'
                    : 'bg-gray-900/80 border border-gray-800 text-gray-400 hover:border-purple-600 hover:bg-gray-800/50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="flex items-center gap-2 mb-8">
          <TrendingUp className="w-6 h-6 text-purple-400" />
          <h2 className="text-2xl md:text-3xl font-black">Featured Articles</h2>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {featuredBlogs.map((blog) => (
            <div 
              key={blog.id}
              onClick={() => {setSelectedBlog(blog); setView('single'); window.scrollTo(0, 0);}}
              className="group relative bg-gradient-to-b from-gray-900/50 to-gray-950 border border-gray-800 rounded-2xl overflow-hidden hover:border-purple-600 transition-all cursor-pointer hover:shadow-xl hover:shadow-purple-500/10"
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
                <h3 className="text-xl md:text-2xl font-bold mt-2 mb-3 group-hover:text-purple-400 transition-colors">
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
                  <div className="flex items-center gap-2 text-purple-400">
                    <span className="text-sm">Read more</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-2 mb-8">
          <BookOpen className="w-6 h-6 text-purple-400" />
          <h2 className="text-2xl md:text-3xl font-black">All Articles</h2>
          <span className="ml-2 px-3 py-1 bg-gray-900 rounded-full text-sm font-bold text-gray-400">
            {filteredBlogs.length}
          </span>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6">
          {filteredBlogs.map((blog) => (
            <div 
              key={blog.id}
              onClick={() => {setSelectedBlog(blog); setView('single'); window.scrollTo(0, 0);}}
              className="group bg-gradient-to-b from-gray-900/50 to-gray-950 border border-gray-800 rounded-xl overflow-hidden hover:border-purple-600 transition-all cursor-pointer hover:shadow-lg hover:shadow-purple-500/10"
            >
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={blog.image} 
                  alt={blog.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
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
                  <div className="flex items-center gap-1 text-gray-500">
                    <span>{blog.readTime}</span>
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-gray-800 bg-gradient-to-br from-purple-600/10 to-pink-600/10 relative overflow-hidden">
        <div className="absolute -right-20 -top-20 w-40 h-40 rounded-full bg-purple-500/10"></div>
        <div className="absolute -right-10 -top-10 w-32 h-32 rounded-full bg-pink-500/10"></div>
        <div className="absolute -left-20 bottom-10 w-40 h-40 rounded-full bg-purple-500/10"></div>
        <div className="max-w-4xl mx-auto px-6 py-16 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-black mb-4">Never Miss an Update</h2>
          <p className="text-gray-400 mb-8 text-lg">
            Get the latest insights delivered straight to your inbox. No spam, just quality content.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="your@email.com"
              className="flex-1 px-6 py-4 bg-gray-900/80 border border-gray-800 rounded-lg focus:outline-none focus:border-purple-600 transition-colors backdrop-blur-sm"
            />
            <button className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg font-bold hover:opacity-90 transition-opacity whitespace-nowrap shadow-lg shadow-purple-500/20">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}