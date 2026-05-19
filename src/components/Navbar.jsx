import { Link } from "react-router-dom"
import ThemeToggle from "./ThemeToggle"

function Navbar({ darkMode, setDarkMode }) {
  return (

    <nav className="flex items-center justify-between px-8 py-5 bg-slate-900 shadow-lg">

      <h1 className="text-3xl font-bold text-purple-500">
        EventSphere
      </h1>

      <div className="flex gap-6 text-lg items-center flex-wrap">

        <Link to="/" className="hover:text-purple-400">
          Home
        </Link>

        <Link to="/events" className="hover:text-purple-400">
          Events
        </Link>

        <Link to="/event-details" className="hover:text-purple-400">
          Details
        </Link>

        <Link to="/create-event" className="hover:text-purple-400">
          Create Event
        </Link>

        <Link to="/dashboard" className="hover:text-purple-400">
          Dashboard
        </Link>

        <Link to="/booking" className="hover:text-purple-400">
          Booking
        </Link>

        <Link to="/my-tickets" className="hover:text-purple-400">
          My Tickets
        </Link>

        <Link to="/wishlist" className="hover:text-purple-400">
          Wishlist
        </Link>

        <Link to="/notifications" className="hover:text-purple-400">
          Notifications
        </Link>

        <Link to="/ai-features" className="hover:text-purple-400">
          AI Features
        </Link>

        <ThemeToggle
          darkMode={darkMode}
          setDarkMode={setDarkMode}
        />

        <Link
          to="/login"
          className="bg-purple-600 px-5 py-2 rounded-xl hover:bg-purple-700"
        >
          Login
        </Link>

      </div>

    </nav>
  )
}

export default Navbar