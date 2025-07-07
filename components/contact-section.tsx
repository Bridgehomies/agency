"use client"

import { useState, useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { Mail, MapPin, Phone, Send } from "lucide-react"
import emailjs from "emailjs-com"

export default function ContactSection() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const formRef = useRef<HTMLFormElement | null>(null)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    emailjs
      .sendForm(
        "service_yz7c03r",
        "template_pb2wiws",
        formRef.current!,
        "5IX3QNnJjkXWCygF4"
      )
      .then(
        () => {
          setIsSubmitting(false)
          toast({
            title: "Message sent!",
            description: "We'll get back to you as soon as possible.",
          })
          formRef.current?.reset()
        },
        (error) => {
          setIsSubmitting(false)
          toast({
            title: "Something went wrong",
            description: "Please try again or contact us directly.",
            variant: "destructive",
          })
          console.error("Email error:", error)
        }
      )
  }

  return (
    <section id="contact" className="py-20 md:py-32">
      <div className="container px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Get In Touch</h2>
          <p className="text-lg md:text-xl text-muted-foreground">
            Have a project in mind? We'd love to hear from you.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="space-y-8">
              <h3 className="text-2xl font-bold mb-6">Contact Information</h3>

              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-full text-primary">
                  <Mail className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="text-lg font-medium mb-1">Email</h4>
                  <p className="text-muted-foreground">bridgehomies@gmail.com</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-full text-primary">
                  <Phone className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="text-lg font-medium mb-1">Phone</h4>
                  <p className="text-muted-foreground">+92 342 9263395</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-full text-primary">
                  <MapPin className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="text-lg font-medium mb-1">Office</h4>
                  <p className="text-muted-foreground">
                    167-A, Block G-1, Phase-1, Johar Town, Lahore
                  </p>
                </div>
              </div>

            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="space-y-6 bg-muted/30 p-6 sm:p-8 rounded-xl"
            >
              <h3 className="text-2xl font-bold mb-6">Send us a message</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="from_name" className="text-sm font-medium">
                    Name
                  </label>
                  <Input
                    id="from_name"
                    name="from_name"
                    placeholder="Your name"
                    required
                    className="bg-background"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="reply_to" className="text-sm font-medium">
                    Email
                  </label>
                  <Input
                    id="reply_to"
                    name="reply_to"
                    type="email"
                    placeholder="Your email"
                    required
                    className="bg-background"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="from_phone" className="text-sm font-medium">
                  Phone
                </label>
                <Input
                  id="from_phone"
                  name="from_phone"
                  placeholder="Your Phone"
                  required
                  className="bg-background"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="from_country" className="text-sm font-medium">
                  Country
                </label>
                <Input
                  id="from_country"
                  name="from_country"
                  placeholder="Your country"
                  required
                  className="bg-background"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="subject" className="text-sm font-medium">
                  Subject
                </label>
                <Input
                  id="subject"
                  name="subject"
                  placeholder="How can we help you?"
                  required
                  className="bg-background"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium">
                  Message
                </label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="Tell us about your project..."
                  rows={5}
                  required
                  className="bg-background resize-none"
                />
              </div>

              <Button
                type="submit"
                className="w-full group bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 text-white shadow-lg hover:shadow-primary/20 transition-all duration-300"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  "Sending..."
                ) : (
                  <>
                    Send Message
                    <Send className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </>
                )}
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
