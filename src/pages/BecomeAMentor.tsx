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

// src/pages/BecomeAMentor.tsx
// src/pages/BecomeAMentor.tsx// src/pages/BecomeAMentor.tsx
// src/pages/BecomeAMentor.tsx
// src/pages/BecomeAMentor.tsx
import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Navbar } from "@/components/ui/navbar";
import { toast } from "@/hooks/use-toast";
import logo from "@/assets/applywizz-logo.png";

import { supabase } from "@/lib/supabase";

// Supabase-backed helpers (from src/lib/data.ts)
import {
  saveBasicInfo,          // { profileId, email?, phone?, name? }
  uploadResume,           // (file, userId) -> returns storage key
  upsertMentorApplication // { userId, profileId, resumePath, specialties?, experience? }
} from "@/lib/data";

type Step = 1 | 2 | 3;

const CATEGORIES = [
  "Software",
  "Product",
  "Data Science",
  "AI/ML",
  "Career Coaching",
  "Design",
  "Marketing",
];

const LANGS = ["English", "Hindi", "Telugu", "Tamil", "Kannada", "Spanish", "French"];

export default function BecomeAMentor() {
  const navigate = useNavigate();

  // Auth/profile
  const [loadingUser, setLoadingUser] = useState(true);
  const [userId, setUserId] = useState<string>("");
  const [profileId, setProfileId] = useState<string>("");

  // Wizard
  const [step, setStep] = useState<Step>(1);
  const totalSteps = 3;
  const progress = useMemo(() => (step / totalSteps) * 100, [step]);

  // STEP 1 — Basic Info
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [mobile, setMobile] = useState<string>("");
  const [bio, setBio] = useState<string>("");
  const [photo, setPhoto] = useState<string>("");

  const emailValid = /^\S+@\S+\.\S+$/.test((email || "").trim());
  const mobileValid = !!(mobile && mobile.replace(/[^\d]/g, "").length >= 10);

  // STEP 2 — Resume (PDF)
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [resumePath, setResumePath] = useState<string | null>(null);
  const resumeOk = useMemo(() => {
    if (!resumeFile) return false;
    const isPdf =
      resumeFile.type === "application/pdf" ||
      resumeFile.name.toLowerCase().endsWith(".pdf");
    const sizeOk = resumeFile.size <= 10 * 1024 * 1024; // 10 MB
    return isPdf && sizeOk;
  }, [resumeFile]);

  // STEP 3 — Expertise (pricing removed)
  const [categories, setCategories] = useState<string[]>([]);
  const [years, setYears] = useState<number | "">("");
  const [languages, setLanguages] = useState<string[]>([]); // optional UI only

  const [submitting, setSubmitting] = useState(false);

  // ------- helper: reuse existing profile by user_id (avoid duplicate user_id), insert only if missing
  async function ensureProfile(
    uid: string,
    pid: string,
    base: { name: string; email: string; phone: string }
  ): Promise<string> {
    // Prefer existing row by user_id (unique)
    const { data: byUser, error: e1 } = await supabase
      .from("profiles")
      .select("id")
      .eq("user_id", uid)
      .maybeSingle();
    if (e1) throw e1;

    let resolvedId = byUser?.id ?? (pid || uid);

    // If none by user_id, check by id; insert only if still missing
    if (!byUser) {
      const { data: byId, error: e2 } = await supabase
        .from("profiles")
        .select("id")
        .eq("id", resolvedId)
        .maybeSingle();
      if (e2) throw e2;

      if (!byId) {
        const { error: insErr } = await supabase.from("profiles").insert({
          id: resolvedId,
          user_id: uid,
          name: base.name || null,
          email: base.email || null,
          phone: base.phone || null,
          role: "mentor",
        });
        if (insErr) throw insErr;
      }
    }

    // Normalize/update fields on the resolved row
    const { error: upErr } = await supabase
      .from("profiles")
      .update({
        name: base.name || null,
        email: base.email || null,
        phone: base.phone || null,
        role: "mentor",
      })
      .eq("id", resolvedId);
    if (upErr) throw upErr;

    return resolvedId;
  }
  // -------

  // Load current user + profile (and prefill fields)
  useEffect(() => {
    (async () => {
      try {
        const { data: auth } = await supabase.auth.getUser();
        const authUser = auth?.user;
        if (!authUser?.id) {
          setLoadingUser(false);
          toast({
            title: "Please sign in",
            description: "You need to log in to apply as a mentor.",
            variant: "destructive",
          });
          return;
        }

        const uid = authUser.id;
        setUserId(uid);

        // Prefill from profiles (id often equals auth uid)
        const { data: prof, error: profErr } = await supabase
          .from("profiles")
          .select("id, name, email, phone, bio, avatar, specialties, experience")
          .eq("id", uid)
          .maybeSingle();
        if (profErr) throw profErr;

        const pid = prof?.id ?? uid;
        setProfileId(pid);

        setName(prof?.name ?? "");
        setEmail(prof?.email ?? authUser.email ?? "");
        setMobile(prof?.phone ?? "");
        setBio((prof as any)?.bio ?? "");
        setPhoto((prof as any)?.avatar ?? "");
        setCategories(Array.isArray(prof?.specialties) ? (prof?.specialties as string[]) : []);
        setYears(typeof prof?.experience === "number" ? prof?.experience : "");
      } catch (e: any) {
        toast({
          title: "Error loading profile",
          description: e?.message ?? String(e),
          variant: "destructive",
        });
      } finally {
        setLoadingUser(false);
      }
    })();
  }, []);

  const toggleCategory = (cat: string) => {
    setCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  const toggleLanguage = (lng: string) => {
    setLanguages((prev) =>
      prev.includes(lng) ? prev.filter((l) => l !== lng) : [...prev, lng]
    );
  };

  const next = async () => {
    try {
      if (!userId || !profileId) {
        toast({
          title: "Not signed in",
          description: "Please log in first.",
          variant: "destructive",
        });
        return;
      }

      if (step === 1) {
        if (!name.trim()) {
          toast({ title: "Name required", variant: "destructive" });
          return;
        }
        if (!emailValid) {
          toast({
            title: "Invalid email",
            description: "Please enter a valid email.",
            variant: "destructive",
          });
          return;
        }
        if (!mobileValid) {
          toast({
            title: "Invalid mobile",
            description: "Enter at least 10 digits.",
            variant: "destructive",
          });
          return;
        }

        // Reuse/create profile row and get the real profileId for this user_id
        const resolvedId = await ensureProfile(userId, profileId, {
          name: name.trim(),
          email: email.trim(),
          phone: mobile.trim(),
        });
        setProfileId(resolvedId);

        // Persist basic info
        await saveBasicInfo({
          profileId: resolvedId,
          email: email.trim(),
          phone: mobile.trim(),
          name: name.trim(),
        });

        // Optional bio/avatar (ignore if columns don’t exist)
        try {
          await supabase
            .from("profiles")
            .update({ bio: bio || null, avatar: photo || null })
            .eq("id", resolvedId);
        } catch {
          /* noop */
        }

        setStep(2);
        toast({ title: "Saved", description: "Basic info updated." });
      } else if (step === 2) {
        if (!resumeFile || !resumeOk) {
          toast({
            title: "Resume required",
            description: "Upload a PDF (≤10MB).",
            variant: "destructive",
          });
          return;
        }
        const key = await uploadResume(resumeFile, userId);
        setResumePath(key);
        setStep(3);
        toast({ title: "Resume uploaded", description: "Proceed to expertise." });
      } else if (step === 3) {
        setSubmitting(true);

        const safeYears = Math.max(0, Number(years || 0));

        await upsertMentorApplication({
          userId,
          profileId,            // resolved id from Step 1
          resumePath,
          specialties: categories,
          experience: safeYears,
        });

        setSubmitting(false);
        toast({
          title: "Application submitted",
          description: "Your application is now pending admin approval.",
        });
        navigate("/mentor"); // adjust if your mentor dashboard route differs
      }
    } catch (e: any) {
      setSubmitting(false);
      toast({
        title: "Error",
        description: e?.message ?? String(e),
        variant: "destructive",
      });
    }
  };

  const back = () => setStep((s) => (s > 1 ? ((s - 1) as Step) : s));

  if (loadingUser) {
    return (
      <>
        <Navbar />
        <div className="max-w-5xl mx-auto px-6 py-16">
          <p className="text-muted-foreground">Loading…</p>
        </div>
      </>
    );
  }

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
              {step === 2 && "Step 2: Resume"}
              {step === 3 && "Step 3: Expertise"}
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* STEP 1 */}
            {step === 1 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label>Name</Label>
                    <Input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <Label>Email</Label>
                    <Input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                    />
                    {!emailValid && email.length > 0 && (
                      <p className="text-xs text-red-500 mt-1">Enter a valid email.</p>
                    )}
                  </div>
                  <div>
                    <Label>Mobile number</Label>
                    <Input
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value)}
                      placeholder="+91 9xxxx xxxxx"
                    />
                    {!mobileValid && mobile.length > 0 && (
                      <p className="text-xs text-red-500 mt-1">Enter at least 10 digits.</p>
                    )}
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label>Short Bio</Label>
                    <Textarea
                      rows={6}
                      maxLength={500}
                      placeholder="Tell clients about your background (max 500 chars)"
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                    />
                    <p className="text-xs text-muted-foreground text-right">
                      {bio.length}/500
                    </p>
                  </div>
                  <div>
                    <Label>Profile Photo URL</Label>
                    <Input
                      placeholder="https://..."
                      value={photo}
                      onChange={(e) => setPhoto(e.target.value)}
                    />
                  </div>
                </div>

                <div className="flex justify-end md:col-span-2">
                  <Button onClick={next} disabled={!emailValid || !mobileValid || !name.trim()}>
                    Save & Continue
                  </Button>
                </div>
              </div>
            )}

            {/* STEP 2 */}
            {step === 2 && (
              <div className="grid gap-4">
                <div>
                  <Label>Resume (PDF, ≤10MB)</Label>
                  <Input
                    type="file"
                    accept=".pdf,application/pdf"
                    onChange={(e) => setResumeFile(e.target.files?.[0] ?? null)}
                  />
                  {resumeFile && (
                    <p className="text-xs mt-1">
                      Selected: {resumeFile.name} ({Math.round(resumeFile.size / 1024)} KB)
                    </p>
                  )}
                  {!resumeOk && resumeFile && (
                    <p className="text-xs text-red-500 mt-1">
                      Please upload a valid PDF file under 10MB.
                    </p>
                  )}
                  <p className="text-xs text-muted-foreground mt-1">
                    Private upload. Admin can view via a signed link.
                  </p>
                </div>
                <div className="flex justify-between">
                  <Button variant="ghost" onClick={back}>
                    Back
                  </Button>
                  <Button onClick={next} disabled={!resumeFile || !resumeOk}>
                    Upload & Continue
                  </Button>
                </div>
              </div>
            )}

            {/* STEP 3 */}
            {step === 3 && (
              <div className="space-y-6">
                <div>
                  <Label>Expertise / Specialties</Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {CATEGORIES.map((c) => (
                      <Button
                        key={c}
                        variant={categories.includes(c) ? "default" : "outline"}
                        size="sm"
                        onClick={() => toggleCategory(c)}
                      >
                        {c}
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label>Years of Experience</Label>
                    <Input
                      type="number"
                      min={0}
                      value={years}
                      onChange={(e) =>
                        setYears(e.target.value === "" ? "" : Number(e.target.value))
                      }
                    />
                  </div>
                  <div>
                    <Label>Languages (optional)</Label>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {LANGS.map((l) => (
                        <Button
                          key={l}
                          variant={languages.includes(l) ? "default" : "outline"}
                          size="sm"
                          onClick={() => toggleLanguage(l)}
                        >
                          {l}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex justify-between">
                  <Button variant="ghost" onClick={back}>
                    Back
                  </Button>
                  <Button onClick={next} disabled={submitting}>
                    {submitting ? "Submitting…" : "Submit Application"}
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </>
  );
}
  