// import { useState, useEffect } from "react";
// import { useParams, useSearchParams, useNavigate } from "react-router-dom";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { Navbar } from "@/components/ui/navbar";
// import { BookingWidget } from "@/components/booking-widget";
// import { ArrowLeft, Building, MapPin, Star, Users, Calendar } from "lucide-react";
// import { getMentor } from "@/lib/data";
// import { Mentor } from "@/lib/types";

// const MentorProfile = () => {
//   const { id } = useParams<{ id: string }>();
//   const [searchParams] = useSearchParams();
//   const navigate = useNavigate();
//   const [mentor, setMentor] = useState<Mentor | null>(null);
//   const defaultTab = searchParams.get('tab') || 'overview';

//   useEffect(() => {
//   if (!id) return;
//   let mounted = true;
//   (async () => {
//     try {
//       const mentorData = await getMentor(id);   // <-- await
//       if (mounted) setMentor(mentorData || null);
//     } catch (e) {
//       console.error("Failed to load mentor", e);
//       if (mounted) setMentor(null);
//     }
//   })();
//   return () => { mounted = false; };
// }, [id]);


//   if (!mentor) {
//     return (
//       <div className="min-h-screen bg-background">
//         <Navbar />
//         <div className="px-6 py-8">
//           <div className="max-w-4xl mx-auto text-center">
//             <h1 className="text-2xl font-bold text-foreground mb-4">Mentor not found</h1>
//             <Button onClick={() => navigate('/mentors')}>
//               Back to Mentors
//             </Button>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   const demoReviews = [
//     {
//       id: 1,
//       name: "Sarah Johnson",
//       rating: 5,
//       date: "2 weeks ago",
//       comment: "Excellent session! Really helped me prepare for my product manager interviews. The insights were spot-on."
//     },
//     {
//       id: 2,
//       name: "Mike Chen",
//       rating: 5,
//       date: "1 month ago", 
//       comment: "Great mentor with deep industry knowledge. Provided actionable feedback on my career strategy."
//     },
//     {
//       id: 3,
//       name: "Emma Wilson",
//       rating: 4,
//       date: "2 months ago",
//       comment: "Very helpful session. Got valuable advice on transitioning to a senior role. Would recommend!"
//     }
//   ];

//   return (
//     <div className="min-h-screen bg-background">
//       <Navbar />
      
//       <div className="px-6 py-8">
//         <div className="max-w-4xl mx-auto">
//           {/* Back Button */}
//           <Button 
//             variant="ghost" 
//             onClick={() => navigate('/mentors')}
//             className="mb-6 p-0 h-auto"
//           >
//             <ArrowLeft className="w-4 h-4 mr-2" />
//             Back to Mentors
//           </Button>

//           {/* Profile Header */}
//           <Card className="mb-8 shadow-card">
//             <CardContent className="p-8">
//               <div className="flex flex-col md:flex-row gap-6">
//                 <div className="relative">
//                   <img
//                     src={mentor.avatar}
//                     alt={mentor.name}
//                     className="w-32 h-32 rounded-full object-cover"
//                   />
//                   {mentor.verified && (
//                     <div className="absolute -bottom-2 -right-2 bg-verified-green text-white text-sm px-3 py-1 rounded-full font-medium">
//                       ✓ Verified
//                     </div>
//                   )}
//                 </div>
                
//                 <div className="flex-1">
//                   <h1 className="text-3xl font-bold text-foreground mb-2">{mentor.name}</h1>
//                   <p className="text-xl text-muted-foreground mb-3">{mentor.title}</p>
                  
//                   <div className="flex items-center gap-4 mb-4 text-muted-foreground">
//                     <div className="flex items-center gap-1">
//                       <Building className="w-4 h-4" />
//                       <span>{mentor.company}</span>
//                     </div>
//                     <div className="flex items-center gap-1">
//                       <Calendar className="w-4 h-4" />
//                       <span>{mentor.experience} years experience</span>
//                     </div>
//                     <div className="flex items-center gap-1">
//                       <MapPin className="w-4 h-4" />
//                       <span>{mentor.timezone}</span>
//                     </div>
//                   </div>
                  
//                   <div className="flex items-center gap-4 mb-4">
//                     <div className="flex items-center gap-1">
//                       <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
//                       <span className="font-semibold">{mentor.rating}</span>
//                       <span className="text-muted-foreground">({mentor.reviews} reviews)</span>
//                     </div>
//                     <div className="flex items-center gap-1">
//                       <Users className="w-4 h-4" />
//                       <span className="text-muted-foreground">500+ sessions</span>
//                     </div>
//                   </div>
                  
//                   <div className="flex flex-wrap gap-2">
//                     {mentor.specialties.map((specialty) => (
//                       <Badge key={specialty} variant="secondary">
//                         {specialty}
//                       </Badge>
//                     ))}
//                   </div>
//                 </div>
                
//                 <div className="text-right">
//                   <div className="text-3xl font-bold text-foreground mb-1">${mentor.price}</div>
//                   <div className="text-muted-foreground">per session</div>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>

//           {/* Tabs */}
//           <Tabs defaultValue={defaultTab} className="space-y-6">
//             <TabsList className="grid w-full grid-cols-3">
//               <TabsTrigger value="overview">Overview</TabsTrigger>
//               <TabsTrigger value="reviews">Reviews</TabsTrigger>
//               <TabsTrigger value="availability">Book Session</TabsTrigger>
//             </TabsList>
            
//             <TabsContent value="overview">
//               <Card>
//                 <CardContent className="p-8">
//                   <h3 className="text-xl font-semibold mb-4">About {mentor.name}</h3>
//                   <p className="text-muted-foreground leading-relaxed mb-6">
//                     {mentor.bio}
//                   </p>
                  
//                   <div className="grid md:grid-cols-2 gap-6">
//                     <div>
//                       <h4 className="font-semibold mb-3">Expertise Areas</h4>
//                       <div className="space-y-2">
//                         {mentor.specialties.map((specialty) => (
//                           <div key={specialty} className="flex items-center gap-2">
//                             <div className="w-2 h-2 bg-primary rounded-full" />
//                             <span>{specialty}</span>
//                           </div>
//                         ))}
//                       </div>
//                     </div>
                    
//                     <div>
//                       <h4 className="font-semibold mb-3">Background</h4>
//                       <div className="space-y-2">
//                         <div className="flex items-center gap-2">
//                           <Building className="w-4 h-4 text-muted-foreground" />
//                           <span>{mentor.title} at {mentor.company}</span>
//                         </div>
//                         <div className="flex items-center gap-2">
//                           <Calendar className="w-4 h-4 text-muted-foreground" />
//                           <span>{mentor.experience}+ years experience</span>
//                         </div>
//                         <div className="flex items-center gap-2">
//                           <Star className="w-4 h-4 text-muted-foreground" />
//                           <span>{mentor.rating}/5.0 rating ({mentor.reviews} reviews)</span>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </CardContent>
//               </Card>
//             </TabsContent>
            
//             <TabsContent value="reviews">
//               <Card>
//                 <CardContent className="p-8">
//                   <div className="flex items-center justify-between mb-6">
//                     <h3 className="text-xl font-semibold">Reviews</h3>
//                     <div className="flex items-center gap-2">
//                       <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
//                       <span className="font-semibold">{mentor.rating}</span>
//                       <span className="text-muted-foreground">({mentor.reviews} reviews)</span>
//                     </div>
//                   </div>
                  
//                   <div className="space-y-6">
//                     {demoReviews.map((review) => (
//                       <div key={review.id} className="border-b border-border pb-6 last:border-b-0">
//                         <div className="flex items-center justify-between mb-2">
//                           <div className="flex items-center gap-2">
//                             <span className="font-medium">{review.name}</span>
//                             <div className="flex">
//                               {[...Array(review.rating)].map((_, i) => (
//                                 <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
//                               ))}
//                             </div>
//                           </div>
//                           <span className="text-sm text-muted-foreground">{review.date}</span>
//                         </div>
//                         <p className="text-muted-foreground">{review.comment}</p>
//                       </div>
//                     ))}
//                   </div>
//                 </CardContent>
//               </Card>
//             </TabsContent>
            
//             <TabsContent value="availability">
//               <BookingWidget mentor={mentor} />
//             </TabsContent>
//           </Tabs>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MentorProfile;


import { useState, useEffect } from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Navbar } from "@/components/ui/navbar";
import { BookingWidget } from "@/components/booking-widget";
import { ArrowLeft, Building, MapPin, Star, Users, Calendar } from "lucide-react";
import { getMentor } from "@/lib/data";
import { Mentor } from "@/lib/types";

const MentorProfile = () => {
  const { id } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [mentor, setMentor] = useState<Mentor | null>(null);
  const defaultTab = searchParams.get('tab') || 'overview';

  useEffect(() => {
    if (!id) return;
    let mounted = true;
    (async () => {
      try {
        const mentorData = await getMentor(id);   // <-- Supabase-backed
        if (mounted) setMentor(mentorData || null);
      } catch (e) {
        console.error("Failed to load mentor", e);
        if (mounted) setMentor(null);
      }
    })();
    return () => { mounted = false; };
  }, [id]);

  if (!mentor) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="px-6 py-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-2xl font-bold text-foreground mb-4">Mentor not found</h1>
            <Button onClick={() => navigate('/mentors')}>
              Back to Mentors
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const demoReviews = [
    {
      id: 1,
      name: "Sarah Johnson",
      rating: 5,
      date: "2 weeks ago",
      comment: "Excellent session! Really helped me prepare for my product manager interviews. The insights were spot-on."
    },
    {
      id: 2,
      name: "Mike Chen",
      rating: 5,
      date: "1 month ago", 
      comment: "Great mentor with deep industry knowledge. Provided actionable feedback on my career strategy."
    },
    {
      id: 3,
      name: "Emma Wilson",
      rating: 4,
      date: "2 months ago",
      comment: "Very helpful session. Got valuable advice on transitioning to a senior role. Would recommend!"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="px-6 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <Button 
            variant="ghost" 
            onClick={() => navigate('/mentors')}
            className="mb-6 p-0 h-auto"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Mentors
          </Button>

          {/* Profile Header */}
          <Card className="mb-8 shadow-card">
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="relative">
                  <img
                    src={mentor.avatar}
                    alt={mentor.name}
                    className="w-32 h-32 rounded-full object-cover"
                  />
                  {mentor.verified && (
                    <div className="absolute -bottom-2 -right-2 bg-verified-green text-white text-sm px-3 py-1 rounded-full font-medium">
                      ✓ Verified
                    </div>
                  )}
                </div>
                
                <div className="flex-1">
                  <h1 className="text-3xl font-bold text-foreground mb-2">{mentor.name}</h1>
                  <p className="text-xl text-muted-foreground mb-3">{mentor.title}</p>
                  
                  <div className="flex items-center gap-4 mb-4 text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Building className="w-4 h-4" />
                      <span>{mentor.company}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>{mentor.experience} years experience</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      <span>{mentor.timezone}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex items-center gap-1">
                      <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      <span className="font-semibold">{mentor.rating}</span>
                      <span className="text-muted-foreground">({mentor.reviews} reviews)</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      <span className="text-muted-foreground">500+ sessions</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {mentor.specialties.map((specialty) => (
                      <Badge key={specialty} variant="secondary">
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="text-3xl font-bold text-foreground mb-1">${mentor.price}</div>
                  <div className="text-muted-foreground">per session</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tabs */}
          <Tabs defaultValue={defaultTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
              <TabsTrigger value="availability">Book Session</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview">
              <Card>
                <CardContent className="p-8">
                  <h3 className="text-xl font-semibold mb-4">About {mentor.name}</h3>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    {mentor.bio}
                  </p>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold mb-3">Expertise Areas</h4>
                      <div className="space-y-2">
                        {mentor.specialties.map((specialty) => (
                          <div key={specialty} className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-primary rounded-full" />
                            <span>{specialty}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold mb-3">Background</h4>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Building className="w-4 h-4 text-muted-foreground" />
                          <span>{mentor.title} at {mentor.company}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-muted-foreground" />
                          <span>{mentor.experience}+ years experience</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Star className="w-4 h-4 text-muted-foreground" />
                          <span>{mentor.rating}/5.0 rating ({mentor.reviews} reviews)</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="reviews">
              <Card>
                <CardContent className="p-8">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-semibold">Reviews</h3>
                    <div className="flex items-center gap-2">
                      <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      <span className="font-semibold">{mentor.rating}</span>
                      <span className="text-muted-foreground">({mentor.reviews} reviews)</span>
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    {demoReviews.map((review) => (
                      <div key={review.id} className="border-b border-border pb-6 last:border-b-0">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{review.name}</span>
                            <div className="flex">
                              {[...Array(review.rating)].map((_, i) => (
                                <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                              ))}
                            </div>
                          </div>
                          <span className="text-sm text-muted-foreground">{review.date}</span>
                        </div>
                        <p className="text-muted-foreground">{review.comment}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="availability">
              <BookingWidget mentor={mentor} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default MentorProfile;
