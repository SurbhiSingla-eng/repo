import { useState } from "react";

function App() {
  const [regData, setRegData] = useState({
    name: "",
    email: "",
    password: ""
  });
  const [referralCode, setReferralCode] = useState("");
  const [regMessage, setRegMessage] = useState("");

  const [refEmail, setRefEmail] = useState("");
  const [refCodeInput, setRefCodeInput] = useState("");
  const [refMessage, setRefMessage] = useState("");

  // If 127.0.0.1 doesn't work, you can try changing this to:
  // "http://223.233.66.254:5000/api"
  const backendUrl = "http://127.0.0.1:5000/api";

  const handleRegister = async (e) => {
    e.preventDefault();
    setRegMessage("");
    setReferralCode("");

    try {
      const res = await fetch(`${backendUrl}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(regData)
      });

      const data = await res.json();
      if (!res.ok) {
        setRegMessage(data.error || "Registration failed");
      } else {
        setRegMessage(data.message);
        setReferralCode(data.referralCode);
      }
    } catch (err) {
      console.error("Register error (frontend):", err);
      setRegMessage("Something went wrong");
    }
  };

  const handleApplyReferral = async (e) => {
    e.preventDefault();
    setRefMessage("");

    try {
      const res = await fetch(`${backendUrl}/apply-referral`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userEmail: refEmail,
          referralCode: refCodeInput
        })
      });

      const data = await res.json();
      if (!res.ok) {
        setRefMessage(data.error || "Failed to apply referral");
      } else {
        setRefMessage(`${data.message} | Coins: ${data.coins}`);
      }
    } catch (err) {
      console.error("Apply referral error (frontend):", err);
      setRefMessage("Something went wrong");
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h1>Refer & Earn Demo</h1>

      {/* Register */}
      <div
        style={{
          border: "1px solid #ccc",
          padding: "16px",
          marginBottom: "20px",
          maxWidth: "400px"
        }}
      >
        <h2>Register</h2>
        <form onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="Name"
            value={regData.name}
            onChange={(e) => setRegData({ ...regData, name: e.target.value })}
            style={{ display: "block", marginBottom: "8px", width: "100%" }}
          />
          <input
            type="email"
            placeholder="Email"
            value={regData.email}
            onChange={(e) => setRegData({ ...regData, email: e.target.value })}
            style={{ display: "block", marginBottom: "8px", width: "100%" }}
          />
          <input
            type="password"
            placeholder="Password"
            value={regData.password}
            onChange={(e) =>
              setRegData({ ...regData, password: e.target.value })
            }
            style={{ display: "block", marginBottom: "8px", width: "100%" }}
          />
          <button type="submit">Register</button>
        </form>
        {regMessage && <p>{regMessage}</p>}
        {referralCode && <p>Your Referral Code: {referralCode}</p>}
      </div>

      {/* Apply Referral */}
      <div
        style={{
          border: "1px solid #ccc",
          padding: "16px",
          maxWidth: "400px"
        }}
      >
        <h2>Apply Referral Code</h2>
        <form onSubmit={handleApplyReferral}>
          <input
            type="email"
            placeholder="Your Email"
            value={refEmail}
            onChange={(e) => setRefEmail(e.target.value)}
            style={{ display: "block", marginBottom: "8px", width: "100%" }}
          />
          <input
            type="text"
            placeholder="Referral Code"
            value={refCodeInput}
            onChange={(e) => setRefCodeInput(e.target.value)}
            style={{ display: "block", marginBottom: "8px", width: "100%" }}
          />
          <button type="submit">Apply</button>
        </form>
        {refMessage && <p>{refMessage}</p>}
      </div>
    </div>
  );
}

export default App;
