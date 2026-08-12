import { Store } from "lucide-react";

const EmptyState = ({
  title = "No shops yet",
  message = "Be the first one to add a shop!",
}) => {
  return (
    <div className="flex flex-col items-center justify-center text-center py-16 px-4">
      <Store size={40} className="text-gray-300 mb-3" />
      <h3 className="text-lg font-medium text-gray-700">{title}</h3>
      <p className="text-sm text-gray-500 mt-1">{message}</p>
    </div>
  );
};

export default EmptyState;
