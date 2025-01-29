import { useState } from "react";
import { useUserStore } from "../stores/user/user.store";
import { useQuery } from "@tanstack/react-query";

export default function Home() {
    const user = useUserStore((state) => useState(false));

    const {data} = useQuery({
        queryKey: ["userCreatedCampaigns"]
        
    })
}