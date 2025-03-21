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

export const PublicRoutes: RouteObject[] = [
  {
    path: "/grimoire/",
    element: <LoginPage />,
  },
  {
    path: "/grimoire/home",
    element: <Home />,
  },
  {
    path: "/grimoire/campaign",
    element: <CampaignPage />
  },
  {
      path: "/grimoire/campaign/system",
      element: <CampaignSystemPage />
  },
  {
      path: "/grimoire/campaign/sheet",
      element: <CampaignSystemSheet />
  },
  {
      path: "/grimoire/campaign/sheet/:id",
      element: <CampaignCharacterSheet/>
  },
  {
      path: "/grimoire/campaign/mechanics",
      element: <CampaignSystemMechanics />
  },
  {
      path: "/grimoire/campaign/journal",
      element: <CampaignJournal />
  },
  {
      path: "/grimoire/campaign/archive",
      element: <CampaignArchive />
  },
  {
      path: "/grimoire/campaign/archive/:id",
      element: <CampaignArchiveFolder/>
  },
  {
      path: "/grimoire/system",
      element: <SystemPage />
  },
  {
      path: "/grimoire/system/rules",
      element: <SystemPageRules />
  },
  {
      path: "/grimoire/system/sheet",
      element: <SystemPageSheet />
  },
  {
      path: "/grimoire/system/mechanics",
      element: <SystemPageMechanics />
  },
  {
    element: <PrivateRoute />,
    children: [
      
      /*  
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
  */
    ],
  },
];
