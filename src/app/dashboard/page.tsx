import { Users, FileText, CheckCircle, Clock, TrendingUp, ArrowUpRight } from 'lucide-react';
import { connectDB } from '@/lib/mongodb';
import User from '@/models/User';
import Post from '@/models/Post';
import { UsersAreaChart, PostsBarChart } from '@/components/dashboard/Charts';
import Link from 'next/link';

async function getData() {
  try {
    await connectDB();
    const [userCount, postCount, published, drafts, recentUsers, recentPosts] = await Promise.all([
      User.countDocuments(),
      Post.countDocuments(),
      Post.countDocuments({ status: 'published' }),
      Post.countDocuments({ status: 'draft' }),
      User.find().sort({ createdAt: -1 }).limit(5).lean(),
      Post.find().sort({ createdAt: -1 }).limit(5).lean(),
    ]);
    return {
      stats: { userCount, postCount, published, drafts },
      recentUsers: recentUsers.map(u => ({ _id: u._id.toString(), name: u.name, email: u.email, createdAt: u.createdAt ? new Date(u.createdAt).toLocaleDateString() : '-' })),
      recentPosts: recentPosts.map(p => ({ _id: p._id.toString(), title: p.title, author: p.author, status: p.status, createdAt: p.createdAt ? new Date(p.createdAt).toLocaleDateString() : '-' })),
    };
  } catch {
    return {
      stats: { userCount: 0, postCount: 0, published: 0, drafts: 0 },
      recentUsers: [],
      recentPosts: [],
    };
  }
}

export default async function Dashboard() {
  const { stats, recentUsers, recentPosts } = await getData();

  const statCards = [
    { label: 'Total Users', value: stats.userCount, icon: Users, color: 'bg-indigo-50 text-indigo-600', change: '+12%' },
    { label: 'Total Posts', value: stats.postCount, icon: FileText, color: 'bg-blue-50 text-blue-600', change: '+8%' },
    { label: 'Published', value: stats.published, icon: CheckCircle, color: 'bg-green-50 text-green-600', change: '+5%' },
    { label: 'Drafts', value: stats.drafts, icon: Clock, color: 'bg-orange-50 text-orange-600', change: '-2%' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Overview</h2>
        <p className="text-gray-500 text-sm mt-1">Welcome back. Here's what's happening.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
        {statCards.map(({ label, value, icon: Icon, color, change }) => (
          <div key={label} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${color}`}>
                <Icon size={18} />
              </div>
              <span className={`flex items-center gap-0.5 text-xs font-semibold ${change.startsWith('+') ? 'text-green-600' : 'text-red-500'}`}>
                <TrendingUp size={12} />{change}
              </span>
            </div>
            <div className="text-3xl font-extrabold text-gray-900">{value}</div>
            <div className="text-gray-400 text-sm mt-1">{label}</div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-bold text-gray-900">User Growth</h3>
              <p className="text-gray-400 text-xs mt-0.5">Last 7 months</p>
            </div>
            <span className="text-xs bg-green-50 text-green-600 px-2.5 py-1 rounded-full font-medium">+18% avg</span>
          </div>
          <UsersAreaChart />
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-bold text-gray-900">Posts Published</h3>
              <p className="text-gray-400 text-xs mt-0.5">Last 7 months</p>
            </div>
            <span className="text-xs bg-blue-50 text-blue-600 px-2.5 py-1 rounded-full font-medium">+22% avg</span>
          </div>
          <PostsBarChart />
        </div>
      </div>

      {/* Recent tables */}
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
            <h3 className="font-bold text-gray-900">Recent Users</h3>
            <Link href="/dashboard/users" className="text-xs text-indigo-600 font-medium flex items-center gap-1 hover:gap-2 transition-all">View all <ArrowUpRight size={12} /></Link>
          </div>
          {recentUsers.length === 0 ? (
            <div className="px-6 py-10 text-center text-gray-400 text-sm">No users yet. <Link href="/dashboard/users" className="text-indigo-600 underline">Add one</Link>.</div>
          ) : (
            <div className="divide-y divide-gray-50">
              {recentUsers.map(u => (
                <div key={u._id} className="px-6 py-3.5 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-linear-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-white text-xs font-bold shrink-0">
                    {u.name.slice(0, 2).toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-gray-900 text-sm truncate">{u.name}</div>
                    <div className="text-gray-400 text-xs truncate">{u.email}</div>
                  </div>
                  <div className="text-gray-300 text-xs">{u.createdAt}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
            <h3 className="font-bold text-gray-900">Recent Posts</h3>
            <Link href="/dashboard/posts" className="text-xs text-indigo-600 font-medium flex items-center gap-1 hover:gap-2 transition-all">View all <ArrowUpRight size={12} /></Link>
          </div>
          {recentPosts.length === 0 ? (
            <div className="px-6 py-10 text-center text-gray-400 text-sm">No posts yet. <Link href="/dashboard/posts" className="text-indigo-600 underline">Create one</Link>.</div>
          ) : (
            <div className="divide-y divide-gray-50">
              {recentPosts.map(p => (
                <div key={p._id} className="px-6 py-3.5 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center shrink-0">
                    <FileText size={14} className="text-gray-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-gray-900 text-sm truncate">{p.title}</div>
                    <div className="text-gray-400 text-xs">{p.author}</div>
                  </div>
                  <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${p.status === 'published' ? 'bg-green-50 text-green-600' : 'bg-orange-50 text-orange-600'}`}>
                    {p.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

