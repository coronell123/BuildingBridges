import { getUser } from '@/lib/db/queries';
import { AdminDashboard } from '../components/admin-dashboard';
import { MentorDashboard } from '../components/mentor-dashboard';
import { StudentDashboard } from '../components/student-dashboard';
import { redirect } from 'next/navigation';

export default async function DashboardPage() {
  const user = await getUser();
  
  if (!user) {
    redirect('/sign-in');
  }

  // Show role-based dashboard
  switch (user.role) {
    case 'ADMIN':
      return <AdminDashboard />;
    case 'MENTOR':
      return <MentorDashboard />;
    case 'STUDENT':
    default:
      return <StudentDashboard />;
  }
}
