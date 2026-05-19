import Sidebar from "../components/Sidebar"
import AnalyticsChart from "../components/AnalyticsChart"

function Dashboard() {
  return (
    <div className="flex">

      <Sidebar />

      <div className="ml-[250px] p-10 w-full">

        <h1 className="text-5xl font-bold mb-10">
          Organizer Dashboard
        </h1>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

          <div className="bg-slate-800 p-6 rounded-3xl shadow-lg">
            <h2 className="text-gray-400">
              Total Events
            </h2>

            <p className="text-4xl font-bold mt-4">
              12
            </p>
          </div>

          <div className="bg-slate-800 p-6 rounded-3xl shadow-lg">
            <h2 className="text-gray-400">
              Tickets Sold
            </h2>

            <p className="text-4xl font-bold mt-4">
              1245
            </p>
          </div>

          <div className="bg-slate-800 p-6 rounded-3xl shadow-lg">
            <h2 className="text-gray-400">
              Revenue
            </h2>

            <p className="text-4xl font-bold mt-4 text-green-400">
              ₹2.4L
            </p>
          </div>

          <div className="bg-slate-800 p-6 rounded-3xl shadow-lg">
            <h2 className="text-gray-400">
              Check-ins
            </h2>

            <p className="text-4xl font-bold mt-4 text-purple-400">
              856
            </p>
          </div>

        </div>

        {/* Analytics Chart */}
        <AnalyticsChart />

        {/* Recent Events */}
        <div className="mt-16">

          <h2 className="text-4xl font-bold mb-8">
            Recent Events
          </h2>

          <div className="space-y-6">

            <div className="bg-slate-800 p-6 rounded-3xl flex justify-between items-center shadow-lg">

              <div>
                <h3 className="text-2xl font-bold">
                  Tech Conference 2026
                </h3>

                <p className="text-gray-400 mt-2">
                  Chennai • 450 Registrations
                </p>
              </div>

              <button className="bg-purple-600 px-6 py-3 rounded-2xl hover:bg-purple-700">
                View
              </button>

            </div>

            <div className="bg-slate-800 p-6 rounded-3xl flex justify-between items-center shadow-lg">

              <div>
                <h3 className="text-2xl font-bold">
                  Startup Meetup
                </h3>

                <p className="text-gray-400 mt-2">
                  Bangalore • 320 Registrations
                </p>
              </div>

              <button className="bg-purple-600 px-6 py-3 rounded-2xl hover:bg-purple-700">
                View
              </button>

            </div>

          </div>

        </div>

      </div>

    </div>
  )
}

export default Dashboard