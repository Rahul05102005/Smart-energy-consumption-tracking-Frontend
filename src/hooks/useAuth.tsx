import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { api, cacheUser, clearSession, getStoredUser, getToken, type ApiUser } from '@/lib/api';
type AuthState = { user: ApiUser | null; session: { access_token: string } | null; loading: boolean; signOut: () => Promise<void> };
const AuthContext = createContext<AuthState>({ user: null, session: null, loading: true, signOut: async () => {} });
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user,setUser]=useState<ApiUser|null>(null); const [session,setSession]=useState<{access_token:string}|null>(null); const [loading,setLoading]=useState(true);
  useEffect(()=>{ let alive=true; const load=async()=>{ const token=getToken(); if(!token){if(alive){setUser(null);setSession(null);setLoading(false)}return} const cached=getStoredUser(); if(cached&&alive){setUser(cached);setSession({access_token:token})} try{const data=await api<{user:ApiUser}>('/auth/me');if(alive){cacheUser(data.user);setUser(data.user);setSession({access_token:token})}}catch{clearSession();if(alive){setUser(null);setSession(null)}}finally{if(alive)setLoading(false)}}; const changed=()=>{setLoading(true);void load()}; void load(); window.addEventListener('energytrack:auth',changed); window.addEventListener('storage',changed); return()=>{alive=false;window.removeEventListener('energytrack:auth',changed);window.removeEventListener('storage',changed)};},[]);
  return <AuthContext.Provider value={{user,session,loading,signOut:async()=>{clearSession();setUser(null);setSession(null)}}}>{children}</AuthContext.Provider>;
}
export function useAuth(){return useContext(AuthContext)}
