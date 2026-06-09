import Link from 'next/link';
import { Calendar, User, ArrowRight, Tag } from 'lucide-react';
import { connectDB } from '@/lib/mongodb';
import Post from '@/models/Post';

interface PostDoc {
  _id: string;
  title: string;
  excerpt: string;
  author: string;
  status: string;
  tags: string[];
  createdAt: string;
}

async function getPosts(): Promise<PostDoc[]> {
  await connectDB();
  const posts = await Post.find({ status: 'published' }).sort({ createdAt: -1 }).lean();
  return posts.map(p => ({
    _id: p._id.toString(),
    title: p.title,
    excerpt: p.excerpt,
    author: p.author,
    status: p.status,
    tags: p.tags ?? [],
    createdAt: p.createdAt ? new Date(p.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : '',
  }));
}

const placeholders = [
  { title: 'Getting Started with Nexus in 5 Minutes', excerpt: 'A complete walkthrough of setting up your account, inviting your team, and publishing your first piece of content.', author: 'Alex Rivera', tags: ['Tutorial', 'Guide'], date: 'May 12, 2024' },
  { title: 'How We Scaled to 10,000 Users Without Downtime', excerpt: 'An engineering deep-dive into the infrastructure decisions that let us grow 10x without a single incident.', author: 'Priya Nair', tags: ['Engineering', 'Scale'], date: 'April 28, 2024' },
  { title: 'The Future of Team Collaboration', excerpt: 'AI-powered workflows, async-first communication, and the tools that will define the next decade of remote work.', author: 'Luca Bianchi', tags: ['Product', 'AI'], date: 'April 10, 2024' },
];

export default async function Blog() {
  const posts = await getPosts();
  const hasReal = posts.length > 0;

  return (
    <div>
      <section className="bg-linear-to-br from-slate-900 to-indigo-950 text-white py-24 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <p className="text-indigo-400 text-sm font-semibold uppercase tracking-widest mb-4">Blog</p>
          <h1 className="text-5xl font-extrabold mb-5">Insights & Updates</h1>
          <p className="text-slate-300 text-lg">Product news, engineering deep-dives, and growth tips from the Nexus team.</p>
        </div>
      </section>

      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          {!hasReal && (
            <div className="bg-indigo-50 border border-indigo-100 rounded-xl px-5 py-3 mb-8 text-sm text-indigo-700 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
              Showing example posts â€” create real posts from the <Link href="/dashboard/posts" className="underline font-medium">Dashboard</Link>.
            </div>
          )}

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {(hasReal
              ? posts.map(p => ({ title: p.title, excerpt: p.excerpt, author: p.author, tags: p.tags, date: p.createdAt, id: p._id }))
              : placeholders.map((p, i) => ({ ...p, id: String(i) }))
            ).map(post => (
              <article key={post.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all border border-gray-100 flex flex-col">
                <div className="h-3 bg-gradient-to-r from-indigo-500 to-purple-500" />
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {post.tags.slice(0, 2).map(tag => (
                      <span key={tag} className="flex items-center gap-1 bg-indigo-50 text-indigo-600 text-xs px-2.5 py-1 rounded-full font-medium">
                        <Tag size={10} />{tag}
                      </span>
                    ))}
                  </div>
                  <h2 className="font-bold text-gray-900 text-lg mb-3 leading-snug flex-1">{post.title}</h2>
                  <p className="text-gray-500 text-sm leading-relaxed mb-5 line-clamp-3">{post.excerpt || 'Click to read the full article.'}</p>
                  <div className="flex items-center justify-between text-xs text-gray-400 pt-4 border-t border-gray-100">
                    <span className="flex items-center gap-1.5"><User size={12} />{post.author}</span>
                    <span className="flex items-center gap-1.5"><Calendar size={12} />{post.date}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {hasReal && posts.length === 0 && (
            <p className="text-center text-gray-400 py-16">No published posts yet.</p>
          )}
        </div>
      </section>
    </div>
  );
}

