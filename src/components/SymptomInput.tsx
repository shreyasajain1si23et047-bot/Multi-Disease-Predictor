import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Upload, FileText, Stethoscope } from 'lucide-react';

interface SymptomInputProps {
  onPrediction: (symptoms: string) => void;
}

const SymptomInput = ({ onPrediction }: SymptomInputProps) => {
  const [symptoms, setSymptoms] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target?.result as string;
        setSymptoms(text);
      };
      reader.readAsText(file);
    }
  };

  const handleSubmit = async () => {
    if (!symptoms.trim()) return;
    
    setIsLoading(true);
    // Simulate API delay
    setTimeout(() => {
      onPrediction(symptoms);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-[var(--shadow-card)]">
      <CardHeader className="text-center">
        <div className="mx-auto mb-4 p-3 bg-gradient-to-r from-primary to-accent rounded-full w-fit">
          <Stethoscope className="h-8 w-8 text-white" />
        </div>
        <CardTitle className="text-2xl font-semibold text-foreground">
          Multiple Disease Prediction System
        </CardTitle>
        <CardDescription className="text-muted-foreground">
          Enter your symptoms or upload a medical document for AI-powered disease prediction
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div>
          <label className="text-sm font-medium text-foreground mb-2 block">
            Describe Your Symptoms
          </label>
          <Textarea
            placeholder="Enter your symptoms here (e.g., frequent urination, excessive thirst, fatigue, blurred vision...)"
            value={symptoms}
            onChange={(e) => setSymptoms(e.target.value)}
            rows={5}
            className="resize-none"
          />
        </div>

        <div className="flex items-center gap-4">
          <div className="flex-1 border-t border-border"></div>
          <span className="text-sm text-muted-foreground">OR</span>
          <div className="flex-1 border-t border-border"></div>
        </div>

        <div>
          <label className="text-sm font-medium text-foreground mb-2 block">
            Upload Medical Document
          </label>
          <div className="relative">
            <Input
              type="file"
              accept=".txt,.pdf"
              onChange={handleFileUpload}
              className="hidden"
              id="file-upload"
            />
            <label
              htmlFor="file-upload"
              className="flex items-center justify-center gap-2 p-6 border-2 border-dashed border-border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors"
            >
              <Upload className="h-5 w-5 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                Click to upload PDF or text file
              </span>
            </label>
          </div>
        </div>

        <Button 
          onClick={handleSubmit}
          disabled={!symptoms.trim() || isLoading}
          className="w-full h-12 text-base font-medium"
        >
          {isLoading ? (
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
              Analyzing Symptoms...
            </div>
          ) : (
            <>
              <FileText className="h-4 w-4 mr-2" />
              Predict Disease
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
};

export default SymptomInput;