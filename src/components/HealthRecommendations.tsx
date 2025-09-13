import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Heart, Zap, Brain } from 'lucide-react';

interface HealthRecommendation {
  activity: string;
  description: string;
  duration: string;
  frequency: string;
}

interface HealthRecommendationsProps {
  diseases: string[];
}

const HealthRecommendations = ({ diseases }: HealthRecommendationsProps) => {
  const getRecommendationsForDisease = (disease: string): HealthRecommendation[] => {
    switch (disease.toLowerCase()) {
      case 'diabetes':
        return [
          {
            activity: 'Walking',
            description: 'Brisk walking helps regulate blood sugar levels',
            duration: '30-45 minutes',
            frequency: 'Daily'
          },
          {
            activity: 'Surya Namaskar',
            description: 'Complete yoga sequence that improves insulin sensitivity',
            duration: '15-20 minutes',
            frequency: 'Morning routine'
          },
          {
            activity: 'Kapalbhati',
            description: 'Breathing exercise to boost metabolism',
            duration: '5-10 minutes',
            frequency: '2x daily'
          }
        ];
      case 'heart disease':
        return [
          {
            activity: 'Anulom-Vilom',
            description: 'Alternate nostril breathing to reduce stress on heart',
            duration: '10-15 minutes',
            frequency: '2x daily'
          },
          {
            activity: 'Light Jogging',
            description: 'Gentle cardio exercise to strengthen heart muscles',
            duration: '20-30 minutes',
            frequency: '3x per week'
          },
          {
            activity: 'Deep Breathing',
            description: 'Relaxation technique to lower blood pressure',
            duration: '10-15 minutes',
            frequency: 'Evening routine'
          }
        ];
      case 'parkinson\'s':
        return [
          {
            activity: 'Meditation',
            description: 'Mindfulness practice to improve cognitive function',
            duration: '15-20 minutes',
            frequency: 'Daily'
          },
          {
            activity: 'Balance Yoga',
            description: 'Yoga poses to improve stability and coordination',
            duration: '20-30 minutes',
            frequency: '3x per week'
          },
          {
            activity: 'Stretching',
            description: 'Gentle stretches to maintain flexibility',
            duration: '15-20 minutes',
            frequency: 'Daily'
          }
        ];
      default:
        return [];
    }
  };

  const getIcon = (disease: string) => {
    switch (disease.toLowerCase()) {
      case 'diabetes':
        return <Zap className="h-5 w-5" />;
      case 'heart disease':
        return <Heart className="h-5 w-5" />;
      case 'parkinson\'s':
        return <Brain className="h-5 w-5" />;
      default:
        return <Heart className="h-5 w-5" />;
    }
  };

  // Get all unique recommendations across all diseases
  const allRecommendations = diseases.flatMap(disease => 
    getRecommendationsForDisease(disease).map(rec => ({ ...rec, forDisease: disease }))
  );
  
  // Remove duplicates by activity name
  const uniqueRecommendations = allRecommendations.filter((rec, index, self) => 
    index === self.findIndex(r => r.activity === rec.activity)
  );

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-[var(--shadow-card)]">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="p-2 bg-accent/10 rounded-full text-accent">
            {getIcon(diseases[0] || '')}
          </div>
          <div>
            <CardTitle className="text-xl font-semibold">
              Recommended Activities
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Yoga and physical activities to help manage {diseases.length > 1 ? 'your conditions' : diseases[0]}
            </p>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {uniqueRecommendations.map((rec, index) => (
          <div key={index} className="p-4 border border-border rounded-lg bg-card">
            <div className="flex items-start justify-between mb-2">
              <h3 className="font-semibold text-foreground">{rec.activity}</h3>
              <div className="flex gap-2">
                <Badge variant="secondary" className="text-xs">
                  {rec.duration}
                </Badge>
                <Badge variant="outline" className="text-xs">
                  {rec.frequency}
                </Badge>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">{rec.description}</p>
          </div>
        ))}
        
        <div className="p-4 bg-accent/10 rounded-lg border border-accent/20">
          <h4 className="font-medium text-foreground mb-2 flex items-center gap-2">
            <Heart className="h-4 w-4 text-accent" />
            Professional Guidance
          </h4>
          <p className="text-sm text-muted-foreground">
            Always consult with your healthcare provider before starting any new exercise routine. 
            These recommendations are general guidelines and may need to be adjusted based on your 
            specific condition and fitness level.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default HealthRecommendations;