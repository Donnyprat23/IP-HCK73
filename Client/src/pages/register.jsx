import { useState } from "react";
import instance2 from "../helpers/instance2";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const HandleRegister = async (e) => {
    e.preventDefault();

    try {
      await instance2({
        url: "/register",
        method: "POST",
        data: {
          username,
          email,
          password,
        },
      });
      navigate("/login");
    } catch (error) {
        console.log(error);
      if (error.response) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.response.data.message,
        });
      }
    }
  };

  return (
    <div className="font-[sans-serif]">
      <div className="min-h-screen flex fle-col items-center justify-center p-6">
        <div className="grid lg:grid-cols-2 items-center gap-6 max-w-7xl max-lg:max-w-xl w-full">
          <form onSubmit={HandleRegister} className="lg:max-w-md w-full">
            <h3 className="text-gray-800 text-3xl font-extrabold mb-12">
              Create your account
            </h3>
            <div className="space-y-6">
              <div>
                <label className="text-gray-800 text-sm mb-2 block text-left">
                  User Name
                </label>
                <input
                  className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-4 focus:bg-transparent outline-blue-500 transition-all"
                  name="username"
                  placeholder="Username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div>
                <label className="text-gray-800 text-sm mb-2 block text-left">
                  Email
                </label>
                <input
                  className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-4 focus:bg-transparent outline-blue-500 transition-all"
                  name="email"
                  placeholder="Email"
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label className="text-gray-800 text-sm mb-2 block text-left">
                  Password
                </label>
                <input
                  className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-4 focus:bg-transparent outline-blue-500 transition-all"
                  name="password"
                  placeholder="Password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            <div className="mt-12">
              <button
                className="py-4 px-8 text-sm font-semibold text-white tracking-wide bg-blue-600 hover:bg-blue-700 focus:outline-none"
                type="submit"
              >
                REGISTER
              </button>
            </div>
            <p className="text-sm text-gray-800 mt-6">
              You have account?{" "}
              <Link
                to={"/login"}
                className="text-blue-600 font-semibold hover:underline ml-1"
                href="javascript:void(0);"
              >
                Login Now
              </Link>
            </p>
          </form>
          <div className="h-full max-lg:mt-12">
            <img
              alt="Dining Experience"
              className="w-full h-full object-cover"
              src="https://readymadeui.com/login-image.webp"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
