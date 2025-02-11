import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getUser } from '@/lib/db/queries';

export default async function PersonalPage() {
  const user = await getUser();

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Personal Page</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>Mein Profil</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Email</label>
              <p className="mt-1">{user?.email}</p>
            </div>
            <div>
              <label className="text-sm font-medium">Name</label>
              <p className="mt-1">{user?.name || 'Not set'}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Meine Ziele</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">
            Hier kannst du deine persönlichen Ziele und Fortschritte verfolgen.
          </p>
        </CardContent>
      </Card>
    </div>
  );
} 