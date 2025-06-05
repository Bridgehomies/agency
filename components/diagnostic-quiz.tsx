"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, ArrowRight, ArrowLeft, RotateCcw } from "lucide-react"

const quizQuestions = [
  {
    id: 1,
    question: "What type of project are you looking to develop?",
    options: [
      { text: "Web Application", value: "web", points: { web: 3, mobile: 0, design: 1 } },
      { text: "Mobile App", value: "mobile", points: { web: 0, mobile: 3, design: 1 } },
      { text: "E-commerce Platform", value: "ecommerce", points: { web: 2, mobile: 1, design: 2 } },
      { text: "Brand Identity", value: "branding", points: { web: 0, mobile: 0, design: 3 } },
    ],
  },
  {
    id: 2,
    question: "What's your primary goal?",
    options: [
      { text: "Increase Sales", value: "sales", points: { web: 2, mobile: 2, design: 1 } },
      { text: "Improve User Experience", value: "ux", points: { web: 1, mobile: 1, design: 3 } },
      { text: "Streamline Operations", value: "operations", points: { web: 3, mobile: 1, design: 0 } },
      { text: "Build Brand Awareness", value: "brand", points: { web: 1, mobile: 1, design: 3 } },
    ],
  },
  {
    id: 3,
    question: "What's your timeline?",
    options: [
      { text: "ASAP (Rush)", value: "rush", points: { web: 1, mobile: 0, design: 2 } },
      { text: "1-3 months", value: "normal", points: { web: 2, mobile: 2, design: 2 } },
      { text: "3-6 months", value: "extended", points: { web: 3, mobile: 3, design: 1 } },
      { text: "6+ months", value: "long", points: { web: 3, mobile: 3, design: 3 } },
    ],
  },
  {
    id: 4,
    question: "What's your budget range?",
    options: [
      { text: "$5K - $15K", value: "small", points: { web: 1, mobile: 1, design: 3 } },
      { text: "$15K - $50K", value: "medium", points: { web: 2, mobile: 2, design: 2 } },
      { text: "$50K - $100K", value: "large", points: { web: 3, mobile: 3, design: 1 } },
      { text: "$100K+", value: "enterprise", points: { web: 3, mobile: 3, design: 2 } },
    ],
  },
]

const recommendations = {
  web: {
    title: "Web Development Package",
    description: "Perfect for custom web applications and platforms",
    services: ["Custom Web Development", "API Integration", "Database Design", "Performance Optimization"],
    estimatedCost: "$25K - $75K",
    timeline: "3-6 months",
  },
  mobile: {
    title: "Mobile Development Package",
    description: "Ideal for mobile-first experiences and apps",
    services: ["Native/Cross-platform Apps", "UI/UX Design", "App Store Optimization", "Push Notifications"],
    estimatedCost: "$30K - $80K",
    timeline: "4-7 months",
  },
  design: {
    title: "Design & Branding Package",
    description: "Great for brand identity and user experience focus",
    services: ["Brand Identity", "UI/UX Design", "Design Systems", "Marketing Materials"],
    estimatedCost: "$15K - $40K",
    timeline: "2-4 months",
  },
}

export default function DiagnosticQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<number, any>>({})
  const [showResults, setShowResults] = useState(false)
  const [scores, setScores] = useState({ web: 0, mobile: 0, design: 0 })

  const progress = ((currentQuestion + 1) / quizQuestions.length) * 100

  const handleAnswer = (option: any) => {
    const newAnswers = { ...answers, [currentQuestion]: option }
    setAnswers(newAnswers)

    // Calculate scores
    const newScores = { web: 0, mobile: 0, design: 0 }
    Object.values(newAnswers).forEach((answer: any) => {
      newScores.web += answer.points.web
      newScores.mobile += answer.points.mobile
      newScores.design += answer.points.design
    })
    setScores(newScores)

    if (currentQuestion < quizQuestions.length - 1) {
      setTimeout(() => setCurrentQuestion(currentQuestion + 1), 300)
    } else {
      setTimeout(() => setShowResults(true), 300)
    }
  }

  const resetQuiz = () => {
    setCurrentQuestion(0)
    setAnswers({})
    setShowResults(false)
    setScores({ web: 0, mobile: 0, design: 0 })
  }

  const getRecommendation = () => {
    const maxScore = Math.max(scores.web, scores.mobile, scores.design)
    if (scores.web === maxScore) return recommendations.web
    if (scores.mobile === maxScore) return recommendations.mobile
    return recommendations.design
  }

  return (
    <section className="py-20 md:py-32">
      <div className="container max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Project Diagnostic Quiz</h2>
          <p className="text-xl text-muted-foreground">
            Answer a few questions to get personalized recommendations for your project
          </p>
        </motion.div>

        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <div className="flex items-center justify-between mb-4">
              <CardTitle className="text-lg">
                {showResults ? "Your Recommendation" : `Question ${currentQuestion + 1} of ${quizQuestions.length}`}
              </CardTitle>
              {!showResults && <span className="text-sm text-muted-foreground">{Math.round(progress)}% Complete</span>}
            </div>
            {!showResults && <Progress value={progress} className="h-2" />}
          </CardHeader>

          <CardContent>
            <AnimatePresence mode="wait">
              {!showResults ? (
                <motion.div
                  key={currentQuestion}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="text-xl font-semibold mb-6">{quizQuestions[currentQuestion].question}</h3>
                  <div className="space-y-3">
                    {quizQuestions[currentQuestion].options.map((option, index) => (
                      <motion.button
                        key={index}
                        className="w-full p-4 text-left border rounded-lg hover:border-primary hover:bg-primary/5 transition-all duration-200"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleAnswer(option)}
                      >
                        <div className="flex items-center justify-between">
                          <span>{option.text}</span>
                          <ArrowRight className="h-4 w-4 opacity-50" />
                        </div>
                      </motion.button>
                    ))}
                  </div>

                  {currentQuestion > 0 && (
                    <Button variant="outline" className="mt-6" onClick={() => setCurrentQuestion(currentQuestion - 1)}>
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Previous
                    </Button>
                  )}
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="text-center mb-6">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                    >
                      <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                    </motion.div>
                    <h3 className="text-2xl font-bold mb-2">{getRecommendation().title}</h3>
                    <p className="text-muted-foreground">{getRecommendation().description}</p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div className="space-y-4">
                      <h4 className="font-semibold">Recommended Services:</h4>
                      <ul className="space-y-2">
                        {getRecommendation().services.map((service, index) => (
                          <motion.li
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.1 }}
                            className="flex items-center gap-2"
                          >
                            <CheckCircle className="h-4 w-4 text-green-500" />
                            <span className="text-sm">{service}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold mb-2">Estimated Investment:</h4>
                        <p className="text-2xl font-bold text-primary">{getRecommendation().estimatedCost}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">Timeline:</h4>
                        <p className="text-lg">{getRecommendation().timeline}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <Button className="flex-1" onClick={() => (window.location.href = "#contact")}>
                      Get Started
                    </Button>
                    <Button variant="outline" onClick={resetQuiz}>
                      <RotateCcw className="mr-2 h-4 w-4" />
                      Retake Quiz
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
