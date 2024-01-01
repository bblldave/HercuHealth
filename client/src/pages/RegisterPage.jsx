import { PassageRegister } from "@passageidentity/passage-react";
import { useNavigate } from "react-router-dom";

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
    <div>
      <PassageRegister onSuccess={onSuccess} />
    </div>
  );
};

export default RegisterPage;
