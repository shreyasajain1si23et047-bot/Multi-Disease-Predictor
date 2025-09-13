import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { AlertTriangle, Heart, Activity } from 'lucide-react';

interface Disease {
  name: string;
  confidence: number;
  description: string;
  severity: 'low' | 'medium' | 'high';
}

interface PredictionResultProps {
  predictions: Disease[];
}

const PredictionResult = ({ predictions }: PredictionResultProps) => {
  const getIcon = (diseaseName: string) => {
    switch (diseaseName.toLowerCase()) {
      case 'diabetes':
        return <Activity className="h-6 w-6" />;
      case 'heart disease':
        return <Heart className="h-6 w-6" />;
      case 'parkinson\'s':
        return <AlertTriangle className="h-6 w-6" />;
      default:
        return <Activity className="h-6 w-6" />;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low':
        return 'bg-success text-white';
      case 'medium':
        return 'bg-warning text-white';
      case 'high':
        return 'bg-destructive text-white';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-[var(--shadow-card)] border-l-4 border-l-primary">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-full text-primary">
            {getIcon(predictions[0]?.name || '')}
          </div>
          <div className="flex-1">
            <CardTitle className="text-xl font-semibold">
              Prediction Results
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              AI-powered disease prediction based on symptoms ({predictions.length} condition{predictions.length > 1 ? 's' : ''} detected)
            </p>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {predictions.map((prediction, index) => (
          <div key={index} className="p-4 bg-gradient-to-r from-primary/5 to-accent/5 rounded-lg border border-border">
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center gap-2">
                <div className="p-1 bg-primary/10 rounded-full text-primary">
                  {getIcon(prediction.name)}
                </div>
                <h3 className="text-lg font-semibold text-foreground">
                  {prediction.name}
                </h3>
                <Badge className={getSeverityColor(prediction.severity)}>
                  {prediction.severity} risk
                </Badge>
              </div>
              <span className="text-2xl font-bold text-primary">
                {prediction.confidence}%
              </span>
            </div>
            
            <Progress 
              value={prediction.confidence} 
              className="mb-3 h-2"
            />
            
            <p className="text-sm text-muted-foreground">
              {prediction.description}
            </p>
          </div>
        ))}

        <div className="p-4 bg-muted/50 rounded-lg border border-border">
          <h4 className="font-medium text-foreground mb-2">Important Notice</h4>
          <p className="text-sm text-muted-foreground">
            This is an AI prediction for informational purposes only. Please consult a healthcare 
            professional for proper diagnosis and treatment. Do not use this as a substitute for 
            professional medical advice.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default PredictionResult;