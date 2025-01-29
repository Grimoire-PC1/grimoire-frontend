import { RouteObject } from "react-router-dom";

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
        element: <HomePage />,
      },
      {
        path: "/grimoire/campaing",
        element: <CampaignPage />,
        children: [
            {
                path: "/grimoire/campaing/system",
                element: <CampaingSystemPage />
            },
            {
                path: "/grimoire/campaing/diary",
                element: <CampaingDiaryPage />
            },
            {
                path: "/grimoire/campaing/archive",
                element: <CampaingArchivePage />
            },
            {
                path: "/grimoire/campaing/dungeon",
                element: <CampaingDungeonPage />
            }
        ]
      },
    ],
  },
];
