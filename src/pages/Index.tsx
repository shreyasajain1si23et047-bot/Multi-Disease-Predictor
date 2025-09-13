import { useState } from 'react';
import SymptomInput from '@/components/SymptomInput';
import PredictionResult from '@/components/PredictionResult';
import HealthRecommendations from '@/components/HealthRecommendations';
import LocationSuggestions from '@/components/LocationSuggestions';
import { predictDiseases, Disease } from '@/utils/diseasePredictor';

const Index = () => {
  const [predictions, setPredictions] = useState<Disease[]>([]);

  const handlePrediction = (symptoms: string) => {
    const results = predictDiseases(symptoms);
    setPredictions(results);
    
    // Scroll to results
    setTimeout(() => {
      const resultsElement = document.getElementById('prediction-results');
      if (resultsElement) {
        resultsElement.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-gradient-to-r from-primary to-accent text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            AI Disease Prediction System
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Advanced machine learning technology to help predict potential health conditions 
            based on your symptoms and provide personalized recommendations.
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12 space-y-12">
        
        {/* Symptom Input Section */}
        <section>
          <SymptomInput onPrediction={handlePrediction} />
        </section>

        {/* Results Section */}
        {predictions.length > 0 && (
          <section id="prediction-results" className="space-y-8">
            
            {/* Prediction Result */}
            <div>
              <PredictionResult predictions={predictions} />
            </div>

            {/* Health Recommendations */}
            <div>
              <HealthRecommendations diseases={predictions.map(p => p.name)} />
            </div>

            {/* Location Suggestions */}
            <div>
              <LocationSuggestions diseases={predictions.map(p => p.name)} />
            </div>

          </section>
        )}

        {/* Information Section */}
        <section className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-card rounded-lg shadow-[var(--shadow-card)]">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">AI-Powered Analysis</h3>
              <p className="text-sm text-muted-foreground">
                Advanced machine learning algorithms analyze your symptoms to predict potential health conditions.
              </p>
            </div>

            <div className="text-center p-6 bg-card rounded-lg shadow-[var(--shadow-card)]">
              <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Personalized Care</h3>
              <p className="text-sm text-muted-foreground">
                Get customized yoga exercises and physical activities tailored to your predicted condition.
              </p>
            </div>

            <div className="text-center p-6 bg-card rounded-lg shadow-[var(--shadow-card)]">
              <div className="w-12 h-12 bg-medical-teal/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-medical-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Local Healthcare</h3>
              <p className="text-sm text-muted-foreground">
                Find nearby hospitals and specialized doctors based on your location and predicted condition.
              </p>
            </div>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="bg-muted mt-16 py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground">
            © 2024 Multiple Disease Prediction System. For educational and informational purposes only.
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            Always consult with healthcare professionals for proper medical diagnosis and treatment.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;