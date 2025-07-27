
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Calendar, MapPin, User, Trash2, Eye } from "lucide-react";
import { Item } from '@/types/item';
import { Link } from 'react-router-dom';
import { authService } from '@/services/authService';
import { cn } from '@/lib/utils';

interface ItemCardNewProps {
  item: Item;
  onDelete?: (id: number) => void;
  showDeleteButton?: boolean;
}

export const ItemCardNew = ({ item, onDelete, showDeleteButton = false }: ItemCardNewProps) => {
  const currentUser = authService.getCurrentUserFromStorage();
  const canDelete = showDeleteButton && (currentUser?.role === 'ADMIN' || item.userId === currentUser?.id);

  const getStatusBadge = () => {
    // For now, we'll determine status based on item status
    // In a real app, you'd have more sophisticated status tracking
    if (item.status === 'FOUND') {
      return <Badge className="badge-found">✅ Found</Badge>;
    } else if (item.status === 'LOST') {
      // Check if it's a recent report (within 24 hours) for "pending verification"
      const reportDate = new Date(item.dateReported);
      const now = new Date();
      const hoursDiff = (now.getTime() - reportDate.getTime()) / (1000 * 60 * 60);
      
      if (hoursDiff < 24) {
        return <Badge className="badge-pending">🕓 Pending Verification</Badge>;
      } else {
        return <Badge className="badge-lost">❌ Not Found Yet</Badge>;
      }
    }
    return <Badge className="badge-pending">🕓 Pending Verification</Badge>;
  };

  return (
    <Card className={cn(
      "h-full flex flex-col card-soft hover-lift border-border/30 overflow-hidden",
      "bg-gradient-card backdrop-blur-sm fade-in-up"
    )}>
      <CardContent className="p-6 flex-1">
        <div className="flex justify-between items-start mb-4">
          <h3 className="font-semibold text-lg text-foreground line-clamp-2 flex-1 mr-3">
            {item.title}
          </h3>
          {getStatusBadge()}
        </div>
        
        <p className="text-muted-foreground text-sm mb-6 line-clamp-3 leading-relaxed">
          {item.description}
        </p>
        
        <div className="space-y-3 text-sm">
          <div className="flex items-center gap-3 text-muted-foreground">
            <Calendar className="w-4 h-4 flex-shrink-0 text-primary" />
            <span className="truncate">
              {new Date(item.dateReported).toLocaleDateString()}
            </span>
          </div>
          
          <div className="flex items-center gap-3 text-muted-foreground">
            <MapPin className="w-4 h-4 flex-shrink-0 text-primary" />
            <span className="truncate">{item.location}</span>
          </div>
          
          <div className="flex items-center gap-3 text-muted-foreground">
            <User className="w-4 h-4 flex-shrink-0 text-primary" />
            <span className="truncate">{item.userName || 'Unknown User'}</span>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="p-6 pt-0 flex gap-3">
        <Link to={`/item/${item.id}`} className="flex-1">
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full rounded-[16px] border-border/30 hover:bg-muted/50 transition-all duration-300"
          >
            <Eye className="w-4 h-4 mr-2" />
            View Details
          </Button>
        </Link>
        
        {canDelete && onDelete && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onDelete(item.id)}
            className="text-destructive hover:text-destructive hover:bg-destructive/10 rounded-[16px] transition-all duration-300"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};
