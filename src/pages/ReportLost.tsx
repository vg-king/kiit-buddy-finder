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
import { Upload, MapPin, Calendar, Tag, AlertCircle } from "lucide-react";
import { itemService } from "@/services/itemService";
import { CreateItemRequest } from "@/types/item";
import { useToast } from "@/hooks/use-toast";
import reportLostImage from "@/assets/report-lost-illustration.jpg";

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

export const ReportLost = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<CreateItemRequest>({
    title: "",
    description: "",
    category: "",
    status: "LOST",
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
        description: "Your lost item has been reported successfully.",
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
                  Report a <span className="bg-gradient-primary bg-clip-text text-transparent">Lost Item</span>
                </h1>
                <p className="text-lg text-muted-foreground">
                  Don't worry! Our community will help you find your lost item. Fill out the details below. 🔍
                </p>
              </div>

              <Card className="card-soft border-0">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertCircle className="w-5 h-5 text-primary" />
                    Item Details
                  </CardTitle>
                  <CardDescription>
                    Provide as much detail as possible to help others identify your item
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="title">Item Name *</Label>
                      <Input
                        id="title"
                        placeholder="e.g., MacBook Pro 13-inch, Blue Water Bottle"
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
                      <Label htmlFor="location">Last Seen Location *</Label>
                      <Select onValueChange={(value) => handleInputChange("location", value)}>
                        <SelectTrigger className="h-12 rounded-2xl">
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-muted-foreground" />
                            <SelectValue placeholder="Where did you last see it?" />
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
                      <Label htmlFor="description">Description *</Label>
                      <Textarea
                        id="description"
                        placeholder="Describe your item in detail - color, size, brand, any unique features, etc."
                        value={formData.description}
                        onChange={(e) => handleInputChange("description", e.target.value)}
                        className="min-h-[120px] rounded-2xl resize-none"
                        required
                      />
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
                      <Label htmlFor="photo">Add Photo (Optional)</Label>
                      <div className="border-2 border-dashed border-border rounded-2xl p-8 text-center hover:border-primary transition-colors cursor-pointer">
                        <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                        <p className="text-sm text-muted-foreground">
                          Drop an image here or click to browse
                        </p>
                      </div>
                    </div>

                    <Button
                      type="submit"
                      size="lg"
                      className="w-full"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Submitting..." : "Report Lost Item"}
                    </Button>

                    <p className="text-xs text-muted-foreground text-center">
                      Your contact information will be shared only with users who respond to help. 🔒
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
                src={reportLostImage}
                alt="Report lost item illustration"
                className="w-full max-w-md mx-auto h-auto rounded-3xl shadow-soft float"
              />
            </div>
            
            <div className="card-soft p-6 space-y-4">
              <h3 className="font-semibold text-foreground">💡 Pro Tips</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Be as specific as possible in your description</li>
                <li>• Include unique features or identifying marks</li>
                <li>• Add a clear photo if you have one</li>
                <li>• Check back regularly for responses</li>
                <li>• Consider offering a small reward</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};