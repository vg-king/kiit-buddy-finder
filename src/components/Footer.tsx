import { Button } from "@/components/ui/button";
import { Heart, Mail, Phone, MapPin, Instagram, Twitter, Facebook } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="mt-20 bg-gradient-card border-t border-border/50">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center">
                <Heart className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="font-bold text-lg bg-gradient-primary bg-clip-text text-transparent">
                KIIT Finder
              </span>
            </div>
            <p className="text-muted-foreground text-sm">
              Helping KIIT students reunite with their lost belongings. Built with ❤️ for our community.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/" className="text-muted-foreground hover:text-primary transition-colors">
                  Search Items
                </a>
              </li>
              <li>
                <a href="/report-lost" className="text-muted-foreground hover:text-primary transition-colors">
                  Report Lost Item
                </a>
              </li>
              <li>
                <a href="/report-found" className="text-muted-foreground hover:text-primary transition-colors">
                  Report Found Item
                </a>
              </li>
              <li>
                <a href="/dashboard" className="text-muted-foreground hover:text-primary transition-colors">
                  My Dashboard
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Contact Us</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2 text-muted-foreground">
                <Mail className="w-4 h-4 text-primary" />
                <span>help@kiitfinder.edu</span>
              </li>
              <li className="flex items-center gap-2 text-muted-foreground">
                <Phone className="w-4 h-4 text-primary" />
                <span>+91 12345 67890</span>
              </li>
              <li className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="w-4 h-4 text-primary" />
                <span>KIIT Campus, Bhubaneswar</span>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Follow Us</h4>
            <div className="flex gap-3">
              <Button size="icon" variant="outline" className="rounded-full w-10 h-10">
                <Instagram className="w-4 h-4" />
              </Button>
              <Button size="icon" variant="outline" className="rounded-full w-10 h-10">
                <Twitter className="w-4 h-4" />
              </Button>
              <Button size="icon" variant="outline" className="rounded-full w-10 h-10">
                <Facebook className="w-4 h-4" />
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              Stay connected for updates and community stories! 🌟
            </p>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 pt-8 border-t border-border/50 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © 2024 KIIT Finder. Made with love for our amazing community ✨
          </p>
          <div className="flex gap-4 text-sm">
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
              Terms of Service
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
              Help
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};