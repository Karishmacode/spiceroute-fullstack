import { useEffect, useState } from "react";
import {
  Bell,
  CreditCard,
  Moon,
  Shield,
  Store,
  User,
} from "lucide-react";

import PageHeader from "../components/ui/PageHeader";

const themeColors = {
  orange: "#ff7a00",
  blue: "#3b82f6",
  emerald: "#10b981",
  purple: "#a855f7",
};

const SettingCard = ({ icon: Icon, title, children }) => {
  return (
    <div className="admin-panel p-5">
      <div className="flex items-center gap-3 mb-5">
        <div
          className="w-10 h-10 rounded-2xl flex items-center justify-center"
          style={{
            background: "color-mix(in srgb, var(--admin-primary) 15%, transparent)",
            color: "var(--admin-primary)",
          }}
        >
          <Icon size={20} />
        </div>

        <h2 className="text-lg font-black text-white">{title}</h2>
      </div>

      <div className="space-y-4">{children}</div>
    </div>
  );
};

const Settings = () => {
  const [settings, setSettings] = useState({
    adminName: "Admin",
    email: "admin@spiceroute.com",
    password: "********",
    currency: "₹ INR",
    deliveryFee: "₹40",
    tax: "5%",
    emailAlerts: true,
    orderAlerts: true,
    pushNotifications: true,
    darkMode: true,
    compactSidebar: true,
    cod: true,
    onlinePayment: true,
    twoStepLogin: true,
    loginAlerts: true,
    themeColor: "orange",
  });

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("adminSettings"));

    if (saved) {
      setSettings(saved);

      document.documentElement.style.setProperty(
        "--admin-primary",
        themeColors[saved.themeColor] || themeColors.orange
      );
    }
  }, []);

  useEffect(() => {
    if (settings.darkMode) {
      document.documentElement.classList.add("admin-dark");
      document.documentElement.classList.remove("admin-light");
    } else {
      document.documentElement.classList.add("admin-light");
      document.documentElement.classList.remove("admin-dark");
    }
  }, [settings.darkMode]);

  const handleChange = (key, value) => {
    setSettings((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const changeThemeColor = (color) => {
    handleChange("themeColor", color);

    document.documentElement.style.setProperty(
      "--admin-primary",
      themeColors[color]
    );
  };

  const handleSave = () => {
    localStorage.setItem("adminSettings", JSON.stringify(settings));

    document.documentElement.style.setProperty(
      "--admin-primary",
      themeColors[settings.themeColor] || themeColors.orange
    );

    if (settings.darkMode) {
      document.documentElement.classList.add("admin-dark");
      document.documentElement.classList.remove("admin-light");
    } else {
      document.documentElement.classList.add("admin-light");
      document.documentElement.classList.remove("admin-dark");
    }

    alert("Settings saved successfully");
  };

  const Input = ({ label, valueKey, type = "text" }) => (
    <div>
      <label className="text-xs font-semibold text-slate-400">{label}</label>

      <input
        type={type}
        value={settings[valueKey]}
        onChange={(e) => handleChange(valueKey, e.target.value)}
        className="mt-2 w-full rounded-2xl bg-white/5 border border-white/10 px-4 py-3 text-sm text-white outline-none"
        onFocus={(e) => {
          e.target.style.borderColor = "var(--admin-primary)";
        }}
        onBlur={(e) => {
          e.target.style.borderColor = "";
        }}
      />
    </div>
  );

  const Toggle = ({ label, desc, valueKey }) => (
    <div className="flex items-center justify-between rounded-2xl bg-white/5 border border-white/10 p-4">
      <div>
        <p className="text-sm font-bold text-white">{label}</p>
        <p className="text-xs text-slate-500 mt-1">{desc}</p>
      </div>

      <button
        type="button"
        onClick={() => handleChange(valueKey, !settings[valueKey])}
        className={`w-12 h-6 rounded-full relative transition ${
          settings[valueKey] ? "" : "bg-slate-700"
        }`}
        style={
          settings[valueKey]
            ? {
                background: "var(--admin-primary)",
                boxShadow:
                  "0 0 20px color-mix(in srgb, var(--admin-primary) 35%, transparent)",
              }
            : {}
        }
      >
        <span
          className={`absolute top-1 w-4 h-4 rounded-full bg-white transition ${
            settings[valueKey] ? "right-1" : "left-1"
          }`}
        />
      </button>
    </div>
  );

  return (
    <div className="space-y-5 pr-2">
      <section className="admin-panel p-5">
        <PageHeader
          title="Settings"
          desc="Manage admin preferences."
          buttonText="Save Changes"
          onClick={handleSave}
        />

        <div className="mt-6 grid grid-cols-1 xl:grid-cols-2 gap-6">
          <SettingCard icon={User} title="Admin Profile">
            <Input label="Admin Name" valueKey="adminName" />
            <Input label="Email Address" valueKey="email" />
            <Input label="Password" valueKey="password" type="password" />
          </SettingCard>

          <SettingCard icon={Bell} title="Notifications">
            <Toggle
              label="Email Alerts"
              desc="Receive order updates on email"
              valueKey="emailAlerts"
            />
            <Toggle
              label="Order Alerts"
              desc="Notify when new order arrives"
              valueKey="orderAlerts"
            />
            <Toggle
              label="Push Notifications"
              desc="Show browser notifications"
              valueKey="pushNotifications"
            />
          </SettingCard>

          <SettingCard icon={Store} title="Store Settings">
            <Input label="Currency" valueKey="currency" />
            <Input label="Delivery Fee" valueKey="deliveryFee" />
            <Input label="Tax Percentage" valueKey="tax" />
          </SettingCard>

          <SettingCard icon={Moon} title="Appearance">
            <Toggle
              label="Dark Mode"
              desc="Use dark admin dashboard theme"
              valueKey="darkMode"
            />
            <Toggle
              label="Compact Sidebar"
              desc="Make sidebar smaller"
              valueKey="compactSidebar"
            />

            <div>
              <label className="text-xs font-semibold text-slate-400">
                Theme Color
              </label>

              <div className="flex gap-3 mt-3">
                {Object.entries(themeColors).map(([name, color]) => (
                  <button
                    key={name}
                    type="button"
                    onClick={() => changeThemeColor(name)}
                    className={`w-9 h-9 rounded-full ${
                      settings.themeColor === name
                        ? "ring-2 ring-white/50"
                        : ""
                    }`}
                    style={{ background: color }}
                  />
                ))}
              </div>
            </div>
          </SettingCard>

          <SettingCard icon={CreditCard} title="Payment Settings">
            <Toggle
              label="Cash On Delivery"
              desc="Allow customers to pay cash"
              valueKey="cod"
            />
            <Toggle
              label="Online Payment"
              desc="Allow UPI/card payments"
              valueKey="onlinePayment"
            />
          </SettingCard>

          <SettingCard icon={Shield} title="Security">
            <Toggle
              label="Two Step Login"
              desc="Extra security for admin login"
              valueKey="twoStepLogin"
            />
            <Toggle
              label="Login Alerts"
              desc="Notify when admin logs in"
              valueKey="loginAlerts"
            />
          </SettingCard>
        </div>
      </section>
    </div>
  );
};

export default Settings;