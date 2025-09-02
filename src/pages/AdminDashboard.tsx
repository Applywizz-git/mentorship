// import { useEffect, useState } from "react";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Users, Calendar, CheckCircle, Clock, Eye, Check, X } from "lucide-react";
// import { useNavigate } from "react-router-dom";
// import { getAdminStats, listMentors, listBookings, getCurrentUser } from "@/lib/data";
// import { AdminStats, Mentor, Booking } from "@/lib/types";
// import { toast } from "@/hooks/use-toast";

// const AdminDashboard = () => {
//   const navigate = useNavigate();
//   const user = getCurrentUser();
//   const [stats, setStats] = useState<AdminStats | null>(null);
//   const [mentors, setMentors] = useState<Mentor[]>([]);
//   const [bookings, setBookings] = useState<Booking[]>([]);

//   useEffect(() => {
//     if (!user || user.role !== 'admin') {
//       navigate('/login');
//       return;
//     }

//     setStats(getAdminStats());
//     setMentors(listMentors());
//     setBookings(listBookings());
//   }, [user, navigate]);

//   const handleApproveMentor = (mentorId: string) => {
//     // Update mentor status to approved in local state
//     setMentors(prevMentors => 
//       prevMentors.map(mentor => 
//         mentor.id === mentorId 
//           ? { ...mentor, status: 'approved' as any }
//           : mentor
//       )
//     );
//     toast({
//       title: "Mentor Approved",
//       description: "Mentor has been successfully approved.",
//     });
//   };

//   const handleRejectMentor = (mentorId: string) => {
//     // Update mentor status to rejected in local state
//     setMentors(prevMentors => 
//       prevMentors.map(mentor => 
//         mentor.id === mentorId 
//           ? { ...mentor, status: 'rejected' as any }
//           : mentor
//       )
//     );
//     toast({
//       title: "Mentor Rejected",
//       description: "Mentor application has been rejected.",
//     });
//   };

//   const handleViewMentor = (mentorId: string) => {
//     navigate(`/admin/mentors/${mentorId}`);
//   };

//   if (!user || user.role !== 'admin') {
//     return null;
//   }

//   return (
//     <div className="min-h-screen bg-background">
//       {/* Header */}
//       <header className="border-b border-border bg-white">
//         <div className="flex items-center justify-between px-6 py-4">
//           <h1 className="text-2xl font-bold">Admin Dashboard</h1>
//           <div className="flex items-center gap-4">
//             <span className="text-sm text-muted-foreground">Welcome back, {user.name}</span>
//             <Avatar>
//               <AvatarImage src={user.avatar} />
//               <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
//             </Avatar>
//           </div>
//         </div>
//       </header>

//       <div className="p-6">
//         {/* Stats Cards */}
//         {stats && (
//           <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
//             <Card>
//               <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//                 <CardTitle className="text-sm font-medium">Total Mentors</CardTitle>
//                 <Users className="h-4 w-4 text-muted-foreground" />
//               </CardHeader>
//               <CardContent>
//                 <div className="text-2xl font-bold">{stats.totalMentors}</div>
//               </CardContent>
//             </Card>

//             <Card>
//               <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//                 <CardTitle className="text-sm font-medium">Pending Mentors</CardTitle>
//                 <Clock className="h-4 w-4 text-muted-foreground" />
//               </CardHeader>
//               <CardContent>
//                 <div className="text-2xl font-bold">{stats.pendingMentors}</div>
//               </CardContent>
//             </Card>

//             <Card>
//               <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//                 <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
//                 <Calendar className="h-4 w-4 text-muted-foreground" />
//               </CardHeader>
//               <CardContent>
//                 <div className="text-2xl font-bold">{stats.totalBookings}</div>
//               </CardContent>
//             </Card>

//             <Card>
//               <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//                 <CardTitle className="text-sm font-medium">Upcoming Sessions</CardTitle>
//                 <CheckCircle className="h-4 w-4 text-muted-foreground" />
//               </CardHeader>
//               <CardContent>
//                 <div className="text-2xl font-bold">{stats.upcomingSessions}</div>
//               </CardContent>
//             </Card>
//           </div>
//         )}

//         {/* Main Content */}
//         <Tabs defaultValue="mentors" className="space-y-6">
//           <TabsList>
//             <TabsTrigger value="mentors">Mentors</TabsTrigger>
//             <TabsTrigger value="bookings">Bookings</TabsTrigger>
//             <TabsTrigger value="overview">Overview</TabsTrigger>
//           </TabsList>

//           <TabsContent value="mentors" className="space-y-6">
//             <div className="flex justify-between items-center">
//               <h2 className="text-xl font-semibold">Mentor Management</h2>
//               <Button onClick={() => navigate('/admin/onboarding')}>
//                 Add New Mentor
//               </Button>
//             </div>

//             <Tabs defaultValue="pending">
//               <TabsList>
//                 <TabsTrigger value="pending">Pending Applications</TabsTrigger>
//                 <TabsTrigger value="approved">Approved Mentors</TabsTrigger>
//               </TabsList>

//               <TabsContent value="pending">
//                 <Card>
//                   <CardHeader>
//                     <CardTitle>Pending Mentor Applications</CardTitle>
//                   </CardHeader>
//                   <CardContent>
//                     <Table>
//                       <TableHeader>
//                         <TableRow>
//                           <TableHead>Mentor</TableHead>
//                           <TableHead>Experience</TableHead>
//                           <TableHead>Specialties</TableHead>
//                           <TableHead>Status</TableHead>
//                           <TableHead>Actions</TableHead>
//                         </TableRow>
//                       </TableHeader>
//                       <TableBody>
//                         {mentors.slice(0, 2).map((mentor) => (
//                           <TableRow key={mentor.id}>
//                             <TableCell className="flex items-center gap-3">
//                               <Avatar>
//                                 <AvatarImage src={mentor.avatar} />
//                                 <AvatarFallback>{mentor.name.charAt(0)}</AvatarFallback>
//                               </Avatar>
//                               <div>
//                                 <div className="font-medium">{mentor.name}</div>
//                                 <div className="text-sm text-muted-foreground">{mentor.title}</div>
//                               </div>
//                             </TableCell>
//                             <TableCell>{mentor.experience} years</TableCell>
//                             <TableCell>
//                               <div className="flex flex-wrap gap-1">
//                                 {mentor.specialties.slice(0, 2).map((specialty) => (
//                                   <Badge key={specialty} variant="secondary" className="text-xs">
//                                     {specialty}
//                                   </Badge>
//                                 ))}
//                               </div>
//                             </TableCell>
//                             <TableCell>
//                               <Badge variant="outline" className="text-yellow-600">
//                                 Pending
//                               </Badge>
//                             </TableCell>
//                             <TableCell>
//                               <div className="flex gap-2">
//                                 <Button 
//                                   size="sm" 
//                                   variant="outline"
//                                   onClick={() => handleViewMentor(mentor.id)}
//                                 >
//                                   <Eye className="h-4 w-4" />
//                                 </Button>
//                                 <Button 
//                                   size="sm" 
//                                   onClick={() => handleApproveMentor(mentor.id)}
//                                   className="bg-green-600 hover:bg-green-700"
//                                 >
//                                   <Check className="h-4 w-4" />
//                                 </Button>
//                                 <Button 
//                                   size="sm" 
//                                   variant="destructive"
//                                   onClick={() => handleRejectMentor(mentor.id)}
//                                 >
//                                   <X className="h-4 w-4" />
//                                 </Button>
//                               </div>
//                             </TableCell>
//                           </TableRow>
//                         ))}
//                       </TableBody>
//                     </Table>
//                   </CardContent>
//                 </Card>
//               </TabsContent>

//               <TabsContent value="approved">
//                 <Card>
//                   <CardHeader>
//                     <CardTitle>Approved Mentors</CardTitle>
//                   </CardHeader>
//                   <CardContent>
//                     <Table>
//                       <TableHeader>
//                         <TableRow>
//                           <TableHead>Mentor</TableHead>
//                           <TableHead>Experience</TableHead>
//                           <TableHead>Rating</TableHead>
//                           <TableHead>Sessions</TableHead>
//                           <TableHead>Status</TableHead>
//                         </TableRow>
//                       </TableHeader>
//                       <TableBody>
//                         {mentors.map((mentor) => (
//                           <TableRow key={mentor.id}>
//                             <TableCell className="flex items-center gap-3">
//                               <Avatar>
//                                 <AvatarImage src={mentor.avatar} />
//                                 <AvatarFallback>{mentor.name.charAt(0)}</AvatarFallback>
//                               </Avatar>
//                               <div>
//                                 <div className="font-medium">{mentor.name}</div>
//                                 <div className="text-sm text-muted-foreground">{mentor.title}</div>
//                               </div>
//                             </TableCell>
//                             <TableCell>{mentor.experience} years</TableCell>
//                             <TableCell>
//                               <div className="flex items-center gap-1">
//                                 <span>⭐</span>
//                                 <span>{mentor.rating}</span>
//                                 <span className="text-muted-foreground">({mentor.reviews})</span>
//                               </div>
//                             </TableCell>
//                             <TableCell>{mentor.reviews}</TableCell>
//                             <TableCell>
//                               <Badge className="bg-green-100 text-green-800">
//                                 Active
//                               </Badge>
//                             </TableCell>
//                           </TableRow>
//                         ))}
//                       </TableBody>
//                     </Table>
//                   </CardContent>
//                 </Card>
//               </TabsContent>
//             </Tabs>
//           </TabsContent>

//           <TabsContent value="bookings">
//             <Card>
//               <CardHeader>
//                 <CardTitle>Booking Management</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <Table>
//                   <TableHeader>
//                     <TableRow>
//                       <TableHead>Booking ID</TableHead>
//                       <TableHead>Client</TableHead>
//                       <TableHead>Mentor</TableHead>
//                       <TableHead>Status</TableHead>
//                       <TableHead>Actions</TableHead>
//                     </TableRow>
//                   </TableHeader>
//                   <TableBody>
//                     {bookings.map((booking) => {
//                       const mentor = mentors.find(m => m.id === booking.mentorId);
//                       return (
//                         <TableRow key={booking.id}>
//                           <TableCell className="font-mono text-xs">{booking.id}</TableCell>
//                           <TableCell>{booking.menteeName}</TableCell>
//                           <TableCell>{mentor?.name || 'Unknown'}</TableCell>
//                           <TableCell>
//                             <Badge 
//                               className={
//                                 booking.status === 'confirmed' 
//                                   ? 'bg-green-100 text-green-800'
//                                   : booking.status === 'rescheduled'
//                                   ? 'bg-yellow-100 text-yellow-800'
//                                   : 'bg-gray-100 text-gray-800'
//                               }
//                             >
//                               {booking.status}
//                             </Badge>
//                           </TableCell>
//                           <TableCell>
//                             <Button size="sm" variant="outline">
//                               <Eye className="h-4 w-4" />
//                             </Button>
//                           </TableCell>
//                         </TableRow>
//                       );
//                     })}
//                   </TableBody>
//                 </Table>
//               </CardContent>
//             </Card>
//           </TabsContent>

//           <TabsContent value="overview">
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <Card>
//                 <CardHeader>
//                   <CardTitle>Recent Activity</CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="space-y-4">
//                     <div className="flex items-center gap-3">
//                       <div className="w-2 h-2 rounded-full bg-green-500" />
//                       <span className="text-sm">Sarah Chen approved as mentor</span>
//                       <span className="text-xs text-muted-foreground ml-auto">2h ago</span>
//                     </div>
//                     <div className="flex items-center gap-3">
//                       <div className="w-2 h-2 rounded-full bg-blue-500" />
//                       <span className="text-sm">New booking created</span>
//                       <span className="text-xs text-muted-foreground ml-auto">4h ago</span>
//                     </div>
//                     <div className="flex items-center gap-3">
//                       <div className="w-2 h-2 rounded-full bg-yellow-500" />
//                       <span className="text-sm">Mentor application submitted</span>
//                       <span className="text-xs text-muted-foreground ml-auto">6h ago</span>
//                     </div>
//                   </div>
//                 </CardContent>
//               </Card>

//               <Card>
//                 <CardHeader>
//                   <CardTitle>Platform Settings</CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="space-y-4">
//                     <div className="flex justify-between items-center">
//                       <span className="text-sm">Platform Name</span>
//                       <span className="text-sm font-medium">ApplyWizz</span>
//                     </div>
//                     <div className="flex justify-between items-center">
//                       <span className="text-sm">Support Email</span>
//                       <span className="text-sm font-medium">support@applywizz.com</span>
//                     </div>
//                     <div className="flex justify-between items-center">
//                       <span className="text-sm">Default Rate Range</span>
//                       <span className="text-sm font-medium">$100 - $300</span>
//                     </div>
//                   </div>
//                 </CardContent>
//               </Card>
//             </div>
//           </TabsContent>
//         </Tabs>
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;   

import { useEffect, useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Users, Calendar, CheckCircle, Clock, Eye, Check, X, User as UserIcon, KeyRound, LogOut, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  getAdminStats,
  listMentors,
  listBookings,
  getCurrentUser,
  logout,
  upsertMentorProfile,
  approveMentor,
  rejectMentor,
} from "@/lib/data";
import { AdminStats, Mentor, Booking } from "@/lib/types";
import { toast } from "@/hooks/use-toast";

// dropdown + dialog
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const user = getCurrentUser();
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [mentors, setMentors] = useState<Mentor[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);

  // Eye dialog state
  const [viewOpen, setViewOpen] = useState(false);
  const [viewMentor, setViewMentor] = useState<Mentor | null>(null);

  // Add-mentor dialog state
  const [addOpen, setAddOpen] = useState(false);
  const [addName, setAddName] = useState("");
  const [addTitle, setAddTitle] = useState("");
  const [addExperience, setAddExperience] = useState<number | string>("");
  const [addSpecialties, setAddSpecialties] = useState("");
  const [addAvatar, setAddAvatar] = useState("");

  useEffect(() => {
    if (!user || user.role !== "admin") {
      navigate("/login");
      return;
    }
    (async () => {
      try {
        const [s, ms, bs] = await Promise.all([
          getAdminStats(),
          listMentors(),
          listBookings(),
        ]);
        setStats(s);
        setMentors(ms);
        setBookings(bs);
      } catch (e: any) {
        toast({
          title: "Failed to load admin data",
          description: e?.message ?? "Please check your permissions and try again.",
          variant: "destructive",
        });
      }
    })();
  }, [user, navigate]);

  // Derived lists
  const pendingMentors = useMemo(
    () =>
      mentors.filter(
        (m: any) => (m as any).status === "pending" || (m as any).status === "pending_approval"
      ),
    [mentors]
  );

  const approvedMentors = useMemo(
    () =>
      mentors.filter(
        (m: any) =>
          (m as any).status === "approved" ||
          (m as any).status === "active" || // treat seed "active" as approved/active
          (m as any).verified === true
      ),
    [mentors]
  );

  const refresh = async () => {
    try {
      const [ms, s, bs] = await Promise.all([listMentors(), getAdminStats(), listBookings()]);
      setMentors(ms);
      setStats(s);
      setBookings(bs);
    } catch (e: any) {
      toast({
        title: "Refresh failed",
        description: e?.message ?? "Try again.",
        variant: "destructive",
      });
    }
  };

  const handleApproveMentor = async (mentorId: string) => {
    try {
      await approveMentor(mentorId);
      await refresh();
      toast({ title: "Mentor Approved", description: "Mentor has been successfully approved." });
    } catch (e: any) {
      toast({ title: "Approve failed", description: e?.message ?? "Please try again.", variant: "destructive" });
    }
  };

  const handleRejectMentor = async (mentorId: string) => {
    try {
      await rejectMentor(mentorId);
      await refresh();
      toast({ title: "Mentor Rejected", description: "Mentor application has been rejected." });
    } catch (e: any) {
      toast({ title: "Reject failed", description: e?.message ?? "Please try again.", variant: "destructive" });
    }
  };

  const handleViewMentor = (mentorId: string) => {
    const m = mentors.find((mt) => mt.id === mentorId) || null;
    setViewMentor(m);
    setViewOpen(true);
  };

  // ADD NEW MENTOR (creates a pending mentor locally and updates state so it appears)
  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const id = "m_" + Math.random().toString(36).slice(2, 10);
    const specialties = addSpecialties
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    const newMentor: Mentor = {
      id,
      name: addName.trim() || "New Mentor",
      title: addTitle.trim() || "Senior Specialist",
      company: "",
      avatar: addAvatar.trim(),
      verified: false,
      experience: Number(addExperience) || 0,
      price: 100,
      rating: 0,
      reviews: 0,
      specialties,
      availability: "medium" as any,
      timezone: "UTC",
      bio: "",
      headline: "",
      languages: ["English"],
      yearsOfExperience: Number(addExperience) || 0,
      packages: [
        { id: "pkg30", label: "30 min", minutes: 30, price: 50, currency: "USD", active: true } as any,
      ] as any,
      weeklySchedule: [] as any,
      bufferMinutes: 15 as any,
      timeOff: [] as any,
      status: "pending" as any, // <-- critical so it shows in Pending tab
      payoutConnected: false as any,
    };

    upsertMentorProfile(newMentor);
    // also update local state so it appears immediately
    setMentors((prev) => [newMentor, ...prev]);

    setAddOpen(false);
    setAddName("");
    setAddTitle("");
    setAddExperience("");
    setAddSpecialties("");
    setAddAvatar("");

    toast({ title: "Mentor Added", description: "Mentor submitted as pending." });
  };

  if (!user || user.role !== "admin") return null;

  // Booking status classes
  const statusClasses: Record<string, string> = {
    confirmed: "bg-green-100 text-green-800",
    completed: "bg-green-100 text-green-800",
    pending: "bg-yellow-100 text-yellow-800",
    rescheduled: "bg-yellow-100 text-yellow-800",
    cancelled: "bg-gray-100 text-gray-800",
    no_show: "bg-red-100 text-red-800",
    default: "bg-gray-100 text-gray-800",
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-white">
        <div className="flex items-center justify-between px-6 py-4">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">Welcome back, {user.name}</span>

            {/* Avatar dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger className="rounded-full focus:outline-none">
                <Avatar className="h-9 w-9">
                  <AvatarImage src={user.avatar} />
                  <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end" className="w-64">
                <DropdownMenuLabel className="space-y-0.5">
                  <div className="text-sm font-semibold leading-none">{user.name}</div>
                  <div className="text-xs text-muted-foreground truncate">{user.email}</div>
                </DropdownMenuLabel>

                <DropdownMenuSeparator />

                <DropdownMenuItem onClick={() => navigate("/admin/profile")}>
                  <UserIcon className="mr-2 h-4 w-4" />
                  Update Profile
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("/admin/password")}>
                  <KeyRound className="mr-2 h-4 w-4" />
                  Update Password
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                <DropdownMenuItem
                  onClick={() => {
                    logout();
                    navigate("/login");
                  }}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      <div className="p-6">
        {/* Stats Cards */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Mentors</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalMentors}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pending Mentors</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.pendingMentors}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalBookings}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Upcoming Sessions</CardTitle>
                <CheckCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.upcomingSessions}</div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Main Content */}
        <Tabs defaultValue="mentors" className="space-y-6">
          <TabsList>
            <TabsTrigger value="mentors">Mentors</TabsTrigger>
            <TabsTrigger value="bookings">Bookings</TabsTrigger>
            <TabsTrigger value="overview">Overview</TabsTrigger>
          </TabsList>

          {/* MENTORS TAB */}
          <TabsContent value="mentors" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Mentor Management</h2>
              <Button onClick={() => setAddOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Add New Mentor
              </Button>
            </div>

            <Tabs defaultValue="pending">
              <TabsList>
                <TabsTrigger value="pending">Pending Applications</TabsTrigger>
                <TabsTrigger value="approved">Approved Mentors</TabsTrigger>
              </TabsList>

              {/* PENDING */}
              <TabsContent value="pending">
                <Card>
                  <CardHeader>
                    <CardTitle>Pending Mentor Applications</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Mentor</TableHead>
                          <TableHead>Experience</TableHead>
                          <TableHead>Specialties</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {pendingMentors.length === 0 && (
                          <TableRow>
                            <TableCell colSpan={5} className="text-sm text-muted-foreground">
                              No pending applications.
                            </TableCell>
                          </TableRow>
                        )}
                        {pendingMentors.map((mentor: any) => (
                          <TableRow key={mentor.id}>
                            <TableCell className="flex items-center gap-3">
                              <Avatar>
                                <AvatarImage src={mentor.avatar} />
                                <AvatarFallback>{mentor.name.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="font-medium">{mentor.name}</div>
                                <div className="text-sm text-muted-foreground">{mentor.title}</div>
                              </div>
                            </TableCell>
                            <TableCell>{mentor.experience} years</TableCell>
                            <TableCell>
                              <div className="flex flex-wrap gap-1">
                                {(mentor.specialties || []).slice(0, 2).map((specialty: string) => (
                                  <Badge key={specialty} variant="secondary" className="text-xs">
                                    {specialty}
                                  </Badge>
                                ))}
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge variant="outline" className="text-yellow-600">
                                Pending
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <div className="flex gap-2">
                                <Button size="sm" variant="outline" onClick={() => handleViewMentor(mentor.id)}>
                                  <Eye className="h-4 w-4" />
                                </Button>
                                <Button
                                  size="sm"
                                  onClick={() => handleApproveMentor(mentor.id)}
                                  className="bg-green-600 hover:bg-green-700"
                                >
                                  <Check className="h-4 w-4" />
                                </Button>
                                <Button size="sm" variant="destructive" onClick={() => handleRejectMentor(mentor.id)}>
                                  <X className="h-4 w-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* APPROVED */}
              <TabsContent value="approved">
                <Card>
                  <CardHeader>
                    <CardTitle>Approved Mentors</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Mentor</TableHead>
                          <TableHead>Experience</TableHead>
                          <TableHead>Rating</TableHead>
                          <TableHead>Sessions</TableHead>
                          <TableHead>Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {approvedMentors.map((mentor: any) => (
                          <TableRow key={mentor.id}>
                            <TableCell className="flex items-center gap-3">
                              <Avatar>
                                <AvatarImage src={mentor.avatar} />
                                <AvatarFallback>{mentor.name.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="font-medium">{mentor.name}</div>
                                <div className="text-sm text-muted-foreground">{mentor.title}</div>
                              </div>
                            </TableCell>
                            <TableCell>{mentor.experience} years</TableCell>
                            <TableCell>
                              <div className="flex items-center gap-1">
                                <span>⭐</span>
                                <span>{mentor.rating ?? 0}</span>
                                <span className="text-muted-foreground">({mentor.reviews ?? 0})</span>
                              </div>
                            </TableCell>
                            <TableCell>{mentor.reviews ?? 0}</TableCell>
                            <TableCell>
                              <Badge className="bg-green-100 text-green-800">Active</Badge>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </TabsContent>

          {/* BOOKINGS TAB */}
          <TabsContent value="bookings">
            <Card>
              <CardHeader>
                <CardTitle>Booking Management</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Booking ID</TableHead>
                      <TableHead>Client</TableHead>
                      <TableHead>Mentor</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {bookings.map((booking) => {
                      const mentor = mentors.find((m) => m.id === booking.mentorId);
                      const cls = statusClasses[String((booking as any).status)] ?? statusClasses.default;
                      const clientLabel = (booking as any).menteeName ?? (booking as any).clientId ?? "Unknown";
                      return (
                        <TableRow key={booking.id}>
                          <TableCell className="font-mono text-xs">{booking.id}</TableCell>
                          <TableCell>{clientLabel}</TableCell>
                          <TableCell>{mentor?.name || "Unknown"}</TableCell>
                          <TableCell>
                            <Badge className={cls}>{(booking as any).status}</Badge>
                          </TableCell>
                          <TableCell>
                            <Button size="sm" variant="outline">
                              <Eye className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* OVERVIEW TAB */}
          <TabsContent value="overview">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-green-500" />
                      <span className="text-sm">Sarah Chen approved as mentor</span>
                      <span className="text-xs text-muted-foreground ml-auto">2h ago</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-blue-500" />
                      <span className="text-sm">New booking created</span>
                      <span className="text-xs text-muted-foreground ml-auto">4h ago</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-yellow-500" />
                      <span className="text-sm">Mentor application submitted</span>
                      <span className="text-xs text-muted-foreground ml-auto">6h ago</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Platform Settings</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Platform Name</span>
                      <span className="text-sm font-medium">ApplyWizz</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Support Email</span>
                      <span className="text-sm font-medium">support@applywizz.com</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Default Rate Range</span>
                      <span className="text-sm font-medium">$100 - $300</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Eye Dialog */}
      <Dialog open={viewOpen} onOpenChange={setViewOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Mentor Details</DialogTitle>
          </DialogHeader>

        {viewMentor && (
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-full overflow-hidden bg-gray-200">
                  {viewMentor.avatar ? (
                    <img src={viewMentor.avatar} alt={viewMentor.name} className="h-full w-full object-cover" />
                  ) : (
                    <div className="h-full w-full flex items-center justify-center text-sm font-medium">
                      {viewMentor.name?.[0] ?? "M"}
                    </div>
                  )}
                </div>
                <div>
                  <div className="font-semibold">{viewMentor.name}</div>
                  <div className="text-sm text-muted-foreground">{viewMentor.title}</div>
                  {viewMentor.company && (
                    <div className="text-xs text-muted-foreground">{viewMentor.company}</div>
                  )}
                </div>
              </div>

              <div className="text-sm">
                <span className="font-medium">Experience:</span> {viewMentor.experience} years
              </div>

              {Array.isArray(viewMentor.specialties) && viewMentor.specialties.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {viewMentor.specialties.slice(0, 6).map((s) => (
                    <span key={s} className="px-2 py-1 rounded-md bg-muted text-xs">
                      {s}
                    </span>
                  ))}
                </div>
              )}

              {viewMentor.bio && (
                <p className="text-sm text-muted-foreground leading-relaxed">{viewMentor.bio}</p>
              )}
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setViewOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add New Mentor Dialog */}
      <Dialog open={addOpen} onOpenChange={setAddOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Mentor (Pending)</DialogTitle>
          </DialogHeader>

          <form onSubmit={handleAddSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input id="name" value={addName} onChange={(e) => setAddName(e.target.value)} required />
              </div>
              <div>
                <Label htmlFor="title">Title</Label>
                <Input id="title" value={addTitle} onChange={(e) => setAddTitle(e.target.value)} required />
              </div>
              <div>
                <Label htmlFor="exp">Experience (years)</Label>
                <Input
                  id="exp"
                  type="number"
                  min={0}
                  value={addExperience}
                  onChange={(e) => setAddExperience(e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="specialties">Specialties (comma separated)</Label>
                <Input
                  id="specialties"
                  value={addSpecialties}
                  onChange={(e) => setAddSpecialties(e.target.value)}
                  placeholder="System Design, PM Interviews"
                />
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="avatar">Avatar URL (optional)</Label>
                <Input
                  id="avatar"
                  value={addAvatar}
                  onChange={(e) => setAddAvatar(e.target.value)}
                  placeholder="https://..."
                />
              </div>
            </div>

            <DialogFooter className="gap-2">
              <Button type="button" variant="outline" onClick={() => setAddOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">Add to Pending</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminDashboard;


