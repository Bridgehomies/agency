"use client"

import { useState, useRef, useEffect } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowUpRight, ChevronLeft, ChevronRight, ExternalLink, Github } from "lucide-react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"

const categories = ["All", "Web", "Mobile", "Design", "Branding"]

const projects = [
  {
    id: 1,
    title: "E-commerce Platform",
    category: "Web",
    image: "/placeholder.svg?height=600&width=800",
    description: "A modern e-commerce platform with advanced filtering and payment processing.",
    longDescription:
      "A comprehensive e-commerce solution built with Next.js, featuring product management, cart functionality, payment processing, and order management. The platform includes advanced filtering, search capabilities, and a responsive design for optimal user experience across all devices.",
    technologies: ["Next.js", "React", "Node.js", "MongoDB", "Stripe"],
    stats: [
      { label: "Conversion Rate", value: "+45%" },
      { label: "Page Load", value: "0.8s" },
      { label: "Mobile Traffic", value: "65%" },
    ],
    link: "#",
    github: "#",
  },
  {
    id: 2,
    title: "Fitness Mobile App",
    category: "Mobile",
    image: "/placeholder.svg?height=600&width=800",
    description: "A comprehensive fitness tracking app with personalized workout plans.",
    longDescription:
      "A feature-rich fitness application developed for iOS and Android using React Native. The app provides personalized workout plans, progress tracking, nutrition guidance, and social features to connect with other fitness enthusiasts. It integrates with health APIs to sync data with other fitness devices and applications.",
    technologies: ["React Native", "Firebase", "Redux", "HealthKit", "Google Fit"],
    stats: [
      { label: "Active Users", value: "50K+" },
      { label: "App Rating", value: "4.8/5" },
      { label: "User Retention", value: "78%" },
    ],
    link: "#",
    github: "#",
  },
  {
    id: 3,
    title: "Financial Dashboard",
    category: "Web",
    image: "/placeholder.svg?height=600&width=800",
    description: "Real-time financial analytics dashboard for enterprise clients.",
    longDescription:
      "A sophisticated financial analytics dashboard designed for enterprise clients. The application provides real-time data visualization, financial forecasting, and comprehensive reporting tools. It features customizable widgets, data export capabilities, and role-based access control for secure data management.",
    technologies: ["React", "D3.js", "Node.js", "PostgreSQL", "WebSockets"],
    stats: [
      { label: "Data Processing", value: "500K+ records/s" },
      { label: "Uptime", value: "99.99%" },
      { label: "Time Saved", value: "15 hrs/week" },
    ],
    link: "#",
    github: "#",
  },
  {
    id: 4,
    title: "Brand Identity System",
    category: "Branding",
    image: "/placeholder.svg?height=600&width=800",
    description: "Complete brand identity system for a tech startup.",
    longDescription:
      "A comprehensive brand identity system developed for a tech startup. The project included logo design, color palette selection, typography guidelines, brand voice development, and the creation of marketing materials. The system was designed to be flexible, scalable, and consistent across all digital and print media.",
    technologies: ["Adobe Creative Suite", "Figma", "Brand Strategy", "Visual Identity", "Style Guides"],
    stats: [
      { label: "Brand Recognition", value: "+120%" },
      { label: "Design System", value: "250+ components" },
      { label: "Implementation", value: "12 platforms" },
    ],
    link: "#",
    github: "#",
  },
  {
    id: 5,
    title: "Product Design System",
    category: "Design",
    image: "/placeholder.svg?height=600&width=800",
    description: "Comprehensive design system for a SaaS platform.",
    longDescription:
      "A robust design system created for a SaaS platform to ensure consistency across all product interfaces. The system includes UI components, interaction patterns, accessibility guidelines, and documentation. It was built with scalability in mind, allowing the product team to rapidly develop new features while maintaining a cohesive user experience.",
    technologies: ["Figma", "React", "Storybook", "CSS Architecture", "Accessibility"],
    stats: [
      { label: "Development Speed", value: "+65%" },
      { label: "Components", value: "200+" },
      { label: "Design Consistency", value: "98%" },
    ],
    link: "#",
    github: "#",
  },
  {
    id: 6,
    title: "Delivery Tracking App",
    category: "Mobile",
    image: "/placeholder.svg?height=600&width=800",
    description: "Real-time package tracking application with notifications.",
    longDescription:
      "A real-time package tracking application that provides users with accurate delivery updates and notifications. The app features map integration for live tracking, delivery time estimation, and communication tools for contacting couriers. It was designed with a focus on usability and performance, even in areas with limited connectivity.",
    technologies: ["Flutter", "Firebase", "Google Maps API", "Push Notifications", "Offline Support"],
    stats: [
      { label: "Delivery Accuracy", value: "99.7%" },
      { label: "User Base", value: "100K+" },
      { label: "App Size", value: "8.5MB" },
    ],
    link: "#",
    github: "#",
  },
]

export default function WorkSection() {
  const [activeCategory, setActiveCategory] = useState("All")
  const [selectedProject, setSelectedProject] = useState(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const ref = useRef(null)
  const carouselRef = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const filteredProjects =
    activeCategory === "All" ? projects : projects.filter((project) => project.category === activeCategory)

  useEffect(() => {
    setCurrentIndex(0)
  }, [filteredProjects])

  const nextProject = () => {
    setCurrentIndex((prev) => (prev + 1) % filteredProjects.length)
  }

  const prevProject = () => {
    setCurrentIndex((prev) => (prev - 1 + filteredProjects.length) % filteredProjects.length)
  }

  const openProjectDetails = (project) => {
    setSelectedProject(project)
    setIsDialogOpen(true)
  }

  return (
    <section id="work" className="py-20 md:py-32">
      <div className="container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Work</h2>
          <p className="text-xl text-muted-foreground">
            Explore our portfolio of successful projects that showcase our expertise and creativity.
          </p>
        </motion.div>

        <Tabs defaultValue="All" className="w-full">
          <div className="flex justify-center mb-12">
            <TabsList className="bg-muted/50 p-1">
              {categories.map((category) => (
                <TabsTrigger
                  key={category}
                  value={category}
                  onClick={() => setActiveCategory(category)}
                  className="px-6 py-2 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm transition-all duration-300"
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
                  className="h-12 w-12 rounded-full bg-background/20 text-white backdrop-blur-sm ml-4 hover:bg-background/40"
                  onClick={prevProject}
                >
                  <ChevronLeft className="h-6 w-6" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-12 w-12 rounded-full bg-background/20 text-white backdrop-blur-sm mr-4 hover:bg-background/40"
                  onClick={nextProject}
                >
                  <ChevronRight className="h-6 w-6" />
                </Button>
              </div>

              <div ref={carouselRef} className="relative aspect-[21/9] overflow-hidden">
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
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end p-8">
                      <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                      >
                        <Badge className="mb-4 bg-primary hover:bg-primary">
                          {filteredProjects[currentIndex]?.category}
                        </Badge>
                        <h3 className="text-3xl font-bold text-white mb-2">{filteredProjects[currentIndex]?.title}</h3>
                        <p className="text-white/80 mb-6 max-w-2xl">{filteredProjects[currentIndex]?.description}</p>
                        <div className="flex flex-wrap gap-2 mb-6">
                          {filteredProjects[currentIndex]?.technologies.map((tech, i) => (
                            <Badge key={i} variant="outline" className="bg-white/10 text-white border-white/20">
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
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20 flex space-x-2">
                {filteredProjects.map((_, index) => (
                  <button
                    key={index}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === currentIndex ? "bg-white w-6" : "bg-white/50"
                    }`}
                    onClick={() => setCurrentIndex(index)}
                  />
                ))}
              </div>
            </div>

            {/* Project Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group"
                >
                  <div className="relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                    <div className="aspect-[4/3] overflow-hidden">
                      <img
                        src={project.image || "/placeholder.svg"}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                      <Badge className="mb-2 w-fit bg-primary hover:bg-primary">{project.category}</Badge>
                      <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                      <p className="text-white/80 mb-4">{project.description}</p>
                      <Button
                        variant="outline"
                        className="w-fit bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 hover:text-white"
                        onClick={() => openProjectDetails(project)}
                      >
                        View Project
                        <ArrowUpRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Project Details Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold">{selectedProject?.title}</DialogTitle>
              <DialogDescription>
                <Badge className="mt-2 bg-primary hover:bg-primary">{selectedProject?.category}</Badge>
              </DialogDescription>
            </DialogHeader>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
              <div className="overflow-hidden rounded-lg">
                <img
                  src={selectedProject?.image || "/placeholder.svg"}
                  alt={selectedProject?.title}
                  className="w-full h-auto object-cover"
                />
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="text-lg font-semibold mb-2">About the Project</h4>
                  <p className="text-muted-foreground">{selectedProject?.longDescription}</p>
                </div>

                <div>
                  <h4 className="text-lg font-semibold mb-2">Technologies</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject?.technologies.map((tech, i) => (
                      <Badge key={i} variant="outline" className="bg-muted">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-semibold mb-2">Key Metrics</h4>
                  <div className="grid grid-cols-3 gap-4">
                    {selectedProject?.stats.map((stat, i) => (
                      <div key={i} className="bg-muted p-3 rounded-lg text-center">
                        <p className="text-2xl font-bold text-primary">{stat.value}</p>
                        <p className="text-sm text-muted-foreground">{stat.label}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex gap-4 pt-4">
                  <Button className="flex-1" asChild>
                    <a href={selectedProject?.link} target="_blank" rel="noopener noreferrer">
                      Visit Project
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                  <Button variant="outline" className="flex-1" asChild>
                    <a href={selectedProject?.github} target="_blank" rel="noopener noreferrer">
                      View Code
                      <Github className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  )
}
