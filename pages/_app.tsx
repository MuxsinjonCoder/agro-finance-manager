import Layout from "@/components/layout";
import { SidebarProvider } from "@/components/ui/sidebar";
import { fetchUserByToken } from "@/queries/users";
import "@/styles/globals.css";
import Cookies from "js-cookie";
import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import NextNProgress from "nextjs-progressbar";
import { createContext, useContext, useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { Toaster } from "sonner";
import GrainProductsLayout from "@/components/layout/grainProductsLayout/GrainLayout";
import StorageLayout from "@/components/layout/storageLayout/StorageLayout";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

export interface User {
  data: {
    id: string;
    name?: string;
    email: string;
    role: string[] | undefined;
    fullName?: string;
    imagePath?: string;
    usernames: string;
  };
}

interface UserContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

const UserContext = createContext<UserContextType | null>(null);

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context)
    throw new Error("useUser must be used within my-vehicles UserProvider");
  return context;
};

interface MyAppProps extends AppProps {
  pageProps: {
    session: Session | null;
  };
}

export default function App({ Component, pageProps }: MyAppProps) {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const isAuthRoute = router.pathname.startsWith("/auth");
  const isGrainRoute = router.pathname.startsWith("/grain-products");
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   const fetchUser = async () => {
  //     const token = Cookies.get("token");
  //     if (!token) {
  //       if (!router.pathname.startsWith("/auth")) {
  //         router.push("/auth/signin");
  //       }
  //       setLoading(false);
  //       return;
  //     }

  //     if (router.pathname.startsWith("/auth")) {
  //       setLoading(false);
  //       return;
  //     }

  //     try {
  //       const userData = await fetchUserByToken(token);

  //       if (userData.message === "TOKEN IS NOT FOUND") {
  //         console.warn("Token is not valid, redirecting to sign-in.");
  //         router.push("/auth/signin");
  //         return;
  //       }

  //       setUser(userData);
  //     } catch (error) {
  //       console.error("Error fetching user:", error);
  //       router.push("/auth/signin");
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchUser();
  // }, [router.pathname]);

  // useEffect(() => {
  //   const fetchUser = async () => {
  //     const token = Cookies.get("token");
  //     // If no token, redirect to the signin page (except on /auth pages)
  //     if (!token) {
  //       if (!router.pathname.startsWith("/auth")) {
  //         router.push("/auth/signin");
  //       }
  //       setLoading(false);
  //       return;
  //     }

  //     // If on an auth page, do not fetch user data
  //     if (router.pathname.startsWith("/auth")) {
  //       setLoading(false);
  //       return;
  //     }

  //     // Fetch user data if token exists and not on an auth page
  //     try {
  //       const userData = await fetchUserByToken(token);

  //       if (userData.message === "TOKEN IS NOT FOUND") {
  //         console.warn("Token is not valid, redirecting to sign-in.");
  //         router.push("/auth/signin");
  //         return;
  //       }

  //       setUser(userData);
  //     } catch (error) {
  //       console.error("Error fetching user:", error);
  //       router.push("/auth/signin");
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchUser();
  // }, [router.pathname]);

  // if (loading) {
  //   return (
  //     <div role="status" className="flex justify-center items-center h-screen">
  //       <svg
  //         aria-hidden="true"
  //         className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
  //         viewBox="0 0 100 101"
  //         fill="none"
  //         xmlns="http://www.w3.org/2000/svg"
  //       >
  //         <path
  //           d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
  //           fill="currentColor"
  //         />
  //         <path
  //           d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
  //           fill="currentFill"
  //         />
  //       </svg>
  //       <span className="sr-only">Loading...</span>
  //     </div>
  //   );
  // }

  return (
    <SessionProvider>
      <UserContext.Provider
        value={{
          user,
          setUser,
        }}
      >
        <QueryClientProvider client={queryClient}>
          <NextNProgress color="#3BB5DC" />
          <SidebarProvider>
            {isAuthRoute ? (
              <>
                {/* <NextNProgress color="#3BB5DC" /> */}
                <Component {...pageProps} />
              </>
            ) : isGrainRoute ? (
              <GrainProductsLayout>
                <Component {...pageProps} />
              </GrainProductsLayout>
            ) : (
              <Layout>
                <Component {...pageProps} />
              </Layout>
            )}
          </SidebarProvider>
          <Toaster />
        </QueryClientProvider>
      </UserContext.Provider>
    </SessionProvider>
  );
}
