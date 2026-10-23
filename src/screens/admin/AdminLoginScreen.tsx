import React, { useState } from 'react';
import { articleService } from '../../services/articleService';
import EirenLogo from '../../components/EirenLogo';

interface AdminLoginScreenProps {
  onLoginSuccess: () => void;
  onBackToSite: () => void;
}

export default function AdminLoginScreen({
  onLoginSuccess,
  onBackToSite,
}: AdminLoginScreenProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await articleService.login(email.trim(), password);
      onLoginSuccess();
    } catch (err: any) {
      setError(err.message || 'Invalid administrator credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fcf9f8] flex flex-col justify-between items-center py-12 px-6">
      {/* Top Header Bar */}
      <div className="w-full max-w-md flex justify-between items-center pb-8">
        <button
          onClick={onBackToSite}
          className="inline-flex items-center gap-1.5 text-xs font-label-caps uppercase tracking-wider text-[#5e5e5e] hover:text-[#b51c00] transition-colors cursor-pointer"
        >
          <span className="material-symbols-outlined text-[16px]">arrow_back</span>
          <span>Return to Website</span>
        </button>

        <span className="font-label-caps text-[10px] uppercase text-[#8c8c8c] tracking-widest">
          Secure Portal
        </span>
      </div>

      {/* Main Login Card */}
      <div className="w-full max-w-md bg-white border border-[#eae7e7] shadow-md p-8 sm:p-10 relative overflow-hidden">
        {/* Accent Bar */}
        <div className="w-16 h-1.5 bg-[#b51c00] absolute top-0 left-0"></div>

        <div className="text-center space-y-4 mb-8">
          <div className="flex justify-center">
            <EirenLogo size="md" />
          </div>
          <div className="pt-2">
            <h1 className="font-headline-sm text-xl font-bold text-[#1b1b1b] uppercase tracking-tight">
              CMS Administration
            </h1>
            <p className="font-body-sm text-xs text-[#5e5e5e] mt-1">
              Authorized Eiren Law Office Personnel Access
            </p>
          </div>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-[#fff1ee] border-l-3 border-[#b51c00] text-xs text-[#b51c00] font-body-sm flex items-start gap-2">
            <span className="material-symbols-outlined text-[18px] shrink-0">error</span>
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-label-caps uppercase tracking-wider text-[#1b1b1b] mb-1.5 font-bold">
              Administrator Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@eirenlaw.com"
              className="w-full px-3.5 py-2.5 text-sm bg-[#fcf9f8] border border-[#eae7e7] text-[#1b1b1b] placeholder-[#8c8c8c] focus:outline-none focus:border-[#b51c00] transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-label-caps uppercase tracking-wider text-[#1b1b1b] mb-1.5 font-bold">
              Access Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              className="w-full px-3.5 py-2.5 text-sm bg-[#fcf9f8] border border-[#eae7e7] text-[#1b1b1b] placeholder-[#8c8c8c] focus:outline-none focus:border-[#b51c00] transition-colors"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-[#1b1b1b] hover:bg-[#b51c00] text-white text-xs font-label-caps uppercase tracking-wider transition-colors duration-150 cursor-pointer flex items-center justify-center gap-2 shadow-sm disabled:opacity-50"
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Verifying Access...</span>
              </>
            ) : (
              <>
                <span>Sign In to Dashboard</span>
                <span className="material-symbols-outlined text-[16px]">lock_open</span>
              </>
            )}
          </button>
        </form>
      </div>

      {/* Footer Notice */}
      <div className="text-center text-[11px] text-[#8c8c8c] font-label-caps uppercase tracking-wider mt-6">
        Eiren Law Office © 2025 · Private Publishing Environment
      </div>
    </div>
  );
}
