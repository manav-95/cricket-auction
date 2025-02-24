import { useState } from "react"
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom'

const UserLoginPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isPlayer, setIsPlayer] = useState(true)
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true);

    try {

      await axios.post("http://localhost:5000/api/users/login", {
        role: isPlayer ? 'player' : 'owner',
        ...formData,
      });

      toast.success(`${isPlayer ? "Player" : "Owner"} LoggedIn Successfully`);


      setFormData({
        username: "",
        password: "",

      });

      setTimeout(() => {
        setIsLoading(false);
        navigate("/");
      }, 2000);

    } catch (error) {

      console.error("Login Error:", error);

      // Show a proper error message
      if (error.response) {
        toast.error(error.response.data.message || "Login failed. Please try again.");
      } else {
        toast.error("Something went wrong. Please check your network.");
      }
    }
  };

  return (
    <div className='flex justify-center items-center h-screen'>

      {isLoading && (
        <>
          <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center h-full w-full">
            <div className="w-5 h-5 border-2 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
          </div>
        </>
      )}


      <div className="max-w-md w-full p-6 bg-white rounded-sm shadow-xl">
        <div className="flex mb-6 bg-gray-200 rounded-sm p-0">
          <button
            className={`flex-1 py-2 px-4 rounded-sm transition-colors duration-300 ${isPlayer ? "bg-blue-500 text-white" : "text-gray-700 hover:bg-gray-300"
              }`}
            onClick={() => {
              setIsPlayer(true), setFormData({

                username: "",
                password: "",
              })
            }}
            type="button"
          >
            Player
          </button>
          <button
            className={`flex-1 py-2 px-4 rounded-sm transition-colors duration-300 ${!isPlayer ? "bg-blue-500 text-white" : "text-gray-700 hover:bg-gray-300"
              }`}
            onClick={() => {
              setIsPlayer(false), setFormData({

                username: "",
                password: "",
              })
            }}
            type="button"
          >
            Owner
          </button>
        </div>



        <ToastContainer position="top-center" autoClose={3000} hideProgressBar={true} closeOnClick pauseOnHover />




        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <div className="flex">
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
              <p className="ml-0.5 -translate-y-0.5 text-red-500">*</p>
            </div>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              className="mt-1 py-1 block w-full rounded-sm border-b border-gray-200 shadow-sm outline-none focus:border-b focus:border-blue-400"
              required
            />
          </div>
          <div>
            <div className="flex">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              <p className="ml-0.5 -translate-y-0.5 text-red-500">*</p>
            </div>
            <input
              type="text"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="mt-1 py-1 block w-full rounded-sm border-b border-gray-200 shadow-sm outline-none focus:border-b focus:border-blue-400"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 border border-transparent rounded-sm shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            disabled={isLoading}
          >
            Sign in as {isPlayer ? "Player" : "Owner"}
          </button>
        </form>
      </div>
    </div>
  )
}

export default UserLoginPage