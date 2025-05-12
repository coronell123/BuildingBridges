'use client';

import { Button } from '@/lib/design-system/components';
import { ArrowRight, Users2, BookOpen, Brain, Heart, Star, ArrowDown, CheckCircle } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerChildren = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { 
      staggerChildren: 0.2
    }
  }
};

export default function HomePage() {
  return (
    <main className="overflow-hidden">
      {/* Hero Section - Split Screen Layout */}
      <section className="min-h-[90vh] flex items-center relative">
        {/* Subtle Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-tr from-background-secondary/10 via-white to-primary/5 z-0" />
        <div className="absolute top-0 right-0 w-1/3 h-screen bg-primary/5 -z-10 transform -skew-x-12" />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Content Side */}
            <motion.div 
              className="lg:col-span-6"
              initial="hidden"
              animate="visible"
              variants={staggerChildren}
            >
              <motion.h1 
                className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight"
                variants={fadeIn}
              >
                Building Bridges
                <span className="block text-primary mt-2">Empowerment und Mentoring für Mädchen & FLINTA of Color</span>
              </motion.h1>
              
              <motion.p 
                className="mt-6 text-lg text-text-secondary max-w-lg"
                variants={fadeIn}
              >
                Mädchen & FLINTA of Color zu mehr Teilhabe, Erfüllung und Kraft empowern
              </motion.p>
              
              <motion.div 
                className="mt-10 flex flex-wrap gap-4"
                variants={fadeIn}
              >
                <Button size="lg" leftIcon={<CheckCircle className="h-5 w-5" />}>
                  <Link href="/sign-up">Sei dabei!</Link>
                </Button>
                <Button variant="outline" size="lg" rightIcon={<ArrowRight className="h-5 w-5" />}>
                  <Link href="/vision">Mehr erfahren</Link>
                </Button>
              </motion.div>
            </motion.div>
            
            {/* Image Side */}
            <motion.div 
              className="lg:col-span-6 relative"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              <div className="relative">
                <div className="absolute -inset-4 bg-primary/10 rounded-tl-3xl rounded-br-3xl -z-10" />
                <Image
                  src="/coverImage_Building_Bridges.png"
                  alt="Building Bridges Illustration"
                  width={600}
                  height={500}
                  className="object-contain rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300"
                  priority
                />
              </div>
            </motion.div>
          </div>
          
          {/* Scroll indicator */}
          <motion.div 
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.5 }}
          >
            <p className="text-sm text-text-secondary mb-2">Scroll für mehr</p>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              <ArrowDown className="h-5 w-5 text-primary" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-24 bg-white w-full">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerChildren}
            className="max-w-4xl mx-auto text-center"
          >
            <motion.h2 
              className="text-3xl md:text-4xl font-bold mb-6"
              variants={fadeIn}
            >
              Unsere Vision
            </motion.h2>
            
            <motion.p 
              className="text-lg text-text-secondary mb-12"
              variants={fadeIn}
            >
              Unsere Gesellschaft ist vielfältig. Aber unsere Unis? Bei denen ist diese Tatsache noch nicht angekommen. 
              Weibliche* BIPoC sind nach wie vor stark unterrepräsentiert, auch in psychosozialen Bereichen.
              Das wollen wir ändern! Wir wollen dafür sorgen, dass Unis genauso vielfältig werden, wie unsere Gesellschaft ist.
            </motion.p>
            
            <motion.div 
              className="p-8 bg-primary/5 rounded-lg border border-primary/10"
              variants={fadeIn}
            >
              <p className="text-lg italic">
                Building Bridges ist ein Projekt für Mädchen und junge FLINTA of Color – ein Raum zum 
                gemeinsamen Austauschen, Lernen und Empowern.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Services Section - Card Grid */}
      <section className="py-24 bg-background-secondary w-full">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerChildren}
            className="text-center mb-16"
          >
            <motion.h2 
              className="text-3xl md:text-4xl font-bold mb-4"
              variants={fadeIn}
            >
              Unser Angebot
            </motion.h2>
            <motion.p 
              className="text-lg text-text-secondary max-w-2xl mx-auto"
              variants={fadeIn}
            >
              Wir bieten verschiedene Programme und Unterstützung für deine persönliche und berufliche Entwicklung
            </motion.p>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerChildren}
          >
            {/* Card 1 */}
            <motion.div 
              className="bg-white rounded-lg p-8 shadow-sm hover:shadow-md transition-all duration-300 border border-border/50 hover:border-primary/20 h-full flex flex-col"
              variants={fadeIn}
              whileHover={{ y: -5 }}
            >
              <div className="rounded-full bg-primary/10 p-3 w-14 h-14 flex items-center justify-center mb-6">
                <Heart className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Workshops</h3>
              <p className="text-text-secondary flex-grow">
                Mach mit bei Self-Care Workshops, in denen wir uns mit mentaler Gesundheit, 
                Selbstfürsorge und Gemeinschaft beschäftigen.
              </p>
              <Button variant="ghost" size="sm" className="mt-6 self-start" rightIcon={<ArrowRight className="h-4 w-4" />}>
                <Link href="/workshops">Mehr erfahren</Link>
              </Button>
            </motion.div>
            
            {/* Card 2 */}
            <motion.div 
              className="bg-white rounded-lg p-8 shadow-sm hover:shadow-md transition-all duration-300 border border-border/50 hover:border-primary/20 h-full flex flex-col"
              variants={fadeIn}
              whileHover={{ y: -5 }}
            >
              <div className="rounded-full bg-primary/10 p-3 w-14 h-14 flex items-center justify-center mb-6">
                <Star className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Skills Training</h3>
              <p className="text-text-secondary flex-grow">
                Wir bieten Trainings an, in denen wir euch Skills für eure berufliche Zukunft 
                und zum Uni-Einstieg an die Hand geben.
              </p>
              <Button variant="ghost" size="sm" className="mt-6 self-start" rightIcon={<ArrowRight className="h-4 w-4" />}>
                <Link href="/workshops">Workshops entdecken</Link>
              </Button>
            </motion.div>
            
            {/* Card 3 */}
            <motion.div 
              className="bg-white rounded-lg p-8 shadow-sm hover:shadow-md transition-all duration-300 border border-border/50 hover:border-primary/20 h-full flex flex-col"
              variants={fadeIn}
              whileHover={{ y: -5 }}
            >
              <div className="rounded-full bg-primary/10 p-3 w-14 h-14 flex items-center justify-center mb-6">
                <Users2 className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Mentoring</h3>
              <p className="text-text-secondary flex-grow">
                Wir vermitteln dir eine*n BIPoC Mentor*in, die dich auf deinem Weg berät, 
                unterstützt und inspiriert.
              </p>
              <Button variant="ghost" size="sm" className="mt-6 self-start" rightIcon={<ArrowRight className="h-4 w-4" />}>
                <Link href="/mentors">Mentor*innen kennenlernen</Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* FAQ/Terminology Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerChildren}
            >
              <motion.h2 
                className="text-3xl md:text-4xl font-bold mb-8"
                variants={fadeIn}
              >
                Begriffserklärungen
              </motion.h2>
              
              <motion.div 
                className="space-y-8"
                variants={staggerChildren}
              >
                <motion.div 
                  className="p-6 bg-background-secondary rounded-lg"
                  variants={fadeIn}
                >
                  <h3 className="text-xl font-semibold mb-3">FLINTA?</h3>
                  <p className="text-text-secondary">
                    Mit dieser Abkürzung sind Menschen gemeint, die von genderspezifischer Diskriminierung betroffen sind, 
                    d.h. Sexismus oder Trans- und Queerfeindlichkeit. Dazu gehören z.B. Mädchen und Frauen, aber auch 
                    nicht-binäre, inter- und transgeschlechtliche Personen.
                  </p>
                </motion.div>
                
                <motion.div 
                  className="p-6 bg-background-secondary rounded-lg"
                  variants={fadeIn}
                >
                  <h3 className="text-xl font-semibold mb-3">BIPoC?</h3>
                  <p className="text-text-secondary">
                    Gemeint sind Menschen, die von Rassismus betroffen sind. Das können z.B. Personen mit eigener/ familiärer 
                    Migrations- oder Fluchterfahrung sein und/ oder Schwarze Menschen, People of Color, jüdische oder indigene 
                    Personen und Sinti*zze und Rom*nja.
                  </p>
                </motion.div>
              </motion.div>
            </motion.div>
            
            <motion.div
              className="lg:pl-12 flex flex-col items-center lg:items-start"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="bg-primary/10 p-8 rounded-tl-3xl rounded-br-3xl mb-8 max-w-md">
                <h3 className="text-2xl font-bold mb-4">Bereit mitzumachen?</h3>
                <p className="text-text-secondary mb-6">
                  Werde Teil unserer Community und profitiere von Workshops, Mentoring und einem unterstützenden Netzwerk.
                </p>
                <Button size="lg" className="w-full">
                  <Link href="/sign-up">Jetzt anmelden</Link>
                </Button>
              </div>
              
              <div className="mt-8 flex items-center space-x-2 text-text-secondary">
                <CheckCircle className="h-5 w-5 text-secondary-green" />
                <span>Kostenlose Teilnahme</span>
              </div>
              <div className="mt-4 flex items-center space-x-2 text-text-secondary">
                <CheckCircle className="h-5 w-5 text-secondary-green" />
                <span>Flexible Zeiten</span>
              </div>
              <div className="mt-4 flex items-center space-x-2 text-text-secondary">
                <CheckCircle className="h-5 w-5 text-secondary-green" />
                <span>Persönliche Betreuung</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Social Proof / Testimonial Section */}
      <section className="py-24 bg-background-secondary relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-primary/5 rounded-full -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/5 rounded-full translate-x-1/3 translate-y-1/3" />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerChildren}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <motion.h2 
              className="text-3xl md:text-4xl font-bold mb-4"
              variants={fadeIn}
            >
              Was unsere Community sagt
            </motion.h2>
            <motion.p 
              className="text-lg text-text-secondary"
              variants={fadeIn}
            >
              Höre von den Menschen, die bereits Teil unserer Building Bridges Community sind
            </motion.p>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerChildren}
          >
            {/* Testimonial 1 */}
            <motion.div 
              className="bg-white p-6 rounded-lg shadow-sm border border-border/50"
              variants={fadeIn}
            >
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">S</div>
                <div className="ml-3">
                  <h4 className="font-semibold">Sarah K.</h4>
                  <p className="text-sm text-text-secondary">Teilnehmerin</p>
                </div>
              </div>
              <p className="italic text-text-secondary">
                "Die Workshops haben mir geholfen, mehr Selbstvertrauen aufzubauen und meine Ziele klarer zu definieren. 
                Ich bin so dankbar für dieses Programm!"
              </p>
            </motion.div>
            
            {/* Testimonial 2 */}
            <motion.div 
              className="bg-white p-6 rounded-lg shadow-sm border border-border/50"
              variants={fadeIn}
            >
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">M</div>
                <div className="ml-3">
                  <h4 className="font-semibold">Mira T.</h4>
                  <p className="text-sm text-text-secondary">Mentee</p>
                </div>
              </div>
              <p className="italic text-text-secondary">
                "Meine Mentorin hat mir geholfen, den Einstieg ins Studium zu meistern. Ohne Building Bridges 
                wäre ich nicht da, wo ich heute bin."
              </p>
            </motion.div>
            
            {/* Testimonial 3 */}
            <motion.div 
              className="bg-white p-6 rounded-lg shadow-sm border border-border/50"
              variants={fadeIn}
            >
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">J</div>
                <div className="ml-3">
                  <h4 className="font-semibold">Jasmin R.</h4>
                  <p className="text-sm text-text-secondary">Mentorin</p>
                </div>
              </div>
              <p className="italic text-text-secondary">
                "Als Mentorin zu sehen, wie die Teilnehmerinnen wachsen und ihre Ziele erreichen, ist unglaublich 
                bereichernd. Ich lerne selbst so viel dabei."
              </p>
            </motion.div>
          </motion.div>
          
          <motion.div 
            className="mt-16 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Button variant="outline" rightIcon={<ArrowRight className="h-4 w-4" />}>
              <Link href="/sign-up">Teil unserer Community werden</Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
