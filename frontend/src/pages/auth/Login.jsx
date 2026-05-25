import { useState } from "react"

import {
  Link,
  useNavigate
} from "react-router-dom"

import {
  signInWithEmailAndPassword
} from "firebase/auth"

import {
  doc,
  getDoc
} from "firebase/firestore"

import {
  auth,
  db
} from "../../firebase/firebase"

function Login() {

  const navigate =
    useNavigate()

  const [email,
    setEmail] =
    useState("")

  const [password,
    setPassword] =
    useState("")

  const [loading,
    setLoading] =
    useState(false)

  // LOGIN

  const handleLogin =
    async () => {

      if (
        !email ||
        !password
      ) {

        alert(
          "Please fill all fields"
        )

        return

      }

      try {

        setLoading(true)

        // LOGIN USER

        const userCredential =

          await signInWithEmailAndPassword(

            auth,

            email,

            password

          )

        const user =
          userCredential.user

        // GET USER DATA

        const userRef =
          doc(
            db,
            "users",
            user.uid
          )

        const userSnap =
          await getDoc(
            userRef
          )

        if (
          userSnap.exists()
        ) {

          const userData =
            userSnap.data()

          // SAVE USER DATA

          localStorage.setItem(
            "role",
            userData.role
          )

          localStorage.setItem(
            "userName",
            userData.name
          )

          // IMPORTANT FIX

          localStorage.setItem(
            "userEmail",
            email
          )

          alert(
            "Login Successful ✅"
          )

          // REDIRECT

          if (
            userData.role ===
            "organizer"
          ) {

            navigate(
              "/dashboard"
            )

          }

          else {

            navigate(
              "/events"
            )

          }

        }

        else {

          alert(
            "User data not found"
          )

        }

      }

      catch (error) {

        console.log(error)

        alert(
          error.message
        )

      }

      setLoading(false)

    }

  return (

    <div className="bg-slate-900 min-h-screen flex items-center justify-center px-5 text-white">

      <div className="bg-slate-800 p-10 rounded-3xl w-full max-w-[500px] shadow-2xl">

        {/* TITLE */}

        <h1 className="text-4xl font-bold text-center mb-8">

          Login

        </h1>

        {/* EMAIL */}

        <input

          type="email"

          placeholder="Enter Email"

          value={email}

          onChange={(e) =>

            setEmail(
              e.target.value
            )

          }

          className="w-full p-4 rounded-xl bg-slate-700 mb-5 outline-none"

        />

        {/* PASSWORD */}

        <input

          type="password"

          placeholder="Enter Password"

          value={password}

          onChange={(e) =>

            setPassword(
              e.target.value
            )

          }

          className="w-full p-4 rounded-xl bg-slate-700 mb-8 outline-none"

        />

        {/* BUTTON */}

        <button

          onClick={
            handleLogin
          }

          disabled={loading}

          className="w-full bg-purple-600 py-4 rounded-xl hover:bg-purple-700 transition font-bold"

        >

          {

            loading

              ? "Logging In..."

              : "Login"

          }

        </button>

        {/* SIGNUP */}

        <p className="text-center mt-6 text-gray-400">

          Don't have an account?

          <Link

            to="/signup"

            className="text-purple-400 ml-2"

          >

            Sign Up

          </Link>

        </p>

      </div>

    </div>

  )

}

export default Login