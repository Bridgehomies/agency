"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Facebook, Github, Instagram, Linkedin, Twitter } from "lucide-react"

export default function Footer() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<null | "loading" | "success" | "error">(null)

  const services = [
    { name: "Web Development", href: "/webdev" },
    { name: "Mobile Development", href: "/mobile" },
    { name: "UI/UX Design", href: "/ui&ux" },
    { name: "Digital Strategy", href: "/design" },
    { name: "AI & Machine Learning", href: "/ai&ml" },
  ];
  const Company = [
    { name: "About Us", href: "/aboutus" },
    { 
      name: "Careers", 
      href: "", 
      disabled: true, 
      tooltip: "Jobs Comming Soon" 
    },
    { name: "Our Team", href: "/#team" },
    // { name: "Contact", href: "/#contact" },
  ]

  const handleSubmit = async () => {
    if (!email.includes("@") || !name.trim()) {
      setStatus("error")
      return
    }

    try {
      setStatus("loading")
      const res = await fetch("https://formspree.io/f/mgvyqeog", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email }),
      })

      if (res.ok) {
        setStatus("success")
        setName("")
        setEmail("")
      } else {
        setStatus("error")
      }
    } catch (err) {
      console.error(err)
      setStatus("error")
    }
  }

  return (
    <footer className="bg-muted/30 border-t">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <Link
              href="/"
              className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600"
            >
              Bridge <span className="text-primary">Homies</span>
            </Link>
            <p className="text-muted-foreground">
              We build beautiful digital experiences that drive growth and deliver exceptional results.
            </p>
          </div>

          {/* Company Links */}
           <div>
      <h3 className="text-lg font-semibold mb-4">Company</h3>
      <ul className="space-y-3">
        {Company.map((item) => (
          <li key={item.name}>
            {item.disabled ? (
              <span
                className="text-muted-foreground cursor-not-allowed opacity-60"
                title={item.tooltip || ""}
              >
                {item.name}
              </span>
            ) : (
              <Link
                href={item.href}
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                {item.name}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>

          {/* Services */}
          <div>
      <h3 className="text-lg font-semibold mb-4">Services</h3>
      <ul className="space-y-3">
        {services.map((service) => (
          <li key={service.name}>
            <Link
              href={service.href}
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              {service.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>

          {/* Subscribe */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Subscribe</h3>
            <p className="text-muted-foreground mb-4">
              Subscribe to our newsletter to receive updates and insights.
            </p>
            <div className="space-y-4">
              <Input
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-background"
              />
              <div className="flex gap-2">
                <Input
                  placeholder="Your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-background"
                />
                <Button onClick={handleSubmit} disabled={status === "loading"}>
                  {status === "loading" ? "Sending..." : "Subscribe"}
                </Button>
              </div>

              {status === "success" && (
                <p className="text-sm text-green-600">Subscribed successfully!</p>
              )}
              {status === "error" && (
                <p className="text-sm text-red-600">Please enter a valid name and email.</p>
              )}

              <p className="text-xs text-muted-foreground">
                By subscribing, you agree to our Privacy Policy and consent to receive updates.
              </p>
            </div>
          </div>
          <div>
            <div className="mt-8 text-xs text-muted-foreground text-center lg:text-left">
              © {new Date().getFullYear()} Bridge Homies. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
