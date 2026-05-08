"use client";

import { useState } from "react";
import { Share2, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

const ShareButton = () => {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const url = window.location.href;

    if (navigator.share) {
      try {
        await navigator.share({ url, title: document.title });
        return;
      } catch {
        // fall through to clipboard copy
      }
    }

    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Button
      variant="outline"
      size="lg"
      onClick={handleShare}
      className="button sm:w-fit dark:border-slate-600 dark:text-white gap-2"
    >
      {copied ? (
        <>
          <Check className="h-4 w-4 text-green-500" />
          Link Copied!
        </>
      ) : (
        <>
          <Share2 className="h-4 w-4" />
          Share
        </>
      )}
    </Button>
  );
};

export default ShareButton;
