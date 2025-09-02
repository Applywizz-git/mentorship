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

import { Link, useNavigate } from 'react-router-dom';
import { Button } from './button';
import { UserMenu } from './user-menu';
import { getCurrentUser } from '@/lib/data'; // ✅ use this instead of isAuthenticated
import logo from '@/assets/applywizz-logo.png';

export const Navbar = () => {
  const navigate = useNavigate();
  const user = getCurrentUser(); // ✅ cached Supabase user or guest

  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-white border-b border-border">
      <Link to="/" className="flex items-center gap-3">
        <img src={logo} alt="ApplyWizz" className="h-8 w-auto" />
        <span className="text-xl font-bold text-foreground">APPLY WIZZ</span>
      </Link>
      
      <div className="hidden md:flex items-center gap-8">
        <Link to="/mentors" className="text-foreground hover:text-primary transition-colors">
          Find Mentors
        </Link>
        <Link to="/how-it-works" className="text-foreground hover:text-primary transition-colors">
          How it Works
        </Link>
        <Link to="/become-mentor" className="text-foreground hover:text-primary transition-colors">
          Become a Mentor
        </Link>
      </div>
      
      <div className="flex items-center gap-4">
        {user && user.id !== 'anon' ? (   // ✅ check Supabase user
          <UserMenu />
        ) : (
          <>
            <Button 
              variant="ghost" 
              onClick={() => navigate('/login')}
              className="text-foreground"
            >
              Login
            </Button>
            <Button 
              onClick={() => navigate('/login')}
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              Get Started
            </Button>
          </>
        )}
      </div>
    </nav>
  );
};
