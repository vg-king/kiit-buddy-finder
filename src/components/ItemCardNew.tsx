
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Calendar, MapPin, User, Trash2, Eye } from "lucide-react";
import { Item } from '@/types/item';
import { Link } from 'react-router-dom';
import { authService } from '@/services/authService';

interface ItemCardNewProps {
  item: Item;
  onDelete?: (id: number) => void;
  showDeleteButton?: boolean;
}

export const ItemCardNew = ({ item, onDelete, showDeleteButton = false }: ItemCardNewProps) => {
  const currentUser = authService.getCurrentUserFromStorage();
  const canDelete = showDeleteButton && (currentUser?.role === 'ADMIN' || item.userId === currentUser?.id);

  const getStatusBadge = () => {
    return item.status === 'LOST' 
      ? <Badge className="badge-lost">Lost</Badge>
      : <Badge className="badge-found">Found</Badge>;
  };

  return (
    <Card className="card-soft overflow-hidden hover:shadow-soft transition-all duration-300 fade-in-up">
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-3">
          <h3 className="font-semibold text-lg text-foreground line-clamp-2">
            {item.title}
          </h3>
          {getStatusBadge()}
        </div>
        
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
          {item.description}
        </p>
        
        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Calendar className="w-4 h-4" />
            <span>{new Date(item.dateReported).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin className="w-4 h-4" />
            <span>{item.location}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <User className="w-4 h-4" />
            <span>{item.userName || 'Unknown User'}</span>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="p-6 pt-0 flex gap-2">
        <Link to={`/item/${item.id}`} className="flex-1">
          <Button variant="outline" size="sm" className="w-full">
            <Eye className="w-4 h-4 mr-2" />
            View Details
          </Button>
        </Link>
        {canDelete && onDelete && (
          <Button 
            variant="destructive" 
            size="sm"
            onClick={() => onDelete(item.id)}
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};
