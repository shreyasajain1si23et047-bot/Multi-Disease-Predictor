import { Button } from "@/components/ui/button";
import { ArrowRight, Activity, Users, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/medical-hero.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroImage} 
          alt="Medical Healthcare Technology" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/85 to-background/70" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-3xl">
          <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6 leading-tight">
            Your Health,{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Diagnosed
            </span>{" "}
            Intelligently
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed">
            Advanced AI-powered medical diagnosis system. Check symptoms, predict diseases, 
            and find nearby healthcare facilities - all in one comprehensive platform.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <Link to="/symptom-checker">
              <Button variant="hero" size="lg" className="w-full sm:w-auto">
                Start Diagnosis
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/hospitals">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                Find Hospitals
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            <div className="flex items-center space-x-3">
              <div className="success-gradient p-3 rounded-lg">
                <Activity className="h-6 w-6 text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold text-foreground">95%</div>
                <div className="text-sm text-muted-foreground">Accuracy Rate</div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="medical-gradient p-3 rounded-lg">
                <Users className="h-6 w-6 text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold text-foreground">50K+</div>
                <div className="text-sm text-muted-foreground">Users Helped</div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="bg-accent p-3 rounded-lg">
                <MapPin className="h-6 w-6 text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold text-foreground">1000+</div>
                <div className="text-sm text-muted-foreground">Partner Hospitals</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;