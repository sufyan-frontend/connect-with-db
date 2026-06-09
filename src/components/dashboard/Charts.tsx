'use client';
import {
  AreaChart, Area, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer
} from 'recharts';

const data = [
  { month: 'Jan', users: 65,  posts: 28 },
  { month: 'Feb', users: 98,  posts: 42 },
  { month: 'Mar', users: 130, posts: 55 },
  { month: 'Apr', users: 190, posts: 73 },
  { month: 'May', users: 175, posts: 68 },
  { month: 'Jun', users: 240, posts: 91 },
  { month: 'Jul', users: 310, posts: 115 },
];

export function UsersAreaChart() {
  return (
    <ResponsiveContainer width="100%" height={220}>
      <AreaChart data={data} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
        <defs>
          <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#6366f1" stopOpacity={0.2} />
            <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
        <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
        <Tooltip
          contentStyle={{ background: '#0f172a', border: 'none', borderRadius: 8, color: '#fff', fontSize: 13 }}
          cursor={{ stroke: '#6366f1', strokeWidth: 1, strokeDasharray: '4 4' }}
        />
        <Area type="monotone" dataKey="users" stroke="#6366f1" strokeWidth={2} fill="url(#colorUsers)" dot={false} />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export function PostsBarChart() {
  return (
    <ResponsiveContainer width="100%" height={220}>
      <BarChart data={data} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
        <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
        <Tooltip
          contentStyle={{ background: '#0f172a', border: 'none', borderRadius: 8, color: '#fff', fontSize: 13 }}
          cursor={{ fill: '#f1f5f9' }}
        />
        <Bar dataKey="posts" fill="#6366f1" radius={[5, 5, 0, 0]} maxBarSize={40} />
      </BarChart>
    </ResponsiveContainer>
  );
}

