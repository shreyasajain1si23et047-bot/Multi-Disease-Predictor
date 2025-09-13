import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MapPin, Hospital, User, Phone } from 'lucide-react';

interface Doctor {
  name: string;
  specialization: string;
  hospital: string;
  phone?: string;
  forDisease?: string;
}

interface LocationSuggestionsProps {
  diseases: string[];
}

const LocationSuggestions = ({ diseases }: LocationSuggestionsProps) => {
  const [location, setLocation] = useState('');
  const [suggestions, setSuggestions] = useState<Doctor[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Mock hospital/doctor database
  const hospitalData: Record<string, Record<string, Doctor[]>> = {
    "bangalore": {
      "diabetes": [
        { name: "Dr. Kumar Sharma", specialization: "Endocrinologist", hospital: "Apollo Hospital", phone: "+91-9876543210" },
        { name: "Dr. Priya Menon", specialization: "Diabetologist", hospital: "Fortis Hospital", phone: "+91-9876543211" }
      ],
      "heart disease": [
        { name: "Dr. Rajesh Mehta", specialization: "Cardiologist", hospital: "Narayana Hrudayalaya", phone: "+91-9876543212" },
        { name: "Dr. Suresh Kumar", specialization: "Cardiac Surgeon", hospital: "Manipal Hospital", phone: "+91-9876543213" }
      ],
      "parkinson's": [
        { name: "Dr. Sunita Rao", specialization: "Neurologist", hospital: "NIMHANS", phone: "+91-9876543214" },
        { name: "Dr. Arun Iyer", specialization: "Movement Disorder Specialist", hospital: "BGS Gleneagles", phone: "+91-9876543215" }
      ]
    },
    "delhi": {
      "diabetes": [
        { name: "Dr. Amit Sharma", specialization: "Endocrinologist", hospital: "AIIMS Delhi", phone: "+91-9876543216" },
        { name: "Dr. Neha Gupta", specialization: "Diabetologist", hospital: "Max Hospital", phone: "+91-9876543217" }
      ],
      "heart disease": [
        { name: "Dr. Vikram Gupta", specialization: "Cardiologist", hospital: "Fortis Escorts", phone: "+91-9876543218" },
        { name: "Dr. Ravi Singh", specialization: "Interventional Cardiologist", hospital: "Apollo Delhi", phone: "+91-9876543219" }
      ],
      "parkinson's": [
        { name: "Dr. Madhav Iyer", specialization: "Neurologist", hospital: "Apollo Delhi", phone: "+91-9876543220" },
        { name: "Dr. Sanjay Verma", specialization: "Movement Disorder Specialist", hospital: "Sir Ganga Ram Hospital", phone: "+91-9876543221" }
      ]
    },
    "mumbai": {
      "diabetes": [
        { name: "Dr. Rajesh Patel", specialization: "Endocrinologist", hospital: "Kokilaben Hospital", phone: "+91-9876543222" },
        { name: "Dr. Meera Shah", specialization: "Diabetologist", hospital: "Lilavati Hospital", phone: "+91-9876543223" }
      ],
      "heart disease": [
        { name: "Dr. Ashok Nair", specialization: "Cardiologist", hospital: "Jaslok Hospital", phone: "+91-9876543224" },
        { name: "Dr. Kiran Joshi", specialization: "Cardiac Surgeon", hospital: "Hinduja Hospital", phone: "+91-9876543225" }
      ],
      "parkinson's": [
        { name: "Dr. Deepak Kulkarni", specialization: "Neurologist", hospital: "KEM Hospital", phone: "+91-9876543226" },
        { name: "Dr. Pradeep Mahajan", specialization: "Movement Disorder Specialist", hospital: "Global Hospital", phone: "+91-9876543227" }
      ]
    }
  };

  const handleLocationSearch = async () => {
    if (!location.trim()) return;
    
    setIsLoading(true);
    // Simulate API delay
    setTimeout(() => {
      const cityKey = location.toLowerCase().trim();
      
      // Get all doctors for all diseases
      const allDoctors = diseases.flatMap(disease => {
        const doctors = hospitalData[cityKey]?.[disease.toLowerCase()] || [];
        return doctors.map(doctor => ({ ...doctor, forDisease: disease }));
      });
      
      // Remove duplicates by doctor name
      const uniqueDoctors = allDoctors.filter((doctor, index, self) => 
        index === self.findIndex(d => d.name === doctor.name)
      );
      
      setSuggestions(uniqueDoctors);
      setIsLoading(false);
    }, 1000);
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // Mock location detection - in real app, use reverse geocoding
          setLocation('Bangalore'); // Default for demo
          handleLocationSearch();
        },
        (error) => {
          console.error('Geolocation error:', error);
          setLocation('Bangalore'); // Fallback
        }
      );
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-[var(--shadow-card)]">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="p-2 bg-medical-teal/10 rounded-full text-medical-teal">
            <MapPin className="h-5 w-5" />
          </div>
          <div>
            <CardTitle className="text-xl font-semibold">
              Nearby Healthcare Providers
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Find specialized doctors and hospitals near you for {diseases.length > 1 ? 'your conditions' : diseases[0]}
            </p>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Input
            placeholder="Enter your city (e.g., Bangalore, Delhi, Mumbai)"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="flex-1"
          />
          <Button onClick={handleLocationSearch} disabled={isLoading}>
            Search
          </Button>
          <Button 
            variant="outline" 
            onClick={getCurrentLocation}
            className="flex items-center gap-2"
          >
            <MapPin className="h-4 w-4" />
            Auto-detect
          </Button>
        </div>

        {isLoading && (
          <div className="flex items-center justify-center p-8">
            <div className="flex items-center gap-2 text-muted-foreground">
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent"></div>
              Finding healthcare providers...
            </div>
          </div>
        )}

        {suggestions.length > 0 && !isLoading && (
          <div className="space-y-3">
            <h4 className="font-medium text-foreground">
              Recommended Healthcare Providers in {location}:
            </h4>
            {suggestions.map((doctor, index) => (
              <div key={index} className="p-4 border border-border rounded-lg bg-card hover:bg-muted/50 transition-colors">
                <div className="flex items-start justify-between">
                 <div className="space-y-2">
                     <div className="flex items-center gap-2">
                       <User className="h-4 w-4 text-primary" />
                       <h5 className="font-semibold text-foreground">{doctor.name}</h5>
                       {doctor.forDisease && (
                         <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                           {doctor.forDisease}
                         </span>
                       )}
                     </div>
                     <p className="text-sm text-accent font-medium">{doctor.specialization}</p>
                     <div className="flex items-center gap-2">
                       <Hospital className="h-4 w-4 text-muted-foreground" />
                       <p className="text-sm text-muted-foreground">{doctor.hospital}</p>
                     </div>
                     {doctor.phone && (
                       <div className="flex items-center gap-2">
                         <Phone className="h-4 w-4 text-muted-foreground" />
                         <p className="text-sm text-muted-foreground">{doctor.phone}</p>
                       </div>
                     )}
                   </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {suggestions.length === 0 && !isLoading && location && (
          <div className="p-4 text-center text-muted-foreground">
            No healthcare providers found for {diseases.length > 1 ? 'your conditions' : diseases[0]} in {location}. 
            Try searching for major cities like Bangalore, Delhi, or Mumbai.
          </div>
        )}

        <div className="p-4 bg-muted/50 rounded-lg border border-border">
          <h4 className="font-medium text-foreground mb-2">Note</h4>
          <p className="text-sm text-muted-foreground">
            This is a demonstration with sample data. In a real application, this would connect to 
            live healthcare provider databases and location services for accurate, up-to-date information.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default LocationSuggestions;