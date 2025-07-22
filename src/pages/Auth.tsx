import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Heart, Mail, Lock, User, Phone } from "lucide-react";
import authImage from "@/assets/auth-illustration.jpg";

export const Auth = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => setIsLoading(false), 2000);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          {/* Illustration Side */}
          <div className="space-y-6 text-center lg:text-left">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground">
                Welcome to<br />
                <span className="bg-gradient-primary bg-clip-text text-transparent">
                  KIIT Finder!
                </span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-md mx-auto lg:mx-0">
                Join our friendly community of students helping each other find lost belongings! 🌟
              </p>
            </div>
            
            <div className="relative">
              <img
                src={authImage}
                alt="Welcoming community illustration"
                className="w-full max-w-md mx-auto h-auto rounded-3xl shadow-soft float"
              />
            </div>
            
            <div className="flex items-center justify-center lg:justify-start gap-2 text-sm text-muted-foreground">
              <Heart className="w-4 h-4 text-primary" />
              <span>Trusted by 500+ KIIT students</span>
            </div>
          </div>

          {/* Auth Forms Side */}
          <div className="w-full max-w-md mx-auto">
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2 rounded-3xl p-1 bg-gradient-card">
                <TabsTrigger value="login" className="rounded-2xl">Login</TabsTrigger>
                <TabsTrigger value="register" className="rounded-2xl">Sign Up</TabsTrigger>
              </TabsList>
              
              {/* Login Form */}
              <TabsContent value="login">
                <Card className="card-soft border-0">
                  <CardHeader className="text-center">
                    <CardTitle className="text-2xl">Welcome Back! 👋</CardTitle>
                    <CardDescription>
                      Enter your details to access your dashboard
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                          <Input
                            id="email"
                            type="email"
                            placeholder="your.email@kiit.ac.in"
                            className="pl-10 h-12 rounded-2xl"
                            required
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                          <Input
                            id="password"
                            type="password"
                            placeholder="Enter your password"
                            className="pl-10 h-12 rounded-2xl"
                            required
                          />
                        </div>
                      </div>
                      <Button
                        type="submit"
                        className="w-full"
                        size="lg"
                        disabled={isLoading}
                      >
                        {isLoading ? "Signing in..." : "Sign In"}
                      </Button>
                    </form>
                    
                    <div className="mt-6 text-center">
                      <a href="#" className="text-sm text-primary hover:underline">
                        Forgot your password?
                      </a>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              {/* Register Form */}
              <TabsContent value="register">
                <Card className="card-soft border-0">
                  <CardHeader className="text-center">
                    <CardTitle className="text-2xl">Join Our Community! 🎉</CardTitle>
                    <CardDescription>
                      Create your account to start helping others
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <div className="relative">
                          <User className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                          <Input
                            id="name"
                            type="text"
                            placeholder="Your full name"
                            className="pl-10 h-12 rounded-2xl"
                            required
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="register-email">Email</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                          <Input
                            id="register-email"
                            type="email"
                            placeholder="your.email@kiit.ac.in"
                            className="pl-10 h-12 rounded-2xl"
                            required
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                          <Input
                            id="phone"
                            type="tel"
                            placeholder="+91 12345 67890"
                            className="pl-10 h-12 rounded-2xl"
                            required
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="register-password">Password</Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                          <Input
                            id="register-password"
                            type="password"
                            placeholder="Create a strong password"
                            className="pl-10 h-12 rounded-2xl"
                            required
                          />
                        </div>
                      </div>
                      <Button
                        type="submit"
                        className="w-full"
                        size="lg"
                        disabled={isLoading}
                      >
                        {isLoading ? "Creating account..." : "Create Account"}
                      </Button>
                    </form>
                    
                    <div className="mt-6 text-center text-sm text-muted-foreground">
                      By signing up, you agree to help make our campus community better! ✨
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};