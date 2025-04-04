
// const Contact = () => {
//   return (
//     <section className="bg-gray-100 py-12">
//       <div className="max-w-6xl mx-auto px-4 text-center">
//         {/* Heading */}
//         <h2 className="text-3xl font-bold text-gray-900 mb-4">Get in Touch</h2>
//         <p className="text-gray-600 mb-8">
//           Contact us to publish your content and show ads on our website and get a good reach.
//         </p>

//         {/* Contact Details */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
//           {/* Office */}
//           <div className="bg-white rounded-lg p-6 shadow-md text-center">
//             <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center bg-purple-100 text-purple-600 rounded-full">

//             </div>
//             <h3 className="text-lg font-semibold text-purple-600 mb-2">Office</h3>
//             <p className="text-gray-600">Victoria Street, London, UK</p>
//           </div>
//           {/* Email */}
//           <div className="bg-white rounded-lg p-6 shadow-md text-center">
//             <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center bg-purple-100 text-purple-600 rounded-full">
//               <i className="fas fa-envelope"></i>
//             </div>
//             <h3 className="text-lg font-semibold text-purple-600 mb-2">Email</h3>
//             <p className="text-gray-600">hello@zarrin.com</p>
//           </div>
//           {/* Phone */}
//           <div className="bg-white rounded-lg p-6 shadow-md text-center">
//             <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center bg-purple-100 text-purple-600 rounded-full">
//               <i className="fas fa-phone-alt"></i>
//             </div>
//             <h3 className="text-lg font-semibold text-purple-600 mb-2">Phone</h3>
//             <p className="text-gray-600">(001) 2342 3451</p>
//           </div>
//         </div>

//         {/* Background Image with Form */}
//         <div className="relative w-full min-h-screen bg-gray-100 flex items-center justify-center">
//           {/* Background Image */}
//           <div
//             className="absolute top-0 w-full h-64 md:h-80 bg-cover bg-center z-0"
//             style={{ backgroundImage: "url('/assets/image/Rectangle1086.png')" }}
//           ></div>

//           {/* Contact Form */}
//           <div className="relative z-10 w-full max-w-4xl mx-4 mt-32 md:mt-40 bg-white p-8 rounded-lg shadow-lg">
//             <form>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 {/* Name */}
//                 <div>
//                   <label className="block text-gray-700 mb-2">Name</label>
//                   <input
//                     type="text"
//                     className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
//                     placeholder="Your Name"
//                   />
//                 </div>
//                 {/* Email */}
//                 <div>
//                   <label className="block text-gray-700 mb-2">Email</label>
//                   <input
//                     type="email"
//                     className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
//                     placeholder="Your Email"
//                   />
//                 </div>
//                 {/* Phone */}
//                 <div>
//                   <label className="block text-gray-700 mb-2">Phone</label>
//                   <input
//                     type="text"
//                     className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
//                     placeholder="Your Phone"
//                   />
//                 </div>
//                 {/* Subject */}
//                 <div>
//                   <label className="block text-gray-700 mb-2">Subject</label>
//                   <input
//                     type="text"
//                     className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
//                     placeholder="Subject"
//                   />
//                 </div>
//               </div>
//               {/* Message */}
//               <div className="mt-6">
//                 <label className="block text-gray-700 mb-2">Message</label>
//                 <textarea
//                   rows={5}
//                   className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
//                   placeholder="Write your message here..."
//                 ></textarea>
//               </div>
//               {/* Submit Button */}
//               <div className="mt-6 text-center">
//                 <button
//                   type="submit"
//                   className="px-6 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition duration-300"
//                 >
//                   Send Message
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Contact;

"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/Components/ui/button"
import { Input } from "@/Components/ui/input"
import { Textarea } from "@/Components/ui/textarea"
import { Label } from "@/Components/ui/label"
import { Badge } from "@/Components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/Components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/Components/ui/select"
import { Mail, Phone, MapPin, Clock, CheckCircle } from "lucide-react"
import { FadeIn, SlideUp } from "@/Components/Home/animation"

export default function ContactPage() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormState((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
      setFormState({
        name: "",
        email: "",
        subject: "",
        message: "",
      })
    }, 1500)
  }

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-muted/30 p-20 md:p-32">
        <div className="container relative z-10">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 items-center">
            <FadeIn direction="right">
              <div className="flex flex-col gap-6">
                <Badge className="w-fit">Contact Us</Badge>
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Get in touch with our team</h1>
                <p className="text-xl text-muted-foreground">Have questions or feedback? We'd love to hear from you.</p>
              </div>
            </FadeIn>
            <FadeIn direction="left">
              <div className="relative">
                <div className="relative overflow-hidden rounded-lg">
                  <Image
                    src="/contact.jpg"
                    alt="Contact Us"
                    width={1200}
                    height={1200}
                    className="w-full object-cover"
                  />
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/5 via-background to-background"></div>
      </section>

      {/* Contact Form and Info */}
      <section className="p-20">
        <div className="container">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-8">
            {/* Contact Form */}
            <SlideUp>
              <Card>
                <CardHeader>
                  <CardTitle>Send us a message</CardTitle>
                  <CardDescription>
                    Fill out the form below and we'll get back to you as soon as possible.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {isSubmitted ? (
                    <div className="flex flex-col items-center justify-center space-y-4 text-center p-6">
                      <div className="rounded-full bg-primary/10 p-3 w-12 h-12 flex items-center justify-center mb-4">
                        <CheckCircle className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="text-xl font-bold">Message Sent!</h3>
                      <p className="text-muted-foreground">
                        Thank you for reaching out. We'll get back to you shortly.
                      </p>
                      <Button variant="outline" onClick={() => setIsSubmitted(false)} className="mt-4">
                        Send Another Message
                      </Button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Name</Label>
                          <Input
                            id="name"
                            name="name"
                            placeholder="Your name"
                            required
                            value={formState.name}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="Your email"
                            required
                            value={formState.email}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="subject">Subject</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a subject" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="general">General Inquiry</SelectItem>
                            <SelectItem value="support">Technical Support</SelectItem>
                            <SelectItem value="feedback">Feedback</SelectItem>
                            <SelectItem value="partnership">Partnership</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="message">Message</Label>
                        <Textarea
                          id="message"
                          name="message"
                          placeholder="Your message"
                          required
                          className="min-h-[150px]"
                          value={formState.message}
                          onChange={handleChange}
                        />
                      </div>
                      <Button type="submit" className="w-full" disabled={isSubmitting}>
                        {isSubmitting ? "Sending..." : "Send Message"}
                      </Button>
                    </form>
                  )}
                </CardContent>
              </Card>
            </SlideUp>

            {/* Contact Info */}
            <SlideUp delay={0.1}>
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold mb-4">Contact Information</h2>
                  <p className="text-muted-foreground mb-6">
                    You can reach out to us through the contact form or using the information below.
                  </p>
                </div>

                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="rounded-full bg-primary/10 p-3 w-12 h-12 flex items-center justify-center">
                      <Mail className="text-primary h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Email</h3>
                      <p className="text-muted-foreground">umarofficial0121@gmail.com</p>
                      <p className="text-muted-foreground">uhhfj0345@gmail.com</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="rounded-full bg-primary/10 p-3 w-12 h-12 flex items-center justify-center">
                      <Phone className="text-primary h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Phone</h3>
                      <p className="text-muted-foreground">+92 307 5799968</p>
                      <p className="text-muted-foreground">Opens 24 Hours</p>
                    </div>
                  </div>
                </div>

                <div className="mt-8">
                  <h3 className="text-xl font-bold mb-4">Frequently Asked Questions</h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold">How do I create an account?</h4>
                      <p className="text-muted-foreground">
                        You can sign up for an account by clicking the "Sign up" button in the top right corner of the
                        page.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold">Is Insight free to use?</h4>
                      <p className="text-muted-foreground">
                        Yes, Insight is free for basic use. We also offer premium plans with additional features.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold">How can I publish an article?</h4>
                      <p className="text-muted-foreground">
                        After creating an account, you can publish articles through your dashboard.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </SlideUp>
          </div>
        </div>
      </section>
    </div>
  )
}

