import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Upload, MapPin, Calendar, Tag, Heart } from "lucide-react";
import { itemService } from "@/services/itemService";
import { CreateItemRequest } from "@/types/item";
import { useToast } from "@/hooks/use-toast";
import reportFoundImage from "@/assets/report-found-illustration.jpg";

const categories = [
  "Electronics",
  "Books", 
  "Clothing",
  "Keys",
  "Documents",
  "Sports Equipment",
  "Jewelry",
  "Other"
];

const locations = [
  "Central Library",
  "Academic Block 1",
  "Academic Block 2",
  "Academic Block 3", 
  "Hostel A",
  "Hostel B",
  "Hostel C",
  "Cafeteria",
  "Sports Complex",
  "Auditorium",
  "Campus Ground",
  "Other"
];

export const ReportFound = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<CreateItemRequest>({
    title: "",
    description: "",
    category: "",
    status: "FOUND",
    location: "",
    contactInfo: ""
  });

  const handleInputChange = (field: keyof CreateItemRequest, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await itemService.createItem(formData);
      toast({
        title: "Success!",
        description: "Your found item has been reported successfully.",
      });
      navigate('/dashboard');
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to report item. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start max-w-6xl mx-auto">
          {/* Form Side */}
          <div className="order-2 lg:order-1">
            <div className="space-y-6">
              <div className="text-center lg:text-left">
                <h1 className="text-4xl font-bold text-foreground mb-4">
                  Report a <span className="bg-gradient-secondary bg-clip-text text-transparent">Found Item</span>
                </h1>
                <p className="text-lg text-muted-foreground">
                  Thank you for helping someone! Your kindness makes our community stronger. 💙
                </p>
              </div>

              <Card className="card-soft border-0">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Heart className="w-5 h-5 text-primary" />
                    Found Item Details
                  </CardTitle>
                  <CardDescription>
                    Help us connect this item with its owner
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="title">What did you find? *</Label>
                      <Input
                        id="title"
                        placeholder="e.g., iPhone with blue case, Red backpack"
                        value={formData.title}
                        onChange={(e) => handleInputChange("title", e.target.value)}
                        className="h-12 rounded-2xl"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="category">Category *</Label>
                      <Select onValueChange={(value) => handleInputChange("category", value)}>
                        <SelectTrigger className="h-12 rounded-2xl">
                          <div className="flex items-center gap-2">
                            <Tag className="w-4 h-4 text-muted-foreground" />
                            <SelectValue placeholder="Select category" />
                          </div>
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem key={category} value={category}>
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="location">Where did you find it? *</Label>
                      <Select onValueChange={(value) => handleInputChange("location", value)}>
                        <SelectTrigger className="h-12 rounded-2xl">
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-muted-foreground" />
                            <SelectValue placeholder="Location where you found it" />
                          </div>
                        </SelectTrigger>
                        <SelectContent>
                          {locations.map((location) => (
                            <SelectItem key={location} value={location}>
                              {location}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="contactInfo">Contact Information *</Label>
                      <Input
                        id="contactInfo"
                        placeholder="Phone number or email for contact"
                        value={formData.contactInfo}
                        onChange={(e) => handleInputChange("contactInfo", e.target.value)}
                        className="h-12 rounded-2xl"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description">Description *</Label>
                      <Textarea
                        id="description"
                        placeholder="Describe the item - color, size, brand, condition, any unique features..."
                        value={formData.description}
                        onChange={(e) => handleInputChange("description", e.target.value)}
                        className="min-h-[120px] rounded-2xl resize-none"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="photo">Add Photo (Recommended)</Label>
                      <div className="border-2 border-dashed border-border rounded-2xl p-8 text-center hover:border-primary transition-colors cursor-pointer">
                        <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                        <p className="text-sm text-muted-foreground">
                          A photo helps owners identify their item quickly
                        </p>
                      </div>
                    </div>

                    <Button
                      type="submit"
                      size="lg"
                      className="w-full"
                      variant="secondary"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Submitting..." : "Report Found Item"}
                    </Button>

                    <p className="text-xs text-muted-foreground text-center">
                      You're helping someone's day get better! Your contact info will only be shared with the verified owner. 🌟
                    </p>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Illustration Side */}
          <div className="order-1 lg:order-2 space-y-6">
            <div className="relative">
              <img
                src={reportFoundImage}
                alt="Report found item illustration"
                className="w-full max-w-md mx-auto h-auto rounded-3xl shadow-soft float"
              />
            </div>
            
            <div className="card-soft p-6 space-y-4">
              <h3 className="font-semibold text-foreground flex items-center gap-2">
                <Heart className="w-5 h-5 text-primary" />
                You're amazing! 
              </h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• 95% of reported found items get reunited with owners</li>
                <li>• Your kindness makes someone's day brighter</li>
                <li>• The KIIT community appreciates helpers like you</li>
                <li>• Add a photo - it doubles the reunion rate!</li>
                <li>• We'll notify you when the owner is found</li>
              </ul>
            </div>

            <div className="card-soft p-6 space-y-3 bg-gradient-secondary">
              <h4 className="font-medium text-secondary-foreground">🏆 Community Hero</h4>
              <p className="text-sm text-secondary-foreground/80">
                Join our group of students who've helped 95+ successful reunions this semester!
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};