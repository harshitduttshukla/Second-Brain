// import Button22 from "../components/Button22";
// import { PlusIcon } from "../icons/PlusIcon";
// import { ShareIcon } from "../icons/ShareIcon";
// import { Card } from "../components/Card";
// import { CreateContrentModal } from "../components/CreateContrentModal";
// import { useEffect, useState } from "react";
// import { Sidebar } from "../components/Sidebar";
// import { useContent } from "../hooks/useContent";
// import { BACKEND_URL } from "../config";
// import axios from "axios";
// import { usePlatform } from "../context/PlatformContext"; // ✅ Added

// export function Dashbord() {
//   const [modalOpen, setModelOPen] = useState(false);
//   const { contents, refresh } = useContent();
//   const { activePlatform } = usePlatform(); // ✅ Platform filter context

//   useEffect(() => {
//     refresh();
//   }, [modalOpen]);

//   const handleDelete = async (id: string) => {
//     try {
//       await axios.delete(`${BACKEND_URL}/api/v1/content/${id}`, {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//       });
//       refresh();
//     } catch (err) {
//       console.error("Failed to delete content", err);
//       alert("Error deleting content");
//     }
//   };

//   // ✅ Filter content by platform
//   const filteredContents = contents.filter((content) =>
//     !activePlatform ? true : content.Type === activePlatform
//   );

//   return (
//     <div className="min-h-screen bg-[#0d0d0d] text-white flex">
//       <Sidebar />

//       <div className="flex-1 p-8 ml-72 bg-[#141414] min-h-screen border border-white/10 rounded-2xl shadow-lg">
//         <CreateContrentModal
//           open={modalOpen}
//           onclose={() => setModelOPen(false)}
//         />

//         <div className="flex justify-end gap-4 mb-8">
//           <Button22
//             onclick={() => setModelOPen(true)}
//             variant="primary"
//             text="Add content"
//             startIcon={<PlusIcon />}
//           />
//           <Button22
//             onclick={async () => {
//               try {
//                 const response = await axios.post(
//                   `${BACKEND_URL}/api/v1/brain/share`,
//                   { share: true },
//                   {
//                     headers: {
//                       Authorization: `Bearer ${localStorage.getItem("token")}`,
//                     },
//                   }
//                 );
//                 const shareUrl = `https://localhost:3000/share/${response.data.hash}`;
//                 alert("Share URL: " + shareUrl);
//               } catch (error) {
//                 alert("Error generating share URL");
//               }
//             }}
//             variant="secondary"
//             text="Share Brain"
//             startIcon={<ShareIcon />}
//           />
//         </div>

//         {/* ✅ Show filter status */}
//         {/* {activePlatform && (
//           <div className="mb-6 text-sm text-gray-400">
//             Showing: <span className="font-semibold text-white">{activePlatform.toUpperCase()}</span>
//           </div>
//         )} */}


//         {activePlatform && (
//   <div className="mb-8">
//     <h2 className={`text-3xl font-bold ${
//       activePlatform === "twitter" ? "text-purple-400" : "text-white"
//     }`}>
//       {activePlatform === "twitter" ? "Twitter Feed" : "YouTube Feed"}
//     </h2>
//   </div>
// )}




//         <div className="flex gap-6 flex-wrap">
//           {filteredContents.length === 0 ? (
//             <p className="text-gray-500">No content found for the selected platform.</p>
//           ) : (
//             filteredContents.map(({ _id, Type, Link, title }) => (
//               <Card
//                 key={_id}
//                 type={Type}
//                 Link={Link}
//                 title={title}
//                 onDelete={() => handleDelete(_id)}
//               />
//             ))
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }







import Button22 from "../components/Button22";
import { PlusIcon } from "../icons/PlusIcon";
import { ShareIcon } from "../icons/ShareIcon";
import { Card } from "../components/Card";
import { CreateContrentModal } from "../components/CreateContrentModal";
import { useEffect, useState } from "react";
import { Sidebar } from "../components/Sidebar";
import { useContent } from "../hooks/useContent";
import { BACKEND_URL } from "../config";
import axios from "axios";
import { usePlatform } from "../context/PlatformContext";
import { motion } from "framer-motion"; // ✅ Add this

export function Dashbord() {
  const [modalOpen, setModelOPen] = useState(false);
  const { contents, refresh } = useContent();
  const { activePlatform } = usePlatform();

  useEffect(() => {
    refresh();
  }, [modalOpen]);

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`${BACKEND_URL}/api/v1/content/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      refresh();
    } catch (err) {
      console.error("Failed to delete content", err);
      alert("Error deleting content");
    }
  };

  const filteredContents = contents.filter((content) =>
    !activePlatform ? true : content.Type === activePlatform
  );

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white flex">
      <Sidebar />

      <div className="flex-1 p-8 ml-72 bg-[#141414] min-h-screen border border-white/10 rounded-2xl shadow-lg">
        <CreateContrentModal
          open={modalOpen}
          onclose={() => setModelOPen(false)}
        />

        {/* ✅ Animated Button Group */}
        <motion.div
          className="flex justify-end gap-4 mb-8"
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <Button22
            onclick={() => setModelOPen(true)}
            variant="primary"
            text="Add content"
            startIcon={<PlusIcon />}
          />
          <Button22
            onclick={async () => {
              try {
                const response = await axios.post(
                  `${BACKEND_URL}/api/v1/brain/share`,
                  { share: true },
                  {
                    headers: {
                      Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                  }
                );
                const shareUrl = `https://localhost:3000/share/${response.data.hash}`;
                alert("Share URL: " + shareUrl);
              } catch (error) {
                alert("Error generating share URL");
              }
            }}
            variant="secondary"
            text="Share Brain"
            startIcon={<ShareIcon />}
          />
        </motion.div>

        {/* ✅ Filter Heading */}
        {activePlatform && (
          <div className="mb-8">
            <h2
              className={`text-3xl font-bold ${
                activePlatform === "twitter"
                  ? "text-purple-400"
                  : "text-white"
              }`}
            >
              {activePlatform === "twitter" ? "Twitter Feed" : "YouTube Feed"}
            </h2>
          </div>
        )}

        {/* ✅ Content Cards */}
        <div className="flex gap-6 flex-wrap">
          {filteredContents.length === 0 ? (
            <p className="text-gray-500">
              No content found for the selected platform.
            </p>
          ) : (
            filteredContents.map(({ _id, Type, Link, title }) => (
              <Card
                key={_id}
                type={Type}
                Link={Link}
                title={title}
                onDelete={() => handleDelete(_id)}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

