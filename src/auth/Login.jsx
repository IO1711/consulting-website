import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import { useAuthStore } from "../stores/AuthStore";
import { useBaseUrlStore } from "../stores/BaseUrlStore";

const Login = () => {
  const login = useAuthStore((s) => s.login);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const baseUrl = useBaseUrlStore((s) => s.baseUrl);

  const location = useLocation();
  const navigate = useNavigate();

  // Where to go after login (default: home)
  const from = location.state?.from?.pathname || "/";

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch(`${baseUrl}api/v1/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (!response.ok) {
        setError("Invalid email or password.");
        return;
      }

      const data = await response.json();
      login(data.token);

      // go back to the page user tried to access
      navigate(from, { replace: true });
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl bg-white shadow-lg border px-8 py-10">
        <h1 className="text-2xl font-semibold text-neutral-900 mb-2">
          Welcome back
        </h1>
        <p className="text-sm text-neutral-600 mb-6">
          Log in to access your courses and resources.
        </p>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-neutral-800 mb-1"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              name="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600"
              required
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-neutral-800 mb-1"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              name="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600"
              required
            />
          </div>

          {error && (
            <p className="text-xs text-red-600 mt-1">
              {error}
            </p>
          )}

          <Button
            type="submit"
            className="mt-2 w-full rounded-lg bg-emerald-700 px-4 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-emerald-800 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:ring-offset-1"
          >
            Log in
          </Button>
        </form>

        <p className="mt-6 text-xs text-neutral-600 text-center">
          Don’t have an account?{" "}
          <Link
            to="/register"
            className="font-medium text-emerald-700 hover:underline"
          >
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
