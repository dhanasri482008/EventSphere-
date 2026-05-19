import Navbar from "../components/Navbar"

function Login() {
  return (
    <div>

      <Navbar />

      <div className="flex items-center justify-center h-[80vh]">

        <div className="bg-slate-800 p-10 rounded-2xl w-[400px]">

          <h1 className="text-4xl font-bold mb-8 text-center">
            Login
          </h1>

          <input
            type="email"
            placeholder="Enter Email"
            className="w-full p-4 rounded-xl bg-slate-700 mb-5 outline-none"
          />

          <input
            type="password"
            placeholder="Enter Password"
            className="w-full p-4 rounded-xl bg-slate-700 mb-5 outline-none"
          />

          <button className="w-full bg-purple-600 py-4 rounded-xl hover:bg-purple-700">
            Login
          </button>

        </div>

      </div>

    </div>
  )
}

export default Login