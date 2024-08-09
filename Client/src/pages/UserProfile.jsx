import { useEffect, useState } from "react";
import instance2 from "../helpers/instance2";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const User = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    readUser();
  }, []);

  const readUser = async (e) => {
    try {
      let { data } = await instance2({
        url: "/user",
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });

      setUsername(data.username);
      setEmail(data.email);
      setPassword(data.password);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditProfile = async (e) => {
    e.preventDefault();

    try {
      await instance2({
        url: "/editprofile",
        method: "PUT",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
        data: {
          username,
          email,
        },
      });
      navigate("/");
      Swal.fire({
        title: "Mantaap!",
        text: "You have Successfully Edit Profile!",
        icon: "success",
      });
    } catch (error) {
      console.log(error);
    }
  };
  const handleDeleteProfile = async (e) => {
    e.preventDefault();

    try {
      await instance2({
        url: "/deleteprofile",
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      localStorage.clear();
      navigate("/login");
      Swal.fire({
        title: "Mantaap!",
        text: "You have Successfully Delete Profile!",
        icon: "success",
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="font-[sans-serif]">
      <div className="min-h-screen flex fle-col items-center justify-center p-6">
        <div className="grid lg:grid-cols-2 items-center gap-6 max-w-7xl max-lg:max-w-xl w-full">
          <form onSubmit={handleEditProfile} className="lg:max-w-md w-full">
            <h3 className="text-black text-3xl font-extrabold mb-12">
              User Profile
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
                />
              </div>
            </div>
            <button
              type="submit"
              class=" px-5 py-2.5 rounded-lg text-white text-sm tracking-wider font-medium border border-current outline-none bg-blue-700 hover:bg-blue-800 active:bg-blue-700"
            >
              Update
            </button>

            <button
              onClick={handleDeleteProfile}
              type="button"
              class=" px-5 py-2.5 rounded-lg text-white text-sm tracking-wider font-medium border border-current outline-none bg-red-700 hover:bg-red-800 active:bg-blue-700"
            >
              Delete
            </button>
          </form>
          <div className="h-full max-lg:mt-12">
            <img
              alt="Dining Experience"
              className="w-full h-full object-cover rounded-md"
              src="https://images.unsplash.com/photo-1621600411688-4be93cd68504?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZWRpdHxlbnwwfHwwfHx8MA%3D%3D"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default User;
