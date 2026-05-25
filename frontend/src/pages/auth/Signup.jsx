import { useState } from "react"

import {
  Link,
  useNavigate
} from "react-router-dom"

import {
  createUserWithEmailAndPassword
} from "firebase/auth"

import {
  doc,
  setDoc
} from "firebase/firestore"

import {
  auth,
  db
} from "../../firebase/firebase"

function Signup() {

  const navigate =
    useNavigate()

  const [name,
    setName] =
    useState("")

  const [email,
    setEmail] =
    useState("")

  const [password,
    setPassword] =
    useState("")

  const [role,
    setRole] =
    useState("user")

  const [loading,
    setLoading] =
    useState(false)

  // SIGNUP

  const handleSignup =
    async () => {

      if (
        !name ||
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

        // CREATE USER

        const userCredential =

          await createUserWithEmailAndPassword(

            auth,

            email,

            password

          )

        const user =
          userCredential.user

        // SAVE USER DATA

        await setDoc(

          doc(
            db,
            "users",
            user.uid
          ),

          {

            name,

            email,

            role,

            createdAt:
              new Date()

          }

        )

        // SAVE LOCAL STORAGE

        localStorage.setItem(
          "role",
          role
        )

        localStorage.setItem(
          "userName",
          name
        )

        // IMPORTANT FIX

        localStorage.setItem(
          "userEmail",
          email
        )

        alert(
          "Account Created Successfully ✅"
        )

        // REDIRECT

        if (
          role ===
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

          Create Account

        </h1>

        {/* NAME */}

        <input

          type="text"

          placeholder="Full Name"

          value={name}

          onChange={(e) =>

            setName(
              e.target.value
            )

          }

          className="w-full p-4 rounded-xl bg-slate-700 mb-5 outline-none"

        />

        {/* EMAIL */}

        <input

          type="email"

          placeholder="Email Address"

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

          placeholder="Password"

          value={password}

          onChange={(e) =>

            setPassword(
              e.target.value
            )

          }

          className="w-full p-4 rounded-xl bg-slate-700 mb-5 outline-none"

        />

        {/* ROLE */}

        <select

          value={role}

          onChange={(e) =>

            setRole(
              e.target.value
            )

          }

          className="w-full p-4 rounded-xl bg-slate-700 mb-8 outline-none"

        >

          <option value="user">

            User

          </option>

          <option value="organizer">

            Organizer

          </option>

        </select>

        {/* BUTTON */}

        <button

          onClick={
            handleSignup
          }

          disabled={loading}

          className="w-full bg-purple-600 py-4 rounded-xl hover:bg-purple-700 transition font-bold"

        >

          {

            loading

              ? "Creating Account..."

              : "Sign Up"

          }

        </button>

        {/* LOGIN */}

        <p className="text-center mt-6 text-gray-400">

          Already have an account?

          <Link

            to="/login"

            className="text-purple-400 ml-2"

          >

            Login

          </Link>

        </p>

      </div>

    </div>

  )

}

export default Signup