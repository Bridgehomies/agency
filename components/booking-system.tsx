"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Clock, User, Mail, Phone, MessageSquare } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

const timeSlots = ["09:00 AM", "10:00 AM", "11:00 AM", "02:00 PM", "03:00 PM", "04:00 PM"]

const consultationTypes = [
  {
    id: "discovery",
    title: "Discovery Call",
    duration: "30 min",
    description: "Initial consultation to understand your project needs",
  },
  {
    id: "strategy",
    title: "Strategy Session",
    duration: "60 min",
    description: "Deep dive into your project strategy and planning",
  },
  {
    id: "technical",
    title: "Technical Review",
    duration: "45 min",
    description: "Technical assessment and architecture discussion",
  },
]

export default function BookingSystem() {
  const [step, setStep] = useState(1)
  const [selectedType, setSelectedType] = useState("")
  const [selectedDate, setSelectedDate] = useState("")
  const [selectedTime, setSelectedTime] = useState("")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
  })
  const { toast } = useToast()

  // Generate next 14 days
  const generateDates = () => {
    const dates = []
    for (let i = 1; i <= 14; i++) {
      const date = new Date()
      date.setDate(date.getDate() + i)
      dates.push(date)
    }
    return dates
  }

  const dates = generateDates()

const handleSubmit = async () => {
  const payload = {
    name: formData.name,
    email: formData.email,
    phone: formData.phone,
    company: formData.company,
    message: formData.message,
    date: selectedDate,
    time: selectedTime,
    consultation_type: consultationTypes.find((t) => t.id === selectedType)?.title,
  };

  try {
    const response = await fetch("/api/send-booking", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      toast({
        title: "Booking Confirmed! 🎉",
        description: "We’ve sent your booking information.",
      });

      setStep(1);
      setSelectedType("");
      setSelectedDate("");
      setSelectedTime("");
      setFormData({ name: "", email: "", phone: "", company: "", message: "" });
    } else {
      throw new Error("Email failed to send.");
    }
  } catch (error) {
    toast({
      title: "Submission Failed",
      description: "Please try again later or contact support.",
      variant: "destructive",
    });
  }
};



  const isStepComplete = (stepNumber: number) => {
    switch (stepNumber) {
      case 1:
        return selectedType !== ""
      case 2:
        return selectedDate !== ""
      case 3:
        return selectedTime !== ""
      case 4:
        return formData.name && formData.email
      default:
        return false
    }
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
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Book a Consultation</h2>
          <p className="text-xl text-muted-foreground">
            Schedule a free consultation to discuss your project and get expert advice
          </p>
        </motion.div>

        <Card className="max-w-3xl mx-auto">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Schedule Your Meeting</CardTitle>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4].map((stepNumber) => (
                  <div
                    key={stepNumber}
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300 ${
                      step >= stepNumber
                        ? "bg-primary text-white"
                        : isStepComplete(stepNumber)
                          ? "bg-green-500 text-white"
                          : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {stepNumber}
                  </div>
                ))}
              </div>
            </div>
          </CardHeader>

          <CardContent>
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="text-xl font-semibold mb-6">Choose Consultation Type</h3>
                  <div className="grid gap-4">
                    {consultationTypes.map((type) => (
                      <motion.div
                        key={type.id}
                        className={`p-4 border rounded-lg cursor-pointer transition-all duration-200 ${
                          selectedType === type.id ? "border-primary bg-primary/5" : "hover:border-primary/40"
                        }`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setSelectedType(type.id)}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold">{type.title}</h4>
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-muted-foreground">{type.duration}</span>
                            <span className="text-sm font-medium text-primary">{type.price}</span>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground">{type.description}</p>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="text-xl font-semibold mb-6">Select Date</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {dates.map((date, index) => {
                      const dateString = date.toISOString().split("T")[0]
                      const isWeekend = date.getDay() === 0 || date.getDay() === 6
                      return (
                        <motion.button
                          key={index}
                          className={`p-3 border rounded-lg text-center transition-all duration-200 ${
                            selectedDate === dateString
                              ? "border-primary bg-primary text-white"
                              : isWeekend
                                ? "border-muted text-muted-foreground cursor-not-allowed"
                                : "hover:border-primary hover:bg-primary/5"
                          }`}
                          whileHover={!isWeekend ? { scale: 1.05 } : {}}
                          whileTap={!isWeekend ? { scale: 0.95 } : {}}
                          onClick={() => !isWeekend && setSelectedDate(dateString)}
                          disabled={isWeekend}
                        >
                          <div className="text-sm font-medium">
                            {date.toLocaleDateString("en-US", { weekday: "short" })}
                          </div>
                          <div className="text-lg font-bold">{date.getDate()}</div>
                          <div className="text-xs">{date.toLocaleDateString("en-US", { month: "short" })}</div>
                        </motion.button>
                      )
                    })}
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="text-xl font-semibold mb-6">Choose Time</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {timeSlots.map((time, index) => (
                      <motion.button
                        key={index}
                        className={`p-3 border rounded-lg text-center transition-all duration-200 ${
                          selectedTime === time
                            ? "border-primary bg-primary text-white"
                            : "hover:border-primary hover:bg-primary/5"
                        }`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setSelectedTime(time)}
                      >
                        <Clock className="h-4 w-4 mx-auto mb-1" />
                        <div className="font-medium">{time}</div>
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}

              {step === 4 && (
                <motion.div
                  key="step4"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="text-xl font-semibold mb-6">Your Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Name *</label>
                      <div className="relative">
                        <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          placeholder="Your full name"
                          className="pl-10"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Email *</label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          type="email"
                          placeholder="your@email.com"
                          className="pl-10"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Phone</label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          placeholder="Your phone number"
                          className="pl-10"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Company</label>
                      <Input
                        placeholder="Your company name"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Project Details</label>
                    <div className="relative">
                      <MessageSquare className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Textarea
                        placeholder="Tell us about your project..."
                        className="pl-10 min-h-[100px]"
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      />
                    </div>
                  </div>

                  {/* Booking Summary */}
                  <div className="mt-6 p-4 bg-muted/50 rounded-lg">
                    <h4 className="font-semibold mb-2">Booking Summary</h4>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span>Consultation Type:</span>
                        <span className="font-medium">
                          {consultationTypes.find((t) => t.id === selectedType)?.title}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Date:</span>
                        <span className="font-medium">
                          {new Date(selectedDate).toLocaleDateString("en-US", {
                            weekday: "long",
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Time:</span>
                        <span className="font-medium">{selectedTime}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Duration:</span>
                        <span className="font-medium">
                          {consultationTypes.find((t) => t.id === selectedType)?.duration}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8">
              <Button variant="outline" onClick={() => setStep(Math.max(1, step - 1))} disabled={step === 1}>
                Previous
              </Button>
              {step < 4 ? (
                <Button onClick={() => setStep(step + 1)} disabled={!isStepComplete(step)}>
                  Next
                </Button>
              ) : (
                <Button
                  onClick={handleSubmit}
                  disabled={!formData.name || !formData.email}
                  className="bg-gradient-to-r from-primary to-purple-600"
                >
                  Confirm Booking
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
