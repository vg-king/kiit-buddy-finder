import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ItemCard } from "@/components/ItemCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Plus, Search, Heart, TrendingUp, Bell, Settings } from "lucide-react";
import { Link } from "react-router-dom";

// Mock user data
const user = {
  name: "Priya Sharma",
  email: "priya.sharma@kiit.ac.in",
  phone: "+91 98765 43210",
  joinDate: "Sept 2024",
  itemsReported: 3,
  itemsFound: 5,
  successfulReunions: 2
};

// Mock data for user's items
const userLostItems = [
  {
    id: "1",
    title: "MacBook Pro 13-inch",
    description: "Silver MacBook Pro with stickers. Lost near Library.",
    category: "Electronics",
    status: "lost" as const,
    date: "2024-01-20",
    location: "Central Library",
    contactPerson: "You",
  },
  {
    id: "2",
    title: "Physics Textbook",
    description: "Resnick Halliday Physics textbook, lots of notes inside.",
    category: "Books",
    status: "returned" as const,
    date: "2024-01-15",
    location: "Academic Block 2",
    contactPerson: "You",
  }
];

const userFoundItems = [
  {
    id: "3",
    title: "Blue Water Bottle",
    description: "Insulated blue water bottle with KIIT logo.",
    category: "Other",
    status: "found" as const,
    date: "2024-01-19",
    location: "Academic Block 3",
    contactPerson: "You",
  },
  {
    id: "4",
    title: "Black Earphones",
    description: "Sony WH-1000XM4 noise cancelling headphones.",
    category: "Electronics",
    status: "returned" as const,
    date: "2024-01-10",
    location: "Cafeteria",
    contactPerson: "You",
  }
];

export const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          {/* Welcome Section */}
          <div className="mb-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h1 className="text-4xl font-bold text-foreground mb-2">
                  Welcome back, {user.name}! 👋
                </h1>
                <p className="text-muted-foreground">
                  Thank you for being part of our helpful community since {user.joinDate}
                </p>
              </div>
              <div className="flex gap-3">
                <Link to="/report-lost">
                  <Button size="lg">
                    <Plus className="w-5 h-5 mr-2" />
                    Report Lost
                  </Button>
                </Link>
                <Link to="/report-found">
                  <Button variant="secondary" size="lg">
                    <Heart className="w-5 h-5 mr-2" />
                    Report Found
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4 rounded-3xl p-1 bg-gradient-card mb-8">
              <TabsTrigger value="overview" className="rounded-2xl">Overview</TabsTrigger>
              <TabsTrigger value="lost" className="rounded-2xl">My Lost Items</TabsTrigger>
              <TabsTrigger value="found" className="rounded-2xl">My Found Items</TabsTrigger>
              <TabsTrigger value="profile" className="rounded-2xl">Profile</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-8">
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <Card className="card-soft">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-gradient-primary flex items-center justify-center">
                      <Search className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <h3 className="font-semibold text-2xl text-foreground">{user.itemsReported}</h3>
                    <p className="text-muted-foreground text-sm">Items Reported Lost</p>
                  </CardContent>
                </Card>
                
                <Card className="card-soft">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-gradient-secondary flex items-center justify-center">
                      <Heart className="w-6 h-6 text-secondary-foreground" />
                    </div>
                    <h3 className="font-semibold text-2xl text-foreground">{user.itemsFound}</h3>
                    <p className="text-muted-foreground text-sm">Items Found & Reported</p>
                  </CardContent>
                </Card>
                
                <Card className="card-soft">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-success/20 flex items-center justify-center">
                      <TrendingUp className="w-6 h-6 text-success" />
                    </div>
                    <h3 className="font-semibold text-2xl text-foreground">{user.successfulReunions}</h3>
                    <p className="text-muted-foreground text-sm">Successful Reunions</p>
                  </CardContent>
                </Card>
                
                <Card className="card-soft">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-warning/20 flex items-center justify-center">
                      <Bell className="w-6 h-6 text-warning-foreground" />
                    </div>
                    <h3 className="font-semibold text-2xl text-foreground">2</h3>
                    <p className="text-muted-foreground text-sm">Active Alerts</p>
                  </CardContent>
                </Card>
              </div>

              {/* Recent Activity */}
              <Card className="card-soft">
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Your latest contributions to the community</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 p-4 rounded-2xl bg-success/10">
                      <div className="w-10 h-10 rounded-full bg-success/20 flex items-center justify-center">
                        <Heart className="w-5 h-5 text-success" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-foreground">Found item reunited!</p>
                        <p className="text-sm text-muted-foreground">Your reported earphones were successfully returned to their owner</p>
                      </div>
                      <Badge className="badge-returned">Completed</Badge>
                    </div>
                    
                    <div className="flex items-center gap-4 p-4 rounded-2xl bg-primary/10">
                      <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                        <Plus className="w-5 h-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-foreground">New lost item reported</p>
                        <p className="text-sm text-muted-foreground">You reported a MacBook Pro as lost near the Central Library</p>
                      </div>
                      <Badge className="badge-lost">Active</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Lost Items Tab */}
            <TabsContent value="lost" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-foreground">My Lost Items</h2>
                <Link to="/report-lost">
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Report New Lost Item
                  </Button>
                </Link>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {userLostItems.map((item) => (
                  <ItemCard key={item.id} {...item} />
                ))}
              </div>
            </TabsContent>

            {/* Found Items Tab */}
            <TabsContent value="found" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-foreground">Items I've Found</h2>
                <Link to="/report-found">
                  <Button variant="secondary">
                    <Heart className="w-4 h-4 mr-2" />
                    Report New Found Item
                  </Button>
                </Link>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {userFoundItems.map((item) => (
                  <ItemCard key={item.id} {...item} />
                ))}
              </div>
            </TabsContent>

            {/* Profile Tab */}
            <TabsContent value="profile" className="space-y-6">
              <Card className="card-soft">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="w-5 h-5" />
                    Profile Information
                  </CardTitle>
                  <CardDescription>Manage your account details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-foreground">Full Name</label>
                      <p className="text-muted-foreground">{user.name}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground">Email</label>
                      <p className="text-muted-foreground">{user.email}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground">Phone</label>
                      <p className="text-muted-foreground">{user.phone}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground">Member Since</label>
                      <p className="text-muted-foreground">{user.joinDate}</p>
                    </div>
                  </div>
                  
                  <div className="pt-4">
                    <Button variant="outline">
                      <Settings className="w-4 h-4 mr-2" />
                      Edit Profile
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};