import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Brain, Heart, Eye, Thermometer, MapPin, Users, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const features = [
  {
    icon: Brain,
    title: "Multi-Disease Prediction",
    description: "Advanced AI algorithms to predict multiple diseases based on symptoms and medical history.",
    href: "/multi-disease",
    gradient: "medical-gradient"
  },
  {
    icon: Eye,
    title: "Symptom Analysis",
    description: "Comprehensive symptom checker with visual recognition and intelligent analysis.",
    href: "/symptom-checker",
    gradient: "success-gradient"
  },
  {
    icon: Heart,
    title: "Heart Disease Prediction",
    description: "Specialized cardiovascular risk assessment using advanced machine learning models.",
    href: "/heart-disease",
    gradient: "emergency-gradient"
  },
  {
    icon: Thermometer,
    title: "Diabetes Screening",
    description: "Early diabetes detection and risk assessment based on lifestyle and symptoms.",
    href: "/diabetes",
    gradient: "bg-warning"
  },
  {
    icon: MapPin,
    title: "Hospital Locator",
    description: "Find nearby hospitals, clinics, and specialists with real-time availability.",
    href: "/hospitals",
    gradient: "bg-accent"
  },
  {
    icon: Users,
    title: "Health Community",
    description: "Connect with healthcare professionals and other patients for support.",
    href: "/community",
    gradient: "bg-primary"
  }
];

const FeatureCards = () => {
  return (
    <section className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Comprehensive Healthcare Solutions
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            From symptom checking to specialist consultations, our platform provides 
            everything you need for informed healthcare decisions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="card-shadow hover:elevated-shadow transition-all duration-300 group cursor-pointer">
              <CardHeader>
                <div className={`${feature.gradient} p-3 rounded-lg w-12 h-12 flex items-center justify-center mb-4`}>
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-xl font-semibold group-hover:text-primary transition-medical">
                  {feature.title}
                </CardTitle>
                <CardDescription className="text-muted-foreground">
                  {feature.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link to={feature.href}>
                  <Button variant="ghost" className="w-full justify-between group-hover:bg-primary/10 transition-medical">
                    Learn More
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureCards;