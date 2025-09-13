import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import Navbar from "@/components/Navbar";
import { Search, Plus, X, Activity, AlertCircle, CheckCircle, Brain } from "lucide-react";
import { toast } from "sonner";

const commonSymptoms = [
  "Fever", "Headache", "Cough", "Fatigue", "Nausea", "Vomiting", 
  "Diarrhea", "Chest Pain", "Shortness of Breath", "Dizziness",
  "Muscle Pain", "Joint Pain", "Rash", "Sore Throat", "Runny Nose"
];

const SymptomChecker = () => {
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [customSymptom, setCustomSymptom] = useState("");
  const [additionalInfo, setAdditionalInfo] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState<any>(null);

  const handleSymptomToggle = (symptom: string) => {
    setSelectedSymptoms(prev => 
      prev.includes(symptom)
        ? prev.filter(s => s !== symptom)
        : [...prev, symptom]
    );
  };

  const handleAddCustomSymptom = () => {
    if (customSymptom.trim() && !selectedSymptoms.includes(customSymptom.trim())) {
      setSelectedSymptoms(prev => [...prev, customSymptom.trim()]);
      setCustomSymptom("");
    }
  };

  const handleAnalyze = async () => {
    if (selectedSymptoms.length === 0) {
      toast.error("Please select at least one symptom");
      return;
    }

    setIsAnalyzing(true);
    
    // Simulate AI analysis
    setTimeout(() => {
      setResults({
        predictions: [
          { disease: "Common Cold", confidence: 85, severity: "Low" },
          { disease: "Viral Infection", confidence: 72, severity: "Low" },
          { disease: "Flu", confidence: 68, severity: "Medium" }
        ],
        recommendations: [
          "Rest and stay hydrated",
          "Monitor symptoms for 24-48 hours",
          "Consider seeing a doctor if symptoms worsen",
          "Take over-the-counter pain relievers if needed"
        ],
        urgency: "Low"
      });
      setIsAnalyzing(false);
    }, 2000);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity.toLowerCase()) {
      case "low": return "success";
      case "medium": return "warning";
      case "high": return "emergency";
      default: return "default";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">Symptom Checker</h1>
          <p className="text-xl text-muted-foreground">
            Describe your symptoms and get AI-powered health insights
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="space-y-6">
            <Card className="card-shadow">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Search className="h-5 w-5 text-primary" />
                  <span>Select Your Symptoms</span>
                </CardTitle>
                <CardDescription>
                  Choose from common symptoms or add your own
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Common Symptoms */}
                <div>
                  <Label className="text-sm font-medium mb-3 block">Common Symptoms</Label>
                  <div className="flex flex-wrap gap-2">
                    {commonSymptoms.map((symptom) => (
                      <Badge
                        key={symptom}
                        variant={selectedSymptoms.includes(symptom) ? "default" : "outline"}
                        className="cursor-pointer hover:bg-primary/10 transition-medical"
                        onClick={() => handleSymptomToggle(symptom)}
                      >
                        {symptom}
                        {selectedSymptoms.includes(symptom) && (
                          <X className="ml-1 h-3 w-3" />
                        )}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Custom Symptom */}
                <div>
                  <Label htmlFor="custom-symptom">Add Custom Symptom</Label>
                  <div className="flex space-x-2 mt-2">
                    <Input
                      id="custom-symptom"
                      placeholder="Describe your symptom"
                      value={customSymptom}
                      onChange={(e) => setCustomSymptom(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleAddCustomSymptom()}
                    />
                    <Button variant="outline" size="icon" onClick={handleAddCustomSymptom}>
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Selected Symptoms */}
                {selectedSymptoms.length > 0 && (
                  <div>
                    <Label className="text-sm font-medium mb-2 block">Selected Symptoms</Label>
                    <div className="flex flex-wrap gap-2">
                      {selectedSymptoms.map((symptom) => (
                        <Badge key={symptom} variant="default" className="flex items-center space-x-1">
                          <span>{symptom}</span>
                          <X 
                            className="h-3 w-3 cursor-pointer hover:text-destructive" 
                            onClick={() => handleSymptomToggle(symptom)}
                          />
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="card-shadow">
              <CardHeader>
                <CardTitle>Additional Information</CardTitle>
                <CardDescription>
                  Help us provide more accurate insights
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="age">Age (optional)</Label>
                    <Input
                      id="age"
                      type="number"
                      placeholder="25"
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="gender">Gender (optional)</Label>
                    <Input
                      id="gender"
                      placeholder="Male/Female/Other"
                      value={gender}
                      onChange={(e) => setGender(e.target.value)}
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="additional-info">Additional Details (optional)</Label>
                  <Textarea
                    id="additional-info"
                    placeholder="When did symptoms start? Any relevant medical history?"
                    value={additionalInfo}
                    onChange={(e) => setAdditionalInfo(e.target.value)}
                    rows={3}
                  />
                </div>

                <Button 
                  variant="medical" 
                  className="w-full" 
                  onClick={handleAnalyze}
                  disabled={isAnalyzing || selectedSymptoms.length === 0}
                >
                  {isAnalyzing ? (
                    <>
                      <Brain className="mr-2 h-4 w-4 animate-spin" />
                      Analyzing Symptoms...
                    </>
                  ) : (
                    <>
                      <Activity className="mr-2 h-4 w-4" />
                      Analyze Symptoms
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Results Section */}
          <div>
            {results ? (
              <Card className="card-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <CheckCircle className="h-5 w-5 text-success" />
                    <span>Analysis Results</span>
                  </CardTitle>
                  <CardDescription>
                    AI-powered health insights based on your symptoms
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Urgency Level */}
                  <div className="flex items-center justify-between p-4 rounded-lg bg-muted/30">
                    <div className="flex items-center space-x-2">
                      <AlertCircle className="h-5 w-5 text-success" />
                      <span className="font-medium">Urgency Level</span>
                    </div>
                    <Badge variant="outline" className="text-success border-success">
                      {results.urgency}
                    </Badge>
                  </div>

                  {/* Possible Conditions */}
                  <div>
                    <h3 className="font-semibold mb-3">Possible Conditions</h3>
                    <div className="space-y-3">
                      {results.predictions.map((prediction: any, index: number) => (
                        <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                          <div>
                            <div className="font-medium">{prediction.disease}</div>
                            <div className="text-sm text-muted-foreground">
                              Confidence: {prediction.confidence}%
                            </div>
                          </div>
                          <Badge variant={getSeverityColor(prediction.severity) as any}>
                            {prediction.severity}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Separator />

                  {/* Recommendations */}
                  <div>
                    <h3 className="font-semibold mb-3">Recommendations</h3>
                    <ul className="space-y-2">
                      {results.recommendations.map((rec: string, index: number) => (
                        <li key={index} className="flex items-start space-x-2">
                          <CheckCircle className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
                          <span className="text-sm">{rec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Disclaimer */}
                  <div className="bg-warning/10 border border-warning/20 rounded-lg p-4">
                    <div className="flex items-start space-x-2">
                      <AlertCircle className="h-5 w-5 text-warning flex-shrink-0 mt-0.5" />
                      <div className="text-sm">
                        <p className="font-medium text-warning mb-1">Medical Disclaimer</p>
                        <p className="text-muted-foreground">
                          This is an AI-powered assessment and should not replace professional medical advice. 
                          Please consult a healthcare provider for proper diagnosis and treatment.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="card-shadow">
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <Brain className="h-16 w-16 text-muted-foreground mb-4" />
                  <h3 className="text-xl font-semibold text-foreground mb-2">Ready to Analyze</h3>
                  <p className="text-muted-foreground text-center">
                    Select your symptoms and click "Analyze Symptoms" to get AI-powered health insights
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SymptomChecker;