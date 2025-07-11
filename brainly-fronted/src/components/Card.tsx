import { ShareIcon } from "../icons/ShareIcon";
import { Trash } from "lucide-react"; // Step 1: Import the Trash icon


interface CardProps {
  title: string;
  Link: string;
  type: "twitter" | "youtube";
  onDelete?: () => void; // 👈 optional delete handler
}

export function Card({ title, Link, type, onDelete }: CardProps): JSX.Element {
  const getYouTubeEmbedLink = (url: string): string => {
    try {
      const urlObj = new URL(url);
      if (urlObj.hostname.includes("youtube.com")) {
        const videoId = urlObj.searchParams.get("v");
        if (videoId) {
          return `https://www.youtube.com/embed/${videoId}`;
        }
      } else if (urlObj.hostname === "youtu.be") {
        return `https://www.youtube.com/embed${urlObj.pathname}`;
      }
      return url;
    } catch (error) {
      console.error("Invalid YouTube URL:", url);
      return url;
    }
  };

  const getTwitterEmbedLink = (url: string): string => {
    try {
      const urlObj = new URL(url);
      if (urlObj.hostname.includes("x.com")) {
        return url.replace("x.com", "twitter.com");
      }
      return url;
    } catch (error) {
      console.error("Invalid Twitter URL:", url);
      return url;
    }
  };

  return (
    <div className="p-5 bg-[#141414] border border-white/10 rounded-2xl shadow-xl backdrop-blur-md text-white max-w-96 min-h-56 w-full transition-transform hover:scale-[1.03] duration-300">
      <div className="flex justify-between items-center">
        <div className="flex items-center text-lg font-semibold text-gray-300 gap-2">
        
          {title}
        </div>

        <div className="flex gap-3 items-center">
          {/* Open Link */}
          <a
            href={Link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-blue-400"
            title="Open"
          >
            <ShareIcon />
          </a>

          {/* Delete Button */}
           <button
          onClick={onDelete}
          className="text-gray-400 hover:text-red-500"
          title="Delete"
        >
          <Trash size={20} />
        </button>

        </div>
      </div>

      <div className="pt-4">
        {type === "youtube" && (
          <iframe
            className="w-full h-52 rounded-md"
            src={getYouTubeEmbedLink(Link)}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        )}

        {type === "twitter" && (
          <blockquote className="twitter-tweet">
            <a href={getTwitterEmbedLink(Link)} target="_blank" rel="noopener noreferrer"></a>
          </blockquote>
        )}
      </div>
    </div>
  );
}
