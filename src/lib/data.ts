// import { Mentor, TimeSlot, Booking, BookingStatus, User, AdminStats, ContactForm } from './types';

// const RESCHEDULE_WITH_REASON_HOURS = 24;

// // Demo mentors with exact data from screenshots
// const DEMO_MENTORS: Mentor[] = [
//   {
//     id: "m1",
//     name: "Sarah Chen",
//     title: "Senior Product Manager",
//     company: "Meta",
//     avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b5c8?w=400&h=400&fit=crop&crop=face",
//     verified: true,
//     experience: 8,
//     price: 150,
//     rating: 4.9,
//     reviews: 47,
//     specialties: ["Product Strategy", "Career Growth", "Leadership"],
//     availability: "high",
//     timezone: "PST",
//     bio: "Senior Product Manager at Meta with 8+ years of experience building consumer products used by millions. I specialize in product strategy, team leadership, and career growth for aspiring PMs."
//   },
//   {
//     id: "m2", 
//     name: "David Rodriguez",
//     title: "Lead Software Engineer",
//     company: "Google",
//     avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
//     verified: true,
//     experience: 10,
//     price: 180,
//     rating: 5.0,
//     reviews: 32,
//     specialties: ["System Design", "Technical Interviews", "ML"],
//     availability: "medium",
//     timezone: "PST",
//     bio: "Lead Software Engineer at Google with expertise in distributed systems and machine learning. I help engineers advance their careers through technical mentorship and interview preparation."
//   },
//   {
//     id: "m3",
//     name: "Emily Watson", 
//     title: "VP of Marketing",
//     company: "Stripe",
//     avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=400&fit=crop&crop=face",
//     verified: true,
//     experience: 12,
//     price: 200,
//     rating: 4.8,
//     reviews: 63,
//     specialties: ["Growth Marketing", "Brand Strategy", "Team Management"],
//     availability: "high",
//     timezone: "EST",
//     bio: "VP of Marketing at Stripe with 12+ years driving growth for B2B and B2C companies. I mentor on marketing strategy, team building, and executive leadership."
//   },
//   {
//     id: "m4",
//     name: "Michael Kim",
//     title: "Staff Designer",
//     company: "Airbnb", 
//     avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
//     verified: true,
//     experience: 7,
//     price: 120,
//     rating: 4.7,
//     reviews: 28,
//     specialties: ["Product Design", "Design Systems", "User Research"],
//     availability: "low",
//     timezone: "PST",
//     bio: "Staff Product Designer at Airbnb focusing on host and guest experiences. I help designers grow their craft and navigate complex product challenges."
//   }
// ];

// // Generate time slots for mentors
// const generateTimeSlots = (): TimeSlot[] => {
//   const slots: TimeSlot[] = [];
//   const timeSlots = ['09:00', '10:00', '11:00', '14:00', '16:00', '18:00'];
  
//   DEMO_MENTORS.forEach(mentor => {
//     // Generate slots for next 5 days
//     for (let dayOffset = 0; dayOffset < 5; dayOffset++) {
//       const date = new Date();
//       date.setDate(date.getDate() + dayOffset);
      
//       timeSlots.forEach((time, idx) => {
//         const [hours, minutes] = time.split(':').map(Number);
//         const startTime = new Date(date);
//         startTime.setHours(hours, minutes, 0, 0);
        
//         const endTime = new Date(startTime);
//         endTime.setMinutes(endTime.getMinutes() + 45);
        
//         const slotId = `${mentor.id}_${date.toISOString().split('T')[0]}_${time}`;
        
//         slots.push({
//           id: slotId,
//           mentorId: mentor.id,
//           startIso: startTime.toISOString(),
//           endIso: endTime.toISOString(),
//           available: Math.random() > 0.2 // 80% availability
//         });
//       });
//     }
//   });
  
//   return slots;
// };

// // Local storage keys
// const STORAGE_KEYS = {
//   MENTORS: 'applywizz_mentors',
//   SLOTS: 'applywizz_slots', 
//   BOOKINGS: 'applywizz_bookings',
//   CURRENT_MENTOR: 'applywizz_current_mentor'
// };

// // Initialize demo data
// export const seedDemoData = () => {
//   if (!localStorage.getItem(STORAGE_KEYS.MENTORS)) {
//     localStorage.setItem(STORAGE_KEYS.MENTORS, JSON.stringify(DEMO_MENTORS));
//   }
  
//   if (!localStorage.getItem(STORAGE_KEYS.SLOTS)) {
//     const slots = generateTimeSlots();
//     localStorage.setItem(STORAGE_KEYS.SLOTS, JSON.stringify(slots));
    
//     // Create one demo booking for m1
//     const availableSlot = slots.find(s => s.mentorId === 'm1' && s.available);
//     if (availableSlot) {
//       const booking: Booking = {
//         id: 'booking_1',
//         mentorId: 'm1',
//         menteeName: 'Alex Johnson',
//         menteeEmail: 'alex@example.com',
//         slotId: availableSlot.id,
//         status: 'confirmed',
//         rescheduleHistory: [],
//         createdAt: new Date().toISOString(),
//         duration: 45
//       };
      
//       // Mark slot as booked
//       availableSlot.available = false;
//       localStorage.setItem(STORAGE_KEYS.SLOTS, JSON.stringify(slots));
//       localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify([booking]));
//     }
//   }
// };

// // API functions
// export const listMentors = (): Mentor[] => {
//   const stored = localStorage.getItem(STORAGE_KEYS.MENTORS);
//   return stored ? JSON.parse(stored) : [];
// };

// export const getMentor = (id: string): Mentor | undefined => {
//   const mentors = listMentors();
//   return mentors.find(m => m.id === id);
// };

// export const listSlotsForMentor = (mentorId: string): TimeSlot[] => {
//   const stored = localStorage.getItem(STORAGE_KEYS.SLOTS);
//   const slots: TimeSlot[] = stored ? JSON.parse(stored) : [];
//   return slots.filter(s => s.mentorId === mentorId);
// };

// export const bookSlot = (
//   mentorId: string, 
//   slotId: string, 
//   menteeName: string, 
//   menteeEmail: string
// ): Booking | null => {
//   const slots: TimeSlot[] = JSON.parse(localStorage.getItem(STORAGE_KEYS.SLOTS) || '[]');
//   const bookings: Booking[] = JSON.parse(localStorage.getItem(STORAGE_KEYS.BOOKINGS) || '[]');
  
//   const slot = slots.find(s => s.id === slotId && s.mentorId === mentorId && s.available);
//   if (!slot) return null;
  
//   // Mark slot unavailable
//   slot.available = false;
//   localStorage.setItem(STORAGE_KEYS.SLOTS, JSON.stringify(slots));
  
//   // Create booking
//   const booking: Booking = {
//     id: `booking_${Date.now()}`,
//     mentorId,
//     menteeName,
//     menteeEmail,
//     slotId,
//     status: 'confirmed',
//     rescheduleHistory: [],
//     createdAt: new Date().toISOString(),
//     duration: 45
//   };
  
//   bookings.push(booking);
//   localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(bookings));
  
//   return booking;
// };

// export const listBookings = ({ mentorId }: { mentorId?: string } = {}): Booking[] => {
//   const stored = localStorage.getItem(STORAGE_KEYS.BOOKINGS);
//   const bookings: Booking[] = stored ? JSON.parse(stored) : [];
  
//   if (mentorId) {
//     return bookings.filter(b => b.mentorId === mentorId);
//   }
  
//   return bookings;
// };

// export const rescheduleBooking = (
//   bookingId: string, 
//   newSlotId: string, 
//   reason?: string
// ): { ok: boolean; error?: string } => {
//   const bookings: Booking[] = JSON.parse(localStorage.getItem(STORAGE_KEYS.BOOKINGS) || '[]');
//   const slots: TimeSlot[] = JSON.parse(localStorage.getItem(STORAGE_KEYS.SLOTS) || '[]');
  
//   const booking = bookings.find(b => b.id === bookingId);
//   if (!booking) return { ok: false, error: 'Booking not found' };
  
//   const newSlot = slots.find(s => s.id === newSlotId && s.available);
//   if (!newSlot) return { ok: false, error: 'New slot not available' };
  
//   const oldSlot = slots.find(s => s.id === booking.slotId);
//   if (!oldSlot) return { ok: false, error: 'Original slot not found' };
  
//   // Check if within 24 hours and reason required
//   const now = new Date();
//   const slotTime = new Date(oldSlot.startIso);
//   const hoursUntilSlot = (slotTime.getTime() - now.getTime()) / (1000 * 60 * 60);
  
//   if (hoursUntilSlot <= RESCHEDULE_WITH_REASON_HOURS && !reason?.trim()) {
//     return { ok: false, error: 'Reason required for rescheduling within 24 hours' };
//   }
  
//   // Free old slot
//   oldSlot.available = true;
  
//   // Book new slot
//   newSlot.available = false;
  
//   // Update booking
//   booking.slotId = newSlotId;
//   booking.status = 'rescheduled';
//   booking.rescheduleHistory.push({
//     atIso: now.toISOString(),
//     fromSlotId: oldSlot.id,
//     toSlotId: newSlotId,
//     reason
//   });
  
//   localStorage.setItem(STORAGE_KEYS.SLOTS, JSON.stringify(slots));
//   localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(bookings));
  
//   return { ok: true };
// };

// export const updateMentorProfile = (mentorId: string, patch: Partial<Mentor>): void => {
//   const mentors = listMentors();
//   const index = mentors.findIndex(m => m.id === mentorId);
//   if (index >= 0) {
//     mentors[index] = { ...mentors[index], ...patch };
//     localStorage.setItem(STORAGE_KEYS.MENTORS, JSON.stringify(mentors));
//   }
// };

// export const setCurrentMentorId = (id: string): void => {
//   localStorage.setItem(STORAGE_KEYS.CURRENT_MENTOR, id);
// };

// export const getCurrentMentorId = (): string | null => {
//   return localStorage.getItem(STORAGE_KEYS.CURRENT_MENTOR);
// };

// export const useCurrentMentorId = (): string | null => {
//   return getCurrentMentorId();
// };

// // User Authentication
// const DEMO_USERS: User[] = [
//   {
//     id: 'user1',
//     name: 'Alex Johnson',
//     email: 'alex@example.com',
//     role: 'client',
//     avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face'
//   },
//   {
//     id: 'mentor1',
//     name: 'Sarah Chen',
//     email: 'sarah@meta.com',
//     role: 'mentor',
//     mentorId: 'm1',
//     avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b5c8?w=400&h=400&fit=crop&crop=face',
//     title: 'Senior Product Manager',
//     company: 'Meta',
//     experience: 8,
//     rating: 4.9
//   },
//   {
//     id: 'admin1',
//     name: 'Admin User',
//     email: 'admin@applywizz.com',
//     role: 'admin',
//     avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face'
//   }
// ];

// export const authenticateUser = (email: string, password: string): User | null => {
//   const user = DEMO_USERS.find(u => u.email === email);
//   return user || null;
// };

// export const getCurrentUser = (): User | null => {
//   const stored = localStorage.getItem('applywizz_current_user');
//   return stored ? JSON.parse(stored) : null;
// };

// export const setCurrentUser = (user: User): void => {
//   localStorage.setItem('applywizz_current_user', JSON.stringify(user));
// };

// export const logout = (): void => {
//   localStorage.removeItem('applywizz_current_user');
// };

// export const isAuthenticated = (): boolean => {
//   return getCurrentUser() !== null;
// };

// // Admin Functions
// export const getAdminStats = (): AdminStats => {
//   const mentors = listMentors();
//   const bookings = listBookings();
  
//   return {
//     totalMentors: mentors.length,
//     pendingMentors: Math.floor(mentors.length * 0.3), // 30% pending
//     totalBookings: bookings.length,
//     upcomingSessions: bookings.filter(b => b.status === 'confirmed').length
//   };
// };

// export const submitContactForm = (form: ContactForm): boolean => {
//   // Simulate form submission
//   console.log('Contact form submitted:', form);
//   return true;
// };
// Local demo store with compatibility shims for older UI calls
// import {
//   Mentor, WeeklySlot, TimeOff, TimeSlot, SessionPackage,
//   Booking, BookingStatus, User, AdminStats, ContactForm, CurrencyCode
// } from "./types";

// const LS = (() => {
//   try { return window?.localStorage ?? null } catch { return null }
// })();

// const KEY = {
//   users: 'mc.users',
//   mentors: 'mc.mentors',
//   slots: 'mc.slots',
//   bookings: 'mc.bookings',
//   reviews: 'mc.reviews',
//   currentUser: 'mc.currentUser',
//   currentMentorId: 'mc.currentMentorId',
//   contact: 'mc.contact',

//   // NEW: local credentials for sign-ups
//   auth: 'mc.auth',
// } as const;

// type Id = string;
// const nowIso = () => new Date().toISOString();
// const uuid = () => Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2);

// // ---------------- Storage helpers ----------------
// function read<T>(k: string, fallback: T): T {
//   if (!LS) return fallback;
//   const raw = LS.getItem(k);
//   if (!raw) return fallback;
//   try { return JSON.parse(raw) as T } catch { return fallback }
// }
// function write<T>(k: string, v: T) {
//   if (!LS) return;
//   LS.setItem(k, JSON.stringify(v));
// }
// function upsert<T extends { id: Id }>(k: string, item: T) {
//   const arr = read<T[]>(k, []);
//   const idx = arr.findIndex(x => x.id === item.id);
//   if (idx >= 0) arr[idx] = item; else arr.push(item);
//   write(k, arr);
//   return item;
// }

// // ---------------- Seed ----------------
// export function seedDemoData() {
//   const hasMentors = read<Mentor[]>(KEY.mentors, []).length > 0;
//   if (hasMentors) return;

//   const mentors: Mentor[] = [
//     {
//       id: 'm1',
//       name: 'Sarah Chen',
//       title: 'Senior Product Manager',
//       company: 'Meta',
//       avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b5c8?w=400&h=400&fit=crop&crop=face',
//       verified: true,
//       experience: 8,
//       price: 150,
//       rating: 4.9,
//       reviews: 120,
//       specialties: ['Product Strategy', 'PM Interviews', 'Roadmapping'],
//       availability: 'high',
//       timezone: 'PST',
//       bio: 'Product leader with 8+ years. I help PMs break into FAANG and level up.',
//       headline: 'Senior PM @ Meta',
//       languages: ['English'],
//       yearsOfExperience: 8,
//       packages: [
//         { id: 'pkg30', label: '30 min', minutes: 30, price: 60, currency: 'USD', active: true },
//         { id: 'pkg60', label: '60 min', minutes: 60, price: 110, currency: 'USD', active: true },
//       ],
//       weeklySchedule: [
//         { id: uuid(), weekday: 1, start: '18:00', end: '21:00', active: true },
//         { id: uuid(), weekday: 3, start: '18:00', end: '21:00', active: true },
//         { id: uuid(), weekday: 5, start: '10:00', end: '13:00', active: true },
//       ],
//       bufferMinutes: 15,
//       timeOff: [],
//       status: 'active',
//       payoutConnected: false,
//     },
//     {
//       id: 'm2',
//       name: 'David Kim',
//       title: 'Lead Software Engineer',
//       company: 'Google',
//       avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
//       verified: true,
//       experience: 10,
//       price: 180,
//       rating: 5.0,
//       reviews: 32,
//       specialties: ['System Design', 'Technical Interviews', 'ML'],
//       availability: 'medium',
//       timezone: 'PST',
//       bio: 'Lead SWE at Google. Systems, interviews, and career growth.',
//       headline: 'Lead SWE @ Google',
//       languages: ['English', 'Korean'],
//       yearsOfExperience: 10,
//       packages: [
//         { id: 'pkg45', label: '45 min', minutes: 45, price: 90, currency: 'USD', active: true },
//         { id: 'pkg60', label: '60 min', minutes: 60, price: 120, currency: 'USD', active: true },
//       ],
//       weeklySchedule: [
//         { id: uuid(), weekday: 2, start: '17:00', end: '20:00', active: true },
//         { id: uuid(), weekday: 4, start: '17:00', end: '20:00', active: true },
//       ],
//       bufferMinutes: 15,
//       timeOff: [],
//       status: 'active',
//       payoutProvider: 'stripe',
//       payoutConnected: true,
//       payoutAccountId: 'acct_demo_123',
//     },
//     {
//       id: 'm3',
//       name: 'Priya Singh',
//       title: 'Data Scientist',
//       company: 'Airbnb',
//       avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop&crop=face',
//       verified: true,
//       experience: 6,
//       price: 120,
//       rating: 4.8,
//       reviews: 54,
//       specialties: ['ML', 'Analytics', 'Career Switch'],
//       availability: 'low',
//       timezone: 'IST',
//       bio: 'DS at Airbnb focused on ML & analytics.',
//       headline: 'Data Scientist @ Airbnb',
//       languages: ['English', 'Hindi'],
//       yearsOfExperience: 6,
//       packages: [
//         { id: 'pkg30i', label: '30 min', minutes: 30, price: 2500, currency: 'INR', active: true },
//         { id: 'pkg60i', label: '60 min', minutes: 60, price: 4500, currency: 'INR', active: true },
//       ],
//       weeklySchedule: [
//         { id: uuid(), weekday: 6, start: '11:00', end: '15:00', active: true },
//       ],
//       bufferMinutes: 15,
//       timeOff: [],
//       status: 'active',
//       payoutProvider: 'paypal',
//       payoutConnected: false,
//     },
//   ];

//   const users: User[] = [
//     { id: 'u1', role: 'client', name: 'Alex Johnson', email: 'alex@example.com', avatar: 'https://i.pravatar.cc/100?img=5' },
//     { id: 'u2', role: 'mentor', name: 'Sarah Chen', email: 'sarah@example.com', avatar: mentors[0].avatar, mentorId: mentors[0].id },
//     { id: 'u3', role: 'admin', name: 'Admin', email: 'admin@example.com', avatar: 'https://i.pravatar.cc/100?img=11' },
//   ];

//   write(KEY.mentors, mentors);
//   write(KEY.users, users);

//   const slots: TimeSlot[] = [];
//   mentors.forEach(m => slots.push(...generateSlotsFromWeekly(m)));
//   write(KEY.slots, slots);
//   write(KEY.bookings, []);
// }

// // ---------------- Auth ----------------

// // NEW: local sign-up credential model (demo-only)
// type RoleLite = "client" | "mentor";
// type AuthUser = {
//   id: Id;
//   email: string;
//   mobile: string;
//   role: RoleLite;
//   password: string; // demo-only
// };

// function getAuthUsers(): AuthUser[] {
//   return read<AuthUser[]>(KEY.auth, []);
// }
// function saveAuthUsers(list: AuthUser[]) {
//   write(KEY.auth, list);
// }

// /**
//  * NEW: Register a user (email, mobile, role, password).
//  * - Stores credentials in KEY.auth
//  * - Ensures/creates a matching app 'User' in KEY.users
//  * - Returns that app 'User'
//  */
// export function registerUser(args: {
//   email: string;
//   mobile: string;
//   role: RoleLite;
//   password: string;
// }) {
//   const email = args.email.trim();
//   const mobile = args.mobile.trim();
//   const role = args.role;
//   const password = args.password;

//   const exists = getAuthUsers().some(u => u.email.toLowerCase() === email.toLowerCase());
//   if (exists) throw new Error("Email is already registered.");

//   const authRec: AuthUser = { id: uuid(), email, mobile, role, password };
//   const auths = getAuthUsers();
//   auths.push(authRec);
//   saveAuthUsers(auths);

//   // create/link User record
//   const users = read<User[]>(KEY.users, []);
//   let appUser = users.find(u => u.email.toLowerCase() === email.toLowerCase());

//   if (!appUser) {
//     appUser = {
//       id: authRec.id,
//       role: role,
//       name: email.split("@")[0],
//       email,
//       avatar: "",
//       // mentorId left undefined; can be set after mentor onboarding
//     } as User;
//     users.push(appUser);
//     write(KEY.users, users);
//   }

//   return appUser;
// }

// export function authenticateUser(email: string, password: string): User | null {
//   const emailLc = (email || "").toLowerCase();

//   // If this email was registered via sign-up, password must match
//   const auth = getAuthUsers().find(u => u.email.toLowerCase() === emailLc);
//   if (auth) {
//     if (auth.password !== password) return null;
//     const users = read<User[]>(KEY.users, []);
//     return users.find(u => u.email.toLowerCase() === emailLc) ?? null;
//   }

//   // Fallback: demo accounts (password ignored), unchanged behavior
//   const users = read<User[]>(KEY.users, []);
//   const user = users.find(u => u.email.toLowerCase() === emailLc);
//   return user ?? null;
// }

// export function isAuthenticated(): boolean {
//   return !!read<User | null>(KEY.currentUser, null);
// }
// export function getCurrentUser(): User {
//   const u = read<User | null>(KEY.currentUser, null);
//   if (!u) return { id: 'anon', role: 'client', name: 'Guest', email: 'guest@local', avatar: '' };
//   return u;
// }
// export function setCurrentUser(user: User | null) {
//   if (user) write(KEY.currentUser, user);
//   else LS?.removeItem(KEY.currentUser);
// }
// export function logout() {
//   LS?.removeItem(KEY.currentUser);
//   LS?.removeItem(KEY.currentMentorId);
// }
// export function setCurrentMentorId(id: string) { write(KEY.currentMentorId, id); }
// export function getCurrentMentorId(): string { return read<string>(KEY.currentMentorId, 'm1'); }

// // ---------------- Mentors ----------------
// export function listMentors(): Mentor[] {
//   return read<Mentor[]>(KEY.mentors, []);
// }
// export function getMentor(id: string): Mentor | null {
//   return listMentors().find(m => m.id === id) ?? null;
// }
// export function upsertMentorProfile(mentor: Mentor) {
//   return upsert<Mentor>(KEY.mentors, mentor);
// }
// export function updateMentorProfile(id: string, patch: Partial<Mentor>) {
//   const m = getMentor(id);
//   if (!m) return null;
//   const updated = { ...m, ...patch };
//   upsertMentorProfile(updated);

//   // Any availability-related change regenerates slots
//   if (patch.weeklySchedule || typeof patch.bufferMinutes !== "undefined" || patch.timeOff) {
//     regenerateSlotsForMentor(updated);
//   }
//   return updated;
// }

// // ---------------- Availability / Slots ----------------
// function parseHHMM(hhmm: string) {
//   const [h, m] = hhmm.split(':').map(Number);
//   return { h, m };
// }
// function addMinutes(d: Date, minutes: number) {
//   const x = new Date(d);
//   x.setMinutes(x.getMinutes() + minutes);
//   return x;
// }
// function isWithinTimeOff(date: Date, timeOff: TimeOff[]) {
//   const d = new Date(date.toISOString().slice(0,10));
//   return timeOff?.some(off => {
//     const start = new Date(off.startDate);
//     const end = new Date(off.endDate);
//     return d >= start && d <= end; // inclusive
//   }) ?? false;
// }
// export function generateSlotsFromWeekly(m: Mentor, horizonDays = 30): TimeSlot[] {
//   const slots: TimeSlot[] = [];
//   if (!m.weeklySchedule?.length) return slots;

//   const buffer = m.bufferMinutes ?? 0;
//   const pkgMin = Math.min(...(m.packages?.filter(p => p.active).map(p => p.minutes) ?? [30]));

//   const now = new Date();
//   for (let delta = 0; delta < horizonDays; delta++) {
//     const day = new Date(now);
//     day.setDate(now.getDate() + delta);
//     const weekday = day.getDay();

//     const wslots = m.weeklySchedule.filter(w => w.weekday === weekday && w.active);
//     if (!wslots.length) continue;
//     if (isWithinTimeOff(day, m.timeOff ?? [])) continue;

//     for (const w of wslots) {
//       const { h: sh, m: sm } = parseHHMM(w.start);
//       const { h: eh, m: em } = parseHHMM(w.end);

//       const start = new Date(day);
//       start.setHours(sh, sm, 0, 0);
//       const end = new Date(day);
//       end.setHours(eh, em, 0, 0);

//       let cursor = new Date(start);
//       while (addMinutes(cursor, pkgMin) <= end) {
//         const slotEnd = addMinutes(cursor, pkgMin);
//         slots.push({
//           id: uuid(),
//           mentorId: m.id,
//           startIso: cursor.toISOString(),
//           endIso: slotEnd.toISOString(),
//           available: true,
//         });
//         cursor = addMinutes(slotEnd, buffer);
//       }
//     }
//   }
//   return slots;
// }
// function regenerateSlotsForMentor(m: Mentor) {
//   const all = read<TimeSlot[]>(KEY.slots, []);
//   const filtered = all.filter(s => s.mentorId !== m.id);
//   const newOnes = generateSlotsFromWeekly(m);
//   write(KEY.slots, [...filtered, ...newOnes]);
// }
// export function listSlotsForMentor(mentorId: string): TimeSlot[] {
//   return read<TimeSlot[]>(KEY.slots, []).filter(s => s.mentorId === mentorId);
// }

// // ---------------- Booking ----------------
// export function listBookings(opts?: { mentorId?: string; clientId?: string; status?: BookingStatus }) {
//   let b = read<Booking[]>(KEY.bookings, []);
//   if (opts?.mentorId) b = b.filter(x => x.mentorId === opts.mentorId);
//   if (opts?.clientId) b = b.filter(x => x.clientId === opts.clientId);
//   if (opts?.status) b = b.filter(x => x.status === opts.status);
//   b.sort((a, bk) => new Date(a.startIso).getTime() - new Date(bk.startIso).getTime());
//   return b;
// }

// export function bookSlot(
//   mentorId: string,
//   slotId: string,
//   a?: any, b?: any, c?: any
// ): Booking | null {
//   // Supports both old and new calling styles.
//   let clientId: string | null = null;
//   let packageId: string | undefined = undefined;
//   let note: string | undefined = undefined;

//   const current = getCurrentUser();

//   if (typeof a === 'string' && typeof b === 'string' && !c) {
//     // legacy: (mentorId, slotId, clientName, clientEmail)
//     clientId = current?.id ?? 'client_demo';
//   } else {
//     clientId = (a as string) ?? current?.id ?? 'client_demo';
//     packageId = (b as string | undefined);
//     note = (c as string | undefined);
//   }

//   const slots = read<TimeSlot[]>(KEY.slots, []);
//   const slot = slots.find(s => s.id === slotId && s.mentorId === mentorId && s.available);
//   const mentor = getMentor(mentorId);
//   if (!slot || !mentor || !clientId) return null;

//   const pkg = mentor.packages?.find(p => p.id === packageId && p.active);
//   const price = pkg?.price ?? mentor.price;
//   const currency: CurrencyCode = (pkg?.currency ?? 'USD') as CurrencyCode;

//   const booking: Booking = {
//     id: uuid(),
//     mentorId,
//     clientId,
//     slotId,
//     packageId,
//     note,
//     status: 'confirmed',
//     createdAt: nowIso(),
//     updatedAt: nowIso(),
//     startIso: slot.startIso,
//     endIso: slot.endIso,
//     price,
//     currency,
//   };

//   slot.available = false;
//   write(KEY.slots, slots);
//   const bookings = read<Booking[]>(KEY.bookings, []);
//   bookings.push(booking);
//   write(KEY.bookings, bookings);
//   return booking;
// }

// export function rescheduleBooking(bookingId: string, newSlotId: string, reason?: string): boolean {
//   const bookings = read<Booking[]>(KEY.bookings, []);
//   const slots = read<TimeSlot[]>(KEY.slots, []);
//   const bk = bookings.find(b => b.id === bookingId);
//   if (!bk) return false;

//   const newSlot = slots.find(s => s.id === newSlotId && s.mentorId === bk.mentorId && s.available);
//   if (!newSlot) return false;

//   const oldSlot = slots.find(s => s.id === bk.slotId);
//   if (oldSlot) oldSlot.available = true;

//   newSlot.available = false;

//   bk.slotId = newSlotId;
//   bk.startIso = newSlot.startIso;
//   bk.endIso = newSlot.endIso;
//   bk.updatedAt = nowIso();

//   write(KEY.slots, slots);
//   write(KEY.bookings, bookings);
//   return true;
// }

// export function cancelBooking(bookingId: string, reason?: string): boolean {
//   const bookings = read<Booking[]>(KEY.bookings, []);
//   const slots = read<TimeSlot[]>(KEY.slots, []);
//   const idx = bookings.findIndex(b => b.id === bookingId);
//   if (idx < 0) return false;
//   const bk = bookings[idx];

//   const slot = slots.find(s => s.id === bk.slotId);
//   if (slot) slot.available = true;

//   bk.status = 'cancelled';
//   bk.updatedAt = nowIso();

//   write(KEY.slots, slots);
//   write(KEY.bookings, bookings);
//   return true;
// }

// // ---------------- Admin / Misc ----------------
// export function getAdminStats(): AdminStats {
//   const mentors = listMentors();
//   const bookings = read<Booking[]>(KEY.bookings, []);
//   const upcoming = bookings.filter(b => new Date(b.startIso) > new Date() && b.status !== 'cancelled').length;
//   const pendingMentors = mentors.filter(m => m.status === 'pending' || m.status === 'pending_approval').length;
//   return {
//     totalMentors: mentors.length,
//     pendingMentors,
//     totalBookings: bookings.length,
//     upcomingSessions: upcoming,
//   };
// }
// export function submitContactForm(form: ContactForm) {
//   const forms = read<ContactForm[]>(KEY.contact, []);
//   forms.push(form);
//   write(KEY.contact, forms);
//   return true;
// }

// // ===================================================================
// // COMPAT SHIMS so your existing files don't need to change
// // ===================================================================

// // normalize packages from either shape
// function normalizePackages(input: any[], currencyFallback: CurrencyCode = "USD"): SessionPackage[] {
//   return input.map((p, i) => {
//     const minutes = typeof p.minutes === "number" ? p.minutes :
//                     typeof p.duration === "number" ? p.duration : 30;
//     const id: string = p.id ?? `pkg-${minutes}`;
//     const label: string = p.label ?? `${minutes} min`;
//     const price: number = typeof p.price === "number" ? p.price : 0;
//     const currency: CurrencyCode = (p.currency ?? currencyFallback) as CurrencyCode;
//     const active: boolean = typeof p.active === "boolean" ? p.active : true;
//     return { id, label, minutes, price, currency, active };
//   });
// }

// // normalize weekly schedule from either shape
// function normalizeWeekly(weekly: any[]): WeeklySlot[] {
//   return weekly.map((w: any) => {
//     const weekday: number = typeof w.weekday === "number" ? w.weekday :
//                             typeof w.day === "number" ? w.day : 1;
//     const active: boolean = typeof w.active === "boolean" ? w.active :
//                             typeof w.enabled === "boolean" ? w.enabled : true;
//     const start: string = w.start ?? "18:00";
//     const end: string = w.end ?? "21:00";
//     const id: string = w.id ?? uuid();
//     return { id, weekday, start, end, active };
//   });
// }

// /**
//  * updateMentorPricing(mentorId, packages)
//  * Accepts either [{minutes,price,currency,active}] or [{duration,price,...}]
//  */
// export function updateMentorPricing(mentorId: string, packagesInput: any[]) {
//   const m = getMentor(mentorId);
//   if (!m) return null;
//   const currencyFallback = (m.packages?.[0]?.currency ?? "USD") as CurrencyCode;
//   const normalized = normalizePackages(packagesInput, currencyFallback);
//   return updateMentorProfile(mentorId, { packages: normalized });
// }

// /**
//  * updateMentorWeeklySchedule(mentorId, weekly, bufferMinutes)
//  * Accepts weekly as [{weekday,start,end,active}] or [{day,start,end,enabled}]
//  */
// export function updateMentorWeeklySchedule(mentorId: string, weeklyInput: any[], bufferMinutes?: number) {
//   const m = getMentor(mentorId);
//   if (!m) return null;
//   const weekly = normalizeWeekly(weeklyInput);
//   return updateMentorProfile(mentorId, {
//     weeklySchedule: weekly,
//     ...(typeof bufferMinutes === "number" ? { bufferMinutes } : {})
//   });
// }

// /**
//  * getEarningsForMentor(mentorId)
//  * Returns { monthToDate, lifetime, pendingPayouts, transactions[] }
//  */
// export function getEarningsForMentor(mentorId: string) {
//   const all = listBookings({ mentorId });
//   const valid = all.filter(b => b.status !== "cancelled");
//   const now = new Date();
//   const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

//   const monthToDate = valid
//     .filter(b => new Date(b.startIso) >= startOfMonth && new Date(b.startIso) <= now)
//     .reduce((acc, b) => acc + (b.price || 0), 0);

//   const lifetime = valid.reduce((acc, b) => acc + (b.price || 0), 0);

//   // Demo: assume all completed are paid, confirmed are pending.
//   const pendingPayouts = valid
//     .filter(b => b.status === "confirmed")
//     .reduce((acc, b) => acc + (b.price || 0), 0);

//   const transactions = valid.slice(-10).map(b => ({
//     id: b.id,
//     date: b.startIso,
//     client: b.clientId,
//     amount: b.price || 0,
//     status: (b.status === "confirmed" ? "pending" : "paid") as "pending" | "paid",
//   }));

//   return { monthToDate, lifetime, pendingPayouts, transactions };
// }

// // ===================================================================
// // NEW: tiny helpers for Admin actions (approve/reject/pending)
// // ===================================================================

// function updateMentorStatus(id: string, status: 'pending' | 'approved' | 'rejected' | 'active') {
//   const m = getMentor(id);
//   if (!m) return null;
//   const updated = { ...m, status: status as any };
//   upsertMentorProfile(updated);
//   return updated;
// }

// /** Mark a mentor as approved */
// export function approveMentor(mentorId: string) {
//   return updateMentorStatus(mentorId, 'approved');
// }

// /** Mark a mentor as rejected (removed from pending lists) */
// export function rejectMentor(mentorId: string) {
//   return updateMentorStatus(mentorId, 'rejected');
// }

// /** Mark a mentor as pending (useful when adding new mentor applications) */
// export function markMentorPending(mentorId: string) {
//   return updateMentorStatus(mentorId, 'pending');
// }



// src/lib/data.ts
import {
  Mentor, WeeklySlot, TimeOff, TimeSlot, SessionPackage,
  Booking, BookingStatus, User, AdminStats, ContactForm, CurrencyCode
} from "./types";
import { supabase } from "@/lib/supabase";

/* =========================================================
   LocalStorage helpers (kept so your UI doesn't break)
   ========================================================= */
const LS = (() => {
  try { return window?.localStorage ?? null } catch { return null }
})();
const MENTOR_ID_CACHE_KEY = "currentMentorId";
const KEY = {
  users: 'mc.users',
  mentors: 'mc.mentors',
  slots: 'mc.slots',
  bookings: 'mc.bookings',
  reviews: 'mc.reviews',
  currentUser: 'mc.currentUser',
  currentMentorId: 'mc.currentMentorId',
  contact: 'mc.contact',
  auth: 'mc.auth',
} as const;

type Id = string;
type ApplicationStatus = 'pending' | 'approved' | 'rejected';
const nowIso = () => new Date().toISOString();
const uuid = () => Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2);

function read<T>(k: string, fallback: T): T {
  if (!LS) return fallback;
  const raw = LS.getItem(k);
  if (!raw) return fallback;
  try { return JSON.parse(raw) as T } catch { return fallback }
}
function write<T>(k: string, v: T) {
  if (!LS) return;
  LS.setItem(k, JSON.stringify(v));
}
function upsert<T extends { id: Id }>(k: string, item: T) {
  const arr = read<T[]>(k, []);
  const idx = arr.findIndex(x => x.id === item.id);
  if (idx >= 0) arr[idx] = item; else arr.push(item);
  write(k, arr);
  return item;
}
/** Supabase FK joins sometimes return an array; sometimes an object.
 *  This normalizes to the first object (or undefined). */
function firstOrUndefined<T = any>(x: any): T | undefined {
  return Array.isArray(x) ? (x[0] as T | undefined) : (x as T | undefined);
}


/* =========================================================
   0) Seed: NO-OP (prevents demo overwrites)
   ========================================================= */
export function seedDemoData() {
  // no-op: intentionally left blank
}

/* =========================================================
   1) AUTH — Supabase-backed, but also keeps your cache in sync
   ========================================================= */
type RoleLite = "client" | "mentor" | "admin";
type AuthUser = {
  id: Id;
  email: string;
  mobile: string;
  role: RoleLite;
  password: string; // demo-only fallback (kept for compatibility)
};

function getAuthUsers(): AuthUser[] { return read<AuthUser[]>(KEY.auth, []); }
function saveAuthUsers(list: AuthUser[]) { write(KEY.auth, list); }

// Helper: store a lightweight currentUser for existing UI
function cacheCurrentUser(u: { id: string; role: RoleLite; name: string; email: string; avatar?: string; mentorId?: string }) {
  write(KEY.currentUser, u as User);
}

export async function registerUser(args: {
  email: string;
  mobile: string;
  role: RoleLite;
  password: string;
}) {
  const email = args.email.trim();
  const mobile = args.mobile.trim();
  const role = args.role;
  const password = args.password;

  // 1) Sign up and include role/mobile in metadata
  const { data: signUpData, error: signUpErr } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { mobile, role } },
  });
  if (signUpErr) throw signUpErr;

  // 2) Ensure we have a session (important when email confirmations are enabled)
  if (!signUpData.session) {
    const { data: s2, error: e2 } = await supabase.auth.signInWithPassword({ email, password });
    if (e2) throw e2;
  }
await claimApprovedMentorForCurrentUser();
  // 3) Get the authed user id
  const { data: uinfo } = await supabase.auth.getUser();
  const uid = uinfo?.user?.id;
  if (!uid) throw new Error("No session after sign up");

  // 4) Upsert profile with the chosen role (idempotent)
  const { data: profUp, error: profErr } = await supabase
    .from("profiles")
    .upsert(
      { user_id: uid, name: email.split("@")[0], email, role, phone: mobile, verified: role === "client" },
      { onConflict: "user_id" }
    )
    .select("id")
    .single();
  if (profErr) throw profErr;
  const profileId = profUp?.id;

  // 5) If role=mentor, ensure a mentors row exists for this user (idempotent)
  if (role === "mentor" && profileId) {
    const { error: mErr } = await supabase
      .from("mentors")
      .upsert(
        { user_id: uid, profile_id: profileId, availability: "high", reviews: 0, application_status: 'pending' as ApplicationStatus },
        { onConflict: "user_id" }
      );
    if (mErr) throw mErr;
  }

  // 6) Update our local cache for your existing UI
  cacheCurrentUser({ id: uid, role, name: email.split("@")[0], email });

  // 7) Keep legacy demo-auth list for compatibility (optional)
  const exists = getAuthUsers().some(u => u.email.toLowerCase() === email.toLowerCase());
  if (!exists) {
    const authRec: AuthUser = { id: uid, email, mobile, role, password };
    const auths = getAuthUsers(); auths.push(authRec); saveAuthUsers(auths);
  }

  return { id: uid, role, name: email.split("@")[0], email } as User;
}

export async function authenticateUser(email: string, password: string): Promise<User | null> {
  // 1) Sign in
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) return null;

  // 2) Ensure a session & get uid
  const { data: uinfo } = await supabase.auth.getUser();
  const uid = uinfo?.user?.id;
  if (!uid) return null;

  // 3) Ensure a profile exists (idempotent)
  const { data: existing } = await supabase
    .from("profiles")
    .select("id, role, name, email, avatar")
    .eq("user_id", uid)
    .maybeSingle();

  if (!existing) {
    const roleFromMeta = (uinfo.user?.user_metadata?.role as "client" | "mentor" | "admin") ?? "client";
    const mobileFromMeta = (uinfo.user?.user_metadata?.mobile as string | undefined) ?? null;
    const nameFromEmail = (uinfo.user?.email ?? "").split("@")[0];

    const { data: prof, error: upErr } = await supabase
      .from("profiles")
      .upsert(
        {
          user_id: uid,
          name: nameFromEmail,
          email: uinfo.user?.email ?? "",
          role: roleFromMeta,
          phone: mobileFromMeta,
          // new accounts visible only after admin approval
          verified: roleFromMeta === "client",
        },
        { onConflict: "user_id" }
      )
      .select("id, role, name, email, avatar")
      .single();
    if (upErr) throw upErr;

    // If mentor, ensure a mentors row exists (idempotent)
    if (prof?.id && roleFromMeta === "mentor") {
      const { error: mErr } = await supabase
        .from("mentors")
        .upsert(
          { user_id: uid, profile_id: prof.id, availability: "high", reviews: 0, application_status: 'pending' as ApplicationStatus },
          { onConflict: "user_id" }
        );
      if (mErr) throw mErr;
    }
  }

  // ✅ NEW: if this user is a mentor, resolve & cache their mentorId for the dashboard
  try {
    const { data: m } = await supabase
      .from("mentors")
      .select("id")
      .eq("user_id", uid)
      .maybeSingle();
    if (m?.id) {
      setCurrentMentorId(m.id); // caches to localStorage for Upcoming, etc.
    }
  } catch {
    // non-fatal; continue
  }

  // 4) Pull profile (now guaranteed to exist) to determine role/name/avatar
  const { data: prof2 } = await supabase
    .from("profiles")
    .select("user_id, name, email, role, avatar")
    .eq("user_id", uid)
    .maybeSingle();

  const name = prof2?.name ?? (email.split("@")[0]);
  const role = (prof2?.role as "client" | "mentor" | "admin") ?? "client";
  const avatar = prof2?.avatar ?? "";

  const current: User = { id: uid, role, name, email, avatar };
  cacheCurrentUser(current);
  return current;
}


export function isAuthenticated(): boolean {
  // Kept sync for your existing components; reflects our cached session
  return !!read<User | null>(KEY.currentUser, null);
}
export function getCurrentUser(): User {
  const u = read<User | null>(KEY.currentUser, null);
  if (!u) return { id: 'anon', role: 'client', name: 'Guest', email: 'guest@local', avatar: '' };
  return u;
}
export async function logout() {
  await supabase.auth.signOut();
  LS?.removeItem(KEY.currentUser);
  LS?.removeItem(KEY.currentMentorId);
}

export function setCurrentUser(user: User | null) {
  if (user) write(KEY.currentUser, user);
  else LS?.removeItem(KEY.currentUser);
}
export function setCurrentMentorId(id: string) { write(KEY.currentMentorId, id); }

/* ✅ Safer mentor ID handling */
export function getCurrentMentorId(): string {
  const cached = read<string>(KEY.currentMentorId, "");
  // never allow 'fallback' to leak into queries
  if (!cached || cached === "fallback") return "";
  return cached;
}

export async function getOrLoadMentorId(): Promise<string | null> {
  const cached = read<string>(KEY.currentMentorId, "");
  if (cached) return cached;
  const { data, error } = await supabase.from("mentors").select("id").limit(1);
  if (error) return null;
  const found = data?.[0]?.id ?? null;
  if (found) write(KEY.currentMentorId, found);
  return found;
}

/* =========================================================
   1.b) NEW — Helpers for Become-a-Mentor flow (email/phone + resume)
   ========================================================= */

/** Step 1: Save Basic Info — email + mobile/phone */
export async function saveBasicInfo({
  profileId,
  email,
  mobile,
  phone,          // <- also accept `phone` for callers that use this name
  name,
}: {
  profileId: string;
  email?: string | null;
  mobile?: string | null;
  phone?: string | null;   // <- added
  name?: string | null;
}) {
  const phoneValue = (mobile ?? phone) ?? null; // prefer mobile, fall back to phone
  const { error } = await supabase
    .from("profiles")
    .update({ email: email ?? null, phone: phoneValue, name: name ?? null })
    .eq("id", profileId);
  if (error) throw error;
}

/** Step 2: Upload resume (private bucket 'resumes'); return object key (NO 'resumes/' prefix) */
export async function uploadResume(file: File, userId: string) {
  const ext = file.name.split('.').pop()?.toLowerCase() || 'pdf';
  // IMPORTANT: store as "<uid>/filename.pdf" so RLS policy (foldername(name))[1] = auth.uid() matches
  const key = `${userId}/${Date.now()}-resume.${ext}`;
  const { error } = await supabase.storage.from('resumes').upload(key, file, {
    cacheControl: '3600',
    upsert: false,
    contentType: file.type || 'application/pdf',
  });
  if (error) throw error;
  return key; // store this in mentors.resume_url
}

/** Generate short-lived link so Admin can preview a private resume */
export async function getResumeSignedUrl(path: string, expiresInSeconds = 60) {
  if (!path) return null;
  const { data, error } = await supabase.storage.from('resumes').createSignedUrl(path, expiresInSeconds);
  if (error) throw error;
  return data.signedUrl;
}

/** Step 2/3 submit: create/update mentor application with resume + expertise, set status 'pending' */
export async function upsertMentorApplication({
  userId,
  profileId,
  resumePath,
  specialties,
  experience,
}: {
  userId: string;
  profileId: string;
  resumePath: string | null;
  specialties?: string[];
  experience?: number;
}) {
  if (!userId) throw new Error("Missing userId");
  if (!profileId) throw new Error("Missing profileId");

  // 1) keep profile in sync
  const profileUpdate: any = {};
  if (Array.isArray(specialties)) profileUpdate.specialties = specialties.length ? specialties : null;
  if (typeof experience === "number") profileUpdate.experience = experience;

  if (Object.keys(profileUpdate).length > 0) {
    const { error: pErr } = await supabase.from("profiles").update(profileUpdate).eq("id", profileId);
    if (pErr) throw pErr;
  }

  // 2) find an existing mentors row by user_id OR profile_id
  const { data: existing, error: selErr } = await supabase
    .from("mentors")
    .select("id, user_id, profile_id")
    .or(`user_id.eq.${userId},profile_id.eq.${profileId}`)
    .maybeSingle();
  if (selErr) throw selErr;

  const payload = {
    user_id: userId,                 // ✅ never null
    profile_id: profileId,           // ✅ never null
    resume_url: resumePath ?? null,
    application_status: "pending" as const,
  };

  if (existing?.id) {
    const { error: upErr } = await supabase.from("mentors").update(payload).eq("id", existing.id);
    if (upErr) throw upErr;
  } else {
    const { error: insErr } = await supabase.from("mentors").insert(payload);
    if (insErr) throw insErr;
  }
}
/* =========================================================
   2) MENTORS — Supabase reads (kept same function names)
   ========================================================= */
export async function listMentors(): Promise<Mentor[]> {
  const { data, error } = await supabase
    .from("mentors")
    .select(`
      id, user_id, profile_id, availability, reviews, application_status, resume_url,
      profiles:profile_id (
        name, email, phone, avatar, title, company, experience, rating, bio, verified, price, specialties, timezone
      )
    `);
  if (error) throw error;

  return (data ?? []).map((row: any) => {
    const p = firstOrUndefined<any>(row.profiles) || {};

    const m: Mentor = {
      id: row.id,
      user_id: row.user_id,                       // ✅ add
      profile_id: row.profile_id,                 // ✅ add
      application_status: (row.application_status as ApplicationStatus) ?? 'pending', // ✅ add

      name: p.name,
      title: p.title,
      company: p.company,
      avatar: p.avatar,
      verified: !!p.verified,
      experience: p.experience ?? 0,
      price: p.price ?? 0,
      rating: p.rating ?? 0,
      reviews: row.reviews ?? 0,
      specialties: p.specialties ?? [],
      availability: row.availability ?? 'high',
      timezone: p.timezone ?? "UTC",
      bio: p.bio ?? '',

      // Optional/compat
      headline: p.title ? `${p.title} @ ${p.company ?? ""}`.trim() : "",
      languages: [],
      yearsOfExperience: p.experience ?? 0,
      packages: [],
      weeklySchedule: [],
      bufferMinutes: 15,
      timeOff: [],
      status: 'active',
      payoutConnected: false,
    };
    return m;
  });
}


/** NEW: for Find Mentors — only approved & verified mentors */
export async function listApprovedMentors(): Promise<Mentor[]> {
  const { data, error } = await supabase
    .from("mentors")
    .select(`
      id, user_id, profile_id, availability, reviews, application_status,
      profiles:profile_id (
        name, email, phone, avatar, title, company, experience, rating, bio, verified, specialties, timezone
      )
    `)
    .eq("application_status", "approved");
  if (error) throw error;

  return (data ?? []).map((row: any) => {
    const p = firstOrUndefined<any>(row.profiles) || {};
    const m: Mentor = {
      id: row.id,
      user_id: row.user_id,                       // ✅ add
      profile_id: row.profile_id,                 // ✅ add
      application_status: (row.application_status as ApplicationStatus) ?? 'approved', // ✅ add

      name: p.name,
      title: p.title,
      company: p.company,
      avatar: p.avatar,
      verified: !!p.verified,
      experience: p.experience ?? 0,
      price: 0,
      rating: p.rating ?? 0,
      reviews: row.reviews ?? 0,
      specialties: p.specialties ?? [],
      availability: row.availability ?? 'high',
      timezone: p.timezone ?? "UTC",
      bio: p.bio ?? '',
      headline: p.title ? `${p.title} @ ${p.company ?? ""}`.trim() : "",
      languages: [],
      yearsOfExperience: p.experience ?? 0,
      packages: [],
      weeklySchedule: [],
      bufferMinutes: 15,
      timeOff: [],
      status: 'active',
      payoutConnected: false,
    };
    return m;
  });
}


export async function getMentor(id: string): Promise<Mentor | null> {
  const { data, error } = await supabase
    .from("mentors")
    .select(`
      id, user_id, profile_id, availability, reviews, application_status, resume_url,
      profiles:profile_id (
        name, email, phone, avatar, title, company, experience, rating, bio, verified, price, specialties, timezone
      )
    `)
    .eq("id", id)
    .maybeSingle();
  if (error) throw error;
  if (!data) return null;
  const p = firstOrUndefined<any>((data as any).profiles) || {};

  const m: Mentor = {
    id: data.id,
    user_id: data.user_id,                           // ✅ add
    profile_id: data.profile_id,                     // ✅ add
    application_status: (data.application_status as ApplicationStatus) ?? 'pending', // ✅ add

    name: p.name,
    title: p.title,
    company: p.company,
    avatar: p.avatar,
    verified: !!p.verified,
    experience: p.experience ?? 0,
    price: p.price ?? 0,
    rating: p.rating ?? 0,
    reviews: data.reviews ?? 0,
    specialties: p.specialties ?? [],
    availability: data.availability ?? 'high',
    timezone: p.timezone ?? "UTC",
    bio: p.bio ?? '',
    headline: p.title ? `${p.title} @ ${p.company ?? ""}`.trim() : "",
    languages: [],
    yearsOfExperience: p.experience ?? 0,
    packages: [],
    weeklySchedule: [],
    bufferMinutes: 15,
    timeOff: [],
    status: 'active',
    payoutConnected: false,
  };
  return m;
}

/** Resolve the mentor row for the logged-in user (by auth.uid). */
export async function getMyMentorId(): Promise<string | null> {
  const { data: uinfo } = await supabase.auth.getUser();
  const uid = uinfo?.user?.id ?? "";
  if (!uid) return null;

  const { data, error } = await supabase
    .from("mentors")
    .select("id")
    .eq("user_id", uid)
    .maybeSingle();

  if (error) return null;
  return data?.id ?? null;
}

export async function listUpcomingForMentor(mentorId: string) {
  const nowIso = new Date().toISOString();

  const { data, error } = await supabase
    .from("bookings")
    .select(`
      id, mentor_id, client_id, slot_id, status, created_at, updated_at,
      time_slots!inner ( start_iso, end_iso )
    `) // 👈 removed price, currency
    .eq("mentor_id", mentorId)
    .gt("time_slots.start_iso", nowIso)
    .order("start_iso", { ascending: true, foreignTable: "time_slots" });

  if (error) throw error;

  return (data ?? []).map((b: any) => ({
    id: b.id,
    mentorId: b.mentor_id,
    clientId: b.client_id,
    slotId: b.slot_id,
    status: b.status ?? "confirmed",
    createdAt: b.created_at,
    updatedAt: b.updated_at,
    startIso: b.time_slots?.start_iso ?? "",
    endIso: b.time_slots?.end_iso ?? "",
    // keep safe defaults; these fields don't exist in DB
    price: 0,
    currency: "USD",
  }));
}


// Leave these as local-only for now (you can DB-ify later if you want full profile editing UI)
export function upsertMentorProfile(mentor: Mentor) {
  return upsert<Mentor>(KEY.mentors, mentor);
}
export function updateMentorProfile(id: string, patch: Partial<Mentor>) {
  const m = read<Mentor[]>(KEY.mentors, []).find(x => x.id === id);
  if (!m) return null;
  const updated = { ...m, ...patch };
  upsertMentorProfile(updated);
  if (patch.weeklySchedule || typeof patch.bufferMinutes !== "undefined" || patch.timeOff) {
    regenerateSlotsForMentor(updated);
  }
  return updated;
}
export function clearCurrentMentorId() {
  try { localStorage.removeItem(MENTOR_ID_CACHE_KEY); } catch {}
}

// If you cache the current user/role anywhere, clear it here.
// Adjust keys to whatever you actually use.
export function clearUserCache() {
  const keys = [
    "aw.currentUser",
    "currentUser",
    "user",
    "aw.user",
  ];
  try { keys.forEach(k => localStorage.removeItem(k)); } catch {}
  try { keys.forEach(k => sessionStorage.removeItem(k)); } catch {}
}
/* =========================================================
   3) SLOTS — Supabase reads
   ========================================================= */
export async function listSlotsForMentor(mentorId: string): Promise<TimeSlot[]> {
  const { data, error } = await supabase
    .from("time_slots")
    .select("id, mentor_id, start_iso, end_iso, available")
    .eq("mentor_id", mentorId)
    .order("start_iso", { ascending: true });
  if (error) throw error;

  return (data ?? []).map((s: any) => ({
    id: s.id,
    mentorId: s.mentor_id,
    startIso: s.start_iso,
    endIso: s.end_iso,
    available: s.available,
  }));
}


/* =========================================================
   4) BOOKINGS — Supabase list + atomic RPC booking
   ========================================================= */
export async function listBookings(opts?: { mentorId?: string; clientId?: string; status?: BookingStatus }) {
  // Join to time_slots to get start/end
  let q = supabase
  .from("bookings")
  .select(`
    id, mentor_id, client_id, slot_id, status, created_at, updated_at,
    time_slots:slot_id ( start_iso, end_iso )
  `) // 👈 removed price, currency
  .order("created_at", { ascending: false });
  
  if (opts?.mentorId) q = q.eq("mentor_id", opts.mentorId);
  if (opts?.clientId) q = q.eq("client_id", opts.clientId);
  if (opts?.status)   q = q.eq("status", opts.status);

  const { data, error } = await q;
  if (error) throw error;

  // Map DB shape -> UI Booking shape
  return (data ?? []).map((b: any) => {
    const ts = firstOrUndefined<any>(b.time_slots) || {};

    return {
      id: b.id,
      mentorId: b.mentor_id,
      clientId: b.client_id,
      slotId: b.slot_id,
      packageId: b.package_id ?? undefined,
      note: b.note ?? undefined,
      status: (b.status ?? "confirmed") as BookingStatus,
      createdAt: b.created_at ?? nowIso(),
      updatedAt: b.updated_at ?? nowIso(),
      startIso: ts.start_iso ?? "",
      endIso: ts.end_iso ?? "",
      price: b.price ?? 0,
      currency: (b.currency ?? "USD") as CurrencyCode,
    } as Booking;
  });
}

/**
 * bookSlot(mentorId, slotId, ...legacyArgs)
 * Keeps your legacy signature:
 *  - legacy style: (mentorId, slotId, clientName, clientEmail)
 *  - new style:    (mentorId, slotId, clientId?, packageId?, note?)
 * Returns a Booking object (fetched after RPC).
 */
export async function bookSlot(
  mentorId: string,
  slotId: string,
  a?: any, b?: any, c?: any
): Promise<Booking | null> {
  // Determine call style (legacy vs new). We don't actually need name/email for RPC,
  // but keep them for compatibility if your UI passes them.
  let menteeName = "";
  let menteeEmail = "";

  if (typeof a === "string" && typeof b === "string" && !c) {
    // legacy: (mentorId, slotId, clientName, clientEmail)
    menteeName = a;
    menteeEmail = b;
  } else {
    // new signature: ignore and just use auth.uid() on server
  }

  // Call atomic RPC (uses auth.uid())
  const { data: bookingId, error } = await supabase.rpc("book_slot", {
    _mentor_id: mentorId,
    _slot_id: slotId,
    _mentee_name: menteeName,
    _mentee_email: menteeEmail,
  });
  if (error) throw error;
  if (!bookingId) return null;

  // Fetch the full booking with slot times
  const { data, error: getErr } = await supabase
    .from("bookings")
    .select(`
      id, mentor_id, client_id, slot_id, status, created_at, updated_at, mentee_name, mentee_email,
      time_slots:slot_id ( start_iso, end_iso )
    `)
    .eq("id", bookingId as string)
    .single();

  if (getErr) throw getErr;

  const ts = firstOrUndefined<any>((data as any).time_slots) || {};

  const mapped: Booking = {
    id: data.id,
    mentorId: data.mentor_id,
    clientId: data.client_id,
    slotId: data.slot_id,
    status: (data.status ?? "confirmed") as BookingStatus,
    createdAt: data.created_at ?? nowIso(),
    updatedAt: data.updated_at ?? nowIso(),
    startIso: ts.start_iso ?? "",
    endIso: ts.end_iso ?? "",
    // optional fields if you later store them:
    price: 0,
    currency: "USD",
  };
  return mapped;
}

/* =========================================================
   5) Reschedule/Cancel — NOW DB-backed via RPC (Phase 2)
   ========================================================= */
export async function rescheduleBooking(bookingId: string, newSlotId: string, reason?: string) {
  const { data, error } = await supabase.rpc("reschedule_booking", {
    _booking_id: bookingId,
    _new_slot_id: newSlotId,
    _reason: reason ?? null,
  });
  if (error) throw error;
  return data; // booking id
}
export async function rescheduleBookingDb(bookingId: string, newSlotId: string, reason?: string) {
  const { data, error } = await supabase.rpc("reschedule_booking", {
    _booking_id: bookingId,
    _new_slot_id: newSlotId,
    _reason: reason ?? null,
  });
  if (error) throw error;
  return data as string; // booking id
}
export async function cancelBooking(bookingId: string, reason?: string) {
  const { data, error } = await supabase.rpc("cancel_booking", {
    _booking_id: bookingId,
    _reason: reason ?? null,
  });
  if (error) throw error;
  return data; // booking id
}
// Mentor actions
export async function confirmBookingDb(bookingId: string) {
  const { data, error } = await supabase.rpc("confirm_booking", { _booking_id: bookingId });
  if (error) throw error;
  return data as string;
}

export async function declineBookingDb(bookingId: string, reason?: string) {
  const { data, error } = await supabase.rpc("decline_booking", {
    _booking_id: bookingId,
    _reason: reason ?? null,
  });
  if (error) throw error;
  return data as string;
}


/* =========================================================
   6) Admin / Contact — NOW DB-backed (Phase 2)
   ========================================================= */

/** NEW: list mentor applications for Admin (optionally filter by status) */
export async function listMentorApplicants(status?: ApplicationStatus) {
  let q = supabase
    .from("mentors")
    .select(`
      id,
      user_id,
      profile_id,
      resume_url,
      application_status,
      created_at,
      profiles:profile_id (
        id, name, email, phone, role, verified, specialties, experience
      )
    `)
    .order("created_at", { ascending: false });

  if (status) q = q.eq("application_status", status);
  const { data, error } = await q;
  if (error) throw error;
  return data;
}

/** FIND a profile by email (admin add-mentor flow) */
export async function findProfileByEmail(email: string) {
  const { data, error } = await supabase
    .from("profiles")
    .select("id, user_id, name, email, phone, role, verified")
    .ilike("email", email)
    .maybeSingle();
  if (error) throw error;
  return data;
}

/** SET a profile's role (admin add-mentor flow) */
export async function setProfileRole(profileId: string, role: "mentor" | "client" | "admin") {
  const { error } = await supabase.from("profiles").update({ role }).eq("id", profileId);
  if (error) throw error;
}

/** Admin upsert mentor (optionally approve immediately) */
export async function adminCreateOrUpdateMentor({
  userId,
  profileId,
  resumePath,
  specialties,
  experience,
  status,
}: {
  userId: string;
  profileId: string;
  resumePath: string | null;
  specialties?: string[] | string | null;
  experience?: number | null;
  status: ApplicationStatus; // 'approved' | 'pending' | 'rejected'
}) {
  // upsert profiles.experience/specialties
  const { error: profErr } = await supabase
    .from("profiles")
    .update({
      specialties: Array.isArray(specialties) ? specialties : specialties ?? null,
      experience: experience ?? null,
    })
    .eq("id", profileId);
  if (profErr) throw profErr;

  // upsert mentor row
  const { data: existing, error: selErr } = await supabase
    .from("mentors")
    .select("id")
    .eq("user_id", userId)
    .maybeSingle();
  if (selErr) throw selErr;

  const payload = {
    user_id: userId,
    profile_id: profileId,
    resume_url: resumePath,
    application_status: status,
  };

  if (existing?.id) {
    const { error } = await supabase.from("mentors").update(payload).eq("id", existing.id);
    if (error) throw error;
    return existing.id;
  } else {
    const { data, error } = await supabase.from("mentors").insert(payload).select("id").single();
    if (error) throw error;
    return data.id as string;
  }
}

// Admin stats from DB
export async function getAdminStats(): Promise<AdminStats> {
  // mentors
  const { count: mentorsCount } = await supabase
    .from("mentors")
    .select("id", { count: "exact" });

  // bookings
  const { data: bookingsData, error: bookingsErr } = await supabase
    .from("bookings")
    .select(`
      id, status,
      time_slots:slot_id ( start_iso )
    `);
  if (bookingsErr) throw bookingsErr;

  const totalBookings = bookingsData?.length ?? 0;
  const upcomingSessions = (bookingsData ?? []).filter(b => {
    const ts = firstOrUndefined<any>(b.time_slots);
    const start = ts?.start_iso ? new Date(ts.start_iso) : null;
    return start && start > new Date() && b.status !== 'cancelled';
  }).length;

  // pending mentors via mentors.application_status = 'pending'
  const { count: pendingMentors } = await supabase
    .from("mentors")
    .select("id", { count: "exact" })
    .eq("application_status", "pending");

  return {
    totalMentors: mentorsCount ?? 0,
    pendingMentors: pendingMentors ?? 0,
    totalBookings,
    upcomingSessions,
  };
}

// Contact form to DB
export async function submitContactForm(form: ContactForm) {
  const anyForm = form as any;
  const name = anyForm.name ?? anyForm.fullName ?? "";
  const email = anyForm.email ?? anyForm.contactEmail ?? "";
  const message =
    anyForm.message ??
    anyForm.body ??
    anyForm.content ??
    anyForm.notes ??
    ""; // last resort

  const { error } = await supabase.from("contact_forms").insert({
    name,
    email,
    message,
  });
  if (error) throw error;
  return true;
}


/* =========================================================
   7) Weekly schedule & pricing — NOW DB-backed (Phase 2)
   ========================================================= */

// Replace pricing with DB-backed mentor_packages
export async function updateMentorPricing(mentorId: string, packagesInput: any[]) {
  // Wipe & insert (simple). You can optimize later.
  const { error: delErr } = await supabase.from("mentor_packages").delete().eq("mentor_id", mentorId);
  if (delErr) throw delErr;

  const rows = (packagesInput ?? []).map((p: any) => ({
    mentor_id: mentorId,
    name: String(p.name ?? p.label ?? "Session"),
    duration_min: Number(p.durationMin ?? p.minutes ?? 60),
    price: Number(p.price ?? 0),
  }));

  if (rows.length) {
    const { error: insErr } = await supabase.from("mentor_packages").insert(rows);
    if (insErr) throw insErr;
  }
  return true;
}

// Generate slots in DB for next horizonDays
type WeeklyInput = { day: string; times: string[]; durationMin: number };
function dayNameToIndex(d: string): number {
  const map: Record<string, number> = { sun:0, mon:1, tue:2, wed:3, thu:4, fri:5, sat:6 };
  return map[d.slice(0,3).toLowerCase()];
}

export async function updateMentorWeeklySchedule(
  mentorId: string,
  weeklyInput: WeeklyInput[],
  bufferMinutes?: number,
  horizonDays = 30
) {
  // 1) delete future slots for this mentor
  const nowISO = new Date().toISOString();
  const { error: delErr } = await supabase
    .from("time_slots")
    .delete()
    .eq("mentor_id", mentorId)
    .gt("start_iso", nowISO);
  if (delErr) throw delErr;

  // 2) build new slots from weekly pattern
  const slotsToInsert: any[] = [];
  const now = new Date();
  for (let i = 0; i < horizonDays; i++) {
    const d = new Date(now);
    d.setDate(d.getDate() + i);
    const dow = d.getDay(); // 0..6

    const matches = weeklyInput.filter(w => dayNameToIndex(w.day) === dow);
    for (const w of matches) {
      for (const t of w.times) {
        const [HH, MM] = t.split(":").map(Number);
        const start = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate(), HH, MM, 0));
        const end = new Date(start.getTime() + (w.durationMin * 60_000));

        slotsToInsert.push({
          mentor_id: mentorId,
          start_iso: start.toISOString(),
          end_iso: end.toISOString(),
          available: true,
        });

        // optional buffer spacing between back-to-back slots (handled by times array usually)
        if (bufferMinutes && bufferMinutes > 0) {
          // next slot time in UI should account for buffer when you generate times list
        }
      }
    }
  }

  if (slotsToInsert.length) {
    const { error: insErr } = await supabase.from("time_slots").insert(slotsToInsert);
    if (insErr) throw insErr;
  }
  return { inserted: slotsToInsert.length };
}

// Earnings pulled from DB: confirmed bookings * price (from profile)
export async function getEarningsForMentor(mentorId: string) {
  // mentor profile for base price
  const { data: mentor, error: mErr } = await supabase
    .from("mentors")
    .select("id, profile_id, profiles:profile_id ( price )")
    .eq("id", mentorId)
    .single();
  if (mErr) throw mErr;
  const prof = firstOrUndefined<any>(mentor?.profiles);
  const price = prof?.price ?? 0;

  // confirmed bookings and times
  const { data: bookings, error: bErr } = await supabase
    .from("bookings")
    .select(`
      id, status, created_at,
      time_slots:slot_id ( start_iso )
    `)
    .eq("mentor_id", mentorId);
  if (bErr) throw bErr;

  const confirmed = (bookings ?? []).filter(b => b.status === "confirmed");
  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

  const monthToDate = confirmed
    .filter(b => {
      const ts = firstOrUndefined<any>(b.time_slots);
      const s = ts?.start_iso ? new Date(ts.start_iso) : null;
      return s && s >= startOfMonth && s <= now;
    }).length * price;

  const lifetime = confirmed.length * price;

  const pendingPayouts = confirmed.length * price; // adjust to your payout rules

  const transactions = confirmed.slice(-10).map(b => ({
    id: b.id,
    date: (firstOrUndefined<any>(b.time_slots)?.start_iso) ?? b.created_at,
    client: "", // optionally join client profile
    amount: price,
    status: "pending" as "pending" | "paid",
  }));

  return { monthToDate, lifetime, pendingPayouts, transactions };
}

// Admin verification using RPC; keep same signature (mentorId) but resolve profile_id
async function getProfileIdForMentor(mentorId: string): Promise<string | null> {
  const { data, error } = await supabase
    .from("mentors")
    .select("profile_id")
    .eq("id", mentorId)
    .maybeSingle();
  if (error) return null;
  return data?.profile_id ?? null;
}

/** UPDATED: Approve also sets mentors.application_status = 'approved' */
export async function approveMentor(mentorId: string) {
  const profileId = await getProfileIdForMentor(mentorId);
  if (!profileId) throw new Error("Profile not found for mentor");

  // flip verified
  const { error: vErr } = await supabase.rpc("admin_set_verified", { _profile_id: profileId, _verified: true });
  if (vErr) throw vErr;

  // set application approved
  const { error: aErr } = await supabase
    .from("mentors")
    .update({ application_status: 'approved' as ApplicationStatus })
    .eq("id", mentorId);
  if (aErr) throw aErr;

  return true;
}

/** UPDATED: Reject also sets mentors.application_status = 'rejected' */
export async function rejectMentor(mentorId: string) {
  const profileId = await getProfileIdForMentor(mentorId);
  if (!profileId) throw new Error("Profile not found for mentor");

  const { error: vErr } = await supabase.rpc("admin_set_verified", { _profile_id: profileId, _verified: false });
  if (vErr) throw vErr;

  const { error: aErr } = await supabase
    .from("mentors")
    .update({ application_status: 'rejected' as ApplicationStatus })
    .eq("id", mentorId);
  if (aErr) throw aErr;

  return true;
}
export async function markMentorPending(mentorId: string) {
  // Treat pending as verified=false + mentors.application_status='pending'
  const profileId = await getProfileIdForMentor(mentorId);
  if (!profileId) throw new Error("Profile not found for mentor");

  const { error: vErr } = await supabase.rpc("admin_set_verified", { _profile_id: profileId, _verified: false });
  if (vErr) throw vErr;

  const { error: aErr } = await supabase
    .from("mentors")
    .update({ application_status: 'pending' as ApplicationStatus })
    .eq("id", mentorId);
  if (aErr) throw aErr;

  return true;
}
// Create slots for specific dates (selected on a calendar)
export async function createSlotsForDates(
  mentorId: string,
  dates: Date[],
  startHHMM: string,   // e.g. "09:00"
  endHHMM: string,     // e.g. "12:00"
  durationMin: number  // e.g. 30
) {
  if (!dates?.length) return { inserted: 0 };
  const [sH, sM] = startHHMM.split(":").map(Number);
  const [eH, eM] = endHHMM.split(":").map(Number);

  function toUTCISO(d: Date, h: number, m: number) {
    const dt = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate(), h, m, 0));
    return dt.toISOString();
  }

  const rows: any[] = [];
  for (const d of dates) {
    // build slots within the window for this day
    let cursor = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate(), sH, sM, 0));
    const end = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate(), eH, eM, 0));
    while (new Date(cursor.getTime() + durationMin * 60_000) <= end) {
      const slotEnd = new Date(cursor.getTime() + durationMin * 60_000);
      rows.push({
        mentor_id: mentorId,
        start_iso: cursor.toISOString(),
        end_iso: slotEnd.toISOString(),
        available: true,
      });
      cursor = slotEnd; // no buffer here; add buffer after if you want
    }
  }

  if (!rows.length) return { inserted: 0 };
  const { error } = await supabase.from("time_slots").insert(rows);
  if (error) throw error;
  return { inserted: rows.length };
}


/* =========================================================
   8) Compatibility helpers (unchanged local utilities)
   ========================================================= */
function parseHHMM(hhmm: string) {
  const [h, m] = hhmm.split(':').map(Number);
  return { h, m };
}
function addMinutes(d: Date, minutes: number) {
  const x = new Date(d);
  x.setMinutes(x.getMinutes() + minutes);
  return x;
}
function isWithinTimeOff(date: Date, timeOff: TimeOff[]) {
  const d = new Date(date.toISOString().slice(0, 10));
  return timeOff?.some(off => {
    const start = new Date(off.startDate);
    const end = new Date(off.endDate);
    return d >= start && d <= end; // inclusive
  }) ?? false;
}
export function generateSlotsFromWeekly(m: Mentor, horizonDays = 30): TimeSlot[] {
  const slots: TimeSlot[] = [];
  if (!m.weeklySchedule?.length) return slots;

  const buffer = m.bufferMinutes ?? 0;
  const pkgMin = Math.min(...(m.packages?.filter(p => p.active).map(p => p.minutes) ?? [30]));

  const now = new Date();
  for (let delta = 0; delta < horizonDays; delta++) {
    const day = new Date(now);
    day.setDate(now.getDate() + delta);
    const weekday = day.getDay();

    const wslots = m.weeklySchedule.filter(w => w.weekday === weekday && w.active);
    if (!wslots.length) continue;
    if (isWithinTimeOff(day, m.timeOff ?? [])) continue;

    for (const w of wslots) {
      const { h: sh, m: sm } = parseHHMM(w.start);
      const { h: eh, m: em } = parseHHMM(w.end);

      const start = new Date(day);
      start.setHours(sh, sm, 0, 0);
      const end = new Date(day);
      end.setHours(eh, em, 0, 0);

      let cursor = new Date(start);
      while (addMinutes(cursor, pkgMin) <= end) {
        const slotEnd = addMinutes(cursor, pkgMin);
        slots.push({
          id: uuid(),
          mentorId: m.id,
          startIso: cursor.toISOString(),
          endIso: slotEnd.toISOString(),
          available: true,
        });
        cursor = addMinutes(slotEnd, buffer);
      }
    }
  }
  return slots;
}
function regenerateSlotsForMentor(m: Mentor) {
  const all = read<TimeSlot[]>(KEY.slots, []);
  const filtered = all.filter(s => s.mentorId !== m.id);
  const newOnes = generateSlotsFromWeekly(m);
  write(KEY.slots, [...filtered, ...newOnes]);
}

// (local-only versions kept for compatibility, but superseded above by DB versions)
function normalizePackages(input: any[], currencyFallback: CurrencyCode = "USD"): SessionPackage[] {
  return input.map((p) => {
    const minutes = typeof p.minutes === "number" ? p.minutes :
                    typeof p.duration === "number" ? p.duration : 30;
    const id: string = p.id ?? `pkg-${minutes}`;
    const label: string = p.label ?? `${minutes} min`;
    const price: number = typeof p.price === "number" ? p.price : 0;
    const currency: CurrencyCode = (p.currency ?? currencyFallback) as CurrencyCode;
    const active: boolean = typeof p.active === "boolean" ? p.active : true;
    return { id, label, minutes, price, currency, active };
  });
}
function normalizeWeekly(weekly: any[]): WeeklySlot[] {
  return weekly.map((w: any) => {
    const weekday: number = typeof w.weekday === "number" ? w.weekday :
                            typeof w.day === "number" ? w.day : 1;
    const active: boolean = typeof w.active === "boolean" ? w.active :
                            typeof w.enabled === "boolean" ? w.enabled : true;
    const start: string = w.start ?? "18:00";
    const end: string = w.end ?? "21:00";
    const id: string = w.id ?? uuid();
    return { id, weekday, start, end, active };
  });
}
/**
 * Claim an approved mentor application for the current user (by matching email),
 * link it to their account, and mark their profile as verified.
 * Returns:
 *   { claimed: true }  if a row was linked/verified,
 *   { claimed: false } if nothing to claim.
 */
export async function claimApprovedMentorForCurrentUser() {
  const { data: auth } = await supabase.auth.getUser();
  const uid = auth?.user?.id;
  if (!uid) return;

  const { data: prof } = await supabase
    .from("profiles")
    .select("id, email")
    .eq("user_id", uid)
    .maybeSingle();
  if (!prof) return;

  // find an approved row for this person (by user_id, profile_id, or email)
  const { data: row, error } = await supabase
    .from("mentors")
    .select("id, user_id, profile_id, application_status")
    .or(`user_id.eq.${uid},profile_id.eq.${prof.id},applicant_email.eq.${prof.email}`)
    .eq("application_status", "approved")
    .maybeSingle();
  if (error || !row) return;

  // attach it if needed
  if (row.user_id !== uid || row.profile_id !== prof.id) {
    await supabase.from("mentors").update({
      user_id: uid,
      profile_id: prof.id
    }).eq("id", row.id);
  }

  // ensure verified
  await supabase.from("profiles").update({ verified: true, role: "mentor" }).eq("id", prof.id);
}


