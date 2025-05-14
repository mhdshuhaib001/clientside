
import { useState } from "react";
import { ClipboardCopy, CheckCircle2 } from "lucide-react";

interface ShareButtonProps {
  productId: string;
}

const ShareButton: React.FC<ShareButtonProps> = ({ productId }) => {
  const [copied, setCopied] = useState(false);

  const shareUrl = `https://auction-gemss.vercel.app/product-details/${productId}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy:", error);
    }
  };

  return (
    <div className="relative flex items-center gap-2 mt-2">
      <button
        onClick={handleCopy}
        className="flex items-center bg-gray-400 text-white px-3 py-1.5 rounded hover:bg-gray-700 transition"
      >
        <ClipboardCopy className="w-4 h-4 mr-2" />
        Share
      </button>

      {copied && (
        <div className="flex items-center text-green-600 text-sm">
          <CheckCircle2 className="w-4 h-4 mr-1" />
          Link Copied!
        </div>
      )}
    </div>
  );
};

export default ShareButton;
