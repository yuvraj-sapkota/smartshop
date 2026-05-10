import { useNavigate } from "react-router-dom";

const ChooseRole = () => {
  const navigate = useNavigate();

  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-2">Create Account</h1>

        <p className="text-gray-500 text-center mb-8">Choose account type</p>

        <div className="space-y-4">
          <button
            onClick={() => navigate("/signup/user")}
            className="w-full border py-4 rounded-xl hover:bg-primary hover:text-white transition"
          >
            Continue as User
          </button>

          <button
            onClick={() => navigate("/signup/seller")}
            className="w-full border py-4 rounded-xl hover:bg-primary hover:text-white transition"
          >
            Continue as Seller
          </button>
        </div>
      </div>
    </section>
  );
};

export default ChooseRole;
