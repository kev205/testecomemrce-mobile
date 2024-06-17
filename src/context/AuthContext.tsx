import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import { tokenRefreshSubject } from "@/api/events/token";
import { useStorageState } from "@/hooks/useStorageState";

export type UserType = any;

const authentication = {};

interface AuthContextType {
  user?: Partial<UserType>;
  session?: any;
  initialized?: boolean;
  isLoaded?: boolean;
  setInitialized?: Function;
  signing?: boolean;
  setUser?: (user: Partial<UserType>) => void;
  signIn?: (username: string, password: string) => Promise<any>;
  signOut?: () => void;
  signUp?: () => void;
}

export const AuthContext = createContext<AuthContextType>({});

export function useAuth() {
  const value = useContext(AuthContext);
  if (process.env.NODE_ENV !== "production") {
    if (!value) {
      throw new Error("useAuth must be wrapped in a <SessionProvider />");
    }
  }

  return value;
}

export function AuthProvider({ children }: PropsWithChildren) {
  const [[isLoaded, session], setTokens] = useStorageState(
    process.env.EXPO_PUBLIC_STORAGE_SESSION_KEY ?? ""
  );
  const [initialized, setInitialized] = useState(false);
  const [signing, setSigning] = useState(false);
  const [user, setUser] = useState<Partial<UserType>>();

  useEffect(() => {
    const subscription = tokenRefreshSubject.subscribe({
      next: (value: any) => {
        if (value) {
          const { access_token, refresh_token } = value;
          setTokens(JSON.stringify({ access_token, refresh_token }));
        } else setTokens(value);
      },
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (session) setInitialized(true);
  }, [session]);

  const signIn = async (username: string, password: string) => {
    setSigning(true);
    return authentication
      .authenticate(username, password)
      .then((res: any) => {
        if (res?.data) {
          setInitialized(true);
          const { access_token, refresh_token } = res.data;
          setTokens(JSON.stringify({ access_token, refresh_token }));
        }
      })
      .finally(() => setSigning(false));
  };

  const signUp = () => {
    setSigning(true);
    setTokens("xxx");
    setSigning(false);
  };

  const signOut = async () => {
    return authentication.logout().then(() => setTokens(null));
  };

  return (
    <AuthContext.Provider
      value={{
        session,
        initialized,
        isLoaded,
        signing,
        user,
        setUser,
        signIn,
        signUp,
        signOut,
        setInitialized,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
