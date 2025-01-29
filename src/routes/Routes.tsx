import { RouteObject } from "react-router-dom";
import { PrivateRoute } from "./PrivateRoute";
import LoginPage from "../pages/Login";

export const PublicRoutes: RouteObject[] = [
  {
    path: "/grimoire/",
    element: <LoginPage />,
    children : [
        {
            path: "/grimoire/signup",
            element: <SignupPage/>
        }
    ]
  },
  {
    element: <PrivateRoute />,
    children: [
      {
        path: "/grimoire/home",
        element: <Home />,
      },
      {
        path: "/grimoire/campaign",
        element: <CampaignPage />,
        children: [
            {
                path: "/grimoire/campaign/system",
                element: <CampaignSystemPage />
            },
            {
                path: "/grimoire/campaign/diary",
                element: <CampaignDiaryPage />
            },
            {
                path: "/grimoire/campaign/archive",
                element: <CampaignArchivePage />
            },
            {
                path: "/grimoire/campaign/dungeon",
                element: <CampaignDungeonPage />
            }
        ]
      },
    ],
  },
];
