// import { useState } from "react";
// import { LogOut, Settings, User } from "lucide-react";
// import { Button } from "./button";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "./dropdown-menu";
// import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
// import { useNavigate } from "react-router-dom";
// import { getCurrentUser, logout } from "@/lib/data";

// export const UserMenu = () => {
//   const navigate = useNavigate();
//   const user = getCurrentUser();

//   if (!user) return null;

//   const handleLogout = () => {
//     logout();
//     navigate('/');
//   };

//   const getInitials = (name: string) => {
//     return name
//       .split(' ')
//       .map(n => n[0])
//       .join('')
//       .toUpperCase();
//   };

//   return (
//     <DropdownMenu>
//       <DropdownMenuTrigger asChild>
//         <Button variant="ghost" className="relative h-10 w-10 rounded-full">
//           <Avatar className="h-10 w-10">
//             <AvatarImage src={user.avatar} alt={user.name} />
//             <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
//           </Avatar>
//         </Button>
//       </DropdownMenuTrigger>
//       <DropdownMenuContent className="w-56" align="end" forceMount>
//         <div className="flex items-center justify-start gap-2 p-2">
//           <div className="flex flex-col space-y-1 leading-none">
//             <p className="font-medium">{user.name}</p>
//             <p className="w-[200px] truncate text-sm text-muted-foreground">
//               {user.email}
//             </p>
//           </div>
//         </div>
//         <DropdownMenuSeparator />
//         <DropdownMenuItem onClick={() => navigate('/profile')}>
//           <User className="mr-2 h-4 w-4" />
//           Update Profile
//         </DropdownMenuItem>
//         <DropdownMenuItem onClick={() => navigate('/profile/password')}>
//           <Settings className="mr-2 h-4 w-4" />
//           Update Password
//         </DropdownMenuItem>
//         <DropdownMenuSeparator />
//         <DropdownMenuItem onClick={handleLogout}>
//           <LogOut className="mr-2 h-4 w-4" />
//           Logout
//         </DropdownMenuItem>
//       </DropdownMenuContent>
//     </DropdownMenu>
//   );
// };   
// src/components/ui/user-menu.tsx
import * as React from "react";
import { useNavigate } from "react-router-dom";
import { LogOut, Settings, User as UserIcon } from "lucide-react";
import { Button } from "./button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "./dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import { logoutAndGo } from "@/lib/auth";

type UserMenuProps = { onLogout?: () => void; name?: string; email?: string; avatar?: string; };

export const UserMenu: React.FC<UserMenuProps> = ({ onLogout, name = "User", email = "", avatar = "" }) => {
  const navigate = useNavigate();

  const handleLogout = React.useCallback(() => {
    if (onLogout) return onLogout();
    logoutAndGo("/"); // hard reload
  }, [onLogout]);

  const initials =
    (name || "U").split(/\s+/).map((s) => s[0]?.toUpperCase() || "").join("").slice(0, 2) || "U";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-10 rounded-full">
          <Avatar className="h-10 w-10">
            <AvatarImage src={avatar} alt={name} />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56" align="end" forceMount>
        <div className="flex items-center gap-2 p-2">
          <div className="flex flex-col">
            <p className="font-medium">{name}</p>
            <p className="w-[200px] truncate text-sm text-muted-foreground">{email}</p>
          </div>
        </div>

        <DropdownMenuSeparator />

        <DropdownMenuItem onSelect={() => navigate("/profile")}>
          <UserIcon className="mr-2 h-4 w-4" />
          Update Profile
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={() => navigate("/profile/password")}>
          <Settings className="mr-2 h-4 w-4" />
          Update Password
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem
  // Use *either* onSelect OR onClick—NOT both. onSelect is enough.
  onSelect={(e) => {
    e.preventDefault();
    if (onLogout) return onLogout();
    logoutAndGo("/");
  }}
>
  <LogOut className="mr-2 h-4 w-4" />
  Logout
</DropdownMenuItem>

      </DropdownMenuContent>
    </DropdownMenu>
  );
};

