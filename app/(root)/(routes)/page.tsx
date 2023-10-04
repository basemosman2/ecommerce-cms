"use client";

import { useStoreModal } from "@/hooks/use-store-modal";
import { useEffect } from "react";

// show a store modal if the user has no stores

export default function SetupPage() {
  const onOpen = useStoreModal((state) => state.onOpen);
  const isOpen = useStoreModal((state) => state.isOpen);

  useEffect(() => {
    if (!isOpen) {
      onOpen();
    }
  }, [isOpen, onOpen]);

  return null;
}