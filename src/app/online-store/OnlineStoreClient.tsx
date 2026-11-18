"use client";

import React from "react";
import { OnlineStorePage } from "@/views/OnlineStorePage";
import { useAppNavigation } from "@/hooks/useAppNavigation";

export default function OnlineStoreClient() {
  const nav = useAppNavigation();

  return (
    <OnlineStorePage
      onNavigateHome={nav.navigateToHome}
      onNavigateContact={(serviceName?: string, category?: string) =>
        nav.navigateToContact(
          serviceName ?? "Online Store Launch Package",
          category ?? "Get Your Online Store"
        )
      }
    />
  );
}
