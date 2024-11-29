import { Card, CardContent } from '@/components/ui/card';
import { getActivityLogs } from '@/lib/db/queries';
import { formatAction, iconMap } from '@/lib/utils';
import { Settings } from 'lucide-react';

export default async function ActivityPage() {
  const logs = await getActivityLogs();

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center mb-12">Activity Timeline</h1>
      
      <div className="relative">
        <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-px bg-gray-200" />
        
        <div className="space-y-8">
          {logs.map((log, index) => {
            const Icon = iconMap[log.action as keyof typeof iconMap] || Settings;
            
            return (
              <div
                key={log.id}
                className={`relative flex items-center ${
                  index % 2 === 0 ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`w-1/2 ${
                    index % 2 === 0 ? 'pr-8 text-right' : 'pl-8'
                  }`}
                >
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-4">
                        <div className="bg-orange-100 rounded-full p-2">
                          <Icon className="w-5 h-5 text-orange-600" />
                        </div>
                        <div>
                          <p className="font-medium">
                            {formatAction(log.action as ActivityType)}
                          </p>
                          <p className="text-sm text-gray-500">
                            {new Date(log.timestamp).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
} 