import { useRef, useState } from 'react';
import { CrossIcon } from '../icons/CrossIcon';
import Button from './Button22';
import Input from './Input';
import axios from 'axios';
import { BACKEND_URL } from '../config';

enum ContemtType {
  Youtube = 'youtube',
  Twitter = 'twitter',
}

interface CreateContrentModalProps {
  open: boolean;
  onclose: () => void;
}

export function CreateContrentModal({ open, onclose }: CreateContrentModalProps) {
  const titleRef = useRef<HTMLInputElement>(null);
  const LinkRef = useRef<HTMLInputElement>(null);
  const [Type, setType] = useState(ContemtType.Twitter);

  async function addContent() {
    const title = titleRef.current?.value;
    const Link = LinkRef.current?.value;

    if (!title || !Link) {
      alert('Please enter both title and link.');
      return;
    }

    try {
      await axios.post(
        `${BACKEND_URL}/api/v1/content`,
        {
          Link,
          title,
          Type,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      onclose();
    } catch (err) {
      alert('Failed to add content.');
      console.error(err);
    }
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black opacity-60 backdrop-blur-sm"
        onClick={onclose}
      ></div>

      {/* Modal Box */}
      <div className="relative bg-[#141414] border border-white/10 rounded-2xl shadow-xl p-6 w-full max-w-md z-10 animate-fade-in">
        <div className="flex justify-end">
          <button onClick={onclose} className="text-gray-400 hover:text-white">
            <CrossIcon />
          </button>
        </div>

        <h1 className="text-2xl font-semibold text-white text-center mb-4">
          Add New Content
        </h1>

        <div className="space-y-4">
          <Input ref1={titleRef} placeholder="Title" />
          <Input ref1={LinkRef} placeholder="Link" />
        </div>

        <div className="mt-5">
          <h2 className="text-white text-sm font-medium mb-1">Type</h2>
          <div className="flex gap-2">
            <Button
              variant={Type === ContemtType.Youtube ? 'primary' : 'secondary'}
              onclick={() => setType(ContemtType.Youtube)}
              text="YouTube"
            />
            <Button
              variant={Type === ContemtType.Twitter ? 'primary' : 'secondary'}
              onclick={() => setType(ContemtType.Twitter)}
              text="Twitter"
            />
          </div>
        </div>

        <div className="mt-6 flex justify-center">
          <Button onclick={addContent} variant="primary" text="Submit" />
        </div>
      </div>
    </div>
  );
}
