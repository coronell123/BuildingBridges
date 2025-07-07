import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, Calendar, MessageSquare, Clock, Star, TrendingUp } from 'lucide-react';

export function MentorDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Mentor Dashboard</h1>
        <Button>
          <Calendar className="mr-2 h-4 w-4" />
          Schedule Session
        </Button>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Mentees</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">2 new this month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sessions This Month</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">+15% from last month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Rating</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.9</div>
            <p className="text-xs text-muted-foreground">Based on 42 reviews</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Hours</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">156</div>
            <p className="text-xs text-muted-foreground">Mentoring hours</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Users className="mr-2 h-5 w-5" />
              My Mentees
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium text-blue-600">LM</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Leila Müller</p>
                    <p className="text-xs text-muted-foreground">Next session: Tomorrow 2pm</p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button size="sm" variant="outline">
                    <MessageSquare className="h-4 w-4" />
                  </Button>
                  <Button size="sm">View</Button>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium text-purple-600">AK</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Amara Koné</p>
                    <p className="text-xs text-muted-foreground">Last session: 2 days ago</p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button size="sm" variant="outline">
                    <MessageSquare className="h-4 w-4" />
                  </Button>
                  <Button size="sm">View</Button>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium text-green-600">FH</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Fatima Hassan</p>
                    <p className="text-xs text-muted-foreground">New mentee</p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button size="sm" variant="outline">
                    <MessageSquare className="h-4 w-4" />
                  </Button>
                  <Button size="sm">View</Button>
                </div>
              </div>
            </div>
            <Button variant="outline" className="w-full">
              View All Mentees
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="mr-2 h-5 w-5" />
              Upcoming Sessions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="p-3 bg-blue-50 rounded-lg">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-medium">Career Planning Session</p>
                    <p className="text-xs text-muted-foreground">with Leila Müller</p>
                  </div>
                  <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded">Tomorrow</span>
                </div>
                <p className="text-xs text-muted-foreground mt-2">2:00 PM - 3:00 PM</p>
              </div>
              
              <div className="p-3 bg-green-50 rounded-lg">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-medium">Goal Setting Workshop</p>
                    <p className="text-xs text-muted-foreground">with Amara Koné</p>
                  </div>
                  <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded">Friday</span>
                </div>
                <p className="text-xs text-muted-foreground mt-2">10:00 AM - 11:30 AM</p>
              </div>
              
              <div className="p-3 bg-purple-50 rounded-lg">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-medium">Initial Consultation</p>
                    <p className="text-xs text-muted-foreground">with Fatima Hassan</p>
                  </div>
                  <span className="text-xs bg-purple-100 text-purple-600 px-2 py-1 rounded">Next Week</span>
                </div>
                <p className="text-xs text-muted-foreground mt-2">4:00 PM - 5:00 PM</p>
              </div>
            </div>
            <Button variant="outline" className="w-full">
              View Full Calendar
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Progress & Resources */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="mr-2 h-5 w-5" />
              Impact Summary
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm">Mentees who achieved goals</span>
                <span className="text-sm font-medium">85%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Average session rating</span>
                <span className="text-sm font-medium">4.9/5</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Mentees who got internships</span>
                <span className="text-sm font-medium">6</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Mentees who entered university</span>
                <span className="text-sm font-medium">4</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <MessageSquare className="mr-2 h-5 w-5" />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              <Button variant="outline" className="h-16 flex-col">
                <Calendar className="h-4 w-4 mb-1" />
                <span className="text-xs">Schedule Session</span>
              </Button>
              <Button variant="outline" className="h-16 flex-col">
                <MessageSquare className="h-4 w-4 mb-1" />
                <span className="text-xs">Send Message</span>
              </Button>
              <Button variant="outline" className="h-16 flex-col">
                <Users className="h-4 w-4 mb-1" />
                <span className="text-xs">Find Mentees</span>
              </Button>
              <Button variant="outline" className="h-16 flex-col">
                <Star className="h-4 w-4 mb-1" />
                <span className="text-xs">Resources</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 