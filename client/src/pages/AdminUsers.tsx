import { mockUsers } from '@/data/mockData';
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Trash2, CheckCircle } from 'lucide-react';

export default function AdminUsers() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-background pb-12">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white border-b border-border flex items-center justify-between px-6 py-4">
        <button
          onClick={() => setLocation('/admin')}
          className="p-2 hover:bg-secondary rounded-lg transition-colors"
        >
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-lg font-bold flex-1 text-center">Users Management</h1>
        <div className="w-10" />
      </div>

      {/* Content */}
      <div className="px-6 py-6 max-w-4xl mx-auto">
        {/* Users Table */}
        <div className="bg-card rounded-xl border border-border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-secondary">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-bold text-foreground">Name</th>
                  <th className="px-6 py-3 text-left text-sm font-bold text-foreground">Email</th>
                  <th className="px-6 py-3 text-left text-sm font-bold text-foreground">Role</th>
                  <th className="px-6 py-3 text-left text-sm font-bold text-foreground">Status</th>
                  <th className="px-6 py-3 text-left text-sm font-bold text-foreground">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {mockUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-secondary/50 transition-colors">
                    <td className="px-6 py-4 text-sm font-medium text-foreground">{user.name}</td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">{user.email}</td>
                    <td className="px-6 py-4 text-sm">
                      <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-bold capitalize">
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <div className="flex items-center gap-1 text-green-600">
                        <CheckCircle size={16} />
                        <span>Active</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <button className="p-2 hover:bg-secondary rounded-lg transition-colors text-destructive">
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Back Button */}
        <Button
          onClick={() => setLocation('/admin')}
          variant="outline"
          className="w-full mt-6"
        >
          Back to Dashboard
        </Button>
      </div>
    </div>
  );
}
