import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { PublicRoutes } from "./routes/Routes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useUserStore } from "./stores/user/user.store";
import { AudioPlayerProvider } from "./context/AudioPlayerContext";
import YouTubeAudioPlayer from "./components/YoutubePlayer/YouTubeAudioPlayer";

function App() {
  const user = useUserStore((state) => state.user);

  const router = createBrowserRouter([
    ...PublicRoutes,
    {
      path: "*",
      element: (
        <Navigate
          to={
            user ? "/home" : "/"
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
      <AudioPlayerProvider>
        <YouTubeAudioPlayer />
        <RouterProvider router={router} />
      </AudioPlayerProvider>
    </QueryClientProvider>
  );
}

export default App;