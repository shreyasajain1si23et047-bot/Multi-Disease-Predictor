import { Heart, Menu, X, LogOut, User, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, signOut } = useAuth();

  return (
    <nav className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <div className="medical-gradient p-2 rounded-lg">
              <Heart className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold text-foreground">MediDiagnose</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/symptom-checker" className="text-muted-foreground hover:text-primary transition-medical">
              Symptom Checker
            </Link>
            <Link to="/hospital-locator" className="text-muted-foreground hover:text-primary transition-medical flex items-center space-x-1">
              <MapPin className="h-4 w-4" />
              <span>Find Hospitals</span>
            </Link>
          </div>

          {/* Desktop Auth Section */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="medical-border">
                    <User className="w-4 h-4 mr-2" />
                    {user.email}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={signOut}>
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="outline" className="medical-border">
                    Sign In
                  </Button>
                </Link>
                <Link to="/register">
                  <Button variant="medical">
                    Get Started
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-4">
            <Link 
              to="/symptom-checker" 
              className="block text-muted-foreground hover:text-primary transition-medical"
              onClick={() => setIsMenuOpen(false)}
            >
              Symptom Checker
            </Link>
            <Link 
              to="/hospital-locator" 
              className="block text-muted-foreground hover:text-primary transition-medical"
              onClick={() => setIsMenuOpen(false)}
            >
              Find Hospitals
            </Link>
            
            {/* Mobile Auth Section */}
            <div className="pt-4 space-y-3 border-t">
              {user ? (
                <div className="space-y-2">
                  <div className="text-sm text-muted-foreground px-2">
                    Signed in as {user.email}
                  </div>
                  <Button 
                    variant="outline" 
                    className="w-full medical-border"
                    onClick={signOut}
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign Out
                  </Button>
                </div>
              ) : (
                <>
                  <Link to="/login" className="block">
                    <Button variant="outline" className="w-full medical-border">
                      Sign In
                    </Button>
                  </Link>
                  <Link to="/register" className="block">
                    <Button variant="medical" className="w-full">
                      Get Started
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;