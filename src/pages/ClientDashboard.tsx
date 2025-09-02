// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { Input } from "@/components/ui/input";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { Navbar } from "@/components/ui/navbar";
// import { MentorCard } from "@/components/mentor-card";
// import { Search } from "lucide-react";
// import { listMentors, getMentor, listSlotsForMentor } from "@/lib/data";
// import { Mentor } from "@/lib/types";

// const ClientDashboard = () => {
//   const [mentors, setMentors] = useState<Mentor[]>([]);
//   const [filteredMentors, setFilteredMentors] = useState<Mentor[]>([]);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [domainFilter, setDomainFilter] = useState("all");
//   const [experienceFilter, setExperienceFilter] = useState("all");
//   const navigate = useNavigate();

//  useEffect(() => {
//   let mounted = true;
//   (async () => {
//     try {
//       const allMentors = await listMentors();   // <-- await
//       if (mounted) {
//         setMentors(allMentors);
//         setFilteredMentors(allMentors);
//       }
//     } catch (e) {
//       console.error("Failed to load mentors", e);
//     }
//   })();
//   return () => { mounted = false; };
// }, []);


//   useEffect(() => {
//     let filtered = mentors;

//     // Search filter
//     if (searchQuery.trim()) {
//       filtered = filtered.filter(mentor =>
//         mentor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//         mentor.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
//         mentor.specialties.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()))
//       );
//     }

//     // Domain filter
//     if (domainFilter !== "all") {
//       filtered = filtered.filter(mentor =>
//         mentor.specialties.some(s => s.toLowerCase().includes(domainFilter.toLowerCase())) ||
//         mentor.title.toLowerCase().includes(domainFilter.toLowerCase())
//       );
//     }

//     // Experience filter
//     if (experienceFilter !== "all") {
//       const [min, max] = experienceFilter.split("-").map(Number);
//       filtered = filtered.filter(mentor => {
//         if (max) {
//           return mentor.experience >= min && mentor.experience <= max;
//         }
//         return mentor.experience >= min;
//       });
//     }

//     setFilteredMentors(filtered);
//   }, [mentors, searchQuery, domainFilter, experienceFilter]);

//   const handleViewProfile = (mentorId: string) => {
//     navigate(`/mentor/${mentorId}`);
//   };

//   const handleBookSession = (mentorId: string) => {
//     navigate(`/mentor/${mentorId}?tab=availability`);
//   };

//   return (
//     <div className="min-h-screen bg-background">
//       <Navbar />
      
//       <div className="px-6 py-8">
//         <div className="max-w-7xl mx-auto">
//           {/* Header */}
//           <div className="mb-8">
//             <h1 className="text-3xl font-bold text-foreground mb-2">Find Your Perfect Mentor</h1>
//             <p className="text-muted-foreground">Browse our verified mentors and book a session that fits your career goals</p>
//           </div>

//           {/* Filters */}
//           <div className="flex flex-col md:flex-row gap-4 mb-8">
//             <div className="relative flex-1">
//               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
//               <Input
//                 placeholder="Search mentors by name, company, or skills..."
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 className="pl-10"
//               />
//             </div>
            
//             <Select value={domainFilter} onValueChange={setDomainFilter}>
//               <SelectTrigger className="w-full md:w-48">
//                 <SelectValue placeholder="Domain" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="all">All Domains</SelectItem>
//                 <SelectItem value="product">Product Management</SelectItem>
//                 <SelectItem value="engineering">Engineering</SelectItem>
//                 <SelectItem value="marketing">Marketing</SelectItem>
//                 <SelectItem value="design">Design</SelectItem>
//               </SelectContent>
//             </Select>
            
//             <Select value={experienceFilter} onValueChange={setExperienceFilter}>
//               <SelectTrigger className="w-full md:w-48">
//                 <SelectValue placeholder="Experience" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="all">All Experience</SelectItem>
//                 <SelectItem value="0-3">0-3 years</SelectItem>
//                 <SelectItem value="4-7">4-7 years</SelectItem>
//                 <SelectItem value="8-12">8-12 years</SelectItem>
//                 <SelectItem value="13">13+ years</SelectItem>
//               </SelectContent>
//             </Select>
//           </div>

//           {/* Results Count */}
//           <div className="mb-6">
//             <p className="text-muted-foreground">
//               Showing {filteredMentors.length} of {mentors.length} mentors
//             </p>
//           </div>

//           {/* Mentor Grid */}
//           <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-6">
//             {filteredMentors.map((mentor) => (
//               <MentorCard
//                 key={mentor.id}
//                 mentor={mentor}
//                 onViewProfile={handleViewProfile}
//                 onBookSession={handleBookSession}
//               />
//             ))}
//           </div>

//           {filteredMentors.length === 0 && (
//             <div className="text-center py-12">
//               <p className="text-muted-foreground">No mentors found matching your criteria.</p>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ClientDashboard;    

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Navbar } from "@/components/ui/navbar";
import { MentorCard } from "@/components/mentor-card";
import { Search } from "lucide-react";
import { listMentors } from "@/lib/data"; 
import { Mentor } from "@/lib/types";

const ClientDashboard = () => {
  const [mentors, setMentors] = useState<Mentor[]>([]);
  const [filteredMentors, setFilteredMentors] = useState<Mentor[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [domainFilter, setDomainFilter] = useState("all");
  const [experienceFilter, setExperienceFilter] = useState("all");
  const navigate = useNavigate();

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const allMentors = await listMentors();   // <-- Supabase-backed
        if (mounted) {
          setMentors(allMentors);
          setFilteredMentors(allMentors);
        }
      } catch (e) {
        console.error("Failed to load mentors", e);
      }
    })();
    return () => { mounted = false; };
  }, []);

  useEffect(() => {
    let filtered = mentors;

    // Search filter
    if (searchQuery.trim()) {
      filtered = filtered.filter(mentor =>
        mentor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        mentor.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        mentor.specialties.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Domain filter
    if (domainFilter !== "all") {
      filtered = filtered.filter(mentor =>
        mentor.specialties.some(s => s.toLowerCase().includes(domainFilter.toLowerCase())) ||
        mentor.title.toLowerCase().includes(domainFilter.toLowerCase())
      );
    }

    // Experience filter
    if (experienceFilter !== "all") {
      const [min, max] = experienceFilter.split("-").map(Number);
      filtered = filtered.filter(mentor => {
        if (max) {
          return mentor.experience >= min && mentor.experience <= max;
        }
        return mentor.experience >= min;
      });
    }

    setFilteredMentors(filtered);
  }, [mentors, searchQuery, domainFilter, experienceFilter]);

  const handleViewProfile = (mentorId: string) => {
    navigate(`/mentor/${mentorId}`);
  };

  const handleBookSession = (mentorId: string) => {
    navigate(`/mentor/${mentorId}?tab=availability`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="px-6 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Find Your Perfect Mentor</h1>
            <p className="text-muted-foreground">Browse our verified mentors and book a session that fits your career goals</p>
          </div>

          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search mentors by name, company, or skills..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={domainFilter} onValueChange={setDomainFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Domain" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Domains</SelectItem>
                <SelectItem value="product">Product Management</SelectItem>
                <SelectItem value="engineering">Engineering</SelectItem>
                <SelectItem value="marketing">Marketing</SelectItem>
                <SelectItem value="design">Design</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={experienceFilter} onValueChange={setExperienceFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Experience" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Experience</SelectItem>
                <SelectItem value="0-3">0-3 years</SelectItem>
                <SelectItem value="4-7">4-7 years</SelectItem>
                <SelectItem value="8-12">8-12 years</SelectItem>
                <SelectItem value="13">13+ years</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Results Count */}
          <div className="mb-6">
            <p className="text-muted-foreground">
              Showing {filteredMentors.length} of {mentors.length} mentors
            </p>
          </div>

          {/* Mentor Grid */}
          <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredMentors.map((mentor) => (
              <MentorCard
                key={mentor.id}
                mentor={mentor}
                onViewProfile={handleViewProfile}
                onBookSession={handleBookSession}
              />
            ))}
          </div>

          {filteredMentors.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No mentors found matching your criteria.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClientDashboard;
