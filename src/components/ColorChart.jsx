import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell,
} from 'recharts';

const COLORS = {
  red: '#ef4444', orange: '#f97316', yellow: '#eab308',
  green: '#22c55e', blue: '#3b82f6', purple: '#a855f7', white: '#e5e7eb',
};

export default function ColorChart({ data = [] }) {
  // data: [{ color: 'red', percent: 8.5, instrument: 'Bass' }, ...]
  return (
    <section
      aria-labelledby="color-chart-title"
      className="bg-white/5 border border-white/10 rounded-xl p-4"
    >
      <h3 id="color-chart-title" className="text-sm uppercase tracking-wider text-cyan-300 mb-2">
        Color distribution (current frame)
      </h3>
      <ul className="sr-only">
  {data.map(d => <li key={d.color}>{d.instrument}: {d.percent}%</li>)}
</ul>
      <div style={{ width: '100%', height: 180 }}>
        <ResponsiveContainer>
          <BarChart data={data} layout="vertical" margin={{ left: 8, right: 8 }}>
            <XAxis type="number" unit="%" hide />
            <YAxis
              type="category"
              dataKey="instrument"
              width={70}
              tick={{ fill: '#a5f3fc', fontSize: 12 }}
            />
            <Tooltip
              formatter={(v, n, p) => [`${v}%`, p.payload.color]}
              contentStyle={{ background: '#0a0e27', border: '1px solid #22d3ee' }}
            />
            <Bar dataKey="percent" radius={[0, 4, 4, 0]}>
              {data.map((d) => (
                <Cell key={d.color} fill={COLORS[d.color]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}