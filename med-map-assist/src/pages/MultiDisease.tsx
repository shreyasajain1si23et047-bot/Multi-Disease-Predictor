import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import Navbar from "@/components/Navbar";
import { Brain, Heart, Wind, Eye, Bone, Activity } from "lucide-react";
import { toast } from "sonner";

const diseaseCategories = [
  {
    icon: Heart,
    name: "Cardiovascular",
    diseases: ["Heart Disease", "Hypertension", "Arrhythmia"],
    color: "emergency-gradient"
  },
  {
    icon: Wind,
    name: "Respiratory",
    diseases: ["Asthma", "Pneumonia", "COPD"],
    color: "bg-blue-500"
  },
  {
    icon: Brain,
    name: "Neurological",
    diseases: ["Migraine", "Stroke", "Epilepsy"],
    color: "medical-gradient"
  },
  {
    icon: Eye,
    name: "Endocrine",
    diseases: ["Diabetes", "Thyroid Disorders", "Obesity"],
    color: "success-gradient"
  },
  {
    icon: Bone,
    name: "Musculoskeletal",
    diseases: ["Arthritis", "Osteoporosis", "Fibromyalgia"],
    color: "bg-purple-500"
  },
  {
    icon: Activity,
    name: "Infectious",
    diseases: ["COVID-19", "Flu", "UTI"],
    color: "bg-orange-500"
  }
];

const MultiDisease = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState<any>(null);

  const handleAnalyze = () => {
    setIsAnalyzing(true);
    
    setTimeout(() => {
      setResults({
        analysis: [
          { category: "Cardiovascular", risk: 85, primary: "Hypertension" },
          { category: "Endocrine", risk: 72, primary: "Type 2 Diabetes" },
          { category: "Respiratory", risk: 45, primary: "Asthma" },
          { category: "Neurological", risk: 32, primary: "Migraine" }
        ]
      });
      setIsAnalyzing(false);
    }, 3000);
  };

  const getRiskColor = (risk: number) => {
    if (risk >= 70) return "emergency";
    if (risk >= 50) return "warning";
    return "success";
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">Multi-Disease Prediction</h1>
          <p className="text-xl text-muted-foreground">
            Comprehensive AI analysis across multiple disease categories
          </p>
        </div>

        {!results ? (
          <>
            {/* Disease Categories */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {diseaseCategories.map((category, index) => (
                <Card key={index} className="card-shadow hover:elevated-shadow transition-all duration-300">
                  <CardHeader>
                    <div className={`${category.color} p-3 rounded-lg w-12 h-12 flex items-center justify-center mb-4`}>
                      <category.icon className="h-6 w-6 text-white" />
                    </div>
                    <CardTitle className="text-lg">{category.name}</CardTitle>
                    <CardDescription>
                      AI screening for {category.diseases.length} conditions
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-1">
                      {category.diseases.map((disease) => (
                        <Badge key={disease} variant="outline" className="text-xs">
                          {disease}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Start Analysis */}
            <Card className="card-shadow text-center">
              <CardContent className="py-12">
                <Brain className="h-16 w-16 text-primary mx-auto mb-6" />
                <h2 className="text-2xl font-bold text-foreground mb-4">
                  Comprehensive Health Analysis
                </h2>
                <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                  Our advanced AI will analyze your symptoms across multiple disease categories 
                  to provide comprehensive health insights and risk assessments.
                </p>
                <Button 
                  variant="medical" 
                  size="lg" 
                  onClick={handleAnalyze}
                  disabled={isAnalyzing}
                  className="px-8"
                >
                  {isAnalyzing ? (
                    <>
                      <Brain className="mr-2 h-5 w-5 animate-spin" />
                      Analyzing Health Data...
                    </>
                  ) : (
                    <>
                      <Activity className="mr-2 h-5 w-5" />
                      Start Multi-Disease Analysis
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </>
        ) : (
          /* Results */
          <div className="space-y-6">
            <Card className="card-shadow">
              <CardHeader>
                <CardTitle className="text-2xl">Analysis Results</CardTitle>
                <CardDescription>
                  Risk assessment across disease categories
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {results.analysis.map((item: any, index: number) => (
                    <div key={index} className="border rounded-lg p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold">{item.category}</h3>
                        <Badge variant={getRiskColor(item.risk) as any}>
                          {item.risk}% Risk
                        </Badge>
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between text-sm">
                          <span>Primary Concern: {item.primary}</span>
                          <span className="text-muted-foreground">{item.risk}%</span>
                        </div>
                        <Progress value={item.risk} className="h-2" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="text-center">
              <Button variant="outline" onClick={() => setResults(null)}>
                Run New Analysis
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MultiDisease;