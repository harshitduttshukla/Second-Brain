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

export function Dashbord() {
  const [modalOpen, setModelOPen] = useState(false);
  const { contents, refresh } = useContent();

  useEffect(() => {
    refresh();
  }, [modalOpen]);

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white flex">
      <Sidebar />
      <div className="flex-1 p-8 ml-72 bg-[#141414] min-h-screen border border-white/10 rounded-2xl shadow-lg">
        <CreateContrentModal
          open={modalOpen}
          onclose={() => setModelOPen(false)}
        />

        <div className="flex justify-end gap-4 mb-8">
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
        </div>

        <div className="flex gap-6 flex-wrap">
          {contents.map(({ Type, Link, title }, index) => (
            <Card key={index} type={Type} Link={Link} title={title} />
          ))}
        </div>
      </div>
    </div>
  );
}
