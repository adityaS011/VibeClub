import { Loader2 } from "lucide-react";

const Loading = () => {
  return (
    <div className="flex-center w-full min-h-full">
      <Loader2 className="animate-spin duration-300 text-primary" />
    </div>
  );
};

export default Loading;
