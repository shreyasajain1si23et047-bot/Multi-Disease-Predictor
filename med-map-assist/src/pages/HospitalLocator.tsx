import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Navbar from "@/components/Navbar";
import { Search, MapPin, Phone, Clock, Star, Navigation, Filter } from "lucide-react";
import { toast } from "sonner";

// Mock hospital data
const hospitals = [
  {
    id: 1,
    name: "City General Hospital",
    address: "123 Medical Center Dr, Downtown",
    phone: "(555) 123-4567",
    distance: "0.8 miles",
    rating: 4.8,
    specialties: ["Emergency", "Cardiology", "Surgery"],
    status: "Open 24/7",
    type: "General Hospital"
  },
  {
    id: 2,
    name: "Metro Heart Center",
    address: "456 Cardiac Ave, Medical District",
    phone: "(555) 234-5678",
    distance: "1.2 miles",
    rating: 4.9,
    specialties: ["Cardiology", "Cardiac Surgery"],
    status: "Open 24/7",
    type: "Specialty Center"
  },
  {
    id: 3,
    name: "Westside Medical Clinic",
    address: "789 Health St, Westside",
    phone: "(555) 345-6789",
    distance: "2.1 miles",
    rating: 4.6,
    specialties: ["Primary Care", "Urgent Care"],
    status: "8 AM - 10 PM",
    type: "Clinic"
  },
  {
    id: 4,
    name: "Children's Hospital",
    address: "321 Kids Way, Pediatric District",
    phone: "(555) 456-7890",
    distance: "2.5 miles",
    rating: 4.7,
    specialties: ["Pediatrics", "NICU", "Surgery"],
    status: "Open 24/7",
    type: "Children's Hospital"
  }
];

const HospitalLocator = () => {
  const [searchLocation, setSearchLocation] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [filterSpecialty, setFilterSpecialty] = useState("all");
  const [isSearching, setIsSearching] = useState(false);
  const [filteredHospitals, setFilteredHospitals] = useState(hospitals);

  const handleSearch = async () => {
    if (!searchLocation.trim()) {
      toast.error("Please enter a location");
      return;
    }

    setIsSearching(true);
    
    // Simulate search delay
    setTimeout(() => {
      toast.info("Google Maps integration requires API key setup in Supabase");
      setIsSearching(false);
    }, 1000);
  };

  const handleGetCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          toast.success("Location found! Showing nearby hospitals");
          // In a real app, this would update the map and hospital list
        },
        (error) => {
          toast.error("Unable to get your location");
        }
      );
    } else {
      toast.error("Geolocation is not supported by this browser");
    }
  };

  const applyFilters = () => {
    let filtered = hospitals;

    if (filterType !== "all") {
      filtered = filtered.filter(hospital => 
        hospital.type.toLowerCase().includes(filterType.toLowerCase())
      );
    }

    if (filterSpecialty !== "all") {
      filtered = filtered.filter(hospital =>
        hospital.specialties.some(specialty => 
          specialty.toLowerCase().includes(filterSpecialty.toLowerCase())
        )
      );
    }

    setFilteredHospitals(filtered);
  };

  const getStatusColor = (status: string) => {
    return status.includes("24/7") ? "success" : "outline";
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">Find Nearby Hospitals</h1>
          <p className="text-xl text-muted-foreground">
            Locate hospitals, clinics, and medical facilities near you
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Search and Filters */}
          <div className="space-y-6">
            <Card className="card-shadow">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Search className="h-5 w-5 text-primary" />
                  <span>Search Location</span>
                </CardTitle>
                <CardDescription>
                  Find medical facilities near you
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="location">Enter Location</Label>
                  <div className="flex space-x-2 mt-2">
                    <Input
                      id="location"
                      placeholder="City, ZIP code, or address"
                      value={searchLocation}
                      onChange={(e) => setSearchLocation(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                    />
                    <Button variant="outline" size="icon" onClick={handleSearch} disabled={isSearching}>
                      <Search className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <Button 
                  variant="medical" 
                  className="w-full" 
                  onClick={handleGetCurrentLocation}
                >
                  <Navigation className="mr-2 h-4 w-4" />
                  Use Current Location
                </Button>
              </CardContent>
            </Card>

            <Card className="card-shadow">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Filter className="h-5 w-5 text-primary" />
                  <span>Filter Results</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Facility Type</Label>
                  <Select value={filterType} onValueChange={setFilterType}>
                    <SelectTrigger className="mt-2">
                      <SelectValue placeholder="All types" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="hospital">General Hospital</SelectItem>
                      <SelectItem value="clinic">Clinic</SelectItem>
                      <SelectItem value="specialty">Specialty Center</SelectItem>
                      <SelectItem value="children">Children's Hospital</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Specialty</Label>
                  <Select value={filterSpecialty} onValueChange={setFilterSpecialty}>
                    <SelectTrigger className="mt-2">
                      <SelectValue placeholder="All specialties" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Specialties</SelectItem>
                      <SelectItem value="emergency">Emergency</SelectItem>
                      <SelectItem value="cardiology">Cardiology</SelectItem>
                      <SelectItem value="surgery">Surgery</SelectItem>
                      <SelectItem value="pediatrics">Pediatrics</SelectItem>
                      <SelectItem value="primary">Primary Care</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button variant="outline" className="w-full" onClick={applyFilters}>
                  Apply Filters
                </Button>
              </CardContent>
            </Card>

            {/* Map Placeholder */}
            <Card className="card-shadow">
              <CardHeader>
                <CardTitle>Map View</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-muted/30 rounded-lg h-64 flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">
                      Google Maps integration will appear here
                    </p>
                    <p className="text-sm text-muted-foreground mt-2">
                      Connect Google Maps API via Supabase
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Hospital Results */}
          <div className="lg:col-span-2">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-foreground">
                Nearby Medical Facilities ({filteredHospitals.length})
              </h2>
            </div>

            <div className="space-y-4">
              {filteredHospitals.map((hospital) => (
                <Card key={hospital.id} className="card-shadow hover:elevated-shadow transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-xl mb-2">{hospital.name}</CardTitle>
                        <div className="flex items-center space-x-2 text-muted-foreground mb-2">
                          <MapPin className="h-4 w-4" />
                          <span className="text-sm">{hospital.address}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-muted-foreground mb-2">
                          <Phone className="h-4 w-4" />
                          <span className="text-sm">{hospital.phone}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center space-x-1 mb-2">
                          <Star className="h-4 w-4 text-yellow-500 fill-current" />
                          <span className="font-semibold">{hospital.rating}</span>
                        </div>
                        <div className="text-sm text-muted-foreground">{hospital.distance}</div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div>
                        <Label className="text-sm font-medium">Specialties</Label>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {hospital.specialties.map((specialty) => (
                            <Badge key={specialty} variant="outline" className="text-xs">
                              {specialty}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <Badge variant={getStatusColor(hospital.status) as any}>
                            {hospital.status}
                          </Badge>
                        </div>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            <Phone className="h-4 w-4 mr-2" />
                            Call
                          </Button>
                          <Button variant="medical" size="sm">
                            <Navigation className="h-4 w-4 mr-2" />
                            Directions
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Info Banner */}
            <div className="mt-8 bg-primary/5 border border-primary/20 rounded-lg p-4">
              <p className="text-sm text-primary">
                🗺️ Full Google Maps integration with real-time data requires API key setup in Supabase
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HospitalLocator;