
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Heart, Mail, Lock, User, Phone } from "lucide-react";
// import { authService } from "@/services/authService"; // Removed old authService import
// import { useToast } from "@/hooks/use-toast"; // Removed old useToast import
import authImage from "@/assets/auth-illustration.jpg";
import LoginForm from "@/components/LoginForm"; // Import the new LoginForm
import RegisterForm from "@/components/RegisterForm"; // Import the new RegisterForm

export const Auth = () => {
  // const [isLoading, setIsLoading] = useState(false); // Removed old state
  // const [loginData, setLoginData] = useState({ email: '', password: '' }); // Removed old state
  // const [registerData, setRegisterData] = useState({ 
  //   name: '', 
  //   email: '', 
  //   password: '', 
  //   phone: '' 
  // }); // Removed old state
  // const navigate = useNavigate(); // Kept for general navigation if needed elsewhere
  // const { toast } = useToast(); // Removed old useToast

  // Removed old handleLogin function
  // const handleLogin = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   setIsLoading(true);
    
  //   try {
  //     await authService.login(loginData);
  //     toast({
  //       title: "Welcome back!",
  //       description: "You have been logged in successfully.",
  //     });
  //     navigate('/dashboard');
  //   } catch (error: any) {
  //     toast({
  //       title: "Login failed",
  //       description: error.response?.data?.message || "Invalid credentials. Please try again.",
  //       variant: "destructive",
  //     });
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  // Removed old handleRegister function
  // const handleRegister = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   setIsLoading(true);
    
  //   try {
  //     await authService.register({
  //       name: registerData.name,
  //       email: registerData.email,
  //       password: registerData.password,
  //       role: "ROLE_USER" // Backend expects ROLE_USER format
  //     });
  //     toast({
  //       title: "Account created!",
  //       description: "Welcome to KIIT Finder! You can now start reporting items.",
  //     });
  //     navigate('/dashboard');
  //   } catch (error: any) {
  //     toast({
  //       title: "Registration failed",
  //       description: error.response?.data?.message || "Failed to create account. Please try again.",
  //       variant: "destructive",
  //     });
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

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
                    <LoginForm /> {/* Render the new LoginForm component */}
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
                    <RegisterForm /> {/* Render the new RegisterForm component */}
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
