import { useCallback } from "react";
import { useToast } from "./useToast";

interface SharePostOptions {
  postId: string;
  caption?: string;
  authorName?: string;
}

const copyToClipboard = async (text: string): Promise<void> => {
  if (navigator.clipboard && typeof navigator.clipboard.writeText === "function") {
    await navigator.clipboard.writeText(text);
    return;
  }

  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.setAttribute("readonly", "true");
  textarea.style.position = "absolute";
  textarea.style.left = "-9999px";
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  document.body.removeChild(textarea);
};

export const useSharePost = () => {
  const { showSuccess, showError } = useToast();

  const sharePost = useCallback(
    async ({ postId, caption, authorName }: SharePostOptions) => {
      if (typeof window === "undefined") {
        return;
      }

      const shareUrl = `${window.location.origin}/posts/${postId}`;

      if (navigator.share && typeof navigator.share === "function") {
        try {
          await navigator.share({
            title: authorName ? `${authorName}'s post` : "Check out this post",
            text: caption || undefined,
            url: shareUrl,
          });
          showSuccess("Post shared successfully");
          return;
        } catch (error) {
          if (error instanceof Error) {
            const message = error.message.toLowerCase();
            if (error.name === "AbortError" || message.includes("cancel")) {
              return;
            }
          }
        }
      }

      try {
        await copyToClipboard(shareUrl);
        showSuccess("Post link copied to clipboard");
      } catch (error) {
        console.error("Failed to copy post link", error);
        showError("Unable to share the post");
      }
    },
    [showError, showSuccess]
  );

  return { sharePost };
};

