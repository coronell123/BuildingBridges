import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, Users, Target, Calendar, Award, TrendingUp } from 'lucide-react';

export function StudentDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Student Dashboard</h1>
        <Button>
          <Calendar className="mr-2 h-4 w-4" />
          Book Session
        </Button>
      </div>
      
      {/* Progress Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Learning Progress</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">75%</div>
            <p className="text-xs text-muted-foreground">3 modules completed</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Mentorship Hours</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Goals Achieved</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">Out of 12 goals</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <BookOpen className="mr-2 h-5 w-5" />
              My Learning Path
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm font-medium">Self-Care Workshop</span>
                </div>
                <span className="text-xs text-green-600">Completed</span>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-sm font-medium">Career Planning</span>
                </div>
                <span className="text-xs text-blue-600">In Progress</span>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                  <span className="text-sm font-medium">Networking Skills</span>
                </div>
                <span className="text-xs text-gray-600">Upcoming</span>
              </div>
            </div>
            <Button variant="outline" className="w-full">
              View All Modules
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Users className="mr-2 h-5 w-5" />
              My Mentors
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center space-x-3 p-3 border rounded-lg">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium text-purple-600">SA</span>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Sarah Ahmed</p>
                  <p className="text-xs text-muted-foreground">Psychology Student</p>
                </div>
                <Button size="sm" variant="outline">Message</Button>
              </div>
              
              <div className="flex items-center space-x-3 p-3 border rounded-lg">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium text-green-600">MK</span>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Maria Kowalski</p>
                  <p className="text-xs text-muted-foreground">Career Counselor</p>
                </div>
                <Button size="sm" variant="outline">Message</Button>
              </div>
            </div>
            <Button variant="outline" className="w-full">
              Find New Mentor
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Goals Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Target className="mr-2 h-5 w-5" />
            My Goals
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="font-medium">Short-term Goals</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>✅ Complete self-care workshop</li>
                <li>🎯 Finish career planning module</li>
                <li>📅 Schedule 2 mentor sessions</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">Long-term Goals</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>🎓 Apply to psychology program</li>
                <li>💼 Secure internship opportunity</li>
                <li>🌟 Become a peer mentor</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 