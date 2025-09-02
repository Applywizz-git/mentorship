// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { Progress } from "@/components/ui/progress";
// import { ArrowLeft, CheckCircle, FileText, Upload } from "lucide-react";
// import { useNavigate } from "react-router-dom";
// import { useToast } from "@/hooks/use-toast";
// import logo from "@/assets/applywizz-logo.png";

// const BecomeAMentor = () => {
//   const navigate = useNavigate();
//   const { toast } = useToast();
//   const [currentStep, setCurrentStep] = useState(1);
//   const [formData, setFormData] = useState({
//     currentTitle: "",
//     company: "",
//     yearsExperience: "",
//     linkedinProfile: "",
//     motivation: "",
//     hourlyRate: "",
//     weeklyAvailability: ""
//   });

//   const totalSteps = 3;
//   const progress = (currentStep / totalSteps) * 100;

//   const handleInputChange = (field: string, value: string) => {
//     setFormData(prev => ({ ...prev, [field]: value }));
//   };

//   const handleNext = () => {
//     if (currentStep < totalSteps) {
//       setCurrentStep(prev => prev + 1);
//     }
//   };

//   const handlePrevious = () => {
//     if (currentStep > 1) {
//       setCurrentStep(prev => prev - 1);
//     }
//   };

//   const [submitted, setSubmitted] = useState(false);

//   const handleSubmit = () => {
//     setSubmitted(true);
//     toast({
//       title: "Application Submitted!",
//       description: "Your mentor application has been submitted successfully. We'll review it within 2-3 business days.",
//     });
//   };

//   const renderStep1 = () => (
//     <Card className="max-w-4xl mx-auto">
//       <CardContent className="p-8">
//         <h2 className="text-2xl font-bold mb-2 text-foreground">Professional Information</h2>
//         <p className="text-muted-foreground mb-8">Tell us about your current role and experience</p>
        
//         <div className="grid md:grid-cols-2 gap-6">
//           <div>
//             <label className="block text-sm font-medium mb-2 text-foreground">Current Title</label>
//             <Input
//               placeholder="e.g. Senior Product Manager"
//               value={formData.currentTitle}
//               onChange={(e) => handleInputChange('currentTitle', e.target.value)}
//             />
//           </div>
          
//           <div>
//             <label className="block text-sm font-medium mb-2 text-foreground">Company</label>
//             <Input
//               placeholder="e.g. Meta, Google, Apple"
//               value={formData.company}
//               onChange={(e) => handleInputChange('company', e.target.value)}
//             />
//           </div>
          
//           <div>
//             <label className="block text-sm font-medium mb-2 text-foreground">Years of Experience</label>
//             <Input
//               placeholder="e.g. 8"
//               value={formData.yearsExperience}
//               onChange={(e) => handleInputChange('yearsExperience', e.target.value)}
//             />
//           </div>
          
//           <div>
//             <label className="block text-sm font-medium mb-2 text-foreground">LinkedIn Profile</label>
//             <Input
//               placeholder="https://linkedin.com/in/yourprofile"
//               value={formData.linkedinProfile}
//               onChange={(e) => handleInputChange('linkedinProfile', e.target.value)}
//             />
//           </div>
//         </div>
//       </CardContent>
//     </Card>
//   );

//   const renderStep2 = () => (
//     <Card className="max-w-4xl mx-auto">
//       <CardContent className="p-8">
//         <h2 className="text-2xl font-bold mb-2 text-foreground">Verification Documents</h2>
//         <p className="text-muted-foreground mb-8">Upload documents to verify your professional background</p>
        
//         <div className="space-y-6">
//           <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
//             <FileText className="w-12 h-12 text-trust-badge mx-auto mb-4" />
//             <h3 className="text-lg font-medium mb-2 text-foreground">Resume/CV</h3>
//             <p className="text-muted-foreground mb-4">Upload your current resume (PDF format preferred)</p>
//             <Button variant="outline" className="flex items-center gap-2">
//               <Upload className="w-4 h-4" />
//               Upload Resume
//             </Button>
//           </div>
          
//           <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
//             <div className="w-12 h-12 bg-verified-green/20 text-verified-green rounded-lg flex items-center justify-center mx-auto mb-4">
//               <FileText className="w-6 h-6" />
//             </div>
//             <h3 className="text-lg font-medium mb-2 text-foreground">Employment Verification</h3>
//             <p className="text-muted-foreground mb-4">Company ID badge, offer letter, or employment verification</p>
//             <Button variant="outline" className="flex items-center gap-2">
//               <Upload className="w-4 h-4" />
//               Upload Proof
//             </Button>
//           </div>
//         </div>
//       </CardContent>
//     </Card>
//   );

//   const renderStep3 = () => (
//     <Card className="max-w-4xl mx-auto">
//       <CardContent className="p-8">
//         <h2 className="text-2xl font-bold mb-2 text-foreground">Mentoring Details</h2>
//         <p className="text-muted-foreground mb-8">Share why you want to mentor and your areas of expertise</p>
        
//         <div className="space-y-6">
//           <div>
//             <label className="block text-sm font-medium mb-2 text-foreground">Why do you want to mentor?</label>
//             <Textarea
//               placeholder="Share your motivation for mentoring and what you hope to achieve..."
//               className="min-h-32"
//               value={formData.motivation}
//               onChange={(e) => handleInputChange('motivation', e.target.value)}
//             />
//           </div>
          
//           <div className="grid md:grid-cols-2 gap-6">
//             <div>
//               <label className="block text-sm font-medium mb-2 text-foreground">Hourly Rate (USD)</label>
//               <Input
//                 placeholder="e.g. 150"
//                 value={formData.hourlyRate}
//                 onChange={(e) => handleInputChange('hourlyRate', e.target.value)}
//               />
//             </div>
            
//             <div>
//               <label className="block text-sm font-medium mb-2 text-foreground">Weekly Availability (hours)</label>
//               <Input
//                 placeholder="e.g. 5"
//                 value={formData.weeklyAvailability}
//                 onChange={(e) => handleInputChange('weeklyAvailability', e.target.value)}
//               />
//             </div>
//           </div>
//         </div>
//       </CardContent>
//     </Card>
//   );

//   const renderWhatHappensNext = () => (
//     <Card className="max-w-2xl mx-auto mt-8 bg-verified-green/10 border-verified-green/20">
//       <CardContent className="p-6">
//         <div className="flex items-start gap-4">
//           <div className="w-10 h-10 bg-verified-green/20 text-verified-green rounded-full flex items-center justify-center flex-shrink-0">
//             <CheckCircle className="w-5 h-5" />
//           </div>
//           <div>
//             <h3 className="text-lg font-semibold mb-3 text-foreground">What happens next?</h3>
//             <ul className="space-y-2 text-muted-foreground">
//               <li>• Our team will review your application within 2-3 business days</li>
//               <li>• We'll verify your LinkedIn profile and employment</li>
//               <li>• Once approved, you'll receive access to your mentor dashboard</li>
//               <li>• You can start accepting mentoring requests immediately</li>
//             </ul>
//           </div>
//         </div>
//       </CardContent>
//     </Card>
//   );

//   if (submitted) {
//     return (
//       <div className="min-h-screen bg-background flex items-center justify-center">
//         <Card className="max-w-md mx-auto">
//           <CardContent className="p-8 text-center">
//             <div className="w-16 h-16 bg-verified-green/20 text-verified-green rounded-full flex items-center justify-center mx-auto mb-4">
//               <CheckCircle className="w-8 h-8" />
//             </div>
//             <h2 className="text-2xl font-bold mb-4 text-foreground">Application Submitted!</h2>
//             <p className="text-muted-foreground mb-6">
//               Your mentor application has been submitted successfully. We'll review it within 2-3 business days and notify you via email.
//             </p>
//             <Button 
//               onClick={() => navigate('/')}
//               className="w-full bg-gradient-to-r from-trust-badge to-verified-green text-white"
//             >
//               Return to Home
//             </Button>
//           </CardContent>
//         </Card>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-background">
//       {/* Header */}
//       <div className="px-6 py-4 border-b border-border">
//         <div className="max-w-6xl mx-auto flex items-center justify-between">
//           <Button
//             variant="ghost"
//             onClick={() => navigate('/')}
//             className="flex items-center gap-2"
//           >
//             <ArrowLeft className="w-4 h-4" />
//             Back to home
//           </Button>
          
//           <div className="flex items-center gap-3">
//             <img src={logo} alt="ApplyWizz" className="h-8 w-auto" />
//             <span className="font-bold text-lg">APPLY WIZZ</span>
//           </div>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="px-6 py-12">
//         <div className="max-w-6xl mx-auto">
//           {/* Header */}
//           <div className="text-center mb-12">
//             <h1 className="text-4xl font-bold mb-4 text-foreground">Become a Verified Mentor</h1>
//             <p className="text-xl text-muted-foreground">Join our community of industry experts</p>
//           </div>

//           {/* Progress */}
//           <div className="max-w-2xl mx-auto mb-12">
//             <div className="flex justify-between items-center mb-4">
//               <span className="text-sm font-medium text-foreground">Step {currentStep} of {totalSteps}</span>
//               <span className="text-sm text-muted-foreground">{Math.round(progress)}% complete</span>
//             </div>
//             <Progress value={progress} className="h-2" />
//           </div>

//           {/* Form Steps */}
//           {currentStep === 1 && renderStep1()}
//           {currentStep === 2 && renderStep2()}
//           {currentStep === 3 && renderStep3()}

//           {/* What Happens Next */}
//           {renderWhatHappensNext()}

//           {/* Navigation */}
//           <div className="flex justify-between max-w-4xl mx-auto mt-8">
//             <Button
//               variant="outline"
//               onClick={handlePrevious}
//               disabled={currentStep === 1}
//             >
//               Previous
//             </Button>
            
//             {currentStep < totalSteps ? (
//               <Button
//                 onClick={handleNext}
//                 className="bg-gradient-to-r from-trust-badge to-verified-green text-white"
//               >
//                 Next Step
//               </Button>
//             ) : (
//               <Button
//                 onClick={handleSubmit}
//                 className="bg-gradient-to-r from-trust-badge to-verified-green text-white"
//               >
//                 Submit Application
//               </Button>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BecomeAMentor;

import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Navbar } from "@/components/ui/navbar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { toast } from "@/hooks/use-toast";
import { 
  getCurrentUser, getCurrentMentorId, updateMentorProfile, getMentor, 
  upsertMentorProfile 
} from "@/lib/data";
import { Mentor, WeeklySlot, SessionPackage, TimeOff } from "@/lib/types";
import logo from "@/assets/applywizz-logo.png";

type Step = 1 | 2 | 3 | 4 | 5;

const CATEGORIES = ["Software", "Product", "Data Science", "AI/ML", "Career Coaching", "Design", "Marketing"];
const LANGS = ["English", "Hindi", "Telugu", "Tamil", "Kannada", "Spanish", "French"];
const CURRENCIES = ["USD", "INR", "EUR", "GBP"] as const;

const defaultPkg = (id:string, label:string, minutes:number, price:number, currency:any): SessionPackage => ({
  id, label, minutes, price, currency, active: true
});

const defaultWeekly: WeeklySlot[] = [
  { id: crypto.randomUUID(), weekday: 1, start: "18:00", end: "21:00", active: true },
  { id: crypto.randomUUID(), weekday: 3, start: "18:00", end: "21:00", active: true },
];

export default function BecomeAMentor() {
  const navigate = useNavigate();
  const user = getCurrentUser();
  const mentorId = getCurrentMentorId();
  const existing: Mentor | null = getMentor(mentorId);

  const [step, setStep] = useState<Step>(1);
  const totalSteps = 5;
  const progress = useMemo(() => (step / totalSteps) * 100, [step]);

  const [basic, setBasic] = useState({
    name: existing?.name || user.name || "",
    headline: existing?.headline || "",
    bio: existing?.bio || "",
    photo: existing?.avatar || "",
    videoUrl: existing?.videoUrl || ""
  });

  const [expertise, setExpertise] = useState({
    categories: existing?.specialties || [],
    years: existing?.yearsOfExperience?.toString() || (existing?.experience?.toString() ?? "1"),
    languages: existing?.languages || []
  });

  const [pricing, setPricing] = useState({
    currency: (existing?.packages?.[0]?.currency ?? "USD") as typeof CURRENCIES[number],
    packages: existing?.packages?.length ? existing.packages : [
      defaultPkg("pkg30", "30 min", 30, 30, "USD"),
      defaultPkg("pkg45", "45 min", 45, 45, "USD"),
      defaultPkg("pkg60", "60 min", 60, 60, "USD"),
    ] as SessionPackage[]
  });

  const [availability, setAvailability] = useState({
    weekly: existing?.weeklySchedule?.length ? existing.weeklySchedule : defaultWeekly,
    bufferMinutes: existing?.bufferMinutes ?? 15,
    timeOff: (existing?.timeOff ?? []) as TimeOff[]
  });

  const [payout, setPayout] = useState({
    provider: existing?.payoutProvider ?? "stripe",
    connected: existing?.payoutConnected ?? false,
    accountId: existing?.payoutAccountId ?? ""
  });

  // keep your existing Step type: type Step = 1 | 2 | 3 | 4 | 5;

const handleNext = () =>
  setStep(prev => (prev < 5 ? ((prev + 1) as Step) : prev));

const handleBack = () =>
  setStep(prev => (prev > 1 ? ((prev - 1) as Step) : prev));

  const toggleCategory = (cat: string) => {
    setExpertise(prev => {
      const selected = new Set(prev.categories);
      if (selected.has(cat)) selected.delete(cat); else selected.add(cat);
      return { ...prev, categories: Array.from(selected) };
    });
  };
  const toggleLanguage = (lng: string) => {
    setExpertise(prev => {
      const selected = new Set(prev.languages);
      if (selected.has(lng)) selected.delete(lng); else selected.add(lng);
      return { ...prev, languages: Array.from(selected) };
    });
  };

  const updatePkg = (id: string, patch: Partial<SessionPackage>) => {
    setPricing(prev => ({
      ...prev,
      packages: prev.packages.map(p => p.id === id ? { ...p, ...patch } : p)
    }));
  };

  const addWeeklyRow = () => {
    setAvailability(prev => ({
      ...prev,
      weekly: [...prev.weekly, { id: crypto.randomUUID(), weekday: 1, start: "18:00", end: "21:00", active: true }]
    }));
  };
  const updateWeekly = (id: string, patch: Partial<WeeklySlot>) => {
    setAvailability(prev => ({
      ...prev,
      weekly: prev.weekly.map(w => w.id === id ? { ...w, ...patch } : w)
    }));
  };
  const removeWeekly = (id: string) => {
    setAvailability(prev => ({ ...prev, weekly: prev.weekly.filter(w => w.id !== id) }));
  };

  const saveAll = () => {
    const mentor: Mentor = {
      ...(existing ?? {
        id: mentorId,
        name: basic.name || user.name || "New Mentor",
        title: existing?.title ?? "",
        company: existing?.company ?? "",
        avatar: basic.photo || existing?.avatar || "",
        verified: true,
        experience: Number(expertise.years) || 1,
        price: 0,
        rating: existing?.rating ?? 0,
        reviews: existing?.reviews ?? 0,
        specialties: [],
        availability: "medium",
        timezone: user.timezone || "IST",
      }),
      name: basic.name || user.name,
      headline: basic.headline,
      bio: basic.bio,
      avatar: basic.photo || existing?.avatar || "",
      videoUrl: basic.videoUrl || undefined,
      specialties: expertise.categories,
      yearsOfExperience: Number(expertise.years) || 1,
      languages: expertise.languages,
      packages: pricing.packages.map(p => ({ ...p, currency: pricing.currency })),
      weeklySchedule: availability.weekly,
      bufferMinutes: availability.bufferMinutes,
      timeOff: availability.timeOff,
      payoutProvider: payout.provider as any,
      payoutConnected: payout.connected,
      payoutAccountId: payout.accountId,
      status: "pending_approval"
    };

    const saved = upsertMentorProfile(mentor);
    updateMentorProfile(saved.id, {}); // regenerate slots

    toast({
      title: "Onboarding Complete",
      description: "Your profile is submitted for review. You'll be activated soon."
    });
    navigate("/mentor");
  };

  return (
    <>
      <Navbar />
      <div className="max-w-5xl mx-auto px-6 py-8">
        <div className="flex items-center gap-3 mb-6">
          <img src={logo} className="h-8 w-auto" />
          <h1 className="text-2xl font-bold">Mentor Onboarding</h1>
        </div>

        <Progress value={progress} className="mb-6" />

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>
              {step === 1 && "Step 1: Basic Info"}
              {step === 2 && "Step 2: Expertise"}
              {step === 3 && "Step 3: Pricing"}
              {step === 4 && "Step 4: Availability"}
              {step === 5 && "Step 5: Payout Setup"}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {step === 1 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label>Name</Label>
                    <Input value={basic.name} onChange={e => setBasic({ ...basic, name: e.target.value })} />
                  </div>
                  <div>
                    <Label>Headline</Label>
                    <Input placeholder="Senior Data Scientist at Google" value={basic.headline} onChange={e => setBasic({ ...basic, headline: e.target.value })} />
                  </div>
                  <div>
                    <Label>Bio</Label>
                    <Textarea rows={6} maxLength={500} placeholder="Tell clients about your background (max 500 chars)" value={basic.bio} onChange={e => setBasic({ ...basic, bio: e.target.value })} />
                    <p className="text-xs text-muted-foreground text-right">{basic.bio.length}/500</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <Label>Profile Photo URL</Label>
                    <Input placeholder="https://..." value={basic.photo} onChange={e => setBasic({ ...basic, photo: e.target.value })} />
                  </div>
                  <div>
                    <Label>Intro Video URL (optional)</Label>
                    <Input placeholder="YouTube/Vimeo link" value={basic.videoUrl} onChange={e => setBasic({ ...basic, videoUrl: e.target.value })} />
                  </div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <div>
                  <Label>Categories</Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {CATEGORIES.map(c => (
                      <Button key={c} variant={expertise.categories.includes(c) ? "default" : "outline"} size="sm" onClick={() => toggleCategory(c)}>
                        {c}
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label>Years of experience</Label>
                    <Input type="number" min={0} value={expertise.years} onChange={e => setExpertise({ ...expertise, years: e.target.value })} />
                  </div>
                  <div>
                    <Label>Languages</Label>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {LANGS.map(l => (
                        <Button key={l} variant={expertise.languages.includes(l) ? "default" : "outline"} size="sm" onClick={() => toggleLanguage(l)}>
                          {l}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <Label>Currency</Label>
                    <Select value={pricing.currency} onValueChange={(v) => setPricing(prev => ({ ...prev, currency: v as any }))}>
                      <SelectTrigger><SelectValue placeholder="Select currency" /></SelectTrigger>
                      <SelectContent>
                        {CURRENCIES.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-4">
                  <Label>Packages</Label>
                  {pricing.packages.map(p => (
                    <div key={p.id} className="grid grid-cols-1 md:grid-cols-5 gap-3 items-end">
                      <div>
                        <Label>Label</Label>
                        <Input value={p.label} onChange={e => updatePkg(p.id, { label: e.target.value })} />
                      </div>
                      <div>
                        <Label>Minutes</Label>
                        <Input type="number" min={15} value={p.minutes} onChange={e => updatePkg(p.id, { minutes: Number(e.target.value) })} />
                      </div>
                      <div>
                        <Label>Price</Label>
                        <Input type="number" min={0} value={p.price} onChange={e => updatePkg(p.id, { price: Number(e.target.value) })} />
                      </div>
                      <div className="flex items-center gap-2">
                        <Switch checked={p.active} onCheckedChange={(v) => updatePkg(p.id, { active: v })} />
                        <span className="text-sm">Active</span>
                      </div>
                      <div className="text-right">
                        <Button variant="ghost" onClick={() => setPricing(prev => ({ ...prev, packages: prev.packages.filter(x => x.id !== p.id) }))}>Remove</Button>
                      </div>
                    </div>
                  ))}
                  <Button variant="outline" onClick={() => setPricing(prev => ({ ...prev, packages: [...prev.packages, defaultPkg(crypto.randomUUID(), "Custom", 30, 30, pricing.currency) ] }))}>Add Package</Button>
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <Label>Buffer between sessions (minutes)</Label>
                  <Input type="number" min={0} className="w-32" value={availability.bufferMinutes} onChange={e => setAvailability(prev => ({ ...prev, bufferMinutes: Number(e.target.value) }))} />
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label>Weekly Recurring Schedule</Label>
                    <Button variant="outline" size="sm" onClick={addWeeklyRow}>Add Row</Button>
                  </div>
                  {availability.weekly.map(w => (
                    <div key={w.id} className="grid grid-cols-1 md:grid-cols-5 gap-3 items-end">
                      <div>
                        <Label>Day</Label>
                        <Select value={String(w.weekday)} onValueChange={(v)=> updateWeekly(w.id, { weekday: Number(v) })}>
                          <SelectTrigger><SelectValue /></SelectTrigger>
                          <SelectContent>
                            {["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].map((d,i)=>(<SelectItem key={i} value={String(i)}>{d}</SelectItem>))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label>Start</Label>
                        <Input type="time" value={w.start} onChange={e=> updateWeekly(w.id, { start: e.target.value })} />
                      </div>
                      <div>
                        <Label>End</Label>
                        <Input type="time" value={w.end} onChange={e=> updateWeekly(w.id, { end: e.target.value })} />
                      </div>
                      <div className="flex items-center gap-2">
                        <Switch checked={w.active} onCheckedChange={(v)=> updateWeekly(w.id, { active: v })} />
                        <span className="text-sm">Active</span>
                      </div>
                      <div className="text-right">
                        <Button variant="ghost" onClick={() => removeWeekly(w.id)}>Remove</Button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-3">
                  <Label>Time-off (vacations/holidays)</Label>
                  <div className="text-sm text-muted-foreground">Add blocked-out date ranges from your calendar in the next iteration.</div>
                </div>
              </div>
            )}

            {step === 5 && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label>Payout Provider</Label>
                    <Select value={payout.provider} onValueChange={(v)=> setPayout(prev => ({ ...prev, provider: v as any }))}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="stripe">Stripe</SelectItem>
                        <SelectItem value="paypal">PayPal</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Account ID / Email</Label>
                    <Input placeholder="Stripe account ID or PayPal email" value={payout.accountId} onChange={e => setPayout(prev => ({ ...prev, accountId: e.target.value }))} />
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Switch checked={payout.connected} onCheckedChange={(v)=> setPayout(prev => ({ ...prev, connected: v }))} />
                  <span className="text-sm">Connected</span>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="flex items-center justify-between">
          <Button variant="ghost" onClick={handleBack} disabled={step === 1}>Back</Button>
          {step < 5 ? (
            <Button onClick={handleNext}>Next</Button>
          ) : (
            <Button className="bg-primary text-primary-foreground" onClick={saveAll}>
              Submit for Approval
            </Button>
          )}
        </div>
      </div>
    </>
  );
}
