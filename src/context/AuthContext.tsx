import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import { useStorageState } from "@/hooks/useStorageState";
import { useLoginMutation } from "@/services/authentication";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";
import { setSession } from "@/reducers/auth/authSlice";

export type UserType = any;

interface AuthContextType {
  user?: Partial<UserType>;
  session?: any;
  initialized?: boolean;
  isLoaded?: boolean;
  setInitialized?: Function;
  signing?: boolean;
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
  const [user, setUser] = useState<Partial<UserType>>();

  const dispatch = useDispatch();
  const [login, { isLoading }] = useLoginMutation();

  useEffect(() => {
    if (session) {
      AsyncStorage.getItem(
        `${process.env.EXPO_PUBLIC_STORAGE_SESSION_KEY ?? ""}_user`
      )
        .then((value) => setUser(value ? JSON.parse(value) : undefined))
        .finally(() => setInitialized(true));
    }
  }, [session]);

  useEffect(() => {
    if (session && user) {
      const s = JSON.parse(session);
      dispatch(setSession({ ...user, ...s }));
    }
  }, [session, user]);

  const signIn = async (username: string, password: string) => {
    return login({ username, password }).then((res: any) => {
      if (res?.data) {
        setInitialized(true);
        const { token, refreshToken, ...u } = res.data;
        setUser(u);
        AsyncStorage.setItem(
          `${process.env.EXPO_PUBLIC_STORAGE_SESSION_KEY ?? ""}_user`,
          JSON.stringify(u)
        );
        setTokens(JSON.stringify({ token, refreshToken }));
      }
    });
  };

  const signUp = () => {
    setTokens("xxx");
  };

  const signOut = () => {
    setTokens(null);
    setUser(undefined);
  };

  return (
    <AuthContext.Provider
      value={{
        session,
        initialized,
        isLoaded,
        signing: isLoading,
        user,
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
