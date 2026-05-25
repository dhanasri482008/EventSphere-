import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts"

const data = [
  {
    month: "Jan",
    revenue: 4000,
  },
  {
    month: "Feb",
    revenue: 7000,
  },
  {
    month: "Mar",
    revenue: 5000,
  },
  {
    month: "Apr",
    revenue: 9000,
  },
  {
    month: "May",
    revenue: 12000,
  },
]

function AnalyticsChart() {
  return (
    <div className="bg-slate-800 p-6 rounded-3xl shadow-lg mt-16">

      <h2 className="text-3xl font-bold mb-8">
        Revenue Analytics
      </h2>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>

          <XAxis dataKey="month" stroke="#ccc" />

          <YAxis stroke="#ccc" />

          <Tooltip />

          <Line
            type="monotone"
            dataKey="revenue"
            stroke="#a855f7"
            strokeWidth={4}
          />

        </LineChart>
      </ResponsiveContainer>

    </div>
  )
}

export default AnalyticsChart