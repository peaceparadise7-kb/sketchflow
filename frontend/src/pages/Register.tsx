import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthLayout } from '@/components/layout/AuthLayout';
import { GlassCard, GlassInput, GlassButton } from '@/components/ui';
import { ROUTES } from '@/constants';
import { registerUserApi } from '@/services/auth.service';

export const Register: React.FC = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!name || !email || !password) {
      setError('Please fill in all fields.');
      return;
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters long.');
      return;
    }

    setLoading(true);

    try {
      await registerUserApi({ name, email, password });
      navigate(ROUTES.DASHBOARD);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Registration failed. Please try again.';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Create Account"
      subtitle="Join SketchFlow to start collaborating on architectural whiteboards"
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
            id="register-name"
            label="Full Name"
            type="text"
            placeholder="Alex Vance"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            autoFocus
          />

          <GlassInput
            id="register-email"
            label="Work Email Address"
            type="email"
            placeholder="name@company.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <div className="space-y-1.5">
            <label htmlFor="register-password" className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider">
              Password
            </label>
            <div className="relative">
              <GlassInput
                id="register-password"
                type={showPassword ? 'text' : 'password'}
                placeholder="At least 8 characters"
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
            {loading ? 'Creating Account...' : 'Create Account'}
          </GlassButton>
        </form>

        <div className="mt-6 pt-6 border-t border-white/10 text-center">
          <p className="text-xs text-neutral-400 font-medium">
            Already have a SketchFlow account?{' '}
            <Link to={ROUTES.LOGIN} className="text-white font-bold hover:underline">
              Sign in instead
            </Link>
          </p>
        </div>
      </GlassCard>
    </AuthLayout>
  );
};

export default Register;
