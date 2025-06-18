import { Button } from '@/components/ui/button';
import { ArrowRight, Zap, Users, Shield } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white text-gray-800">
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative pt-32 pb-24 text-center bg-gray-50">
           <div 
            className="absolute inset-0 bg-cover bg-center opacity-10" 
            style={{backgroundImage: "url('/hero-image.jpg')"}}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white via-gray-50 to-gray-50" />
          <div className="container mx-auto px-4 relative">
            <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-gray-900">
              Empowering the Next Generation of Tech Leaders
            </h1>
            <p className="mt-6 max-w-2xl mx-auto text-lg text-gray-600">
              Building Bridges is a dedicated mentorship program designed to support and elevate FLINTA* individuals and girls of color in the tech industry.
            </p>
            <div className="mt-8 flex justify-center gap-4">
              <Button asChild size="lg">
                <Link href="/sign-up">
                  Join the Program <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/mentors">
                  Become a Mentor
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Program Overview Section */}
        <section className="py-20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold tracking-tight">How Our Program Works</h2>
            <p className="mt-4 max-w-3xl mx-auto text-gray-600">
              We connect ambitious students with experienced mentors from top tech companies to foster growth, share knowledge, and build lasting professional relationships.
            </p>
            <div className="mt-12 grid gap-8 md:grid-cols-3">
              <div className="p-8 border rounded-xl shadow-sm bg-gray-50">
                <h3 className="text-xl font-semibold">Personalized Matching</h3>
                <p className="mt-2 text-gray-600">We carefully match mentors and mentees based on career goals, skills, and personal interests to ensure a successful partnership.</p>
              </div>
              <div className="p-8 border rounded-xl shadow-sm bg-gray-50">
                <h3 className="text-xl font-semibold">Structured Guidance</h3>
                <p className="mt-2 text-gray-600">Our program provides a clear framework with regular check-ins, workshops, and goal-setting to keep you on track.</p>
              </div>
              <div className="p-8 border rounded-xl shadow-sm bg-gray-50">
                <h3 className="text-xl font-semibold">Community Support</h3>
                <p className="mt-2 text-gray-600">Join a vibrant community of peers and allies for networking events, collaborative projects, and lifelong connections.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Key Pillars Section */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <h2 className="text-4xl font-bold tracking-tight">Our Core Values</h2>
              <p className="mt-4 max-w-3xl mx-auto text-gray-600">
                We are driven by three key pillars that shape every aspect of our community and program.
              </p>
            </div>
            <div className="mt-16 max-w-4xl mx-auto grid gap-12 md:grid-cols-3">
              <div className="text-center">
                <div className="flex justify-center items-center mb-4">
                  <div className="p-4 bg-purple-100 rounded-full">
                    <Zap className="h-8 w-8 text-purple-600" />
                  </div>
                </div>
                <h3 className="text-2xl font-semibold">Empowerment</h3>
                <p className="mt-2 text-gray-600">Providing the tools, confidence, and opportunities for our members to thrive and lead.</p>
              </div>
               <div className="text-center">
                <div className="flex justify-center items-center mb-4">
                  <div className="p-4 bg-blue-100 rounded-full">
                    <Users className="h-8 w-8 text-blue-600" />
                  </div>
                </div>
                <h3 className="text-2xl font-semibold">Community</h3>
                <p className="mt-2 text-gray-600">Fostering a safe, inclusive, and collaborative space where everyone belongs.</p>
              </div>
               <div className="text-center">
                <div className="flex justify-center items-center mb-4">
                  <div className="p-4 bg-green-100 rounded-full">
                    <Shield className="h-8 w-8 text-green-600" />
                  </div>
                </div>
                <h3 className="text-2xl font-semibold">Inclusivity</h3>
                <p className="mt-2 text-gray-600">Championing diversity and ensuring equitable access for all our members.</p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Final CTA Section */}
        <section className="py-24">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold tracking-tight">Ready to Make an Impact?</h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600">
              Whether you're looking for guidance or ready to share your expertise, your journey starts here.
            </p>
            <div className="mt-8">
              <Button asChild size="lg">
                <Link href="/sign-up">
                  Get Started Today
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
} 