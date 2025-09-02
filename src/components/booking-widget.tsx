// import { useState, useEffect } from "react";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { BookingConfirmation } from "@/components/ui/booking-confirmation";
// import { Clock } from "lucide-react";
// import { format, addDays, startOfDay } from "date-fns";
// import { listSlotsForMentor, bookSlot, getCurrentUser } from "@/lib/data";
// import { TimeSlot, Mentor } from "@/lib/types";
// import { toast } from "@/hooks/use-toast";
// import { useNavigate } from "react-router-dom";

// interface BookingWidgetProps {
//   mentor: Mentor;
// }
// const user = getCurrentUser();
// if (!user || user.id === 'anon') {
//   // redirect to login
// }


// export const BookingWidget = ({ mentor }: BookingWidgetProps) => {
//   const navigate = useNavigate();
//   const [selectedDate, setSelectedDate] = useState<Date>(new Date());
//   const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);
//   const [slots, setSlots] = useState<TimeSlot[]>([]);
//   const [showConfirmation, setShowConfirmation] = useState(false);
//   const [confirmedBooking, setConfirmedBooking] = useState<{ id: string; slot: TimeSlot } | null>(null);

//   useEffect(() => {
//     const mentorSlots = listSlotsForMentor(mentor.id);
//     setSlots(mentorSlots);
//   }, [mentor.id]);

//   const getAvailableDates = () => {
//     const dates = new Set<string>();
//     slots.forEach(slot => {
//       if (slot.available) {
//         dates.add(new Date(slot.startIso).toISOString().split('T')[0]);
//       }
//     });
//     return Array.from(dates).sort();
//   };

//   const getSlotsForDate = (date: string) => {
//     return slots.filter(slot => {
//       const slotDate = new Date(slot.startIso).toISOString().split('T')[0];
//       return slotDate === date && slot.available;
//     }).sort((a, b) => new Date(a.startIso).getTime() - new Date(b.startIso).getTime());
//   };

//   const formatTime = (isoString: string) => {
//     return new Date(isoString).toLocaleTimeString('en-US', {
//       hour: 'numeric',
//       minute: '2-digit',
//       hour12: true
//     });
//   };

//   const formatDate = (dateString: string) => {
//     const date = new Date(dateString);
//     const today = new Date();
//     const tomorrow = new Date(today);
//     tomorrow.setDate(tomorrow.getDate() + 1);
    
//     if (date.toDateString() === today.toDateString()) {
//       return "Today";
//     } else if (date.toDateString() === tomorrow.toDateString()) {
//       return "Tomorrow";
//     }
    
//     return date.toLocaleDateString('en-US', { 
//       weekday: 'short', 
//       month: 'short', 
//       day: 'numeric' 
//     });
//   };

//   const handleBooking = () => {
//     if (!selectedSlot) return;
    
//     // Check if user is authenticated
//     if (!isAuthenticated()) {
//       navigate('/login', { 
//         state: { from: { pathname: `/mentor/${mentor.id}?tab=availability` } }
//       });
//       return;
//     }
    
//     const booking = bookSlot(
//       mentor.id,
//       selectedSlot.id,
//       "Alex Johnson", // Demo user
//       "alex@example.com"
//     );
    
//     if (booking) {
//       setConfirmedBooking({ id: booking.id, slot: selectedSlot });
//       setShowConfirmation(true);
      
//       // Refresh slots
//       const updatedSlots = listSlotsForMentor(mentor.id);
//       setSlots(updatedSlots);
//       setSelectedSlot(null);
//     } else {
//       toast({
//         title: "Booking Failed",
//         description: "The selected time slot is no longer available.",
//         variant: "destructive",
//       });
//     }
//   };

//   // Generate date options (next 5 days)
//   const dateOptions = [];
//   for (let i = 0; i < 5; i++) {
//     const date = addDays(new Date(), i);
//     dateOptions.push(date);
//   }

//   // Get slots for selected date
//   const selectedDateSlots = slots.filter(slot => {
//     const slotDate = startOfDay(new Date(slot.startIso));
//     return slotDate.getTime() === startOfDay(selectedDate).getTime() && slot.available;
//   }).sort((a, b) => new Date(a.startIso).getTime() - new Date(b.startIso).getTime());

//   return (
//     <Card>
//       <CardHeader>
//         <CardTitle className="flex items-center gap-2">
//           <Clock className="w-5 h-5" />
//           Book a Session
//         </CardTitle>
//       </CardHeader>
//       <CardContent className="space-y-6">
//         {/* Date Selection */}
//         <div>
//           <h4 className="font-medium mb-3">Select Date</h4>
//           <div className="flex flex-wrap gap-2">
//             {dateOptions.map((date) => {
//               const isToday = format(date, 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd');
//               const isTomorrow = format(date, 'yyyy-MM-dd') === format(addDays(new Date(), 1), 'yyyy-MM-dd');
              
//               let label = format(date, 'EEE, MMM d');
//               if (isToday) label = "Today";
//               else if (isTomorrow) label = "Tomorrow";
              
//               return (
//                 <Button
//                   key={date.toISOString()}
//                   variant={format(selectedDate, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd') ? "default" : "outline"}
//                   size="sm"
//                   onClick={() => {
//                     setSelectedDate(date);
//                     setSelectedSlot(null);
//                   }}
//                   className={isToday || isTomorrow ? "bg-blue-50 text-blue-600 hover:bg-blue-100" : ""}
//                 >
//                   {label}
//                 </Button>
//               );
//             })}
//           </div>
//         </div>

//         {/* Time Selection */}
//         <div>
//           <h4 className="font-medium mb-3">Available Times</h4>
//           <div className="grid grid-cols-2 gap-2">
//             {selectedDateSlots.map((slot) => (
//               <Button
//                 key={slot.id}
//                 variant={selectedSlot?.id === slot.id ? "default" : "outline"}
//                 size="sm"
//                 onClick={() => setSelectedSlot(slot)}
//                 className="justify-start"
//               >
//                 <Clock className="w-4 h-4 mr-2" />
//                 {format(new Date(slot.startIso), 'h:mm a')}
//               </Button>
//             ))}
//           </div>
          
//           {selectedDateSlots.length === 0 && (
//             <p className="text-muted-foreground text-sm">No available slots for this date</p>
//           )}
//         </div>

//         {/* Confirm Button */}
//         <Button
//           className="w-full"
//           onClick={handleBooking}
//           disabled={!selectedSlot}
//           size="lg"
//         >
//           Confirm Booking
//         </Button>
//       </CardContent>
      
//       {/* Booking Confirmation Modal */}
//       {confirmedBooking && (
//         <BookingConfirmation
//           open={showConfirmation}
//           onOpenChange={(open) => {
//             setShowConfirmation(open);
//             if (!open) {
//               navigate('/mentors');
//             }
//           }}
//           mentor={mentor}
//           slot={confirmedBooking.slot}
//           bookingId={confirmedBooking.id}
//         />
//       )}
//     </Card>
//   );
// };


import { useState, useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookingConfirmation } from "@/components/ui/booking-confirmation";
import { Clock } from "lucide-react";
import { format, addDays } from "date-fns";
import { listSlotsForMentor, bookSlot, getCurrentUser } from "@/lib/data";
import { TimeSlot, Mentor } from "@/lib/types";
import { toast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

interface BookingWidgetProps {
  mentor: Mentor;
}

export const BookingWidget = ({ mentor }: BookingWidgetProps) => {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);
  const [slots, setSlots] = useState<TimeSlot[]>([]);
  const [loadingSlots, setLoadingSlots] = useState<boolean>(false);
  const [bookingBusy, setBookingBusy] = useState<boolean>(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [confirmedBooking, setConfirmedBooking] = useState<{ id: string; slot: TimeSlot } | null>(null);

  // Load slots (async)
  useEffect(() => {
    let mounted = true;
    (async () => {
      setLoadingSlots(true);
      try {
        const mentorSlots = await listSlotsForMentor(mentor.id);
        if (mounted) setSlots(mentorSlots);
      } catch (err: any) {
        toast({
          title: "Failed to load slots",
          description: err?.message ?? "Please try again later.",
          variant: "destructive",
        });
      } finally {
        if (mounted) setLoadingSlots(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, [mentor.id]);

  // Build the next 7 days as options, but disable days that have no slots
  const dateOptions = useMemo(() => {
    const days: { date: Date; hasSlots: boolean; label: string }[] = [];
    const today = new Date();

    // Precompute a set of yyyy-MM-dd that have at least one future available slot
    const availableDateStrs = new Set<string>();
    for (const s of slots) {
      if (!s.available) continue;
      const start = new Date(s.startIso);
      if (start.getTime() <= Date.now()) continue; // only future times
      const key = format(start, "yyyy-MM-dd");
      availableDateStrs.add(key);
    }

    for (let i = 0; i < 7; i++) {
      const date = addDays(today, i);
      const key = format(date, "yyyy-MM-dd");
      const isToday = format(date, "yyyy-MM-dd") === format(today, "yyyy-MM-dd");
      const isTomorrow = format(date, "yyyy-MM-dd") === format(addDays(today, 1), "yyyy-MM-dd");
      let label = format(date, "EEE, MMM d");
      if (isToday) label = "Today";
      else if (isTomorrow) label = "Tomorrow";

      days.push({
        date,
        hasSlots: availableDateStrs.has(key),
        label,
      });
    }
    return days;
  }, [slots]);

  // Slots for the selected date (only future, available)
  const selectedDateSlots = useMemo(() => {
    const selectedKey = format(selectedDate, "yyyy-MM-dd");
    return slots
      .filter((slot) => {
        if (!slot.available) return false;
        const slotDate = new Date(slot.startIso);
        if (slotDate.getTime() <= Date.now()) return false; // omit past times
        return format(slotDate, "yyyy-MM-dd") === selectedKey;
      })
      .sort((a, b) => new Date(a.startIso).getTime() - new Date(b.startIso).getTime());
  }, [slots, selectedDate]);

  // Make booking (async + auth check)
  const handleBooking = async () => {
    if (!selectedSlot) return;

    const user = getCurrentUser();
    if (!user || user.id === "anon") {
      // not logged in → go to login, then come back to this mentor
      navigate("/login", {
        state: { from: { pathname: `/mentor/${mentor.id}?tab=availability` } },
      });
      return;
    }

    setBookingBusy(true);
    try {
      // legacy signature kept: (mentorId, slotId, clientName, clientEmail)
      const clientName = user.name ?? "Client";
      const clientEmail = user.email ?? "client@example.com";

      const booking = await bookSlot(mentor.id, selectedSlot.id, clientName, clientEmail);

      if (!booking) {
        throw new Error("The selected time slot is no longer available.");
      }

      setConfirmedBooking({ id: booking.id, slot: selectedSlot });
      setShowConfirmation(true);

      // Refresh slots after a successful booking
      const updated = await listSlotsForMentor(mentor.id);
      setSlots(updated);
      setSelectedSlot(null);
    } catch (err: any) {
      toast({
        title: "Booking Failed",
        description: err?.message ?? "Please try again.",
        variant: "destructive",
      });
    } finally {
      setBookingBusy(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="w-5 h-5" />
          Book a Session
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Date Selection */}
        <div>
          <h4 className="font-medium mb-3">Select Date</h4>
          <div className="flex flex-wrap gap-2">
            {dateOptions.map(({ date, hasSlots, label }) => {
              const isSelected = format(selectedDate, "yyyy-MM-dd") === format(date, "yyyy-MM-dd");
              return (
                <Button
                  key={date.toISOString()}
                  variant={isSelected ? "default" : "outline"}
                  size="sm"
                  disabled={!hasSlots || loadingSlots}
                  onClick={() => {
                    setSelectedDate(date);
                    setSelectedSlot(null);
                  }}
                  className={!hasSlots ? "opacity-60 cursor-not-allowed" : ""}
                >
                  {label}
                </Button>
              );
            })}
          </div>
        </div>

        {/* Time Selection */}
        <div>
          <h4 className="font-medium mb-3">Available Times</h4>

          {loadingSlots ? (
            <p className="text-muted-foreground text-sm">Loading slots…</p>
          ) : (
            <>
              <div className="grid grid-cols-2 gap-2">
                {selectedDateSlots.map((slot) => (
                  <Button
                    key={slot.id}
                    variant={selectedSlot?.id === slot.id ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedSlot(slot)}
                    className="justify-start"
                  >
                    <Clock className="w-4 h-4 mr-2" />
                    {format(new Date(slot.startIso), "h:mm a")}
                  </Button>
                ))}
              </div>

              {selectedDateSlots.length === 0 && (
                <p className="text-muted-foreground text-sm">No available slots for this date</p>
              )}
            </>
          )}
        </div>

        {/* Confirm Button */}
        <Button
          className="w-full"
          onClick={handleBooking}
          disabled={!selectedSlot || bookingBusy}
          size="lg"
        >
          {bookingBusy ? "Booking…" : "Confirm Booking"}
        </Button>
      </CardContent>

      {/* Booking Confirmation Modal */}
      {confirmedBooking && (
        <BookingConfirmation
          open={showConfirmation}
          onOpenChange={(open) => {
            setShowConfirmation(open);
            if (!open) {
              navigate("/mentors");
            }
          }}
          mentor={mentor}
          slot={confirmedBooking.slot}
          bookingId={confirmedBooking.id}
        />
      )}
    </Card>
  );
};

