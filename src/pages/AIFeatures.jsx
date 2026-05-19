import Navbar from "../components/Navbar"

function AIFeatures() {
  return (
    <div>

      <Navbar />

      <div className="p-10">

        <h1 className="text-5xl font-bold mb-10">
          AI Features
        </h1>

        {/* AI Recommendations */}
        <div className="bg-slate-800 p-8 rounded-3xl mb-10">

          <h2 className="text-3xl font-bold mb-6">
            🎯 AI Event Recommendations
          </h2>

          <div className="space-y-4">

            <div className="bg-slate-700 p-5 rounded-2xl">
              AI Innovation Summit 2026
            </div>

            <div className="bg-slate-700 p-5 rounded-2xl">
              Startup Networking Meetup
            </div>

            <div className="bg-slate-700 p-5 rounded-2xl">
              Full Stack Developers Conference
            </div>

          </div>

        </div>

        {/* AI Description Generator */}
        <div className="bg-slate-800 p-8 rounded-3xl mb-10">

          <h2 className="text-3xl font-bold mb-6">
            ✨ AI Description Generator
          </h2>

          <textarea
            placeholder="Enter event bullet points..."
            rows="5"
            className="w-full p-5 rounded-2xl bg-slate-700 outline-none"
          ></textarea>

          <button className="mt-6 bg-purple-600 px-8 py-4 rounded-2xl hover:bg-purple-700">
            Generate Description
          </button>

        </div>

        {/* Smart Schedule Builder */}
        <div className="bg-slate-800 p-8 rounded-3xl">

          <h2 className="text-3xl font-bold mb-6">
            📅 Smart Schedule Builder
          </h2>

          <div className="space-y-4">

            <div className="bg-slate-700 p-5 rounded-2xl">
              10:00 AM - Opening Keynote
            </div>

            <div className="bg-slate-700 p-5 rounded-2xl">
              11:30 AM - AI Workshop
            </div>

            <div className="bg-slate-700 p-5 rounded-2xl">
              2:00 PM - Startup Pitch Session
            </div>

          </div>

        </div>

      </div>

    </div>
  )
}

export default AIFeatures