
import { useState, useEffect } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { ItemCardNew } from '@/components/ItemCardNew';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { itemService } from '@/services/itemService';
import { userService } from '@/services/userService';
import { Item } from '@/types/item';
import { User } from '@/types/auth';
import { useToast } from '@/hooks/use-toast';
import { Users, Package, Trash2, Settings } from 'lucide-react';

export const AdminPanel = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loadingItems, setLoadingItems] = useState(true);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchItems();
    fetchUsers();
  }, []);

  const fetchItems = async () => {
    try {
      const data = await itemService.getAllItems();
      setItems(data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch items",
        variant: "destructive",
      });
    } finally {
      setLoadingItems(false);
    }
  };

  const fetchUsers = async () => {
    try {
      const data = await userService.getAllUsers();
      setUsers(data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch users",
        variant: "destructive",
      });
    } finally {
      setLoadingUsers(false);
    }
  };

  const handleDeleteItem = async (id: number) => {
    try {
      await itemService.deleteItem(id);
      setItems(items.filter(item => item.id !== id));
      toast({
        title: "Success",
        description: "Item deleted successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete item",
        variant: "destructive",
      });
    }
  };

  const handleDeleteUser = async (id: number) => {
    try {
      await userService.deleteUser(id);
      setUsers(users.filter(user => user.id !== id));
      toast({
        title: "Success",
        description: "User deleted successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete user",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      
      <div className="flex-1 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-2 flex items-center gap-2">
              <Settings className="w-10 h-10" />
              Admin Panel
            </h1>
            <p className="text-muted-foreground">
              Manage users and items across the platform
            </p>
          </div>

          <Tabs defaultValue="items" className="w-full">
            <TabsList className="grid w-full grid-cols-2 rounded-3xl p-1 bg-gradient-card mb-8">
              <TabsTrigger value="items" className="rounded-2xl">
                <Package className="w-4 h-4 mr-2" />
                Items ({items.length})
              </TabsTrigger>
              <TabsTrigger value="users" className="rounded-2xl">
                <Users className="w-4 h-4 mr-2" />
                Users ({users.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="items">
              {loadingItems ? (
                <div className="text-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                  <p className="text-muted-foreground">Loading items...</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {items.map((item) => (
                    <ItemCardNew 
                      key={item.id} 
                      item={item} 
                      onDelete={handleDeleteItem}
                      showDeleteButton={true}
                    />
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="users">
              {loadingUsers ? (
                <div className="text-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                  <p className="text-muted-foreground">Loading users...</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {users.map((user) => (
                    <Card key={user.id} className="card-soft">
                      <CardHeader>
                        <CardTitle className="flex items-center justify-between">
                          <span>{user.name}</span>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleDeleteUser(user.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <p className="text-sm text-muted-foreground">
                            <strong>Email:</strong> {user.email}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            <strong>Role:</strong> {user.role}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};
