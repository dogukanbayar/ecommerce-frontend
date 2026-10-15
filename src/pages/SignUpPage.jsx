import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Loader2 } from "lucide-react";
import { api } from "../api/api";

export default function SignUpPage() {
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState(null);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors }
  } = useForm({
    defaultValues: {
      role_id: ""
    }
  });

  const selectedRoleId = watch("role_id");
  const password = watch("password");

  useEffect(() => {
    api
      .get("/roles")
      .then((res) => {
        setRoles(res.data);
        const customerRole = res.data.find(
          (r) =>
            (r.code && r.code.toLowerCase() === "customer") ||
            (r.name && r.name.toLowerCase() === "müşteri") ||
            r.id === 3
        );
        if (customerRole) {
          setValue("role_id", String(customerRole.id));
        } else if (res.data.length > 0) {
          setValue("role_id", String(res.data[0].id));
        }
      })
      .catch((err) => {
        console.error("Roles fetch error:", err);
      });
  }, [setValue]);

  const currentRole = roles.find((r) => String(r.id) === String(selectedRoleId));
  const isStore =
    (currentRole && currentRole.code && currentRole.code.toLowerCase() === "store") ||
    (currentRole && currentRole.name && currentRole.name.toLowerCase() === "mağaza");

  const onSubmit = async (data) => {
    setLoading(true);
    setApiError(null);

    const payload = {
      name: data.name,
      email: data.email,
      password: data.password,
      role_id: Number(data.role_id)
    };

    if (isStore) {
      payload.store = {
        name: data.store_name,
        phone: data.store_phone,
        tax_no: data.store_tax_no,
        bank_account: data.store_bank_account
      };
    }

    try {
      await api.post("/signup", payload);
      toast.warn("You need to click link in email to activate your account!", {
        autoClose: 5000
      });
      setTimeout(() => {
        navigate(-1);
      }, 1500);
    } catch (err) {
      const errMsg = (err.response && err.response.data && err.response.data.message) || "Registration failed.";
      setApiError(errMsg);
      toast.error(errMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-sm border border-gray-200">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-[#252B42]">Sign Up</h2>
          <p className="text-sm text-gray-500 mt-1">Create your account</p>
        </div>

        {apiError && (
          <div className="mb-4 p-3 bg-red-50 text-red-600 rounded text-sm border border-red-200">
            {apiError}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">Name</label>
            <input
              type="text"
              placeholder="Full Name"
              {...register("name", {
                required: "Name is required",
                minLength: { value: 3, message: "Minimum 3 characters" }
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-[#23A6F0]"
            />
            {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>}
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">Email</label>
            <input
              type="email"
              placeholder="user@example.com"
              {...register("email", {
                required: "Email is required",
                validate: (v) => (v.includes("@") && v.includes(".")) || "Invalid email address"
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-[#23A6F0]"
            />
            {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>}
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              {...register("password", {
                required: "Password is required",
                minLength: { value: 8, message: "Minimum 8 characters" },
                validate: {
                  hasLower: (v) => /[a-z]/.test(v) || "At least 1 lowercase letter",
                  hasUpper: (v) => /[A-Z]/.test(v) || "At least 1 uppercase letter",
                  hasNumber: (v) => /[0-9]/.test(v) || "At least 1 number",
                  hasSpecial: (v) => /[^A-Za-z0-9]/.test(v) || "At least 1 special character"
                }
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-[#23A6F0]"
            />
            {errors.password && <p className="text-xs text-red-500 mt-1">{errors.password.message}</p>}
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">Confirm Password</label>
            <input
              type="password"
              placeholder="••••••••"
              {...register("confirmPassword", {
                required: "Please confirm password",
                validate: (v) => v === password || "Passwords do not match"
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-[#23A6F0]"
            />
            {errors.confirmPassword && (
              <p className="text-xs text-red-500 mt-1">{errors.confirmPassword.message}</p>
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">Role</label>
            <select
              {...register("role_id", { required: "Role is required" })}
              className="w-full px-3 py-2 border border-gray-300 rounded text-sm bg-white focus:outline-none focus:border-[#23A6F0]"
            >
              {roles.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.name}
                </option>
              ))}
            </select>
          </div>

          {isStore && (
            <div className="space-y-3 pt-3 border-t border-gray-200">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Store Name</label>
                <input
                  type="text"
                  placeholder="Store Name"
                  {...register("store_name", {
                    required: "Store name is required",
                    minLength: { value: 3, message: "Minimum 3 characters" }
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-[#23A6F0]"
                />
                {errors.store_name && (
                  <p className="text-xs text-red-500 mt-1">{errors.store_name.message}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Store Phone</label>
                <input
                  type="text"
                  placeholder="05xxxxxxxxx"
                  {...register("store_phone", {
                    required: "Store phone is required",
                    validate: (v) => {
                      const clean = (v || "").replace(/\s+/g, "");
                      const ok =
                        (clean.startsWith("05") && clean.length === 11) ||
                        (clean.startsWith("+905") && clean.length === 13) ||
                        (clean.startsWith("5") && clean.length === 10);
                      return ok || "Valid TR phone required (05xx)";
                    }
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-[#23A6F0]"
                />
                {errors.store_phone && (
                  <p className="text-xs text-red-500 mt-1">{errors.store_phone.message}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Tax ID</label>
                <input
                  type="text"
                  placeholder="T1234V123456"
                  {...register("store_tax_no", {
                    required: "Tax ID is required",
                    validate: (v) => {
                      const val = (v || "").trim().toUpperCase();
                      if (val.length !== 12 || val[0] !== "T" || val[5] !== "V") {
                        return "Pattern must be TXXXXVXXXXXX";
                      }
                      const p1 = Number(val.slice(1, 5));
                      const p2 = Number(val.slice(6));
                      return (!isNaN(p1) && !isNaN(p2)) || "Pattern must be TXXXXVXXXXXX";
                    }
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-[#23A6F0]"
                />
                {errors.store_tax_no && (
                  <p className="text-xs text-red-500 mt-1">{errors.store_tax_no.message}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">IBAN</label>
                <input
                  type="text"
                  placeholder="TR..."
                  {...register("store_bank_account", {
                    required: "IBAN is required",
                    validate: (v) => {
                      const clean = (v || "").replace(/\s+/g, "").toUpperCase();
                      return (clean.startsWith("TR") && clean.length === 26) || "Valid 26-char TR IBAN required";
                    }
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-[#23A6F0]"
                />
                {errors.store_bank_account && (
                  <p className="text-xs text-red-500 mt-1">{errors.store_bank_account.message}</p>
                )}
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 px-4 bg-[#23A6F0] hover:bg-[#1a8cd8] text-white font-semibold rounded text-sm transition flex items-center justify-center disabled:opacity-50 cursor-pointer"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin mr-2" />
                Submitting...
              </>
            ) : (
              "Sign Up"
            )}
          </button>
        </form>

        <p className="text-center text-xs text-gray-500 mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-[#23A6F0] font-semibold hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
