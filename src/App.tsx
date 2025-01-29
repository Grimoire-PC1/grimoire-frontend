import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { PublicRoutes } from "./routes/Routes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useUserStore } from "./stores/user/user.store";

function App() {
  const user = useUserStore((state) => state.user);

  const router = createBrowserRouter([
    ...PublicRoutes,
    {
      path: "*",
      element: (
        <Navigate
          to={
            user ? (user.role === "COORDINATOR" ? "/tcc-match/dashboard" :
                    user.orienteePaper ? "/tcc-match/papers" :
                    "/tcc-match/home") : "/tcc-match/"
          }
          replace
        />
      ),
    },
  ]);
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 15000,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;