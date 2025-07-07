'use client';

import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Users, MessageCircle, Heart, Award, TrendingUp, Clock, MapPin, ExternalLink } from 'lucide-react';
import Link from 'next/link';

const recentActivities = [
  {
    id: 1,
    type: "workshop",
    title: "React Workshop erfolgreich abgeschlossen",
    description: "25 Teilnehmerinnen haben die Grundlagen von React gelernt und ihre erste App erstellt.",
    date: "vor 2 Tagen",
    participants: 25,
    mentor: "Sarah Weber",
    image: "/program.jpg",
    tags: ["React", "Frontend", "Workshop"],
    engagement: {
      likes: 42,
      comments: 15
    }
  },
  {
    id: 2,
    type: "mentoring",
    title: "Neue Mentoring-Paare gebildet",
    description: "15 neue Mentoring-Beziehungen wurden diese Woche gestartet. Herzlichen Glückwunsch!",
    date: "vor 3 Tagen",
    participants: 30,
    image: "/program.jpg",
    tags: ["Mentoring", "Networking"],
    engagement: {
      likes: 67,
      comments: 23
    }
  },
  {
    id: 3,
    type: "achievement",
    title: "Maria hat ihren ersten Tech-Job bekommen!",
    description: "Nach 6 Monaten Mentoring und intensivem Lernen hat Maria eine Position als Junior Developer erhalten.",
    date: "vor 5 Tagen",
    participants: 1,
    mentor: "Dr. Lisa Schmidt",
    image: "/program.jpg",
    tags: ["Success Story", "Career"],
    engagement: {
      likes: 156,
      comments: 34
    }
  },
  {
    id: 4,
    type: "community",
    title: "Tech Talk: Women in AI",
    description: "Spannender Vortrag über künstliche Intelligenz und die Rolle von Frauen in der KI-Entwicklung.",
    date: "vor 1 Woche",
    participants: 78,
    image: "/program.jpg",
    tags: ["AI", "Tech Talk", "Community"],
    engagement: {
      likes: 89,
      comments: 27
    }
  },
  {
    id: 5,
    type: "workshop",
    title: "Python Data Science Bootcamp",
    description: "Intensives 3-tägiges Bootcamp zu Datenanalyse und Machine Learning mit Python.",
    date: "vor 1 Woche",
    participants: 20,
    mentor: "Dr. Anna Müller",
    image: "/program.jpg",
    tags: ["Python", "Data Science", "Bootcamp"],
    engagement: {
      likes: 73,
      comments: 19
    }
  }
];

const communityStats = [
  {
    icon: Users,
    title: "Aktive Mitglieder",
    value: "2,847",
    change: "+12%",
    period: "diesen Monat"
  },
  {
    icon: Award,
    title: "Abgeschlossene Workshops",
    value: "156",
    change: "+8%",
    period: "diesen Monat"
  },
  {
    icon: Heart,
    title: "Mentoring-Paare",
    value: "89",
    change: "+15%",
    period: "diesen Monat"
  },
  {
    icon: TrendingUp,
    title: "Job-Vermittlungen",
    value: "34",
    change: "+23%",
    period: "diesen Monat"
  }
];

const upcomingEvents = [
  {
    id: 1,
    title: "Networking Event: Women in Tech Berlin",
    date: "15. Februar 2024",
    time: "18:00 - 21:00",
    location: "Berlin Tech Hub",
    type: "Networking",
    attendees: "45/60"
  },
  {
    id: 2,
    title: "Career Panel: From Junior to Senior",
    date: "22. Februar 2024",
    time: "19:00 - 20:30",
    location: "Online",
    type: "Panel Discussion",
    attendees: "120/150"
  },
  {
    id: 3,
    title: "Hackathon: Code for Good",
    date: "1. März 2024",
    time: "09:00 - 18:00",
    location: "Munich Innovation Center",
    type: "Hackathon",
    attendees: "28/40"
  }
];

const getActivityIcon = (type: string) => {
  switch (type) {
    case 'workshop':
      return Calendar;
    case 'mentoring':
      return Users;
    case 'achievement':
      return Award;
    case 'community':
      return MessageCircle;
    default:
      return Calendar;
  }
};

const getActivityColor = (type: string) => {
  switch (type) {
    case 'workshop':
      return 'purple';
    case 'mentoring':
      return 'blue';
    case 'achievement':
      return 'green';
    case 'community':
      return 'orange';
    default:
      return 'purple';
  }
};

export default function ActivityPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      {/* Hero Section */}
      <section className="py-24 bg-gradient-to-br from-purple-600 via-purple-700 to-blue-600 text-white">
        <div className="container mx-auto px-4">
          <motion.div 
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-8">
              Community Activity
            </h1>
            <p className="text-xl md:text-2xl mb-8 leading-relaxed">
              Entdecke was in unserer lebendigen Tech-Community passiert. Von Workshops über Mentoring 
              bis hin zu Erfolgsgeschichten - hier ist immer etwas los!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/sign-up">
                <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold rounded-full">
                  Community beitreten
                </Button>
              </Link>
              <Link href="/workshops">
                <Button size="lg" variant="outline" className="border-white/40 text-white hover:bg-white/10 px-8 py-4 text-lg font-semibold rounded-full">
                  Workshops ansehen
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Community Stats */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Community im Überblick
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Unsere Community wächst stetig und schafft täglich neue Verbindungen und Erfolge
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {communityStats.map((stat, index) => (
              <motion.div
                key={stat.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <Card className="p-6 text-center hover:shadow-lg transition-all duration-300 border-0 shadow-md bg-white">
                  <div className="bg-purple-100 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                    <stat.icon className="h-8 w-8 text-purple-600" />
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-2">
                    {stat.value}
                  </h3>
                  <p className="text-gray-600 mb-2 font-medium">
                    {stat.title}
                  </p>
                  <p className="text-sm text-green-600 font-medium">
                    {stat.change} {stat.period}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Activities */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Neueste Aktivitäten
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Bleibe auf dem Laufenden über die neuesten Ereignisse und Erfolge in unserer Community
            </p>
          </motion.div>

          <div className="space-y-8">
            {recentActivities.map((activity, index) => {
              const ActivityIcon = getActivityIcon(activity.type);
              const color = getActivityColor(activity.type);
              
              return (
                <motion.div
                  key={activity.id}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ x: 10 }}
                >
                  <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 border-0 shadow-md">
                    <CardContent className="p-0">
                      <div className="flex flex-col lg:flex-row">
                        <div className="lg:w-2/3 p-6">
                          <div className="flex items-start space-x-4">
                            <div className={`bg-${color}-100 p-3 rounded-2xl flex-shrink-0`}>
                              <ActivityIcon className={`h-6 w-6 text-${color}-600`} />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-2">
                                <h3 className="text-xl font-bold text-gray-900">
                                  {activity.title}
                                </h3>
                                <span className="text-sm text-gray-500">
                                  {activity.date}
                                </span>
                              </div>
                              <p className="text-gray-600 mb-4 leading-relaxed">
                                {activity.description}
                              </p>
                              
                              <div className="flex flex-wrap gap-2 mb-4">
                                {activity.tags.map((tag) => (
                                  <span 
                                    key={tag} 
                                    className={`bg-${color}-100 text-${color}-600 px-3 py-1 rounded-full text-sm font-medium`}
                                  >
                                    {tag}
                                  </span>
                                ))}
                              </div>

                              <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-4 text-sm text-gray-600">
                                  <div className="flex items-center space-x-1">
                                    <Users className="h-4 w-4" />
                                    <span>{activity.participants} Teilnehmer</span>
                                  </div>
                                  {activity.mentor && (
                                    <div>
                                      <span>Mentor: {activity.mentor}</span>
                                    </div>
                                  )}
                                </div>
                                
                                <div className="flex items-center space-x-4 text-sm text-gray-600">
                                  <div className="flex items-center space-x-1">
                                    <Heart className="h-4 w-4 text-red-500" />
                                    <span>{activity.engagement.likes}</span>
                                  </div>
                                  <div className="flex items-center space-x-1">
                                    <MessageCircle className="h-4 w-4 text-blue-500" />
                                    <span>{activity.engagement.comments}</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="lg:w-1/3 bg-gradient-to-br from-purple-100 to-blue-100 p-6 flex items-center justify-center">
                          <div className="text-center">
                            <ActivityIcon className={`h-16 w-16 text-${color}-600 mx-auto mb-4`} />
                            <p className="text-sm font-medium text-gray-700 capitalize">
                              {activity.type.replace('-', ' ')}
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-20 bg-gradient-to-br from-purple-50 to-blue-50">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Kommende Events
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Verpasse nicht unsere nächsten Community-Events und Networking-Möglichkeiten
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {upcomingEvents.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <Card className="h-full hover:shadow-lg transition-all duration-300 border-0 shadow-md bg-white">
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="bg-purple-100 text-purple-600 px-3 py-1 rounded-full text-sm font-medium">
                        {event.type}
                      </span>
                      <span className="text-sm text-gray-500">
                        {event.attendees}
                      </span>
                    </div>
                    <CardTitle className="text-xl font-bold text-gray-900">
                      {event.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3 mb-6">
                      <div className="flex items-center text-sm text-gray-600">
                        <Calendar className="h-4 w-4 mr-2 text-purple-600" />
                        {event.date}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Clock className="h-4 w-4 mr-2 text-purple-600" />
                        {event.time}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <MapPin className="h-4 w-4 mr-2 text-purple-600" />
                        {event.location}
                      </div>
                    </div>
                    
                    <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white">
                      Anmelden
                      <ExternalLink className="h-4 w-4 ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-purple-600 to-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Werde Teil der Bewegung
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Schließe dich unserer aktiven Community an und gestalte die Zukunft der Tech-Branche mit.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/sign-up">
                <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-4 text-lg">
                  Kostenlos beitreten
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="border-white/40 text-white hover:bg-white/10 px-8 py-4 text-lg">
                  Event vorschlagen
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
} 