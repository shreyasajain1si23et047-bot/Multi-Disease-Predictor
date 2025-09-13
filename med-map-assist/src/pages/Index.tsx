import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FeatureCards from "@/components/FeatureCards";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <FeatureCards />
      
      {/* Footer */}
      <footer className="bg-card border-t border-border py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-muted-foreground">
              © 2024 MediDiagnose. AI-powered healthcare insights for better health decisions.
            </p>
            <div className="mt-4 bg-primary/5 border border-primary/20 rounded-lg p-4 max-w-2xl mx-auto">
              <p className="text-sm text-primary">
                🔗 Connect to Supabase for full authentication, database, and Google Maps functionality
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
