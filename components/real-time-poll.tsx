"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { BarChart3, Users, TrendingUp, MessageCircle } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

const polls = [
  {
    id: 1,
    question: "What's your biggest challenge in digital transformation?",
    options: [
      { id: "a", text: "Legacy system integration", votes: 45 },
      { id: "b", text: "Team skill gaps", votes: 32 },
      { id: "c", text: "Budget constraints", votes: 28 },
      { id: "d", text: "Change management", votes: 38 },
    ],
    totalVotes: 143,
    active: true,
  },
  {
    id: 2,
    question: "Which technology trend excites you most for 2024?",
    options: [
      { id: "a", text: "AI/Machine Learning", votes: 67 },
      { id: "b", text: "Web3/Blockchain", votes: 23 },
      { id: "c", text: "AR/VR", votes: 19 },
      { id: "d", text: "IoT", votes: 15 },
    ],
    totalVotes: 124,
    active: false,
  },
]

export default function RealTimePoll() {
  const [currentPoll, setCurrentPoll] = useState(polls[0])
  const [hasVoted, setHasVoted] = useState(false)
  const [selectedOption, setSelectedOption] = useState("")
  const [liveVotes, setLiveVotes] = useState(currentPoll.options)
  const [totalVotes, setTotalVotes] = useState(currentPoll.totalVotes)
  const { toast } = useToast()

  // Simulate real-time vote updates
  useEffect(() => {
    if (!hasVoted) return

    const interval = setInterval(() => {
      setLiveVotes((prev) =>
        prev.map((option) => ({
          ...option,
          votes: option.votes + Math.floor(Math.random() * 3),
        })),
      )
      setTotalVotes((prev) => prev + Math.floor(Math.random() * 5))
    }, 3000)

    return () => clearInterval(interval)
  }, [hasVoted])

  const handleVote = (optionId: string) => {
    if (hasVoted) return

    setSelectedOption(optionId)
    setHasVoted(true)

    // Update vote count
    setLiveVotes((prev) =>
      prev.map((option) => (option.id === optionId ? { ...option, votes: option.votes + 1 } : option)),
    )
    setTotalVotes((prev) => prev + 1)

    toast({
      title: "Vote recorded! 🗳️",
      description: "Thank you for participating in our poll.",
    })
  }

  const getPercentage = (votes: number) => {
    return totalVotes > 0 ? Math.round((votes / totalVotes) * 100) : 0
  }

  const switchPoll = (pollId: number) => {
    const poll = polls.find((p) => p.id === pollId)
    if (poll) {
      setCurrentPoll(poll)
      setLiveVotes(poll.options)
      setTotalVotes(poll.totalVotes)
      setHasVoted(false)
      setSelectedOption("")
    }
  }

  return (
    <section className="py-20 md:py-32 bg-muted/30">
      <div className="container max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Community Insights</h2>
          <p className="text-xl text-muted-foreground">
            Share your thoughts and see what the community thinks in real-time
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Poll */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    Live Poll
                  </CardTitle>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Users className="h-4 w-4" />
                    <motion.span
                      key={totalVotes}
                      initial={{ scale: 1.2, color: "#10b981" }}
                      animate={{ scale: 1, color: "inherit" }}
                      transition={{ duration: 0.3 }}
                    >
                      {totalVotes} votes
                    </motion.span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <h3 className="text-lg font-semibold mb-6">{currentPoll.question}</h3>

                <div className="space-y-4">
                  <AnimatePresence>
                    {liveVotes.map((option, index) => {
                      const percentage = getPercentage(option.votes)
                      const isSelected = selectedOption === option.id

                      return (
                        <motion.div
                          key={option.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                          className={`relative p-4 border rounded-lg cursor-pointer transition-all duration-300 ${
                            hasVoted
                              ? isSelected
                                ? "border-primary bg-primary/5"
                                : "border-muted"
                              : "hover:border-primary hover:bg-primary/5"
                          }`}
                          onClick={() => !hasVoted && handleVote(option.id)}
                          whileHover={!hasVoted ? { scale: 1.02 } : {}}
                          whileTap={!hasVoted ? { scale: 0.98 } : {}}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-medium">{option.text}</span>
                            {hasVoted && <span className="text-sm font-bold text-primary">{percentage}%</span>}
                          </div>

                          {hasVoted && (
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: "100%" }}
                              transition={{ duration: 0.5, delay: 0.2 }}
                            >
                              <Progress
                                value={percentage}
                                className="h-2"
                                indicatorClassName={isSelected ? "bg-primary" : "bg-muted-foreground"}
                              />
                            </motion.div>
                          )}

                          {hasVoted && (
                            <motion.div
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ duration: 0.3, delay: 0.5 }}
                              className="flex items-center justify-between mt-2 text-sm text-muted-foreground"
                            >
                              <span>{option.votes} votes</span>
                              {isSelected && <span className="text-primary font-medium">Your choice</span>}
                            </motion.div>
                          )}
                        </motion.div>
                      )
                    })}
                  </AnimatePresence>
                </div>

                {!hasVoted && (
                  <p className="text-sm text-muted-foreground mt-4 text-center">Click on an option to cast your vote</p>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Poll Navigation */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Other Polls</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {polls.map((poll) => (
                  <button
                    key={poll.id}
                    className={`w-full p-3 text-left border rounded-lg transition-all duration-200 ${
                      currentPoll.id === poll.id ? "border-primary bg-primary/5" : "hover:border-primary/40"
                    }`}
                    onClick={() => switchPoll(poll.id)}
                  >
                    <div className="text-sm font-medium line-clamp-2">{poll.question}</div>
                    <div className="text-xs text-muted-foreground mt-1">{poll.totalVotes} votes</div>
                  </button>
                ))}
              </CardContent>
            </Card>

            {/* Live Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <TrendingUp className="h-4 w-4" />
                  Live Stats
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Total Participants</span>
                  <motion.span
                    className="font-bold text-primary"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                  >
                    {totalVotes}
                  </motion.span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm">Engagement Rate</span>
                  <span className="font-bold text-green-500">94%</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm">Active Now</span>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    <span className="font-bold">12</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Feedback */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <MessageCircle className="h-4 w-4" />
                  Quick Feedback
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() =>
                    toast({
                      title: "Thanks for your interest!",
                      description: "We'll add more polls based on your feedback.",
                    })
                  }
                >
                  Suggest a Poll Topic
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
