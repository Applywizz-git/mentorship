// import { useState, useEffect } from "react";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { Textarea } from "@/components/ui/textarea";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Navbar } from "@/components/ui/navbar";
// import { Calendar, Clock, User, Settings, ExternalLink } from "lucide-react";
// import { 
//   getCurrentMentorId, 
//   getMentor, 
//   listBookings, 
//   listSlotsForMentor, 
//   rescheduleBooking,
//   updateMentorProfile 
// } from "@/lib/data";
// import { Booking, TimeSlot, Mentor } from "@/lib/types";
// import { useToast } from "@/hooks/use-toast";

// const MentorDashboard = () => {
//   const [mentor, setMentor] = useState<Mentor | null>(null);
//   const [bookings, setBookings] = useState<Booking[]>([]);
//   const [slots, setSlots] = useState<TimeSlot[]>([]);
//   const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
//   const [newSlotId, setNewSlotId] = useState("");
//   const [rescheduleReason, setRescheduleReason] = useState("");
//   const [editProfileOpen, setEditProfileOpen] = useState(false);
//   const [profileData, setProfileData] = useState({ name: "", title: "", company: "" });
//   const { toast } = useToast();

//   useEffect(() => {
//     const currentMentorId = getCurrentMentorId();
//     if (currentMentorId) {
//       const mentorData = getMentor(currentMentorId);
//       if (mentorData) {
//         setMentor(mentorData);
//         setProfileData({
//           name: mentorData.name,
//           title: mentorData.title,
//           company: mentorData.company
//         });
        
//         const mentorBookings = listBookings({ mentorId: currentMentorId });
//         setBookings(mentorBookings);
        
//         const mentorSlots = listSlotsForMentor(currentMentorId);
//         setSlots(mentorSlots);
//       }
//     }
//   }, []);

//   const formatDateTime = (isoString: string) => {
//     const date = new Date(isoString);
//     return {
//       date: date.toLocaleDateString('en-US', { 
//         weekday: 'short', 
//         month: 'short', 
//         day: 'numeric' 
//       }),
//       time: date.toLocaleTimeString('en-US', {
//         hour: 'numeric',
//         minute: '2-digit',
//         hour12: true
//       })
//     };
//   };

//   const getBookingSlot = (slotId: string) => {
//     return slots.find(s => s.id === slotId);
//   };

//   const getAvailableSlots = (excludeSlotId?: string) => {
//     return slots.filter(s => s.available && s.id !== excludeSlotId);
//   };

//   const isWithin24Hours = (slotId: string) => {
//     const slot = slots.find(s => s.id === slotId);
//     if (!slot) return false;
    
//     const now = new Date();
//     const slotTime = new Date(slot.startIso);
//     const hoursUntilSlot = (slotTime.getTime() - now.getTime()) / (1000 * 60 * 60);
    
//     return hoursUntilSlot <= 24;
//   };

//   const handleReschedule = async () => {
//     if (!selectedBooking || !newSlotId) return;
    
//     const within24h = isWithin24Hours(selectedBooking.slotId);
//     const reason = within24h ? rescheduleReason.trim() : undefined;
    
//     const result = rescheduleBooking(selectedBooking.id, newSlotId, reason);
    
//     if (result.ok) {
//       toast({
//         title: "Session rescheduled!",
//         description: "The mentee has been notified of the change.",
//       });
      
//       // Refresh data
//       if (mentor) {
//         const updatedBookings = listBookings({ mentorId: mentor.id });
//         const updatedSlots = listSlotsForMentor(mentor.id);
//         setBookings(updatedBookings);
//         setSlots(updatedSlots);
//       }
      
//       setSelectedBooking(null);
//       setNewSlotId("");
//       setRescheduleReason("");
//     } else {
//       toast({
//         title: "Reschedule failed",
//         description: result.error,
//         variant: "destructive"
//       });
//     }
//   };

//   const handleSaveProfile = () => {
//     if (mentor) {
//       updateMentorProfile(mentor.id, profileData);
//       setMentor({ ...mentor, ...profileData });
//       toast({
//         title: "Profile updated!",
//         description: "Your profile information has been saved.",
//       });
//       setEditProfileOpen(false);
//     }
//   };

//   const upcomingBookings = bookings.filter(b => {
//     const slot = getBookingSlot(b.slotId);
//     return slot && new Date(slot.startIso) > new Date();
//   });

//   if (!mentor) {
//     return (
//       <div className="min-h-screen bg-background">
//         <Navbar />
//         <div className="px-6 py-8">
//           <div className="max-w-4xl mx-auto text-center">
//             <h1 className="text-2xl font-bold text-foreground mb-4">Please log in to access your dashboard</h1>
//           </div>
//         </div>
//       </div>
//     );
//   }
  

//   return (
//     <div className="min-h-screen bg-background">
//       <Navbar />
      
//       <div className="px-6 py-8">
//         <div className="max-w-6xl mx-auto">
//           {/* Header */}
//           <div className="flex items-center justify-between mb-8">
//             <div>
//               <h1 className="text-3xl font-bold text-foreground mb-2">Welcome back, {mentor.name}</h1>
//               <p className="text-muted-foreground">{mentor.title} at {mentor.company}</p>
//             </div>
//             {mentor.status === 'pending' && (
//                 <div className="mb-6 rounded-lg border border-yellow-300 bg-yellow-50 text-yellow-800 p-3 text-sm">
//                   Your profile is <b>Pending Approval</b>. You can still update availability & pricing,
//                   but you won’t appear in search until approved.
//                   <Button
//                     variant="link"
//                     className="ml-2 p-0 align-baseline"
//                     onClick={() => (window.location.href = "/become-mentor")}
//                   >
//                     Edit onboarding
//                   </Button>
//                 </div>
//               )}

//             <div className="flex items-center gap-2">
//                 {mentor.status === 'pending' ? (
//                   <Badge className="bg-yellow-100 text-yellow-800 border border-yellow-300">
//                     ⏳ Pending Approval
//                   </Badge>
//                 ) : mentor.verified ? (
//                   <Badge className="bg-verified-green text-white">✓ Verified</Badge>
//                 ) : null}
//                 <Badge variant="secondary">{mentor.rating} rating</Badge>
//               </div>

//           </div>

//           {/* Dashboard Tabs */}
//           <Tabs defaultValue="upcoming" className="space-y-6">
//             <TabsList className="grid w-full grid-cols-4">
//               <TabsTrigger value="requests">Requests</TabsTrigger>
//               <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
//               <TabsTrigger value="profile">Profile</TabsTrigger>
//               <TabsTrigger value="availability">Availability</TabsTrigger>
//             </TabsList>
            
//             <TabsContent value="requests">
//               <Card>
//                 <CardHeader>
//                   <CardTitle>Booking Requests</CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="text-center py-8">
//                     <p className="text-muted-foreground">No pending booking requests</p>
//                     <p className="text-sm text-muted-foreground mt-2">New requests will appear here</p>
//                   </div>
//                 </CardContent>
//               </Card>
//             </TabsContent>
            
//             <TabsContent value="upcoming">
//               <Card>
//                 <CardHeader>
//                   <CardTitle className="flex items-center gap-2">
//                     <Calendar className="w-5 h-5" />
//                     Upcoming Sessions ({upcomingBookings.length})
//                   </CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   {upcomingBookings.length === 0 ? (
//                     <div className="text-center py-8">
//                       <p className="text-muted-foreground">No upcoming sessions</p>
//                       <p className="text-sm text-muted-foreground mt-2">New bookings will appear here</p>
//                     </div>
//                   ) : (
//                     <div className="space-y-4">
//                       {upcomingBookings.map((booking) => {
//                         const slot = getBookingSlot(booking.slotId);
//                         if (!slot) return null;
                        
//                         const { date, time } = formatDateTime(slot.startIso);
                        
//                         return (
//                           <div key={booking.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
//                             <div className="flex items-center gap-4">
//                               <div className="p-2 bg-primary/10 rounded-lg">
//                                 <User className="w-5 h-5 text-primary" />
//                               </div>
//                               <div>
//                                 <h4 className="font-medium">{booking.menteeName}</h4>
//                                 <p className="text-sm text-muted-foreground">{booking.menteeEmail}</p>
//                                 <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
//                                   <span className="flex items-center gap-1">
//                                     <Calendar className="w-3 h-3" />
//                                     {date}
//                                   </span>
//                                   <span className="flex items-center gap-1">
//                                     <Clock className="w-3 h-3" />
//                                     {time}
//                                   </span>
//                                 </div>
//                               </div>
//                             </div>
                            
//                             <div className="flex items-center gap-2">
//                               <Badge variant={booking.status === 'confirmed' ? 'default' : 'secondary'}>
//                                 {booking.status}
//                               </Badge>
                              
//                               <Dialog>
//                                 <DialogTrigger asChild>
//                                   <Button 
//                                     variant="outline" 
//                                     size="sm"
//                                     onClick={() => setSelectedBooking(booking)}
//                                   >
//                                     Reschedule
//                                   </Button>
//                                 </DialogTrigger>
//                                 <DialogContent>
//                                   <DialogHeader>
//                                     <DialogTitle>Reschedule Session</DialogTitle>
//                                   </DialogHeader>
//                                   <div className="space-y-4">
//                                     <div>
//                                       <Label>Current Session</Label>
//                                       <p className="text-sm text-muted-foreground">
//                                         {booking.menteeName} - {date} at {time}
//                                       </p>
//                                     </div>
                                    
//                                     <div>
//                                       <Label>New Time Slot</Label>
//                                       <Select value={newSlotId} onValueChange={setNewSlotId}>
//                                         <SelectTrigger>
//                                           <SelectValue placeholder="Select new time slot" />
//                                         </SelectTrigger>
//                                         <SelectContent>
//                                           {getAvailableSlots(booking.slotId).map((slot) => {
//                                             const { date: newDate, time: newTime } = formatDateTime(slot.startIso);
//                                             return (
//                                               <SelectItem key={slot.id} value={slot.id}>
//                                                 {newDate} at {newTime}
//                                               </SelectItem>
//                                             );
//                                           })}
//                                         </SelectContent>
//                                       </Select>
//                                     </div>
                                    
//                                     {isWithin24Hours(booking.slotId) && (
//                                       <div>
//                                         <Label>Reason (Required for last-minute changes)</Label>
//                                         <Textarea
//                                           value={rescheduleReason}
//                                           onChange={(e) => setRescheduleReason(e.target.value)}
//                                           placeholder="Please provide a reason for the reschedule..."
//                                         />
//                                       </div>
//                                     )}
                                    
//                                     <div className="flex gap-2">
//                                       <Button 
//                                         onClick={handleReschedule}
//                                         disabled={!newSlotId || (isWithin24Hours(booking.slotId) && !rescheduleReason.trim())}
//                                         className="flex-1"
//                                       >
//                                         Confirm Reschedule
//                                       </Button>
//                                     </div>
//                                   </div>
//                                 </DialogContent>
//                               </Dialog>
//                             </div>
//                           </div>
//                         );
//                       })}
//                     </div>
//                   )}
//                 </CardContent>
//               </Card>
//             </TabsContent>
            
//             <TabsContent value="profile">
//               <Card>
//                 <CardHeader>
//                   <CardTitle className="flex items-center gap-2">
//                     <Settings className="w-5 h-5" />
//                     Profile Settings
//                   </CardTitle>
//                 </CardHeader>
//                 <CardContent className="space-y-6">
//                   <div className="flex items-center gap-4">
//                     <img
//                       src={mentor.avatar}
//                       alt={mentor.name}
//                       className="w-20 h-20 rounded-full object-cover"
//                     />
//                     <div>
//                       <h3 className="text-lg font-semibold">{mentor.name}</h3>
//                       <p className="text-muted-foreground">{mentor.title}</p>
//                       <Badge className="mt-1 bg-verified-green text-white">✓ Verified</Badge>
//                     </div>
//                   </div>
                  
//                   <div className="grid md:grid-cols-2 gap-6">
//                     <div>
//                       <h4 className="font-medium mb-2">Profile Information</h4>
//                       <div className="space-y-2 text-sm">
//                         <p><span className="font-medium">Name:</span> {mentor.name}</p>
//                         <p><span className="font-medium">Title:</span> {mentor.title}</p>
//                         <p><span className="font-medium">Company:</span> {mentor.company}</p>
//                         <p><span className="font-medium">Experience:</span> {mentor.experience} years</p>
//                         <p><span className="font-medium">Rating:</span> {mentor.rating}/5.0 ({mentor.reviews} reviews)</p>
//                       </div>
//                     </div>
                    
//                     <div>
//                       <h4 className="font-medium mb-2">Specialties</h4>
//                       <div className="flex flex-wrap gap-2">
//                         {mentor.specialties.map((specialty) => (
//                           <Badge key={specialty} variant="secondary">
//                             {specialty}
//                           </Badge>
//                         ))}
//                       </div>
//                     </div>
//                   </div>
                  
//                   <Dialog open={editProfileOpen} onOpenChange={setEditProfileOpen}>
//                     <DialogTrigger asChild>
//                       <Button>Edit Profile Details</Button>
//                     </DialogTrigger>
//                     <DialogContent>
//                       <DialogHeader>
//                         <DialogTitle>Edit Profile</DialogTitle>
//                       </DialogHeader>
//                       <div className="space-y-4">
//                         <div>
//                           <Label htmlFor="name">Name</Label>
//                           <Input
//                             id="name"
//                             value={profileData.name}
//                             onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
//                           />
//                         </div>
//                         <div>
//                           <Label htmlFor="title">Title</Label>
//                           <Input
//                             id="title"
//                             value={profileData.title}
//                             onChange={(e) => setProfileData({ ...profileData, title: e.target.value })}
//                           />
//                         </div>
//                         <div>
//                           <Label htmlFor="company">Company</Label>
//                           <Input
//                             id="company"
//                             value={profileData.company}
//                             onChange={(e) => setProfileData({ ...profileData, company: e.target.value })}
//                           />
//                         </div>
//                         <Button onClick={handleSaveProfile} className="w-full">
//                           Save Changes
//                         </Button>
//                       </div>
//                     </DialogContent>
//                   </Dialog>
//                 </CardContent>
//               </Card>
//             </TabsContent>
            
//             <TabsContent value="availability">
//               <Card>
//                 <CardHeader>
//                   <CardTitle>Availability Management</CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="text-center py-8">
//                     <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
//                     <h3 className="text-lg font-medium mb-2">Calendar Integration</h3>
//                     <p className="text-muted-foreground mb-4">
//                       Connect your calendar to automatically manage your availability and prevent double bookings.
//                     </p>
//                     <Button className="flex items-center gap-2">
//                       <ExternalLink className="w-4 h-4" />
//                       Connect Calendar
//                     </Button>
//                   </div>
//                 </CardContent>
//               </Card>
//             </TabsContent>
//           </Tabs>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MentorDashboard;

import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Navbar } from "@/components/ui/navbar";
import { Calendar, Clock, User, Settings } from "lucide-react";
import {
  getCurrentMentorId,
  getMentor,
  listBookings,
  listSlotsForMentor,
  rescheduleBooking,
  updateMentorProfile,
  getMyMentorId,                 // (already imported)
  listUpcomingForMentor          // (already imported)
} from "@/lib/data";
import type { Booking, TimeSlot, Mentor, SessionPackage, WeeklySlot } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";
import AvailabilityCalendar from "@/components/AvailabilityCalendar";

const MentorDashboard = () => {
  const [mentor, setMentor] = useState<Mentor | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [slots, setSlots] = useState<TimeSlot[]>([]);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [newSlotId, setNewSlotId] = useState("");
  const [rescheduleReason, setRescheduleReason] = useState("");
  const [editProfileOpen, setEditProfileOpen] = useState(false);
  const [profileData, setProfileData] = useState({ name: "", title: "", company: "" });

  // Pricing editor (uses our SessionPackage shape)
  const [currency, setCurrency] = useState("USD");
  const [packagesState, setPackagesState] = useState<SessionPackage[]>([
    { id: "pkg30-ui", label: "30 min", minutes: 30, price: 30, currency: "USD" as any, active: true },
    { id: "pkg45-ui", label: "45 min", minutes: 45, price: 40, currency: "USD" as any, active: true },
    { id: "pkg60-ui", label: "60 min", minutes: 60, price: 50, currency: "USD" as any, active: true },
  ]);

  // Availability editor (uses our WeeklySlot shape)
  const [weeklyEdit, setWeeklyEdit] = useState<WeeklySlot[]>([]);
  const [bufferEdit, setBufferEdit] = useState<number>(15);

  // Earnings (computed locally from bookings)
  const [mtd, setMtd] = useState(0);
  const [lifetime, setLifetime] = useState(0);
  const [pending, setPending] = useState(0);
  const [tx, setTx] = useState<{id:string; date:string; client:string; amount:number; status:"pending"|"paid"}[]>([]);

  // ✅ NEW: DB-backed upcoming rows
  const [upcoming, setUpcoming] = useState<any[]>([]);

  // ✅ Load upcoming (DB) and cache a valid mentorId if needed
  useEffect(() => {
    (async () => {
      let mentorId = getCurrentMentorId?.() || "";
      if (!mentorId || mentorId === "fallback") {
        mentorId = (await getMyMentorId()) || "";
      }
      if (!mentorId) return;

      try {
        const rows = await listUpcomingForMentor(mentorId);
        setUpcoming(rows);
        // console.log("[Upcoming] mentorId:", mentorId, "rows:", rows);
      } catch (e) {
        console.error("Upcoming load failed", e);
      }
    })();
  }, []);

  const { toast } = useToast();

  useEffect(() => {
    (async () => {
      // ✅ ensure we have a real mentor id even if cache was empty
      let currentMentorId = getCurrentMentorId();
      if (!currentMentorId || currentMentorId === "fallback") {
        currentMentorId = (await getMyMentorId()) || "";
      }
      if (!currentMentorId) return;

      const mentorData = await getMentor(currentMentorId);
      if (!mentorData) return;

      setMentor(mentorData);
      setProfileData({
        name: mentorData.name,
        title: mentorData.title,
        company: mentorData.company
      });

      const mentorBookings = await listBookings({ mentorId: currentMentorId });
      setBookings(mentorBookings);

      const mentorSlots = await listSlotsForMentor(currentMentorId);
      setSlots(mentorSlots);

      // initialize editors
      setCurrency(mentorData.packages?.[0]?.currency ?? "USD");
      setPackagesState(
        mentorData.packages?.length
          ? mentorData.packages
          : [
              { id: "pkg30-ui", label: "30 min", minutes: 30, price: mentorData.price, currency: (mentorData.packages?.[0]?.currency ?? "USD") as any, active: true },
              { id: "pkg45-ui", label: "45 min", minutes: 45, price: Math.round(mentorData.price * 1.3), currency: (mentorData.packages?.[0]?.currency ?? "USD") as any, active: true },
              { id: "pkg60-ui", label: "60 min", minutes: 60, price: Math.round(mentorData.price * 1.6), currency: (mentorData.packages?.[0]?.currency ?? "USD") as any, active: true },
            ]
      );
      setWeeklyEdit(mentorData.weeklySchedule ?? []);
      setBufferEdit(mentorData.bufferMinutes ?? 15);

      // earnings (local calc)
      const now = new Date();
      const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
      const completedOrConfirmed = mentorBookings.filter(b => b.status !== "cancelled");
      const mtdSum = completedOrConfirmed
        .filter(b => new Date(b.startIso) >= startOfMonth && new Date(b.startIso) <= now)
        .reduce((acc, b) => acc + (b.price || 0), 0);
      const lifeSum = completedOrConfirmed.reduce((acc, b) => acc + (b.price || 0), 0);
      const pendingSum = 0; // demo: payouts subsystem not implemented
      const txRows = completedOrConfirmed.slice(-10).map(b => ({
        id: b.id,
        date: b.startIso,
        client: b.clientId,
        amount: b.price || 0,
        status: "paid" as const
      }));

      setMtd(mtdSum);
      setLifetime(lifeSum);
      setPending(pendingSum);
      setTx(txRows);
    })();
  }, []);

  const formatDateTime = (isoString: string) => {
    const date = new Date(isoString);
    return {
      date: date.toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric'
      }),
      time: date.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      })
    };
  };

  const getBookingSlot = (slotId: string) => slots.find(s => s.id === slotId);
  const getAvailableSlots = (excludeSlotId?: string) => slots.filter(s => s.available && s.id !== excludeSlotId);

  const isWithin24Hours = (slotId: string) => {
    const slot = slots.find(s => s.id === slotId);
    if (!slot) return false;
    const now = new Date();
    const slotTime = new Date(slot.startIso);
    const hoursUntilSlot = (slotTime.getTime() - now.getTime()) / (1000 * 60 * 60);
    return hoursUntilSlot <= 24;
  };

  const handleReschedule = async () => {
    if (!selectedBooking || !newSlotId) return;
    const within24h = isWithin24Hours(selectedBooking.slotId);
    const reason = within24h ? rescheduleReason.trim() : undefined;

    try {
      await rescheduleBooking(selectedBooking.id, newSlotId, reason);
      toast({ title: "Session rescheduled!", description: "The mentee has been notified of the change." });

      if (mentor) {
        const refreshedBookings = await listBookings({ mentorId: mentor.id });
        setBookings(refreshedBookings);
        const refreshedSlots = await listSlotsForMentor(mentor.id);
        setSlots(refreshedSlots);
      }

      setSelectedBooking(null);
      setNewSlotId("");
      setRescheduleReason("");
    } catch (e: any) {
      toast({ title: "Reschedule failed", description: e?.message ?? "Please try another slot.", variant: "destructive" });
    }
  };

  const handleSaveProfile = () => {
    if (!mentor) return;
    updateMentorProfile(mentor.id, profileData);
    setMentor({ ...mentor, ...profileData });
    toast({ title: "Profile updated!", description: "Your profile information has been saved." });
    setEditProfileOpen(false);
  };

  // Pricing handlers (minutes instead of duration)
  const togglePackageActive = (minutes: 30|45|60, active: boolean) => {
    setPackagesState(prev => prev.map(p => p.minutes === minutes ? { ...p, active } : p));
  };
  const setPackagePrice = (minutes: 30|45|60, price: number) => {
    setPackagesState(prev => prev.map(p => p.minutes === minutes ? { ...p, price } : p));
  };
  const savePricing = () => {
    if (!mentor) return;
    const normalized = packagesState.map(p => ({
      ...p,
      currency: currency as any,
      label: p.label || `${p.minutes} min`,
      id: p.id || `pkg-${p.minutes}`
    }));
    updateMentorProfile(mentor.id, { packages: normalized });
    setMentor({ ...mentor, packages: normalized });
    toast({ title: "Pricing updated", description: "Your session packages were saved." });
  };

  // Availability handlers (weekday/active instead of day/enabled)
  const toggleDay = (weekday: number, active: boolean) => {
    setWeeklyEdit(prev => prev.map(s => s.weekday === weekday ? { ...s, active } : s));
  };
  const setTimeForDay = (weekday: number, key: "start" | "end", value: string) => {
    setWeeklyEdit(prev => prev.map(s => s.weekday === weekday ? { ...s, [key]: value } : s));
  };
  const saveAvailability = () => {
    if (!mentor) return;
    updateMentorProfile(mentor.id, { weeklySchedule: weeklyEdit, bufferMinutes: bufferEdit });
    setMentor({ ...mentor, weeklySchedule: weeklyEdit, bufferMinutes: bufferEdit });
    toast({ title: "Availability updated", description: "Your weekly schedule was saved." });
  };

  // ✅ Prefer DB-backed upcoming; if empty, fall back to legacy local computation
  const legacyUpcoming = bookings.filter(b => {
    const slot = getBookingSlot(b.slotId);
    return slot && new Date(slot.startIso) > new Date();
  });
  const upcomingBookings = (upcoming && upcoming.length > 0) ? upcoming : legacyUpcoming;

  if (!mentor) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="px-6 py-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-2xl font-bold text-foreground mb-4">Please log in to access your dashboard</h1>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="px-6 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Welcome back, {mentor.name}</h1>
              <p className="text-muted-foreground">{mentor.title} at {mentor.company}</p>
            </div>
            <div className="flex items-center gap-2">
              {(mentor.status === 'pending' || mentor.status === 'pending_approval') ? (
                <Badge className="bg-yellow-100 text-yellow-800 border border-yellow-300">⏳ Pending Approval</Badge>
              ) : mentor.verified ? (
                <Badge className="bg-verified-green text-white">✓ Verified</Badge>
              ) : null}
              <Badge variant="secondary">{mentor.rating} rating</Badge>
            </div>
          </div>

          {/* Pending banner */}
          {(mentor.status === 'pending' || mentor.status === 'pending_approval') && (
            <div className="mb-6 rounded-lg border border-yellow-300 bg-yellow-50 text-yellow-800 p-3 text-sm">
              Your profile is <b>Pending Approval</b>. You can still update availability & pricing,
              but you won’t appear in search until approved.
              <Button
                variant="link"
                className="ml-2 p-0 align-baseline"
                onClick={() => (window.location.href = "/become-mentor")}
              >
                Edit onboarding
              </Button>
            </div>
          )}

          {/* Dashboard Tabs */}
          <Tabs defaultValue="upcoming" className="space-y-6">
            <TabsList className="grid w-full grid-cols-7">
              <TabsTrigger value="requests">Requests</TabsTrigger>
              <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
              <TabsTrigger value="past">Past</TabsTrigger>
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="availability">Availability</TabsTrigger>
              <TabsTrigger value="pricing">Pricing</TabsTrigger>
              <TabsTrigger value="earnings">Earnings</TabsTrigger>
            </TabsList>

            <TabsContent value="requests">
              <Card>
                <CardHeader>
                  <CardTitle>Booking Requests</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">No pending booking requests</p>
                    <p className="text-sm text-muted-foreground mt-2">New requests will appear here</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="upcoming">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    {/* ✅ counts DB-backed list when available */}
                    Upcoming Sessions ({upcomingBookings.length})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {upcomingBookings.length === 0 ? (
                    <div className="text-center py-8">
                      <p className="text-muted-foreground">No upcoming sessions</p>
                      <p className="text-sm text-muted-foreground mt-2">New bookings will appear here</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {upcomingBookings.map((booking: any) => {
                        // ✅ Prefer startIso from DB-backed 'upcoming'; else fall back to local slot lookup
                        const startIso: string =
                          booking.startIso ||
                          getBookingSlot(booking.slotId)?.startIso ||
                          "";

                        if (!startIso) return null;
                        const { date, time } = formatDateTime(startIso);

                        return (
                          <div key={booking.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
                            <div className="flex items-center gap-4">
                              <div className="p-2 bg-primary/10 rounded-lg">
                                <User className="w-5 h-5 text-primary" />
                              </div>
                              <div>
                                {/* demo data stores only clientId; show it */}
                                <h4 className="font-medium">{booking.clientId}</h4>
                                <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                                  <span className="flex items-center gap-1">
                                    <Calendar className="w-3 h-3" />
                                    {date}
                                  </span>
                                  <span className="flex items-center gap-1">
                                    <Clock className="w-3 h-3" />
                                    {time}
                                  </span>
                                </div>
                              </div>
                            </div>

                            <div className="flex items-center gap-2">
                              <Badge variant={booking.status === 'confirmed' ? 'default' : 'secondary'}>
                                {booking.status}
                              </Badge>

                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => setSelectedBooking(booking)}
                                  >
                                    Reschedule
                                  </Button>
                                </DialogTrigger>
                                <DialogContent>
                                  <DialogHeader>
                                    <DialogTitle>Reschedule Session</DialogTitle>
                                  </DialogHeader>
                                  <div className="space-y-4">
                                    <div>
                                      <Label>Current Session</Label>
                                      <p className="text-sm text-muted-foreground">
                                        {booking.clientId} - {date} at {time}
                                      </p>
                                    </div>

                                    <div>
                                      <Label>New Time Slot</Label>
                                      <Select value={newSlotId} onValueChange={setNewSlotId}>
                                        <SelectTrigger>
                                          <SelectValue placeholder="Select new time slot" />
                                        </SelectTrigger>
                                        <SelectContent>
                                          {getAvailableSlots(booking.slotId).map((slot) => {
                                            const { date: newDate, time: newTime } = formatDateTime(slot.startIso);
                                            return (
                                              <SelectItem key={slot.id} value={slot.id}>
                                                {newDate} at {newTime}
                                              </SelectItem>
                                            );
                                          })}
                                        </SelectContent>
                                      </Select>
                                    </div>

                                    {isWithin24Hours(booking.slotId) && (
                                      <div>
                                        <Label>Reason (Required for last-minute changes)</Label>
                                        <Textarea
                                          value={rescheduleReason}
                                          onChange={(e) => setRescheduleReason(e.target.value)}
                                          placeholder="Please provide a reason for the reschedule..."
                                        />
                                      </div>
                                    )}

                                    <div className="flex gap-2">
                                      <Button
                                        onClick={handleReschedule}
                                        disabled={!newSlotId || (isWithin24Hours(booking.slotId) && !rescheduleReason.trim())}
                                        className="flex-1"
                                      >
                                        Confirm Reschedule
                                      </Button>
                                    </div>
                                  </div>
                                </DialogContent>
                              </Dialog>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="past">
              <Card>
                <CardHeader>
                  <CardTitle>Past Sessions</CardTitle>
                </CardHeader>
                <CardContent>
                  {bookings.filter(b => {
                    const slot = getBookingSlot(b.slotId);
                    return slot && new Date(slot.startIso) <= new Date();
                  }).length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      No past sessions yet.
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {bookings
                        .filter(b => {
                          const slot = getBookingSlot(b.slotId);
                          return slot && new Date(slot.startIso) <= new Date();
                        })
                        .map((b) => {
                          const slot = getBookingSlot(b.slotId)!;
                          const { date, time } = formatDateTime(slot.startIso);
                          return (
                            <div key={b.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
                              <div>
                                <div className="font-medium">{b.clientId}</div>
                                <div className="text-sm text-muted-foreground">{date} • {time}</div>
                              </div>
                              <div className="flex items-center gap-2">
                                <Badge variant={b.status === 'cancelled' ? 'secondary' : 'default'}>{b.status}</Badge>
                                <Button variant="outline" size="sm">View Feedback</Button>
                              </div>
                            </div>
                          );
                        })}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="profile">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="w-5 h-5" />
                    Profile Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center gap-4">
                    <img
                      src={mentor.avatar}
                      alt={mentor.name}
                      className="w-20 h-20 rounded-full object-cover"
                    />
                    <div>
                      <h3 className="text-lg font-semibold">{mentor.name}</h3>
                      <p className="text-muted-foreground">{mentor.title}</p>
                      {(mentor.status === 'pending' || mentor.status === 'pending_approval')
                        ? <Badge className="mt-1 bg-yellow-100 text-yellow-800 border border-yellow-300">⏳ Pending Approval</Badge>
                        : <Badge className="mt-1 bg-verified-green text-white">✓ Verified</Badge>
                      }
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium mb-2">Profile Information</h4>
                      <div className="space-y-2 text-sm">
                        <p><span className="font-medium">Name:</span> {mentor.name}</p>
                        <p><span className="font-medium">Title:</span> {mentor.title}</p>
                        <p><span className="font-medium">Company:</span> {mentor.company}</p>
                        <p><span className="font-medium">Experience:</span> {mentor.experience} years</p>
                        <p><span className="font-medium">Rating:</span> {mentor.rating}/5.0 ({mentor.reviews} reviews)</p>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">Specialties</h4>
                      <div className="flex flex-wrap gap-2">
                        {mentor.specialties.map((specialty) => (
                          <Badge key={specialty} variant="secondary">
                            {specialty}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  <Dialog open={editProfileOpen} onOpenChange={setEditProfileOpen}>
                    <DialogTrigger asChild>
                      <Button>Edit Profile Details</Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Edit Profile</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="name">Name</Label>
                          <Input
                            id="name"
                            value={profileData.name}
                            onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                          />
                        </div>
                        <div>
                          <Label htmlFor="title">Title</Label>
                          <Input
                            id="title"
                            value={profileData.title}
                            onChange={(e) => setProfileData({ ...profileData, title: e.target.value })}
                          />
                        </div>
                        <div>
                          <Label htmlFor="company">Company</Label>
                          <Input
                            id="company"
                            value={profileData.company}
                            onChange={(e) => setProfileData({ ...profileData, company: e.target.value })}
                          />
                        </div>
                        <Button onClick={handleSaveProfile} className="w-full">
                          Save Changes
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="availability" className="p-4">
              <h2 className="text-xl font-semibold mb-4">Availability Management</h2>
              {getCurrentMentorId() ? (
                <AvailabilityCalendar mentorId={getCurrentMentorId()} />
              ) : (
                <p className="text-sm text-muted-foreground">Loading mentor profile…</p>
              )}
            </TabsContent>

            <TabsContent value="pricing">
              <Card>
                <CardHeader>
                  <CardTitle>Pricing & Packages</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>Currency</Label>
                    <Input value={currency} onChange={e => setCurrency(e.target.value.toUpperCase())} placeholder="USD / INR" />
                  </div>
                  {([30,45,60] as const).map(mins => {
                    const pkg = packagesState.find(p => p.minutes === mins) ||
                      { id: `pkg-${mins}`, label: `${mins} min`, minutes: mins, price: 0, currency: currency as any, active: false };
                    return (
                      <div key={mins} className="grid md:grid-cols-3 gap-4 items-center">
                        <div className="text-sm font-medium">{mins} min</div>
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary">{pkg.active ? "Active" : "Inactive"}</Badge>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => togglePackageActive(mins as 30|45|60, !pkg.active)}
                          >
                            {pkg.active ? "Deactivate" : "Activate"}
                          </Button>
                        </div>
                        <div>
                          <Label>Price ({currency})</Label>
                          <Input
                            type="number"
                            min={0}
                            value={pkg.price}
                            onChange={e => setPackagePrice(mins as 30|45|60, parseFloat(e.target.value || "0"))}
                          />
                        </div>
                      </div>
                    );
                  })}
                  <div className="flex justify-end">
                    <Button onClick={savePricing}>Save Pricing</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="earnings">
              <Card>
                <CardHeader>
                  <CardTitle>Earnings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="p-4 rounded-lg border">
                      <div className="text-sm text-muted-foreground">Month to date</div>
                      <div className="text-2xl font-bold">${mtd}</div>
                    </div>
                    <div className="p-4 rounded-lg border">
                      <div className="text-sm text-muted-foreground">Lifetime</div>
                      <div className="text-2xl font-bold">${lifetime}</div>
                    </div>
                    <div className="p-4 rounded-lg border">
                      <div className="text-sm text-muted-foreground">Pending payouts</div>
                      <div className="text-2xl font-bold">${pending}</div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-3">Transactions</h4>
                    {tx.length === 0 ? (
                      <div className="text-sm text-muted-foreground">No transactions yet.</div>
                    ) : (
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="text-left text-muted-foreground border-b">
                              <th className="py-2 pr-2">Booking ID</th>
                              <th className="py-2 pr-2">Date</th>
                              <th className="py-2 pr-2">Client</th>
                              <th className="py-2 pr-2">Amount</th>
                              <th className="py-2 pr-2">Status</th>
                            </tr>
                          </thead>
                          <tbody>
                            {tx.map(row => (
                              <tr key={row.id} className="border-b last:border-0">
                                <td className="py-2 pr-2">{row.id}</td>
                                <td className="py-2 pr-2">{new Date(row.date).toLocaleString()}</td>
                                <td className="py-2 pr-2">{row.client}</td>
                                <td className="py-2 pr-2">${row.amount}</td>
                                <td className="py-2 pr-2">
                                  <Badge variant={row.status === "pending" ? "secondary" : "default"}>
                                    {row.status}
                                  </Badge>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default MentorDashboard;

