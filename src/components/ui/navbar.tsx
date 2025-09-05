// import { Link, useNavigate } from 'react-router-dom';
// import { Button } from './button';
// import { UserMenu } from './user-menu';
// import { isAuthenticated } from '@/lib/data';
// import logo from '@/assets/applywizz-logo.png';

// export const Navbar = () => {
//   const navigate = useNavigate();

//   return (
//     <nav className="flex items-center justify-between px-6 py-4 bg-white border-b border-border">
//       <Link to="/" className="flex items-center gap-3">
//         <img src={logo} alt="ApplyWizz" className="h-8 w-auto" />
//         <span className="text-xl font-bold text-foreground">APPLY WIZZ</span>
//       </Link>

//       <div className="hidden md:flex items-center gap-8">
//         <Link to="/mentors" className="text-foreground hover:text-primary transition-colors">
//           Find Mentors
//         </Link>
//         <Link to="/how-it-works" className="text-foreground hover:text-primary transition-colors">
//           How it Works
//         </Link>
//         <Link to="/become-mentor" className="text-foreground hover:text-primary transition-colors">
//           Become a Mentor
//         </Link>
//       </div>

//       <div className="flex items-center gap-4">
//         {isAuthenticated() ? (
//           <UserMenu />
//         ) : (
//           <>
//             <Button 
//               variant="ghost" 
//               onClick={() => navigate('/login')}
//               className="text-foreground"
//             >
//               Login
//             </Button>
//             <Button 
//               onClick={() => navigate('/login')}
//               className="bg-primary hover:bg-primary/90 text-primary-foreground"
//             >
//               Get Started
//             </Button>
//           </>
//         )}
//       </div>
//     </nav>
//   );
// };   

// src/components/ui/navbar.tsx
import * as React from "react";
import { Link } from "react-router-dom";
import { Button } from "./button";
import { UserMenu } from "./user-menu";
import { useAuthUser } from "@/hooks/useAuthUser";
import { logoutAndGo } from "@/lib/auth";
import logo from "@/assets/applywizz-logo.png";

export const Navbar = () => {
  const { user, profile, loading } = useAuthUser();

  const isLoggedIn = !!user?.id;
  const rawRole = profile?.role ?? "";
  const verified = !!profile?.verified;

  // ✅ only verified mentors are shown the mentor-only nav
  const isMentor = rawRole === "mentor" && verified === true;
  const isAdmin = rawRole === "admin";

  const handleLogout = React.useCallback(() => {
    logoutAndGo("/"); // hard reload to home on logout
  }, []);

  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-white border-b border-border">
      <Link to="/" className="flex items-center gap-3">
        <img src={logo} alt="ApplyWizz" className="h-8 w-auto" />
        <span className="text-xl font-bold text-foreground">APPLY WIZZ</span>
      </Link>

      <div className="hidden md:flex items-center gap-8">
        {isMentor ? (
          <Link to="/mentor" className="text-foreground hover:text-primary transition-colors">Mentor Dashboard</Link>
        ) : (
          <>
            <Link to="/mentors" className="text-foreground hover:text-primary transition-colors">Find Mentors</Link>
            <Link to="/how-it-works" className="text-foreground hover:text-primary transition-colors">How it Works</Link>
            <Link to="/become-mentor" className="text-foreground hover:text-primary transition-colors">Become a Mentor</Link>
          </>
        )}
        {isAdmin && <Link to="/admin" className="text-foreground hover:text-primary transition-colors">Admin</Link>}
      </div>

      <div className="flex items-center gap-4">
        {loading ? <>
          <Link to="/login"><Button variant="ghost" className="text-foreground">Login</Button></Link>
          <Link to="/login"><Button className="bg-primary hover:bg-primary/90 text-primary-foreground">Get Started</Button></Link>
        </> : isLoggedIn ? (
          <UserMenu
            onLogout={handleLogout}
            name={profile?.name ?? user?.email ?? "User"}
            email={profile?.email ?? user?.email ?? ""}
            avatar={profile?.avatar ?? ""}
          />
        ) : (
          <>
            <Link to="/login"><Button variant="ghost" className="text-foreground">Login</Button></Link>
            <Link to="/login"><Button className="bg-primary hover:bg-primary/90 text-primary-foreground">Get Started</Button></Link>
          </>
        )}
      </div>
    </nav>
  );
};

