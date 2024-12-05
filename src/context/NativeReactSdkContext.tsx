// src/context/NativeReactSdkContext.tsx
import React, { createContext, useContext, useState } from 'react';

// Define the type for the context value
interface AuthInfo {
  token: string;
}

// Define the props for the provider component
interface NativeReactSdkProviderProps {
  children: any;
  token: string;
}

// Create a context with the type of AuthInfo or null
const NativeReactSdkContext = createContext<AuthInfo | null>(null);

export const NativeReactSdkProvider: React.FC<NativeReactSdkProviderProps> = ({ children, token }) => {
  const [authInfo] = useState<AuthInfo>({ token });
 
  return (
    <NativeReactSdkContext.Provider value={authInfo}>
      {children}
    </NativeReactSdkContext.Provider>
  );
};

// Custom hook to use the context
export const useNativeReactSdk = () => {
  const context = useContext(NativeReactSdkContext);
  if (!context) {
    throw new Error("useNativeReactSdk must be used within a NativeReactSdkProvider");
  }
  return context;
};
