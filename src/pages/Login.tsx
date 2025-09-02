// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { useNavigate, Link, useLocation } from "react-router-dom";
// import { authenticateUser, setCurrentUser, setCurrentMentorId, registerUser } from "@/lib/data";
// import { toast } from "@/hooks/use-toast";
// import logo from "@/assets/applywizz-logo.png";
// // NEW: role selector
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// const Login = () => {
//   const navigate = useNavigate();
//   const location = useLocation();

//   // NEW: mode toggle
//   const [mode, setMode] = useState<"signin" | "signup">("signin");

//   const [loginData, setLoginData] = useState({
//     email: '',
//     password: ''
//   });

//   // NEW: sign-up state
//   const [signupData, setSignupData] = useState({
//     email: '',
//     mobile: '',
//     role: 'client' as 'client' | 'mentor',
//     password: '',
//     confirm: ''
//   });

//   // Get redirect path from location state
//   const from = (location.state as any)?.from?.pathname || '/';

//   const handleLogin = async (e: React.FormEvent) => {
//     e.preventDefault();

//     try {
//       const user = await authenticateUser(loginData.email, loginData.password);

//       if (user) {
//         setCurrentUser(user);

//         if (user.role === 'mentor') {
//           setCurrentMentorId((user as any).mentorId || 'm1');
//         }

//         toast({
//           title: "Welcome back!",
//           description: `Logged in as ${user.role}`,
//         });

//         // Redirect based on role or original destination
//         if (user.role === 'admin') {
//           navigate('/admin');
//         } else if (user.role === 'mentor') {
//           navigate('/dashboard/mentor');
//         } else {
//           navigate(from === '/' ? '/mentors' : from);
//         }
//       } else {
//         toast({
//           title: "Login failed",
//           description: "Invalid credentials. Please try again.",
//           variant: "destructive",
//         });
//       }
//     } catch (err: any) {
//       toast({
//         title: "Login error",
//         description: err?.message || "Something went wrong.",
//         variant: "destructive",
//       });
//     }
//   };

//   // NEW: sign-up handler
//   const handleSignup = async (e: React.FormEvent) => {
//     e.preventDefault();
//     const { email, mobile, role, password, confirm } = signupData;

//     if (!/\S+@\S+\.\S+/.test(email)) {
//       toast({ title: "Invalid email", variant: "destructive" });
//       return;
//     }
//     if (!mobile || mobile.trim().length < 8) {
//       toast({ title: "Enter a valid mobile number", variant: "destructive" });
//       return;
//     }
//     if (password.length < 6) {
//       toast({ title: "Password must be at least 6 characters", variant: "destructive" });
//       return;
//     }
//     if (password !== confirm) {
//       toast({ title: "Passwords do not match", variant: "destructive" });
//       return;
//     }

//     try {
//       const user = await registerUser({ email, mobile, role, password });
//       setCurrentUser(user as any);
//       if (role === 'mentor' && (user as any).mentorId) setCurrentMentorId((user as any).mentorId);

//       toast({ title: "Account created", description: `Signed in as ${role}` });

//       if (role === 'mentor') navigate('/dashboard/mentor');
//       else navigate('/mentors');
//     } catch (err: any) {
//       toast({ title: "Sign up failed", description: err?.message || "Please try again.", variant: "destructive" });
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
//       <div className="w-full max-w-md">
//         <div className="text-center mb-8">
//           <Link to="/" className="inline-block">
//             <img src={logo} alt="ApplyWizz" className="h-12 mx-auto mb-4" />
//           </Link>
//           <h1 className="text-2xl font-bold text-foreground mb-2">
//             {mode === "signin" ? "Welcome back" : "Create your account"}
//           </h1>
//           <p className="text-muted-foreground">
//             {mode === "signin" ? "Sign in to your account" : "Sign up to get started"}
//           </p>
//         </div>

//         <Card>
//           <CardHeader>
//             <CardTitle>{mode === "signin" ? "Sign In" : "Sign Up"}</CardTitle>
//           </CardHeader>
//           <CardContent>
//             {mode === "signin" ? (
//               <>
//                 <form onSubmit={handleLogin} className="space-y-4">
//                   <div>
//                     <Label htmlFor="email">Email</Label>
//                     <Input
//                       id="email"
//                       type="email"
//                       value={loginData.email}
//                       onChange={(e) => setLoginData(prev => ({ ...prev, email: e.target.value }))}
//                       placeholder="Enter your email"
//                     />
//                   </div>

//                   <div>
//                     <Label htmlFor="password">Password</Label>
//                     <Input
//                       id="password"
//                       type="password"
//                       value={loginData.password}
//                       onChange={(e) => setLoginData(prev => ({ ...prev, password: e.target.value }))}
//                       placeholder="Enter your password"
//                     />
//                   </div>

//                   <Button type="submit" className="w-full">
//                     Sign In
//                   </Button>
//                 </form>

//                 {/* switch to sign up */}
//                 <p className="text-center text-sm mt-3">
//                   Don’t have an account?{" "}
//                   <button
//                     type="button"
//                     onClick={() => setMode("signup")}
//                     className="text-primary underline underline-offset-4"
//                   >
//                     Sign up
//                   </button>
//                 </p>

//                 <div className="mt-6">
//                   <div className="text-center space-y-2 mb-6">
//                     <h2 className="text-lg font-semibold">Demo Accounts</h2>
//                     <p className="text-sm text-muted-foreground">Try different user types:</p>
//                     <div className="grid grid-cols-3 gap-2 mt-4">
//                       <div className="text-xs p-2 bg-gray-50 rounded">
//                         <p className="font-medium">Client</p>
//                         <p>alex@example.com</p>
//                         <p>demo123</p>
//                       </div>
//                       <div className="text-xs p-2 bg-gray-50 rounded">
//                         <p className="font-medium">Mentor</p>
//                         <p>sarah@example.com</p>
//                         <p>demo123</p>
//                       </div>
//                       <div className="text-xs p-2 bg-gray-50 rounded">
//                         <p className="font-medium">Admin</p>
//                         <p>admin@example.com</p>
//                         <p>demo123</p>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </>
//             ) : (
//               <>
//                 <form onSubmit={handleSignup} className="space-y-4">
//                   <div>
//                     <Label htmlFor="su-email">Email</Label>
//                     <Input
//                       id="su-email"
//                       type="email"
//                       value={signupData.email}
//                       onChange={(e) => setSignupData(prev => ({ ...prev, email: e.target.value }))}
//                       placeholder="your@email.com"
//                     />
//                   </div>

//                   <div>
//                     <Label htmlFor="su-mobile">Mobile Number</Label>
//                     <Input
//                       id="su-mobile"
//                       type="tel"
//                       value={signupData.mobile}
//                       onChange={(e) => setSignupData(prev => ({ ...prev, mobile: e.target.value }))}
//                       placeholder="e.g., 9876543210"
//                     />
//                   </div>

//                   <div>
//                     <Label>Mentor / Client</Label>
//                     <Select
//                       value={signupData.role}
//                       onValueChange={(v) => setSignupData(prev => ({ ...prev, role: v as 'client' | 'mentor' }))}
//                     >
//                       <SelectTrigger className="w-full">
//                         <SelectValue placeholder="Select role" />
//                       </SelectTrigger>
//                       <SelectContent>
//                         <SelectItem value="client">Client</SelectItem>
//                         <SelectItem value="mentor">Mentor</SelectItem>
//                       </SelectContent>
//                     </Select>
//                   </div>

//                   <div>
//                     <Label htmlFor="su-pass">Create Password</Label>
//                     <Input
//                       id="su-pass"
//                       type="password"
//                       value={signupData.password}
//                       onChange={(e) => setSignupData(prev => ({ ...prev, password: e.target.value }))}
//                       placeholder="••••••••"
//                     />
//                   </div>

//                   <div>
//                     <Label htmlFor="su-confirm">Confirm Password</Label>
//                     <Input
//                       id="su-confirm"
//                       type="password"
//                       value={signupData.confirm}
//                       onChange={(e) => setSignupData(prev => ({ ...prev, confirm: e.target.value }))}
//                       placeholder="••••••••"
//                     />
//                   </div>

//                   <Button type="submit" className="w-full">
//                     Create account
//                   </Button>
//                 </form>

//                 {/* switch back to sign in */}
//                 <p className="text-center text-sm mt-3">
//                   Already have an account?{" "}
//                   <button
//                     type="button"
//                     onClick={() => setMode("signin")}
//                     className="text-primary underline underline-offset-4"
//                   >
//                     Sign in
//                   </button>
//                 </p>
//               </>
//             )}
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   );
// };

// export default Login;



import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate, Link, useLocation } from "react-router-dom";
import {
  authenticateUser,
  setCurrentUser,
  setCurrentMentorId,
  registerUser,
  getOrLoadMentorId, // ✅ NEW: fetch mentor id from DB if role=mentor
} from "@/lib/data";
import { toast } from "@/hooks/use-toast";
import logo from "@/assets/applywizz-logo.png";
// NEW: role selector
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // NEW: mode toggle
  const [mode, setMode] = useState<"signin" | "signup">("signin");

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  // NEW: sign-up state
  const [signupData, setSignupData] = useState({
    email: "",
    mobile: "",
    role: "client" as "client" | "mentor",
    password: "",
    confirm: "",
  });

  // Get redirect path from location state
  const from = (location.state as any)?.from?.pathname || "/";

  const handleLogin = async (e: React.FormEvent) => {
  e.preventDefault();
  const email = loginData.email.trim().toLowerCase();
  const password = loginData.password;

  try {
    const user = await authenticateUser(email, password);

    if (user) {
      setCurrentUser(user);

      if (user.role === "mentor") {
        try {
          const mentorId = await getOrLoadMentorId();
          if (mentorId) setCurrentMentorId(mentorId);
        } catch { /* ignore */ }
      }

      toast({ title: "Welcome back!", description: `Logged in as ${user.role}` });

      if (user.role === "admin") navigate("/admin");
      else if (user.role === "mentor") navigate("/dashboard/mentor");
      else navigate(from === "/" ? "/mentors" : from);
    } else {
      toast({ title: "Login failed", description: "Invalid credentials.", variant: "destructive" });
    }
  } catch (err: any) {
    console.error("[login] supabase error:", err);
    toast({
      title: "Login error",
      description: err?.message || "Something went wrong.",
      variant: "destructive",
    });
  }
};

  // NEW: sign-up handler
const handleSignup = async (e: React.FormEvent) => {
  e.preventDefault();
  const email = signupData.email.trim().toLowerCase();
  const mobile = signupData.mobile.trim();
  const role = signupData.role;
  const password = signupData.password;
  const confirm = signupData.confirm;

  if (!/\S+@\S+\.\S+/.test(email)) {
    toast({ title: "Invalid email", description: "Please enter a valid email like name@example.com", variant: "destructive" });
    return;
  }
  if (!mobile || mobile.length < 8) {
    toast({ title: "Enter a valid mobile number", variant: "destructive" });
    return;
  }
  if (password.length < 6) {
    toast({ title: "Password must be at least 6 characters", variant: "destructive" });
    return;
  }
  if (password !== confirm) {
    toast({ title: "Passwords do not match", variant: "destructive" });
    return;
  }

  try {
    // Create account (also upserts a profile)
    const user = await registerUser({ email, mobile, role, password });

    // Optionally ensure session (depending on your Supabase email-confirm settings)
    // If your project requires email confirmation, this may throw until verified.
    try { await authenticateUser(email, password); } catch {}

    setCurrentUser(user as any);

    if (role === "mentor") {
      try {
        const mentorId = await getOrLoadMentorId();
        if (mentorId) setCurrentMentorId(mentorId);
      } catch { /* ignore */ }
    }

    toast({ title: "Account created", description: `Signed in as ${role}` });

    if (role === "mentor") navigate("/dashboard/mentor");
    else navigate("/mentors");
  } catch (err: any) {
    console.error("[register] supabase error:", err);
    toast({
      title: "Sign up failed",
      description: err?.message || "Please try again.",
      variant: "destructive",
    });
  }
};


  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-block">
            <img src={logo} alt="ApplyWizz" className="h-12 mx-auto mb-4" />
          </Link>
          <h1 className="text-2xl font-bold text-foreground mb-2">
            {mode === "signin" ? "Welcome back" : "Create your account"}
          </h1>
          <p className="text-muted-foreground">
            {mode === "signin" ? "Sign in to your account" : "Sign up to get started"}
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>{mode === "signin" ? "Sign In" : "Sign Up"}</CardTitle>
          </CardHeader>
          <CardContent>
            {mode === "signin" ? (
              <>
                <form onSubmit={handleLogin} className="space-y-4">
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={loginData.email}
                      onChange={(e) => setLoginData((prev) => ({ ...prev, email: e.target.value }))}
                      placeholder="Enter your email"
                    />
                  </div>

                  <div>
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      value={loginData.password}
                      onChange={(e) => setLoginData((prev) => ({ ...prev, password: e.target.value }))}
                      placeholder="Enter your password"
                    />
                  </div>

                  <Button type="submit" className="w-full">
                    Sign In
                  </Button>
                </form>

                {/* switch to sign up */}
                <p className="text-center text-sm mt-3">
                  Don’t have an account?{" "}
                  <button
                    type="button"
                    onClick={() => setMode("signup")}
                    className="text-primary underline underline-offset-4"
                  >
                    Sign up
                  </button>
                </p>

                <div className="mt-6">
                  <div className="text-center space-y-2 mb-6">
                    <h2 className="text-lg font-semibold">Demo Accounts</h2>
                    <p className="text-sm text-muted-foreground">Try different user types:</p>
                    <div className="grid grid-cols-3 gap-2 mt-4">
                      <div className="text-xs p-2 bg-gray-50 rounded">
                        <p className="font-medium">Client</p>
                        <p>alex@example.com</p>
                        <p>demo123</p>
                      </div>
                      <div className="text-xs p-2 bg-gray-50 rounded">
                        <p className="font-medium">Mentor</p>
                        <p>sarah@example.com</p>
                        <p>demo123</p>
                      </div>
                      <div className="text-xs p-2 bg-gray-50 rounded">
                        <p className="font-medium">Admin</p>
                        <p>admin@example.com</p>
                        <p>demo123</p>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <form onSubmit={handleSignup} className="space-y-4">
                  <div>
                    <Label htmlFor="su-email">Email</Label>
                    <Input
                    id="su-email"
                    type="email"
                    autoComplete="email"
                    inputMode="email"
                    value={signupData.email}
                    onChange={(e) => setSignupData((p) => ({ ...p, email: e.target.value }))}
                    placeholder="you@example.com"
                  />

                  </div>

                  <div>
                    <Label htmlFor="su-mobile">Mobile Number</Label>
                    <Input
                      id="su-mobile"
                      type="tel"
                      value={signupData.mobile}
                      onChange={(e) => setSignupData((prev) => ({ ...prev, mobile: e.target.value }))}
                      placeholder="e.g., 9876543210"
                    />
                  </div>

                  <div>
                    <Label>Mentor / Client</Label>
                    <Select
                      value={signupData.role}
                      onValueChange={(v) => setSignupData((prev) => ({ ...prev, role: v as "client" | "mentor" }))}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="client">Client</SelectItem>
                        <SelectItem value="mentor">Mentor</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="su-pass">Create Password</Label>
                    <Input
                      id="su-pass"
                      type="password"
                      value={signupData.password}
                      onChange={(e) => setSignupData((prev) => ({ ...prev, password: e.target.value }))}
                      placeholder="••••••••"
                    />
                  </div>

                  <div>
                    <Label htmlFor="su-confirm">Confirm Password</Label>
                    <Input
                      id="su-confirm"
                      type="password"
                      value={signupData.confirm}
                      onChange={(e) => setSignupData((prev) => ({ ...prev, confirm: e.target.value }))}
                      placeholder="••••••••"
                    />
                  </div>

                  <Button type="submit" className="w-full">
                    Create account
                  </Button>
                </form>

                {/* switch back to sign in */}
                <p className="text-center text-sm mt-3">
                  Already have an account?{" "}
                  <button
                    type="button"
                    onClick={() => setMode("signin")}
                    className="text-primary underline underline-offset-4"
                  >
                    Sign in
                  </button>
                </p>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;
