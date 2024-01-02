import { PassageRegister } from "@passageidentity/passage-react";
import { useNavigate, Link } from "react-router-dom";

const RegisterPage = () => {
  const navigate = useNavigate();
  const onSuccess = async (authResult) => {
    //call backend
    // navigate to /dashboard
    try {
      const response = await fetch("http://localhost:3001/api/users/register", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Cookie: `psg_auth_token=${authResult.auth_token}`,
        },
        body: JSON.stringify(authResult),
      });

      if (response.ok) {
        navigate("/dashboard");
      } else {
        const error = await response.json();
        console.log(error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container flex flex-col justify-center align-middle mx-auto py-10">
      <h1 className="text-center font-bold text-4xl p-3">
        Get Started for free
      </h1>
      <p className="text-center text-lg mb-8">
        No obligations or credit cards required.
      </p>
      <PassageRegister onSuccess={onSuccess} />
      <p className="text-center">Already have an account?</p>
      <Link className="text-center text-blue-600 underline" to="/login">
        Log In Here
      </Link>
    </div>
  );
};

export default RegisterPage;
