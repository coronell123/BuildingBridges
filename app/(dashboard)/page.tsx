import { Button } from '@/components/ui/button';
import { ArrowRight, Users2, BookOpen, Brain, Heart, Star } from 'lucide-react';
import Image from 'next/image';

export default function HomePage() {
  return (
    <main>
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-12 lg:gap-8">
            <div className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left">
              <h1 className="text-4xl font-bold text-gray-900 tracking-tight sm:text-5xl md:text-6xl">
                Building Bridges
                <span className="block text-[#8c52ff]">Empowerment und Mentoring für Mädchen & FLINTA of Color</span>
              </h1>
              <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
                Mädchen & FLINTA of Color zu mehr Teilhabe, Erfüllung und Kraft empowern
              </p>
              <div className="mt-8 sm:max-w-lg sm:mx-auto sm:text-center lg:text-left lg:mx-0">
                <Button className="bg-white hover:bg-gray-100 text-black border border-gray-200 rounded-full text-lg px-8 py-4 inline-flex items-center justify-center">
                  Sei dabei!
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </div>
            <div className="mt-12 relative sm:max-w-lg sm:mx-auto lg:mt-0 lg:max-w-none lg:mx-0 lg:col-span-6 lg:flex lg:items-center">
              <Image
                src="/coverImage_Building_Bridges.png"
                alt="Building Bridges Illustration"
                width={500}
                height={400}
                className="object-contain rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Unsere Vision</h2>
          <p className="text-lg text-gray-600 max-w-4xl mx-auto text-center mb-16">
            Unsere Gesellschaft ist vielfältig. Aber unsere Unis? Bei denen ist diese Tatsache noch nicht angekommen. 
            Weibliche* BIPoC sind nach wie vor stark unterrepräsentiert, auch in psychosozialen Bereichen.
            Das wollen wir ändern! Wir wollen dafür sorgen, dass Unis genauso vielfältig werden, wie unsere Gesellschaft ist.
            Dafür brauchen wir dich! Building Bridges ist ein Projekt für Mädchen und junge FLINTA of Color – ein Raum zum 
            gemeinsamen Austauschen, Lernen und Empowern.
          </p>

          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Unser Angebot</h2>
          <div className="lg:grid lg:grid-cols-3 lg:gap-8">
            <div>
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-[#8c52ff] text-white">
                <Heart className="h-6 w-6" />
              </div>
              <div className="mt-5">
                <h2 className="text-lg font-medium text-gray-900">
                  Workshops
                </h2>
                <p className="mt-2 text-base text-gray-500">
                  Mach mit bei Self-Care Workshops, in denen wir uns mit mentaler Gesundheit, 
                  Selbstfürsorge und Gemeinschaft beschäftigen.
                </p>
              </div>
            </div>
            <div className="mt-10 lg:mt-0">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-[#8c52ff] text-white">
                <Star className="h-6 w-6" />
              </div>
              <div className="mt-5">
                <h2 className="text-lg font-medium text-gray-900">
                  Skills Training
                </h2>
                <p className="mt-2 text-base text-gray-500">
                  Wir bieten Trainings an, in denen wir euch Skills für eure berufliche Zukunft 
                  und zum Uni-Einstieg an die Hand geben.
                </p>
              </div>
            </div>
            <div className="mt-10 lg:mt-0">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-[#8c52ff] text-white">
                <Users2 className="h-6 w-6" />
              </div>
              <div className="mt-5">
                <h2 className="text-lg font-medium text-gray-900">
                  Mentoring
                </h2>
                <p className="mt-2 text-base text-gray-500">
                  Wir vermitteln dir eine*n BIPoC Mentor*in, die dich auf deinem Weg berät, 
                  unterstützt und inspiriert.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-8">
                Begriffserklärungen
              </h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">FLINTA?</h3>
                  <p className="mt-2 text-gray-500">
                    Mit dieser Abkürzung sind Menschen gemeint, die von genderspezifischer Diskriminierung betroffen sind, 
                    d.h. Sexismus oder Trans- und Queerfeindlichkeit. Dazu gehören z.B. Mädchen und Frauen, aber auch 
                    nicht-binäre, inter- und transgeschlechtliche Personen.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">BIPoC?</h3>
                  <p className="mt-2 text-gray-500">
                    Gemeint sind Menschen, die von Rassismus betroffen sind. Das können z.B. Personen mit eigener/ familiärer 
                    Migrations- oder Fluchterfahrung sein und/ oder Schwarze Menschen, People of Color, jüdische oder indigene 
                    Personen und Sinti*zze und Rom*nja.
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-8 lg:mt-0 flex justify-center lg:justify-end">
              <Button className="bg-white hover:bg-gray-100 text-black border border-gray-200 rounded-full text-xl px-12 py-6 inline-flex items-center justify-center">
                Jetzt anmelden
                <ArrowRight className="ml-3 h-6 w-6" />
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
