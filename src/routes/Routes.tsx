import { RouteObject } from "react-router-dom";
import { PrivateRoute } from "./PrivateRoute";
import LoginPage from "../pages/Login";
import Home from "@/pages/Home";
import CampaignPage from "@/pages/CampaignPage";
import CampaignSystemPage from "@/pages/CampaignSystemPage";
import SystemPage from "@/pages/SystemPage";
import SystemPageRules from "@/pages/SystemPageRules";
import SystemPageSheet from "@/pages/SystemPageSheet";
import SystemPageMechanics from "@/pages/SystemPageMechanics";
import CampaignSystemSheet from "@/pages/CampaignSystemSheet";
import CampaignSystemMechanics from "@/pages/CampaignSystemMechanics";
import CampaignJournal from "@/pages/CampaignJournal";
import CampaignArchive from "@/pages/CampaignArchive";
import CampaignArchiveFolder from "@/pages/CampaignArchiveFolder";
import CampaignCharacterSheet from "@/pages/CampaignCharacterSheet";
import CampaignSoundtrack from "@/pages/CampaignSoundtrack";

export const PublicRoutes: RouteObject[] = [
  {
    path: "/",
    element: <LoginPage />,
  },
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/campaign",
    element: <CampaignPage />
  },
  {
      path: "/campaign/system",
      element: <CampaignSystemPage />
  },
  {
      path: "/campaign/sheet",
      element: <CampaignSystemSheet />
  },
  {
      path: "/campaign/sheet/:id",
      element: <CampaignCharacterSheet/>
  },
  {
      path: "/campaign/mechanics",
      element: <CampaignSystemMechanics />
  },
  {
      path: "/campaign/journal",
      element: <CampaignJournal />
  },
  {
      path: "/campaign/archive",
      element: <CampaignArchive />
  },
  {
      path: "/campaign/archive/:id",
      element: <CampaignArchiveFolder/>
  },
  {
      path: "/campaign/soundtrack",
      element: <CampaignSoundtrack/>
  },
  {
      path: "/system",
      element: <SystemPage />
  },
  {
      path: "/system/rules",
      element: <SystemPageRules />
  },
  {
      path: "/system/sheet",
      element: <SystemPageSheet />
  },
  {
      path: "/system/mechanics",
      element: <SystemPageMechanics />
  },
  {
    element: <PrivateRoute />,
    children: [
      
      /*  
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/campaign",
        element: <CampaignPage />,
        children: [
            {
                path: "/campaign/system",
                element: <CampaignSystemPage />
            },
            {
                path: "/campaign/diary",
                element: <CampaignDiaryPage />
            },
            {
                path: "/campaign/archive",
                element: <CampaignArchivePage />
            },
            {
                path: "/campaign/dungeon",
                element: <CampaignDungeonPage />
            }
        ]
      },
  */
    ],
  },
];
