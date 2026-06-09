'use client';
import { useState } from 'react';
import { Save, Bell, Shield, User, Palette, Check } from 'lucide-react';

export default function Settings() {
  const [profile, setProfile] = useState({ name: 'Admin User', email: 'admin@nexus.app', bio: 'Platform administrator', timezone: 'UTC' });
  const [notifs, setNotifs] = useState({ email: true, push: false, weekly: true, marketing: false });
  const [appearance, setAppearance] = useState({ theme: 'light', density: 'comfortable', language: 'en' });
  const [saved, setSaved] = useState<string | null>(null);

  function saveSection(section: string) {
    setSaved(section);
    setTimeout(() => setSaved(null), 2500);
  }

  const inputCls = 'w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent';
  const sectionCls = 'bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden';

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Settings</h2>
        <p className="text-gray-500 text-sm mt-1">Manage your account and platform preferences</p>
      </div>

      {/* Profile */}
      <div className={sectionCls}>
        <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-3">
          <User size={18} className="text-indigo-600" />
          <h3 className="font-bold text-gray-900">Profile</h3>
        </div>
        <div className="p-6 space-y-4">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-2xl bg-linear-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-xl font-bold">AU</div>
            <div>
              <button type="button" className="text-sm text-indigo-600 font-medium hover:underline">Change avatar</button>
              <p className="text-gray-400 text-xs mt-0.5">JPG, PNG or GIF. Max 2MB.</p>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Full Name</label>
              <input value={profile.name} onChange={e => setProfile({ ...profile, name: e.target.value })} className={inputCls} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
              <input type="email" value={profile.email} onChange={e => setProfile({ ...profile, email: e.target.value })} className={inputCls} />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Bio</label>
            <textarea rows={2} value={profile.bio} onChange={e => setProfile({ ...profile, bio: e.target.value })} className={`${inputCls} resize-none`} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Timezone</label>
            <select value={profile.timezone} onChange={e => setProfile({ ...profile, timezone: e.target.value })} className={`${inputCls} bg-white`}>
              {['UTC', 'America/New_York', 'America/Los_Angeles', 'Europe/London', 'Asia/Karachi', 'Asia/Tokyo'].map(tz => (
                <option key={tz} value={tz}>{tz}</option>
              ))}
            </select>
          </div>
          <button type="button" onClick={() => saveSection('profile')} className="flex items-center gap-2 bg-indigo-600 text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-indigo-700 transition-colors">
            {saved === 'profile' ? <><Check size={15} /> Saved!</> : <><Save size={15} /> Save Profile</>}
          </button>
        </div>
      </div>

      {/* Notifications */}
      <div className={sectionCls}>
        <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-3">
          <Bell size={18} className="text-indigo-600" />
          <h3 className="font-bold text-gray-900">Notifications</h3>
        </div>
        <div className="p-6 space-y-4">
          {([
            { key: 'email', label: 'Email notifications', desc: 'Receive alerts and summaries by email' },
            { key: 'push', label: 'Push notifications', desc: 'Browser notifications for real-time alerts' },
            { key: 'weekly', label: 'Weekly digest', desc: 'Summary of platform activity every Monday' },
            { key: 'marketing', label: 'Product updates', desc: 'News about new features and announcements' },
          ] as const).map(item => (
            <div key={item.key} className="flex items-center justify-between py-1">
              <div>
                <div className="text-sm font-medium text-gray-900">{item.label}</div>
                <div className="text-gray-400 text-xs mt-0.5">{item.desc}</div>
              </div>
              <button
                type="button"
                onClick={() => setNotifs({ ...notifs, [item.key]: !notifs[item.key] })}
                className={`w-11 h-6 rounded-full transition-colors relative shrink-0 ${notifs[item.key] ? 'bg-indigo-600' : 'bg-gray-200'}`}
              >
                <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${notifs[item.key] ? 'translate-x-5' : ''}`} />
              </button>
            </div>
          ))}
          <button type="button" onClick={() => saveSection('notifs')} className="flex items-center gap-2 bg-indigo-600 text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-indigo-700 transition-colors mt-2">
            {saved === 'notifs' ? <><Check size={15} /> Saved!</> : <><Save size={15} /> Save Preferences</>}
          </button>
        </div>
      </div>

      {/* Appearance */}
      <div className={sectionCls}>
        <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-3">
          <Palette size={18} className="text-indigo-600" />
          <h3 className="font-bold text-gray-900">Appearance</h3>
        </div>
        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">Theme</label>
            <div className="flex gap-3">
              {['light', 'dark', 'system'].map(t => (
                <button key={t} type="button" onClick={() => setAppearance({ ...appearance, theme: t })}
                  className={`flex-1 py-2.5 rounded-xl border text-sm font-medium capitalize transition-all ${appearance.theme === t ? 'border-indigo-600 text-indigo-600 bg-indigo-50' : 'border-gray-200 text-gray-600 hover:border-gray-300'}`}>
                  {t}
                </button>
              ))}
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Density</label>
              <select value={appearance.density} onChange={e => setAppearance({ ...appearance, density: e.target.value })} className={`${inputCls} bg-white`}>
                <option value="compact">Compact</option>
                <option value="comfortable">Comfortable</option>
                <option value="spacious">Spacious</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Language</label>
              <select value={appearance.language} onChange={e => setAppearance({ ...appearance, language: e.target.value })} className={`${inputCls} bg-white`}>
                <option value="en">English</option>
                <option value="ur">Urdu</option>
                <option value="ar">Arabic</option>
                <option value="fr">French</option>
              </select>
            </div>
          </div>
          <button type="button" onClick={() => saveSection('appearance')} className="flex items-center gap-2 bg-indigo-600 text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-indigo-700 transition-colors">
            {saved === 'appearance' ? <><Check size={15} /> Saved!</> : <><Save size={15} /> Save Appearance</>}
          </button>
        </div>
      </div>

      {/* Security */}
      <div className={sectionCls}>
        <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-3">
          <Shield size={18} className="text-indigo-600" />
          <h3 className="font-bold text-gray-900">Security</h3>
        </div>
        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Current Password</label>
            <input type="password" placeholder="â€¢â€¢â€¢â€¢â€¢â€¢â€¢â€¢" className={inputCls} />
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">New Password</label>
              <input type="password" placeholder="â€¢â€¢â€¢â€¢â€¢â€¢â€¢â€¢" className={inputCls} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Confirm Password</label>
              <input type="password" placeholder="â€¢â€¢â€¢â€¢â€¢â€¢â€¢â€¢" className={inputCls} />
            </div>
          </div>
          <button type="button" onClick={() => saveSection('security')} className="flex items-center gap-2 bg-indigo-600 text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-indigo-700 transition-colors">
            {saved === 'security' ? <><Check size={15} /> Saved!</> : <><Save size={15} /> Update Password</>}
          </button>
        </div>
      </div>
    </div>
  );
}

