import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Calendar, MapPin, MessageCircle, User } from "lucide-react";

interface ItemCardProps {
  id: string;
  title: string;
  description: string;
  category: string;
  status: "lost" | "found" | "returned";
  date: string;
  location: string;
  image?: string;
  contactPerson: string;
}

export const ItemCard = ({
  title,
  description,
  category,
  status,
  date,
  location,
  image,
  contactPerson,
}: ItemCardProps) => {
  const getStatusBadge = () => {
    switch (status) {
      case "lost":
        return <Badge className="badge-lost">Lost</Badge>;
      case "found":
        return <Badge className="badge-found">Found</Badge>;
      case "returned":
        return <Badge className="badge-returned">Returned</Badge>;
    }
  };

  return (
    <Card className="card-soft overflow-hidden hover:shadow-soft transition-all duration-300 fade-in-up">
      <div className="aspect-[4/3] bg-gradient-card overflow-hidden">
        {image ? (
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
        ) : (
          <div className="w-full h-full bg-gradient-secondary flex items-center justify-center">
            <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center">
              <MessageCircle className="w-8 h-8 text-secondary-foreground" />
            </div>
          </div>
        )}
      </div>
      
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-3">
          <h3 className="font-semibold text-lg text-foreground line-clamp-2">
            {title}
          </h3>
          {getStatusBadge()}
        </div>
        
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
          {description}
        </p>
        
        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Calendar className="w-4 h-4" />
            <span>{date}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin className="w-4 h-4" />
            <span>{location}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <User className="w-4 h-4" />
            <span>{contactPerson}</span>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="p-6 pt-0">
        <Button 
          variant="outline" 
          size="sm" 
          className="w-full"
        >
          <MessageCircle className="w-4 h-4 mr-2" />
          Contact
        </Button>
      </CardFooter>
    </Card>
  );
};