import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../stores/AuthStore";
import { useBaseUrlStore } from "../stores/BaseUrlStore";

const RegisterPage = () => {
  const avatars = [
    "avatar1.png",
    "avatar2.png",
    "avatar3.png",
    "avatar4.png",
    "avatar5.png",
    "avatar6.png",
  ]; // adjust paths if needed

  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: "",
    avatar: avatars[0], // default avatar1
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const setToken = useAuthStore((s) => s.login);
  const baseUrl = useBaseUrlStore((s) => s.baseUrl);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validatePassword = (password) => {
    // at least 8 chars, 1 upper, 1 lower, 1 number
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&()[\]{}^#_+\-=|~`]{8,}$/;
    return regex.test(password);
  };

  const login = async (email, password) => {
    const response = await fetch(`${baseUrl}api/v1/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify({
            email: email,
            password: password
        })
    });

    const data = await response.json();

    console.log(JSON.stringify(data));
    setToken(data.token);
    
    navigate("/userPage");
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = { email: "", password: "", confirmPassword: "" };

    if (!validateEmail(form.email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (!validatePassword(form.password)) {
      newErrors.password =
        "Password must be at least 8 characters and include upper, lower case letters and a number.";
    }

    if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    setErrors(newErrors);

    const hasError = Object.values(newErrors).some((msg) => msg !== "");
    if (hasError) return;

    // You can replace this with your fetch/submit logic
    const payload = {
      firstname: form.firstname,
      lastname: form.lastname,
      email: form.email,
      password: form.password,
      avatar: form.avatar,
    };
    console.log("Register payload: ", payload);

    const response = await fetch(`${baseUrl}api/v1/auth/register`, {
        method: "POST",
        headers: {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify(payload)
    });

    const data = await response.json();

    login(payload.email, payload.password);
  };

  return (
    <div className="min-h-screen bg-neutral-50 flex items-center justify-center px-4">
      <div className="w-full max-w-4xl rounded-2xl bg-white shadow-lg border overflow-hidden">
        <div className="grid md:grid-cols-2">
          {/* Left: avatar selection */}
          <section className="bg-neutral-100 p-8 flex flex-col">
            <h2 className="text-lg font-semibold mb-4 text-neutral-900">
              Choose your avatar
            </h2>
            <p className="text-sm text-neutral-600 mb-6">
              Pick one of the default avatars for your profile.
            </p>

            <div className="grid grid-cols-3 gap-4">
              {avatars.map((avatar) => {
                const isSelected = form.avatar === avatar;
                return (
                  <button
                    key={avatar}
                    type="button"
                    onClick={() =>
                      setForm((prev) => ({ ...prev, avatar }))
                    }
                    className={`relative rounded-2xl border bg-white p-2 flex items-center justify-center transition 
                      hover:border-emerald-500 ${
                        isSelected
                          ? "border-emerald-600 ring-2 ring-emerald-500"
                          : "border-neutral-200"
                      }`}
                  >
                    <img
                      src={avatar} // e.g. "/avatars/avatar1.png"
                      alt={avatar}
                      className="h-16 w-16 object-cover rounded-full"
                    />
                  </button>
                );
              })}
            </div>

            <p className="md:mt-40 mt-10 text-x text-neutral-500">
              Already have an account? <Link to={"/login"} className="font-bold">Login</Link>
            </p>
          </section>

          {/* Right: register form */}
          <section className="p-8">
            <h1 className="text-2xl font-semibold text-neutral-900 mb-1">
              Create your account
            </h1>
            <p className="text-sm text-neutral-600 mb-6">
              Fill in the details below to join the cohort.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex gap-4">
                <div className="w-1/2">
                  <label className="block text-sm font-medium text-neutral-800 mb-1">
                    First name
                  </label>
                  <input
                    type="text"
                    name="firstname"
                    value={form.firstname}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600"
                    required
                  />
                </div>
                <div className="w-1/2">
                  <label className="block text-sm font-medium text-neutral-800 mb-1">
                    Last name
                  </label>
                  <input
                    type="text"
                    name="lastname"
                    value={form.lastname}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-800 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  className={`w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 ${
                    errors.email
                      ? "border-red-500 focus:ring-red-500"
                      : "border-neutral-300 focus:ring-emerald-600 focus:border-emerald-600"
                  }`}
                  required
                />
                {errors.email && (
                  <p className="mt-1 text-xs text-red-600">
                    {errors.email}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-800 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  className={`w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 ${
                    errors.password
                      ? "border-red-500 focus:ring-red-500"
                      : "border-neutral-300 focus:ring-emerald-600 focus:border-emerald-600"
                  }`}
                  required
                />
                <p className="mt-1 text-xs text-neutral-500">
                  At least 8 characters with upper and lower case letters and a
                  number.
                </p>
                {errors.password && (
                  <p className="mt-1 text-xs text-red-600">
                    {errors.password}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-800 mb-1">
                  Confirm password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  className={`w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 ${
                    errors.confirmPassword
                      ? "border-red-500 focus:ring-red-500"
                      : "border-neutral-300 focus:ring-emerald-600 focus:border-emerald-600"
                  }`}
                  required
                />
                {errors.confirmPassword && (
                  <p className="mt-1 text-xs text-red-600">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="mt-2 w-full rounded-lg bg-emerald-700 px-4 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-emerald-800 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:ring-offset-1"
              >
                Create account
              </button>
            </form>
          </section>

          
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
