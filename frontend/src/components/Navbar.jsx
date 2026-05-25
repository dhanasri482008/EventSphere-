import { Link, useNavigate } from "react-router-dom"

import { signOut } from "firebase/auth"

import { auth } from "../firebase/firebase"

import ThemeToggle from "./ThemeToggle"

function Navbar({
  darkMode,
  setDarkMode
}) {

  const navigate =
    useNavigate()

  // USER DATA

  const role =
    localStorage.getItem("role")

  const userName =
    localStorage.getItem("userName")

  // LOGOUT

  const handleLogout =
    async () => {

      try {

        await signOut(auth)

        localStorage.removeItem("role")

        localStorage.removeItem("userName")

        alert(
          "Logged Out Successfully"
        )

        navigate("/login")

      }

      catch (error) {

        console.log(error)

      }

    }

  return (

    <nav className="flex items-center justify-between px-10 py-5 bg-slate-900 shadow-lg sticky top-0 z-50 flex-wrap gap-5">

      {/* LOGO */}

      <Link to="/">

        <h1 className="text-4xl font-bold text-purple-500">

          EventSphere

        </h1>

      </Link>

      {/* NAVIGATION LINKS */}

      <div className="flex items-center gap-8 text-lg font-medium flex-wrap">

        {/* HOME */}

        <Link
          to="/"
          className="hover:text-purple-400 transition"
        >

          Home

        </Link>

        {/* EVENTS */}

        <Link
          to="/events"
          className="hover:text-purple-400 transition"
        >

          Events

        </Link>

        {/* ORGANIZER LINKS */}

        {

          role === "organizer" && (

            <>

              <Link
                to="/create-event"
                className="hover:text-purple-400 transition"
              >

                Create Event

              </Link>

              <Link
                to="/dashboard"
                className="hover:text-purple-400 transition"
              >

                Dashboard

              </Link>

              <Link
                to="/check-in"
                className="hover:text-purple-400 transition"
              >

                Check In

              </Link>

              <Link
                to="/ai-features"
                className="hover:text-purple-400 transition"
              >

                AI Features

              </Link>

              <Link
                to="/smart-schedule"
                className="hover:text-purple-400 transition"
              >

                Smart Schedule

              </Link>

            </>

          )

        }

        {/* USER LINKS */}

        {

          role === "user" && (

            <>

              <Link
                to="/my-tickets"
                className="hover:text-purple-400 transition"
              >

                My Tickets

              </Link>

              <Link
                to="/wishlist"
                className="hover:text-purple-400 transition"
              >

                Wishlist

              </Link>

              <Link
                to="/notifications"
                className="hover:text-purple-400 transition"
              >

                Notifications

              </Link>

              <Link
                to="/ai-features"
                className="hover:text-purple-400 transition"
              >

                AI Recommendations

              </Link>

            </>

          )

        }

      </div>

      {/* RIGHT SIDE */}

      <div className="flex items-center gap-5 flex-wrap">

        {/* THEME TOGGLE */}

        <ThemeToggle
          darkMode={darkMode}
          setDarkMode={setDarkMode}
        />

        {/* NOT LOGGED IN */}

        {

          !role && (

            <div className="flex items-center gap-4">

              <Link
                to="/login"
                className="bg-slate-700 px-5 py-2 rounded-xl hover:bg-slate-600 transition"
              >

                Login

              </Link>

              <Link
                to="/signup"
                className="bg-purple-600 px-5 py-2 rounded-xl hover:bg-purple-700 transition"
              >

                Signup

              </Link>

            </div>

          )

        }

        {/* LOGGED IN */}

        {

          role && (

            <div className="flex items-center gap-4">

              <p className="text-purple-400 font-bold text-lg">

                {userName || role}

              </p>

              <button
                onClick={handleLogout}
                className="bg-red-600 px-5 py-2 rounded-xl hover:bg-red-700 transition"
              >

                Logout

              </button>

            </div>

          )

        }

      </div>

    </nav>

  )

}

export default Navbar