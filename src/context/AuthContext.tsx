import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User as FirebaseUser
} from 'firebase/auth';
import { auth } from '../config/firebase';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'customer' | 'vendor' | 'admin';
  phone?: string;
  preferences?: string[];
}

interface AuthContextType {
  user: User | null;
  firebaseUser: FirebaseUser | null;
  login: (email: string, password: string, expectedRole?: 'customer' | 'vendor' | 'admin') => Promise<boolean>;
  signup: (userData: {
    name: string;
    email: string;
    password: string;
    role: 'customer' | 'vendor' | 'admin';
    phone?: string;
    preferences?: string[];
  }) => Promise<boolean>;
  logout: () => Promise<void>;
  loading: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('Setting up Firebase Auth listener...');
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      console.log('Auth state changed:', firebaseUser ? 'User logged in' : 'User logged out');
      setFirebaseUser(firebaseUser);
      if (firebaseUser) {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          console.log('Stored user data:', parsedUser);
          setUser(parsedUser);
        }
      } else {
        setUser(null);
        localStorage.removeItem('user');
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async (email: string, password: string, expectedRole?: 'customer' | 'vendor' | 'admin'): Promise<boolean> => {
    try {
      console.log('Attempting login for email:', email, 'with expected role:', expectedRole);
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log('Firebase login successful:', userCredential);
      
      const mockUsers = [
        { id: '1', name: 'John Doe', email: 'customer@example.com', role: 'customer' as const, phone: '+1234567890' },
        { id: '2', name: 'Pizza Palace', email: 'vendor@example.com', role: 'vendor' as const, phone: '+1234567891' },
        { id: '3', name: 'Admin User', email: 'admin@example.com', role: 'admin' as const, phone: '+1234567892' },
      ];

      const foundUser = mockUsers.find(u => u.email === email);
      if (foundUser) {
        console.log('Mock user found:', foundUser);
        
        // Verify role if specified
        if (expectedRole && foundUser.role !== expectedRole) {
          console.error('Role mismatch. Expected:', expectedRole, 'Found:', foundUser.role);
          await signOut(auth); // Sign out if role doesn't match
          return false;
        }

        setUser(foundUser);
        localStorage.setItem('user', JSON.stringify(foundUser));
        return true;
      }
      console.log('No mock user found for email:', email);
      return false;
    } catch (error) {
      console.error('Firebase login error:', error);
      return false;
    }
  };

  const signup = async (userData: {
    name: string;
    email: string;
    password: string;
    role: 'customer' | 'vendor' | 'admin';
    phone?: string;
    preferences?: string[];
  }): Promise<boolean> => {
    try {
      console.log('Attempting signup for:', userData);
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        userData.email,
        userData.password
      );
      console.log('Firebase signup successful:', userCredential);

      const newUser: User = {
        id: userCredential.user.uid,
        name: userData.name,
        email: userData.email,
        role: userData.role || 'customer',
        phone: userData.phone,
        preferences: userData.preferences,
      };
      
      console.log('Creating new user:', newUser);
      setUser(newUser);
      localStorage.setItem('user', JSON.stringify(newUser));
      return true;
    } catch (error) {
      console.error('Signup error:', error);
      return false;
    }
  };

  const logout = async () => {
    try {
      console.log('Attempting logout...');
      await signOut(auth);
      setUser(null);
      localStorage.removeItem('user');
      console.log('Logout successful');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, firebaseUser, login, signup, logout, loading }}>
      {loading ? (
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
}