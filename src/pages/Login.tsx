import { useState } from "react";
import { useLogin } from "../hooks";

export default function Login({ onLoggedIn }: { onLoggedIn?: () => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginMutation = useLogin();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loginMutation.mutate(
      { email, password },
      {
        onSuccess: () => {
          onLoggedIn?.();
        },
      }
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">
        <h1 className="text-2xl font-bold text-[#3A4374] mb-6">Login</h1>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-[#3A4374] mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full rounded-md bg-[#F7F8FD] px-3 py-3 outline-none focus:ring-2 focus:ring-[#AD1FEA]"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#3A4374] mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full rounded-md bg-[#F7F8FD] px-3 py-3 outline-none focus:ring-2 focus:ring-[#AD1FEA]"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loginMutation.isPending}
            className="w-full inline-flex items-center justify-center rounded-lg bg-[#AD1FEA] px-4 py-2 text-sm font-semibold text-white hover:bg-[#C75AF6] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loginMutation.isPending ? "Logging in ..." : "Log In"}
          </button>

          {loginMutation.isError && (
            <div className="text-red-500 text-sm mt-2">
              Login failed: {loginMutation.error?.message}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}