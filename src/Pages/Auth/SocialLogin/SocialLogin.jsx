import React from "react";
import useAuth from "../../../Hooks/useAuth";
import { useLocation, useNavigate } from "react-router";
import useAxios from "../../../Hooks/useAxios";

const SocialLogin = () => {
  const { signInWithGoogle } = useAuth();
  const axiosIns = useAxios();
  const navigate = useNavigate();
  const location = useLocation();

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithGoogle();
      const user = result.user;
      const { data: allEmails = [] } = await axiosIns.get(
        "/users/getOnlyEmail"
      );
      const userExists = allEmails.includes(user.email);

      if (userExists) {
        await axiosIns.patch("/users/last-login", { email: user.email });
      } else {
        const userInfo = {
          name: user.displayName,
          email: user.email,
          role: "worker",
          profilePic: user.photoURL,
          coins: 10,
          last_login: new Date().toISOString(),
          created_at: new Date().toISOString(),
        };
        await axiosIns.post("/users", userInfo);
      }

      navigate(location.state || "/");
    } catch (error) {
      console.error("Google Sign-In Error:", error);
    }
  };
  return (
    <div>
      <div className="divider">OR</div>
      <button
        onClick={handleGoogleSignIn}
        className="btn bg-white text-black w-full border-[#e5e5e5]"
      >
        <svg
          aria-label="Google logo"
          width="16"
          height="16"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
        >
          <path fill="#fff" d="m0 0H512V512H0" />
          <path
            fill="#34a853"
            d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
          />
          <path
            fill="#4285f4"
            d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
          />
          <path
            fill="#fbbc02"
            d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
          />
          <path
            fill="#ea4335"
            d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
          />
        </svg>
        Sign in with Google
      </button>
    </div>
  );
};

export default SocialLogin;
