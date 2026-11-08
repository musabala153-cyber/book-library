import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts'

const COLORS = {
  Reading: '#0d6efd',
  Read: '#198754',
  Unread: '#6c757d',
}

function StatsChart({ books }) {
  const data = ['Reading', 'Read', 'Unread'].map((status) => ({
    status,
    count: books.filter((b) => b.status === status).length,
  }))

  if (books.length === 0) return null

  return (
    <div className="mb-4">
      <h2 className="fs-5">Your reading stats</h2>
      <p className="text-muted mb-2">
        {data.map((d) => `${d.status}: ${d.count}`).join(' | ')}
      </p>
      <div style={{ width: '100%', height: 200 }}>
        <ResponsiveContainer>
          <BarChart data={data}>
            <XAxis dataKey="status" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="count">
              {data.map((d) => (
                <Cell key={d.status} fill={COLORS[d.status]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default StatsChart