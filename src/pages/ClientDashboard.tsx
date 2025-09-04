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
import { Search, Calendar, Clock } from "lucide-react";
import { listApprovedMentors, listBookings } from "@/lib/data"; // ✅ changed to listApprovedMentors
import { Mentor } from "@/lib/types";

// ✅ new imports for bookings UI + realtime toast
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase";

const ClientDashboard = () => {
  const [mentors, setMentors] = useState<Mentor[]>([]);
  const [filteredMentors, setFilteredMentors] = useState<Mentor[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [domainFilter, setDomainFilter] = useState("all");
  const [experienceFilter, setExperienceFilter] = useState("all");
  const navigate = useNavigate();

  // ✅ client bookings state
  const { toast } = useToast();
  const [uid, setUid] = useState<string>("");
  const [bookings, setBookings] = useState<any[]>([]);
  const [loadingBookings, setLoadingBookings] = useState<boolean>(true);

  // ---------- Load mentors (approved only) ----------
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const allMentors = await listApprovedMentors();   // <-- only approved mentors
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

  // ---------- Load this client's bookings + realtime ----------
  useEffect(() => {
    let mounted = true;

    (async () => {
      const { data: uinfo } = await supabase.auth.getUser();
      const id = uinfo?.user?.id || "";
      if (!mounted) return;
      setUid(id);

      if (!id) {
        setLoadingBookings(false);
        return;
      }

      try {
        const rows = await listBookings({ clientId: id });
        if (mounted) setBookings(rows as any);
      } finally {
        if (mounted) setLoadingBookings(false);
      }

      // realtime subscription to this client's bookings
      const channel = supabase
        .channel(`bookings-client-${id}`)
        .on(
          "postgres_changes",
          { event: "*", schema: "public", table: "bookings", filter: `client_id=eq.${id}` },
          async (payload) => {
            // Refresh list (simple & robust)
            const rows = await listBookings({ clientId: id });
            if (mounted) setBookings(rows as any);

            // Notify on reschedule or status change
            if (payload.eventType === "UPDATE") {
              const oldSlot = (payload.old as any)?.slot_id;
              const newSlot = (payload.new as any)?.slot_id;
              const oldStatus = (payload.old as any)?.status;
              const newStatus = (payload.new as any)?.status;

              if (newSlot && oldSlot && newSlot !== oldSlot) {
                toast({
                  title: "Session rescheduled",
                  description: "Your mentor changed the time for an upcoming session.",
                });
              } else if (newStatus && oldStatus && newStatus !== oldStatus) {
                toast({
                  title: "Booking updated",
                  description: `Status changed to “${newStatus}”.`,
                });
              }
            }
          }
        )
        .subscribe();

      return () => {
        supabase.removeChannel(channel);
      };
    })();

    return () => { mounted = false; };
  }, [toast]);

  // ---------- Existing filters for mentors ----------
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

  // ---------- Small helpers for bookings section ----------
// Example in ClientDashboard (or wherever you list future sessions)
const future = bookings.filter(
  b => b.status === "confirmed" && b.startIso && new Date(b.startIso) > new Date()
);

  const past   = bookings.filter(b => b.startIso && new Date(b.startIso) <= new Date());
  const fmt = (iso: string) => {
    const d = new Date(iso);
    return {
      date: d.toLocaleDateString(undefined, { weekday: "short", month: "short", day: "numeric" }),
      time: d.toLocaleTimeString(undefined, { hour: "numeric", minute: "2-digit" }),
    };
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="px-6 py-8">
        <div className="max-w-7xl mx-auto">

          {/* ✅ New: Your bookings overview */}
          <div className="mb-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Sessions {loadingBookings ? "" : `(${future.length})`}</CardTitle>
              </CardHeader>
              <CardContent>
                {loadingBookings ? (
                  <p className="text-sm text-muted-foreground">Loading…</p>
                ) : future.length === 0 ? (
                  <p className="text-sm text-muted-foreground">No upcoming sessions.</p>
                ) : (
                  <div className="space-y-3">
                    {future.map((b) => {
                      const f = fmt(b.startIso);
                      return (
                        <div key={b.id} className="flex items-center justify-between p-3 border rounded">
                          <div className="flex items-center gap-4">
                            <span className="flex items-center gap-1 text-sm text-muted-foreground">
                              <Calendar className="w-4 h-4" /> {f.date}
                            </span>
                            <span className="flex items-center gap-1 text-sm text-muted-foreground">
                              <Clock className="w-4 h-4" /> {f.time}
                            </span>
                          </div>
                          <Badge variant={b.status === "rescheduled" ? "secondary" : "default"}>
                            {b.status}
                          </Badge>
                        </div>
                      );
                    })}
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Past Sessions {loadingBookings ? "" : `(${past.length})`}</CardTitle>
              </CardHeader>
              <CardContent>
                {loadingBookings ? (
                  <p className="text-sm text-muted-foreground">Loading…</p>
                ) : past.length === 0 ? (
                  <p className="text-sm text-muted-foreground">No past sessions yet.</p>
                ) : (
                  <div className="space-y-3">
                    {past.map((b) => {
                      const f = fmt(b.startIso);
                      return (
                        <div key={b.id} className="flex items-center justify-between p-3 border rounded">
                          <div className="flex items-center gap-4">
                            <span className="flex items-center gap-1 text-sm text-muted-foreground">
                              <Calendar className="w-4 h-4" /> {f.date}
                            </span>
                            <span className="flex items-center gap-1 text-sm text-muted-foreground">
                              <Clock className="w-4 h-4" /> {f.time}
                            </span>
                          </div>
                          <Badge variant={b.status === "cancelled" ? "secondary" : "default"}>
                            {b.status}
                          </Badge>
                        </div>
                      );
                    })}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

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
