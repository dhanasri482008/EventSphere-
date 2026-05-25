import { Link } from "react-router-dom"

function Sidebar() {
  return (
    <div className="w-[250px] h-screen bg-slate-900 p-6 fixed left-0 top-0">

      <h1 className="text-3xl font-bold text-purple-500 mb-12">
        EventSphere
      </h1>

      <div className="flex flex-col gap-6 text-lg">

        <Link to="/" className="hover:text-purple-400">
          Home
        </Link>

        <Link to="/dashboard" className="hover:text-purple-400">
          Dashboard
        </Link>

        <Link to="/events" className="hover:text-purple-400">
          Events
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

      </div>

    </div>
  )
}

export default Sidebar