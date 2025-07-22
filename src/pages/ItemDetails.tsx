
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Sidebar } from '@/components/Sidebar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { itemService } from '@/services/itemService';
import { Item } from '@/types/item';
import { useToast } from '@/hooks/use-toast';
import { Calendar, MapPin, User, Phone, Mail } from 'lucide-react';

export const ItemDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [item, setItem] = useState<Item | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    if (id) {
      fetchItem(parseInt(id));
    }
  }, [id]);

  const fetchItem = async (itemId: number) => {
    try {
      const data = await itemService.getItemById(itemId);
      setItem(data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch item details",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen">
        <Sidebar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading item details...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!item) {
    return (
      <div className="flex min-h-screen">
        <Sidebar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-foreground mb-2">Item not found</h2>
            <p className="text-muted-foreground">The requested item could not be found.</p>
          </div>
        </div>
      </div>
    );
  }

  const getStatusBadge = () => {
    return item.status === 'LOST' 
      ? <Badge className="badge-lost">Lost</Badge>
      : <Badge className="badge-found">Found</Badge>;
  };

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      
      <div className="flex-1 p-8">
        <div className="max-w-4xl mx-auto">
          <Card className="card-soft">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-3xl font-bold text-foreground mb-2">
                    {item.title}
                  </CardTitle>
                  <p className="text-muted-foreground">Category: {item.category}</p>
                </div>
                {getStatusBadge()}
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Description</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-foreground">Details</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Calendar className="w-5 h-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm text-muted-foreground">Date Reported</p>
                        <p className="text-foreground">{new Date(item.dateReported).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <MapPin className="w-5 h-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm text-muted-foreground">Location</p>
                        <p className="text-foreground">{item.location}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <User className="w-5 h-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm text-muted-foreground">Reported By</p>
                        <p className="text-foreground">{item.userName || 'Unknown User'}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-foreground">Contact Information</h3>
                  <div className="bg-gradient-card p-4 rounded-2xl">
                    <div className="flex items-center gap-3">
                      <Phone className="w-5 h-5 text-primary" />
                      <div>
                        <p className="text-sm text-muted-foreground">Contact</p>
                        <p className="text-foreground">{item.contactInfo}</p>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Please reach out to the contact person if you have information about this item.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
