// import Image from "next/image";

// const About = () => {
//   return (
//     <div className="bg-gray-50">
//       {/* ABOUT SECTION */}
//       <section className="text-center py-12 px-4">
//         <h2 className="text-sm uppercase text-gray-500 mb-2">About Us</h2>
//         <h1 className="text-4xl font-bold text-gray-800 mb-4">
//           Creative Blog Writing and Publishing Site
//         </h1>
//         <p className="text-gray-600 leading-relaxed max-w-3xl mx-auto">
//           Leverage agile frameworks to provide a robust synopsis for high-level
//           overviews. Iterative approaches to corporate strategy foster
//           collaborative thinking to further the overall value proposition.
//         </p>
//       </section>

//       {/* IMAGE SECTION */}
//       <div className="flex justify-center">
//         <Image
//           src="/assets/image/Container.png" // Image path for public folder
//           alt="Team working"
//           width={1200} // Adjust width as needed
//           height={800} // Adjust height as needed
//           className="w-full max-w-4xl rounded-lg"
//         />
//       </div>

//       {/* HOW WE WORK SECTION */}
//       <section className="py-12 px-4">
//         <div className="max-w-4xl mx-auto">
//           <h2 className="text-sm uppercase text-gray-500 mb-2">How We Work</h2>
//           <h1 className="text-3xl font-bold text-gray-800 mb-8">
//             I will show you how our team works
//           </h1>

//           {/* WORK PROCESS GRID */}
//           <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
//             {/* Card 1 */}
//             <div className="p-6 bg-gray-100 rounded-lg shadow-lg hover:bg-purple-600 hover:text-white transition-colors duration-300">
//               <h3 className="text-4xl font-bold text-gray-300 hover:text-white mb-4">01</h3>
//               <h4 className="text-lg font-semibold text-gray-700 hover:text-white mb-2">
//                 Brainstorming
//               </h4>
//               <p className="text-sm text-gray-600 hover:text-gray-200">
//                 Bring to the table win-win strategies to ensure proactive domination. At the end of the day, a new normal.
//               </p>
//               <a
//                 href="#"
//                 className="inline-block mt-4 underline font-semibold hover:text-white"
//               >
//                 Learn More
//               </a>
//             </div>

//             {/* Card 2 */}
//             <div className="p-6 bg-gray-100 rounded-lg shadow-lg hover:bg-purple-600 hover:text-white transition-colors duration-300">
//               <h3 className="text-4xl font-bold text-gray-300 hover:text-white mb-4">02</h3>
//               <h4 className="text-lg font-semibold text-gray-700 hover:text-white mb-2">
//                 Analyzing
//               </h4>
//               <p className="text-sm text-gray-600 hover:text-gray-200">
//                 Iterate approaches to corporate strategy foster collaborative thinking to further the overall.
//               </p>
//             </div>

//             {/* Card 3 */}
//             <div className="p-6 bg-gray-100 rounded-lg shadow-lg hover:bg-purple-600 hover:text-white transition-colors duration-300">
//               <h3 className="text-4xl font-bold text-gray-300 hover:text-white mb-4">03</h3>
//               <h4 className="text-lg font-semibold text-gray-700 hover:text-white mb-2">
//                 News Publishing
//               </h4>
//               <p className="text-sm text-gray-600 hover:text-gray-200">
//                 At the end of the day, a new normal that has evolved from generation is on the runway.
//               </p>
//             </div>
//           </div>

//         </div>
//       </section>
//     </div>
//   );
// };

// export default About;

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/Components/ui/button"
import { Badge } from "@/Components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/Components/ui/avatar"
import { FadeIn, ScaleIn, SlideUp, StaggerContainer, StaggerItem } from "@/Components/Home/animation"

const teamMembers = [
  {
    name: "Sarah Johnson",
    role: "Founder & CEO",
    bio: "Sarah has over 15 years of experience in digital publishing and is passionate about creating platforms for independent voices.",
    image: "/placeholder.svg?height=300&width=300&text=Sarah",
  },
  {
    name: "Michael Chen",
    role: "CTO",
    bio: "Michael leads our technical team and has a background in building scalable web applications for media companies.",
    image: "/placeholder.svg?height=300&width=300&text=Michael",
  },
  {
    name: "Priya Patel",
    role: "Head of Content",
    bio: "Priya oversees our editorial strategy and has previously worked as an editor at several major publications.",
    image: "/placeholder.svg?height=300&width=300&text=Priya",
  },
  {
    name: "James Wilson",
    role: "Marketing Director",
    bio: "James brings his expertise in digital marketing to help our writers reach their target audience effectively.",
    image: "/placeholder.svg?height=300&width=300&text=James",
  },
]

export default function AboutPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-muted/30 p-20 md:p-32">
        <div className="container relative z-10">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 items-center">
            <FadeIn direction="right">
              <div className="flex flex-col gap-6">
                <Badge className="w-fit">About Us</Badge>
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                  Our mission is to <span className="text-primary">empower</span> voices
                </h1>
                <p className="text-xl text-muted-foreground">
                  We're building a platform where ideas can flourish and knowledge can be shared freely.
                </p>
              </div>
            </FadeIn>
            <FadeIn direction="left">
              <div className="relative">
                <div className="relative overflow-hidden rounded-lg">
                  <Image
                    src="/about.webp"
                    alt="About Us"
                    width={800}
                    height={600}
                    className="w-full object-cover"
                  />
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/5 via-background to-background"></div>
      </section>

      {/* Our Story */}
      <section className="p-20">
        <div className="container">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 items-center">
            <ScaleIn>
              <div className="relative overflow-hidden rounded-lg">
                <Image
                  src="/ideas.jpeg"
                  alt="Our Story"
                  width={800}
                  height={600}
                  className="w-full object-cover"
                />
              </div>
            </ScaleIn>
            <FadeIn direction="left">
              <div className="flex flex-col gap-6">
                <Badge className="w-fit">Our Story</Badge>
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">From idea to reality</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    Insight was founded in 2020 with a simple idea: to create a platform where professionals could share
                    their knowledge and insights without barriers. We believed that everyone has unique expertise worth
                    sharing, and we wanted to build a community where those perspectives could thrive.
                  </p>
                  <p>
                    What started as a small project has grown into a vibrant community of writers and readers from
                    around the world. Today, Insight hosts thousands of articles on topics ranging from technology and
                    business to personal development and creative thinking.
                  </p>
                  <p>
                    Our platform is built on the principles of quality, accessibility, and community. We strive to make
                    professional blogging accessible to everyone, to amplify diverse voices, and to promote thoughtful,
                    well-crafted content.
                  </p>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="p-20 bg-muted/30">
        <div className="container">
          <FadeIn>
            <div className="flex flex-col items-center text-center mb-16">
              <Badge className="mb-4">Our Values</Badge>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">What drives us forward</h2>
              <p className="max-w-2xl text-muted-foreground text-lg">
                These core principles guide everything we do at Insight.
              </p>
            </div>
          </FadeIn>

          <div className="grid gap-8 md:grid-cols-3">
            <SlideUp>
              <div className="flex flex-col items-center text-center p-6 bg-background rounded-xl shadow-sm">
                <div className="rounded-full bg-primary/10 p-4 mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-primary"
                  >
                    <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                    <path d="m7 10 3 3 7-7" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Quality</h3>
                <p className="text-muted-foreground">
                  We believe in the power of well-crafted content. Our platform promotes thoughtful, accurate, and
                  valuable insights.
                </p>
              </div>
            </SlideUp>
            <SlideUp delay={0.1}>
              <div className="flex flex-col items-center text-center p-6 bg-background rounded-xl shadow-sm">
                <div className="rounded-full bg-primary/10 p-4 mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-primary"
                  >
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Community</h3>
                <p className="text-muted-foreground">
                  We foster a supportive environment where writers can connect, collaborate, and learn from each other.
                </p>
              </div>
            </SlideUp>
            <SlideUp delay={0.2}>
              <div className="flex flex-col items-center text-center p-6 bg-background rounded-xl shadow-sm">
                <div className="rounded-full bg-primary/10 p-4 mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-primary"
                  >
                    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Accessibility</h3>
                <p className="text-muted-foreground">
                  We believe that everyone should have the opportunity to share their voice and access valuable
                  knowledge.
                </p>
              </div>
            </SlideUp>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="p-20">
        <div className="container">
          <FadeIn>
            <div className="flex flex-col items-center text-center mb-16">
              <Badge className="mb-4">Our Team</Badge>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">Meet the people behind Insight</h2>
              <p className="max-w-2xl text-muted-foreground text-lg">
                Our diverse team brings together expertise from publishing, technology, and design.
              </p>
            </div>
          </FadeIn>

          <StaggerContainer className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {teamMembers.map((member) => (
              <StaggerItem key={member.name}>
                <div className="flex flex-col items-center text-center">
                  <Avatar className="h-32 w-32 mb-4">
                    <AvatarImage src={member.image} alt={member.name} />
                    <AvatarFallback>
                      {member.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <h3 className="text-xl font-bold">{member.name}</h3>
                  <p className="text-sm text-primary mb-2">{member.role}</p>
                  <p className="text-sm text-muted-foreground">{member.bio}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Stats Section */}
      <section className="p-20 bg-muted/30">
        <div className="container">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            <FadeIn>
              <div className="flex flex-col items-center justify-center space-y-2 text-center">
                <div className="text-4xl font-bold text-primary">10K+</div>
                <div className="text-sm font-medium text-muted-foreground">Writers</div>
              </div>
            </FadeIn>
            <FadeIn delay={0.1}>
              <div className="flex flex-col items-center justify-center space-y-2 text-center">
                <div className="text-4xl font-bold text-primary">50K+</div>
                <div className="text-sm font-medium text-muted-foreground">Articles</div>
              </div>
            </FadeIn>
            <FadeIn delay={0.2}>
              <div className="flex flex-col items-center justify-center space-y-2 text-center">
                <div className="text-4xl font-bold text-primary">1M+</div>
                <div className="text-sm font-medium text-muted-foreground">Monthly Readers</div>
              </div>
            </FadeIn>
            <FadeIn delay={0.3}>
              <div className="flex flex-col items-center justify-center space-y-2 text-center">
                <div className="text-4xl font-bold text-primary">100+</div>
                <div className="text-sm font-medium text-muted-foreground">Countries Reached</div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="p-20">
        <div className="container">
          <div className="rounded-xl bg-primary/5 p-8 md:p-12">
            <div className="grid gap-8 md:grid-cols-2 items-center">
              <FadeIn direction="right">
                <div className="flex flex-col gap-4">
                  <Badge className="w-fit">Join Us</Badge>
                  <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Become part of our community</h2>
                  <p className="text-muted-foreground">
                    Whether you're a writer looking to share your expertise or a reader seeking new perspectives,
                    there's a place for you at Insight.
                  </p>
                </div>
              </FadeIn>
              <FadeIn direction="left">
                <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-end">
                  <Button size="lg" asChild>
                    <Link href="/signup">Sign Up</Link>
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <Link href="/contact">Contact Us</Link>
                  </Button>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

