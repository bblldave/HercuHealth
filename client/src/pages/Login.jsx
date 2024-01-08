import { PassageLogin } from "@passageidentity/passage-react";
import { Link, useNavigate } from "react-router-dom";
import useUserStore from "../stores/userStore";

const Login = () => {
  const navigate = useNavigate();
  const setIsLoggedIn = useUserStore((state) => state.setIsLoggedIn);

  const onSuccess = async () => {
    setIsLoggedIn();
    navigate("/dashboard");
  };

  return (
    <div className="container flex flex-col justify-center align-middle mx-auto py-10">
      <h1 className="text-center font-bold text-4xl p-3">
        Login to HercuHealth
      </h1>
      <p className="text-center text-lg mb-8">
        Unlock your journey to better health and fitness
      </p>
      <PassageLogin onSuccess={onSuccess} />
      <p className="text-center">Don't have an account?</p>
      <Link className="text-center text-blue-600 underline" to="/register">
        Register Here
      </Link>
    </div>
  );
};

export default Login;
