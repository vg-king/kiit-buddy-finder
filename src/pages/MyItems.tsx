
import { useState, useEffect } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { ItemCardNew } from '@/components/ItemCardNew';
import { Button } from '@/components/ui/button';
import { itemService } from '@/services/itemService';
import { Item } from '@/types/item';
import { useToast } from '@/hooks/use-toast';
import { Link } from 'react-router-dom';
import { Plus, Package } from 'lucide-react';

export const MyItems = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchMyItems();
  }, []);

  const fetchMyItems = async () => {
    try {
      const data = await itemService.getMyItems();
      setItems(data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch your items",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
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

  if (loading) {
    return (
      <div className="flex min-h-screen">
        <Sidebar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading your items...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      
      <div className="flex-1 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-4xl font-bold text-foreground mb-2">
                My Items
              </h1>
              <p className="text-muted-foreground">
                Manage your reported items
              </p>
            </div>
            <Link to="/add-item">
              <Button size="lg">
                <Plus className="w-5 h-5 mr-2" />
                Add Item
              </Button>
            </Link>
          </div>

          {items.length === 0 ? (
            <div className="text-center py-12">
              <Package className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">No items yet</h3>
              <p className="text-muted-foreground mb-4">Start by reporting a lost or found item</p>
              <Link to="/add-item">
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Report Your First Item
                </Button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {items.map((item) => (
                <ItemCardNew 
                  key={item.id} 
                  item={item} 
                  onDelete={handleDelete}
                  showDeleteButton={true}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
