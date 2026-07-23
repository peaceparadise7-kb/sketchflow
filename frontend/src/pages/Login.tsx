import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthLayout } from '@/components/layout/AuthLayout';
import { GlassCard, GlassInput, GlassButton } from '@/components/ui';
import { ROUTES } from '@/constants';

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }

    setLoading(true);

    try {
      navigate(ROUTES.DASHBOARD);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Invalid credentials. Please try again.';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Welcome Back"
      subtitle="Enter your credentials to access your SketchFlow workspaces"
    >
      <GlassCard className="p-8 shadow-2xl">
        <form onSubmit={handleSubmit} className="space-y-5">
          {error && (
            <div className="p-3.5 rounded-xl bg-rose-950/60 border border-rose-800/40 text-rose-300 text-xs font-medium flex items-start gap-2.5 shadow-inner">
              <span className="text-sm shrink-0">⚠️</span>
              <span className="leading-snug">{error}</span>
            </div>
          )}

          <GlassInput
            id="login-email"
            label="Email Address"
            type="email"
            placeholder="name@company.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoFocus
          />

          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label htmlFor="login-password" className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider">
                Password
              </label>
              <a href="#forgot" className="text-xs text-neutral-400 hover:text-white transition-colors font-medium">
                Forgot password?
              </a>
            </div>
            <div className="relative">
              <GlassInput
                id="login-password"
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white transition-colors text-xs font-medium px-1.5 py-0.5 rounded focus:outline-none"
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
          </div>

          <GlassButton
            type="submit"
            variant="primary"
            disabled={loading}
            className="w-full py-3 mt-2 text-sm font-semibold tracking-wide"
          >
            {loading ? 'Authenticating...' : 'Sign In to Workspace'}
          </GlassButton>
        </form>

        <div className="mt-6 pt-6 border-t border-white/10 text-center">
          <p className="text-xs text-neutral-400 font-medium">
            Don't have a SketchFlow account?{' '}
            <Link to={ROUTES.REGISTER} className="text-white font-bold hover:underline">
              Create an account
            </Link>
          </p>
        </div>
      </GlassCard>
    </AuthLayout>
  );
};

export default Login;
