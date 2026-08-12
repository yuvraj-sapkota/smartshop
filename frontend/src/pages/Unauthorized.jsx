import { Link } from "react-router-dom";
import useAuthStore from "../store/auth/authStore";

export default function Unauthorized() {
  const { user } = useAuthStore();
  const homePath = user ? `/${user.role}` : "/login";

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center">
      <h1 className="text-3xl font-semibold mb-2 text-primary">Access denied</h1>
      <p className="text-gray-500 mb-6">
        You don't have permission to view this page.
      </p>
      <Link
        to={homePath}
        className="px-4 py-2 rounded bg-primary text-white hover:opacity-90"
      >
        Go back
      </Link>
    </div>
  );
}
