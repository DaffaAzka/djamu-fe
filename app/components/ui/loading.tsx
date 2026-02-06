import { Loader } from "lucide-react";

export default function Loading({ text }: { text?: string }) {
  return (
    <div className="flex items-center justify-center min-h-1/2">
      <div className="text-gray-500 flex flex-row gap-3">
        <Loader />
        {text || "Loading..."}
      </div>
    </div>
  );
}
