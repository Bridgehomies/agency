"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, Circle, Download, Share } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

const checklistItems = [
  { id: 1, category: "Planning", title: "Define project goals and objectives", description: "Clearly outline what you want to achieve with your project", priority: "high" },
  { id: 2, category: "Planning", title: "Identify target audience", description: "Research and define your primary user demographics", priority: "high" },
  { id: 3, category: "Planning", title: "Set project timeline and milestones", description: "Create a realistic schedule with key deliverables", priority: "medium" },
  { id: 4, category: "Design", title: "Create wireframes and mockups", description: "Design the user interface and user experience", priority: "high" },
  { id: 5, category: "Design", title: "Establish brand guidelines", description: "Define colors, fonts, and visual identity", priority: "medium" },
  { id: 6, category: "Development", title: "Set up development environment", description: "Configure tools, frameworks, and hosting", priority: "high" },
  { id: 7, category: "Development", title: "Implement core functionality", description: "Build the main features and user flows", priority: "high" },
  { id: 8, category: "Development", title: "Integrate third-party services", description: "Connect APIs, payment systems, and analytics", priority: "medium" },
  { id: 9, category: "Testing", title: "Conduct user testing", description: "Test with real users and gather feedback", priority: "high" },
  { id: 10, category: "Testing", title: "Perform security audit", description: "Ensure data protection and security compliance", priority: "high" },
  { id: 11, category: "Launch", title: "Deploy to production", description: "Launch your project to the live environment", priority: "high" },
  { id: 12, category: "Launch", title: "Monitor and optimize", description: "Track performance and make improvements", priority: "medium" },
]

const categories = ["Planning", "Design", "Development", "Testing", "Launch"]

export default function InteractiveChecklist() {
  const [checkedItems, setCheckedItems] = useState<Set<number>>(new Set())
  const [activeCategory, setActiveCategory] = useState("All")
  const [showAllInAllView, setShowAllInAllView] = useState(false)
  const { toast } = useToast()

  const toggleItem = (id: number) => {
    const newCheckedItems = new Set(checkedItems)
    if (newCheckedItems.has(id)) {
      newCheckedItems.delete(id)
    } else {
      newCheckedItems.add(id)
      toast({
        title: "Great progress! 🎉",
        description: "You've completed another step in your project journey.",
      })
    }
    setCheckedItems(newCheckedItems)
  }

  const getPriorityRank = (priority: string) => {
    return priority === "high" ? 1 : priority === "medium" ? 2 : 3
  }

  const filteredItems = activeCategory === "All"
    ? checklistItems
        .slice()
        .sort((a, b) => getPriorityRank(a.priority) - getPriorityRank(b.priority))
        .filter((_, i) => showAllInAllView || i < 4)
    : checklistItems.filter((item) => item.category === activeCategory)

  const completionPercentage = (checkedItems.size / checklistItems.length) * 100

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "text-red-500"
      case "medium":
        return "text-yellow-500"
      default:
        return "text-green-500"
    }
  }

  const exportChecklist = () => {
    const checkedItemsList = checklistItems.filter((item) => checkedItems.has(item.id))
    const uncheckedItemsList = checklistItems.filter((item) => !checkedItems.has(item.id))

    const content = `
Project Checklist Progress Report
Generated on: ${new Date().toLocaleDateString()}

COMPLETED ITEMS (${checkedItemsList.length}/${checklistItems.length}):
${checkedItemsList.map((item) => `✅ ${item.title} - ${item.description}`).join("\n")}

REMAINING ITEMS (${uncheckedItemsList.length}/${checklistItems.length}):
${uncheckedItemsList.map((item) => `⭕ ${item.title} - ${item.description}`).join("\n")}
    `

    const blob = new Blob([content], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "project-checklist.txt"
    a.click()
    URL.revokeObjectURL(url)

    toast({
      title: "Checklist exported! 📄",
      description: "Your progress has been saved to a file.",
    })
  }

  return (
    <section className="py-20 md:py-32 bg-muted/30">
      <div className="container max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Project Readiness Checklist</h2>
          <p className="text-xl text-muted-foreground">
            Track your progress and ensure you're ready for a successful project launch
          </p>
        </motion.div>

        {/* Progress Overview */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Overall Progress</CardTitle>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={exportChecklist}>
                  <Download className="mr-2 h-4 w-4" />
                  Export
                </Button>
                <Button variant="outline" size="sm">
                  <Share className="mr-2 h-4 w-4" />
                  Share
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4 mb-4">
              <Progress value={completionPercentage} className="flex-1 h-3" />
              <span className="text-2xl font-bold text-primary">{Math.round(completionPercentage)}%</span>
            </div>
            <p className="text-muted-foreground">
              {checkedItems.size} of {checklistItems.length} items completed
            </p>
          </CardContent>
        </Card>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-8 justify-center">
          <Button
            variant={activeCategory === "All" ? "default" : "outline"}
            onClick={() => {
              setActiveCategory("All")
              setShowAllInAllView(false)
            }}
            className="mb-2"
          >
            All ({checklistItems.length})
          </Button>
          {categories.map((category) => {
            const categoryItems = checklistItems.filter((item) => item.category === category)
            const completedInCategory = categoryItems.filter((item) => checkedItems.has(item.id)).length
            return (
              <Button
                key={category}
                variant={activeCategory === category ? "default" : "outline"}
                onClick={() => setActiveCategory(category)}
                className="mb-2"
              >
                {category} ({completedInCategory}/{categoryItems.length})
              </Button>
            )
          })}
        </div>

        {/* Checklist Items */}
        <div className="grid gap-4">
          <AnimatePresence>
            {filteredItems.map((item, index) => {
              const isChecked = checkedItems.has(item.id)
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  layout
                >
                  <Card
                    className={`cursor-pointer transition-all duration-300 hover:shadow-md ${
                      isChecked ? "bg-green-50 border-green-200" : "hover:border-primary/40"
                    }`}
                    onClick={() => toggleItem(item.id)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start gap-4">
                        <motion.div animate={{ scale: isChecked ? [1, 1.2, 1] : 1 }} transition={{ duration: 0.3 }}>
                          {isChecked ? (
                            <CheckCircle className="h-6 w-6 text-green-500 mt-1" />
                          ) : (
                            <Circle className="h-6 w-6 text-muted-foreground mt-1" />
                          )}
                        </motion.div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className={`font-semibold ${isChecked ? "line-through text-muted-foreground" : ""}`}>
                              {item.title}
                            </h3>
                            <span className={`text-xs px-2 py-1 rounded-full ${getPriorityColor(item.priority)}`}>
                              {item.priority}
                            </span>
                          </div>
                          <p
                            className={`text-sm ${
                              isChecked ? "line-through text-muted-foreground" : "text-muted-foreground"
                            }`}
                          >
                            {item.description}
                          </p>
                          <div className="text-xs text-primary mt-1">{item.category}</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </AnimatePresence>
        </div>

        {/* Load More Button for All View */}
        {activeCategory === "All" && !showAllInAllView && (
          <div className="flex justify-center mt-6">
            <Button onClick={() => setShowAllInAllView(true)} variant="secondary">
              Load More
            </Button>
          </div>
        )}

        {/* Completion Celebration */}
        <AnimatePresence>
          {completionPercentage === 100 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            >
              <Card className="max-w-md mx-4">
                <CardContent className="text-center p-8">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                    className="text-6xl mb-4"
                  >
                    🎉
                  </motion.div>
                  <h3 className="text-2xl font-bold mb-2">Congratulations!</h3>
                  <p className="text-muted-foreground mb-4">
                    You've completed all checklist items. You're ready to start your project!
                  </p>
                  <Button onClick={() => (window.location.href = "#contact")}>Get Started Now</Button>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
