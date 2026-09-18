const fs = require('fs');

// 1. Update mock data
let mockFile = fs.readFileSync('src/mocks/dashboard.mock.ts', 'utf8');

const additionalActivities = `
  { id: 'a6', actorName: 'Teacher', action: 'assigned homework', entityLabel: 'Math (Class 6)', timestamp: new Date(Date.now() - 240 * 60000).toISOString(), type: 'homework' },
  { id: 'a7', actorName: 'Admin', action: 'marked attendance', entityLabel: 'Class 10', timestamp: new Date(Date.now() - 300 * 60000).toISOString(), type: 'attendance' },
  { id: 'a8', actorName: 'Admin', action: 'scheduled an event', entityLabel: 'Annual Sports Day', timestamp: new Date(Date.now() - 360 * 60000).toISOString(), type: 'event' },
  { id: 'a9', actorName: 'Accounts', action: 'received a fee payment of ৳2,000', entityLabel: 'Class 6', timestamp: new Date(Date.now() - 420 * 60000).toISOString(), type: 'payment' },
  { id: 'a10', actorName: 'Admin', action: 'published a notice', entityLabel: 'School Closure', timestamp: new Date(Date.now() - 480 * 60000).toISOString(), type: 'notice' }
];
`;
mockFile = mockFile.replace(/\];$/, ',' + additionalActivities);
fs.writeFileSync('src/mocks/dashboard.mock.ts', mockFile);

// 2. Update hooks
let hooksFile = fs.readFileSync('src/hooks/dashboard/useDashboard.ts', 'utf8');
hooksFile = hooksFile.replace(/import \{ useQuery \} from '@tanstack\/react-query';/, "import { useQuery, useQueryClient } from '@tanstack/react-query';\nimport { io } from 'socket.io-client';\nimport { useEffect } from 'react';");
hooksFile = hooksFile.replace(/export function useRecentActivities[\s\S]*?\}\n/, `
export function useRecentActivities(limit: number = 20) {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ['recentActivities'],
    queryFn: async () => {
      await delay(400);
      return z.array(ActivityItemSchema).parse(MOCK_ACTIVITIES);
    },
    staleTime: 30000,
  });

  useEffect(() => {
    const socket = io(); // Connects to same host
    
    socket.on('activity:new', (newActivityRaw: any) => {
      try {
        const newActivity = ActivityItemSchema.parse(newActivityRaw);
        queryClient.setQueryData(['recentActivities'], (oldData: any) => {
          if (!oldData) return [newActivity];
          return [newActivity, ...oldData];
        });
      } catch (e) {
        console.error('Failed to parse incoming activity', e);
      }
    });

    return () => {
      socket.disconnect();
    };
  }, [queryClient]);

  return {
    ...query,
    data: query.data ? query.data.slice(0, limit) : undefined
  };
}
`);
fs.writeFileSync('src/hooks/dashboard/useDashboard.ts', hooksFile);

console.log("Updated mocks and hooks");
