"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowUpRight, ChevronLeft, ChevronRight, ExternalLink, X, Sparkles, TrendingUp, Shield, Share2, Copy, Check } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";

const categories = ["All", "Web", "Mobile"];

const projects = [
  {
    id: 7,
    title: "Nabeera Bareera - Ecommerce Website",
    category: "web",
    image: "/work/nb.png",
    description: "Ecommerce platform for fashion and lifestyle products.",
    longDescription:
      "Developed a user-friendly ecommerce platform specializing in fashion and lifestyle products, featuring secure payment gateways and a seamless shopping experience.",
    technologies: ["Next.js", "Fast API", "Supabase"],
    link: "https://www.nabeerabareera.com/",
  },
  {
    id: 4,
    title: "Aierpify - FBR Approved Invoicing Software",
    category: "web",
    image: "/work/aierpify.png",
    description: "Digital invoicing software for businesses.",
    longDescription:
      "Aierpify is a digital invoicing software designed to streamline the billing process for businesses. It offers features such as invoice creation, payment tracking, and financial reporting. The software is user-friendly and helps businesses manage their finances efficiently while ensuring compliance with FBR regulations.",
    technologies: ["Next", "Tailwind", "Supabase"],
    link: "https://aierpify.com",
  },
  {
    id: 1,
    title: "Cv Jet",
    category: "Web",
    image: "/work/cvjet.png",
    description: "A comprehensive Cv selector solution built with Next.js.",
    longDescription:
      "A comprehensive CV selector solution built with Next.js, resume parsing, and job matching. The platform includes advanced filtering, search capabilities, and a responsive design for optimal user experience across all devices.",
    technologies: ["Next.js"],
    link: "https://cvjet.com",
  },
  {
    id: 2,
    title: "Emotion Detection from Text using Machine Learning & NLP",
    category: ["Mobile", "Web"],
    image: "/work/ted1.png",
    description: " Built a powerful tool that detects human emotions",
    longDescription:
      "Built a powerful tool that detects human emotions (Joy, Sadness, Anger, Fear, Surprise, Neutral) from any English text input using natural language processing (NLP) and machine learning. This system helps businesses analyze customer feedback, support tickets, social media posts, or chat logs for emotional tone — improving user experience and support systems.",
    technologies: [
      "Python",
      "Machine Learning",
      "Natural Language Processing (NLP)",
      "Streamlit",
    ],
    link: "https://text-sentiments-detector.streamlit.app/",
  },
  {
    id: 3,
    title: "MoveX Auto Shipping – Professional Vehicle Transport Service Website",
    category: "Web",
    image: "/work/movex.png",
    description:
      "A professional vehicle transport service website offering real-time tracking and booking.",
    longDescription:
      "MoveX Auto Shipping is a comprehensive vehicle transport service platform that allows users to book and track their vehicle shipments in real-time. The website features an intuitive interface for scheduling pickups, managing shipments, and accessing customer support. It is built with a focus on user experience and includes robust security measures to protect user data.",
    technologies: ["React", "BootStrap", "JavaScript"],
    link: "https://movexautoshipping.com",
  },
  {
    id: 5,
    title: "Facebook Automations",
    category: "web",
    image: "/work/fb.png",
    description: "Automated Facebook posting and engagement tool.",
    longDescription:
      "Developed a comprehensive tool for automating Facebook posts, comments, and messages, enhancing user engagement and streamlining social media management.",
    technologies: ["React", "Node.js", "Facebook API"],
    link: "https://facebook-automations.com",
  },
  {
    id: 6,
    title: "Onyx Fintech System",
    category: "web",
    image: "/work/fin.webp",
    description: "AI-powered loan matchmaking platform for financial institutions.",
    longDescription:
      "The Onyx Fintech System represents a comprehensive and robust solution tailored for loan-finding organizations. This application streamlines the intricate processes of managing a diverse network of clients, businesses seeking loans, and lending institutions. At its core, Onyx facilitates the creation of mutually beneficial deals by employing advanced AI-powered matchmaking algorithms to intelligently connect the right borrowers with the most suitable lenders.",
    technologies: ["React", "TypeScript", "Django", "PostgreSQL", "AI/ML", "AWS"],
    link: "https://onyxfintech.com",
    keyFeatures: [
      {
        icon: "sparkles",
        title: "AI-Powered Matchmaking",
        description: "Sophisticated algorithms analyze client profiles and requirements to predict optimal borrower-lender pairings"
      },
      {
        icon: "trending",
        title: "Deal Management Dashboard",
        description: "Intuitive centralized platform for managing deal creation, tracking progress, and overseeing interactions"
      },
      {
        icon: "shield",
        title: "Secure Infrastructure",
        description: "Enterprise-grade security with PostgreSQL, load balancing, and comprehensive server monitoring"
      }
    ],
    highlights: [
      "Advanced Data Visualization & Analytics",
      "Dynamic Data Input Forms",
      "Targeted Email Campaigns",
      "CI/CD Pipeline Integration",
      "Real-time Server Monitoring"
    ]
  },
];

interface ProjectStat {
  label: string;
  value: string;
}

interface Project {
  id: number;
  title: string;
  category: string | string[];
  image: string;
  description: string;
  longDescription: string;
  technologies: string[];
  stats?: ProjectStat[];
  link?: string;
  github?: string;
  keyFeatures?: Array<{
    icon: string;
    title: string;
    description: string;
  }>;
  highlights?: string[];
}

export default function WorkSection() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const ref = useRef(null);
  const carouselRef = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const filteredProjects =
    activeCategory === "All"
      ? projects
      : projects.filter((project) => {
          if (Array.isArray(project.category)) {
            return project.category.includes(activeCategory);
          }
          return project.category === activeCategory;
        });

  useEffect(() => {
    setCurrentIndex(0);
  }, [filteredProjects]);

  const nextProject = () => {
    setCurrentIndex((prev) => (prev + 1) % filteredProjects.length);
  };

  const prevProject = () => {
    setCurrentIndex((prev) => (prev - 1 + filteredProjects.length) % filteredProjects.length);
  };

  const openProjectDetails = (project: Project) => {
    setSelectedProject(project);
    setIsDialogOpen(true);
    // Update URL without page reload for sharing
    const projectSlug = project.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    window.history.pushState({}, '', `#project-${projectSlug}`);
  };

  // Handle closing modal
  const closeModal = () => {
    setIsDialogOpen(false);
    setSelectedProject(null);
    // Remove project from URL
    window.history.pushState({}, '', window.location.pathname);
  };

  // Check URL on mount to open project if shared link
  useEffect(() => {
    const hash = window.location.hash;
    if (hash.startsWith('#project-')) {
      const slug = hash.replace('#project-', '');
      const project = projects.find(p => {
        const projectSlug = p.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
        return projectSlug === slug;
      });
      if (project) {
        openProjectDetails(project);
      }
    }
  }, []);

  const getIcon = (iconName: string) => {
    switch(iconName) {
      case "sparkles": return <Sparkles className="h-5 w-5" />;
      case "trending": return <TrendingUp className="h-5 w-5" />;
      case "shield": return <Shield className="h-5 w-5" />;
      default: return <Sparkles className="h-5 w-5" />;
    }
  };

  // Copy current URL to clipboard
  const copyShareLink = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <section id="work" className="py-16 md:py-32 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Work</h2>
          <p className="text-xl text-muted-foreground">
            Explore our portfolio of successful projects that showcase our
            expertise and creativity.
          </p>
        </motion.div>

        <Tabs defaultValue="All" className="w-full">
          <div className="flex flex-wrap justify-center mb-12 gap-2">
            <TabsList className="bg-muted/50 p-1 flex flex-wrap justify-center gap-2">
              {categories.map((category) => (
                <TabsTrigger
                  key={category}
                  value={category}
                  onClick={() => setActiveCategory(category)}
                  className="px-4 py-2 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm transition-all duration-300 text-sm"
                >
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          <TabsContent value={activeCategory} className="mt-0">
            {/* Featured Project Carousel */}
            <div className="mb-16 relative overflow-hidden rounded-xl shadow-xl">
              <div className="absolute inset-0 bg-black/50 z-10 flex items-center justify-between">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-background/20 text-white backdrop-blur-sm ml-2 sm:ml-4 hover:bg-background/40"
                  onClick={prevProject}
                >
                  <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-background/20 text-white backdrop-blur-sm mr-2 sm:mr-4 hover:bg-background/40"
                  onClick={nextProject}
                >
                  <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
                </Button>
              </div>

              <div ref={carouselRef} className="relative aspect-[4/3] md:aspect-[21/9] overflow-hidden">
                <AnimatePresence initial={false} mode="wait">
                  <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0"
                  >
                    <img
                      src={filteredProjects[currentIndex]?.image || "/placeholder.svg"}
                      alt={filteredProjects[currentIndex]?.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end p-4 sm:p-8">
                      <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                      >
                        <Badge className="mb-4 bg-primary hover:bg-primary">
                          {filteredProjects[currentIndex]?.category}
                        </Badge>
                        <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                          {filteredProjects[currentIndex]?.title}
                        </h3>
                        <p className="text-white/80 mb-4 sm:mb-6 max-w-2xl text-sm sm:text-base">
                          {filteredProjects[currentIndex]?.description}
                        </p>
                        <div className="flex flex-wrap gap-2 mb-4 sm:mb-6">
                          {filteredProjects[currentIndex]?.technologies.map((tech, i) => (
                            <Badge
                              key={i}
                              variant="outline"
                              className="bg-white/10 text-white border-white/20"
                            >
                              {tech}
                            </Badge>
                          ))}
                        </div>
                        <Button
                          variant="outline"
                          className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 hover:text-white"
                          onClick={() => openProjectDetails(filteredProjects[currentIndex])}
                        >
                          View Project Details
                          <ArrowUpRight className="ml-2 h-4 w-4" />
                        </Button>
                      </motion.div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Carousel Indicators */}
              <div className="absolute bottom-2 sm:bottom-4 left-1/2 transform -translate-x-1/2 z-20 flex space-x-2">
                {filteredProjects.map((_, index) => (
                  <button
                    key={index}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${index === currentIndex ? "bg-white w-4" : "bg-white/50"}`}
                    onClick={() => setCurrentIndex(index)}
                  />
                ))}
              </div>
            </div>

            {/* Project Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group"
                >
                  <div
                    className="relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer"
                    onClick={() => openProjectDetails(project)}
                  >
                    <div className="aspect-[4/3] overflow-hidden">
                      <img
                        src={project.image || "/placeholder.svg"}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        loading="lazy"
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 sm:p-6">
                      <Badge className="mb-2 w-fit bg-primary hover:bg-primary">
                        {project.category}
                      </Badge>
                      <h3 className="text-lg sm:text-xl font-bold text-white mb-2">
                        {project.title}
                      </h3>
                      <p className="text-white/80 text-sm sm:text-base mb-4">
                        {project.description}
                      </p>
                      <Button
                        variant="outline"
                        className="w-fit bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 hover:text-white"
                      >
                        View Details
                        <ArrowUpRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Enhanced Project Details Modal */}
      <Dialog open={isDialogOpen} onOpenChange={(open) => {
        if (!open) closeModal();
        else setIsDialogOpen(true);
      }}>
        <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto p-0 bg-gradient-to-b from-background to-muted/20">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="relative"
          >
            {/* Hero Section with Image */}
            <div className="relative h-72 md:h-96 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-purple-600/20 z-0" />
              <img
                src={selectedProject?.image || "/placeholder.svg"}
                alt={selectedProject?.title}
                className="w-full h-full object-cover opacity-40"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
              
              {/* Floating Badge */}
              <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="absolute top-6 left-6 flex gap-3"
              >
                <Badge className="bg-primary/90 backdrop-blur-sm text-lg px-4 py-2">
                  {selectedProject?.category}
                </Badge>
                <Button
                  size="icon"
                  variant="secondary"
                  className="h-10 w-10 rounded-full bg-background/90 backdrop-blur-sm hover:bg-background shadow-lg"
                  onClick={copyShareLink}
                >
                  {copied ? <Check className="h-4 w-4 text-green-600" /> : <Share2 className="h-4 w-4" />}
                </Button>
              </motion.div>
            </div>

            {/* Content Section */}
            <div className="p-6 md:p-10 -mt-20 relative z-10">
              {/* Title and Description */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <DialogHeader className="mb-6">
                  <DialogTitle className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text">
                    {selectedProject?.title}
                  </DialogTitle>
                  <DialogDescription className="text-base md:text-lg text-muted-foreground leading-relaxed">
                    {selectedProject?.longDescription}
                  </DialogDescription>
                </DialogHeader>
              </motion.div>

              {/* Key Features Section (if available) */}
              {selectedProject?.keyFeatures && (
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="mb-8"
                >
                  <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-primary" />
                    Key Features
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {selectedProject.keyFeatures.map((feature, index) => (
                      <motion.div
                        key={index}
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.5 + index * 0.1 }}
                        className="p-5 rounded-lg bg-gradient-to-br from-primary/5 to-purple-500/5 border border-primary/10 hover:border-primary/30 transition-all duration-300 hover:shadow-lg"
                      >
                        <div className="flex items-start gap-3">
                          <div className="p-2 rounded-lg bg-primary/10 text-primary">
                            {getIcon(feature.icon)}
                          </div>
                          <div>
                            <h4 className="font-semibold mb-1 text-sm">{feature.title}</h4>
                            <p className="text-xs text-muted-foreground leading-relaxed">
                              {feature.description}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Highlights Section (if available) */}
              {selectedProject?.highlights && (
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="mb-8"
                >
                  <h3 className="text-xl font-semibold mb-4">Additional Highlights</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {selectedProject.highlights.map((highlight, index) => (
                      <motion.div
                        key={index}
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.7 + index * 0.05 }}
                        className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                      >
                        <div className="h-2 w-2 rounded-full bg-primary" />
                        <span className="text-sm">{highlight}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Technologies Section */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mb-8"
              >
                <h3 className="text-xl font-semibold mb-4">Technologies Used</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedProject?.technologies.map((tech, i) => (
                    <motion.div
                      key={i}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.6 + i * 0.05 }}
                    >
                      <Badge 
                        variant="secondary" 
                        className="text-sm px-4 py-2 bg-gradient-to-r from-primary/10 to-purple-500/10 hover:from-primary/20 hover:to-purple-500/20 transition-all"
                      >
                        {tech}
                      </Badge>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Action Buttons */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="flex flex-wrap gap-4 pt-6 border-t"
              >
                {selectedProject?.link && (
                  <Button
                    className="flex-1 min-w-[200px] bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 shadow-lg hover:shadow-xl transition-all"
                    onClick={() => window.open(selectedProject.link, '_blank')}
                  >
                    Visit Live Site
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </Button>
                )}
                {selectedProject?.github && (
                  <Button
                    variant="outline"
                    className="flex-1 min-w-[200px] border-2"
                    onClick={() => window.open(selectedProject.github, '_blank')}
                  >
                    View on GitHub
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </Button>
                )}
              </motion.div>
            </div>
          </motion.div>
        </DialogContent>
      </Dialog>
    </section>
  );
}