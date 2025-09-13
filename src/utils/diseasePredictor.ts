// Deterministic disease prediction logic based on symptoms (supports multiple diseases)
export interface Disease {
  name: string;
  confidence: number;
  description: string;
  severity: 'low' | 'medium' | 'high';
}

export const predictDiseases = (symptoms: string): Disease[] => {
  const symptomsLower = symptoms.toLowerCase();
  
  // Define keyword patterns for each disease with more specific keywords
  const diseasePatterns = {
    diabetes: {
      keywords: [
        'frequent urination', 'excessive thirst', 'fatigue', 'blurred vision', 
        'slow healing', 'weight loss', 'increased hunger', 'numbness', 
        'tingling', 'dark patches', 'sweet smell', 'glucose', 'sugar',
        'polyuria', 'polydipsia', 'polyphagia', 'diabetes', 'diabetic',
        'blood sugar', 'insulin', 'hyperglycemia'
      ],
      name: 'Diabetes',
      description: 'A metabolic disorder characterized by high blood sugar levels over a prolonged period.',
      severity: 'medium' as const
    },
    heartDisease: {
      keywords: [
        'chest pain', 'shortness of breath', 'rapid heartbeat', 'irregular heartbeat',
        'dizziness', 'sweating', 'nausea', 'swollen legs', 
        'swollen feet', 'palpitations', 'angina', 'breathlessness', 'heart attack',
        'coronary', 'cardiac', 'arrhythmia', 'hypertension', 'high blood pressure',
        'heart disease', 'cardiovascular', 'myocardial'
      ],
      name: 'Heart Disease',
      description: 'A range of conditions affecting the heart and blood vessels that can lead to serious complications.',
      severity: 'high' as const
    },
    parkinsons: {
      keywords: [
        'tremor', 'shaking', 'stiffness', 'slow movement', 'balance problems',
        'coordination problems', 'speech changes', 'writing changes', 'posture problems',
        'bradykinesia', 'rigidity', 'postural instability', 'freezing', 'dyskinesia',
        'movement disorder', 'neurological', 'parkinson', 'muscle stiffness',
        'slowness of movement', 'tremors'
      ],
      name: "Parkinson's Disease",
      description: 'A progressive nervous system disorder that affects movement and can cause tremors and stiffness.',
      severity: 'high' as const
    }
  };

  // Calculate scores for each disease (deterministic - no randomness)
  const scores = {
    diabetes: 0,
    heartDisease: 0,
    parkinsons: 0
  };

  // Count keyword matches for each disease
  Object.entries(diseasePatterns).forEach(([key, pattern]) => {
    pattern.keywords.forEach(keyword => {
      if (symptomsLower.includes(keyword)) {
        scores[key as keyof typeof scores] += 1;
      }
    });
  });

  // Create predictions for diseases with matches (threshold: at least 1 keyword match)
  const predictions: Disease[] = [];
  const minConfidenceThreshold = 1; // At least 1 keyword match required

  Object.entries(scores).forEach(([key, score]) => {
    if (score >= minConfidenceThreshold) {
      const disease = diseasePatterns[key as keyof typeof diseasePatterns];
      
      // Calculate confidence deterministically (40-95% range based on keyword matches)
      const maxKeywords = disease.keywords.length;
      const matchRatio = Math.min(score / Math.min(maxKeywords * 0.3, 5), 1); // Cap influence at 30% of keywords or 5 matches
      const confidence = Math.round(40 + (matchRatio * 55));

      predictions.push({
        name: disease.name,
        confidence,
        description: disease.description,
        severity: disease.severity
      });
    }
  });

  // Sort by confidence (highest first)
  predictions.sort((a, b) => b.confidence - a.confidence);

  // If no predictions, return a default low-confidence suggestion
  if (predictions.length === 0) {
    predictions.push({
      name: 'General Health Concern',
      confidence: 25,
      description: 'Based on the symptoms provided, we recommend consulting with a healthcare professional for proper evaluation.',
      severity: 'low'
    });
  }

  return predictions;
};

// Backward compatibility function
export const predictDisease = (symptoms: string): Disease => {
  const predictions = predictDiseases(symptoms);
  return predictions[0]; // Return the highest confidence prediction
};