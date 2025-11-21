// In-memory "database"
const users = []; // { name, email, password, referralCode, coins }
let rewardCoins = 50; // same as your Mongo Config value

// helper to generate referral code
function generateReferralCode(name) {
  const prefix = (name || "USR").slice(0, 3).toUpperCase();
  const random = Math.floor(10000 + Math.random() * 90000);
  return prefix + random;
}

exports.registerUser = (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const existing = users.find((u) => u.email === email);
    if (existing) {
      return res.status(400).json({ error: "Email already registered" });
    }

    let referralCode = generateReferralCode(name);
    while (users.find((u) => u.referralCode === referralCode)) {
      referralCode = generateReferralCode(name);
    }

    const user = {
      name,
      email,
      password, // plain text here; fine for demo
      referralCode,
      coins: 0
    };

    users.push(user);

    return res.json({
      message: "Registered successfully",
      referralCode: user.referralCode
    });
  } catch (err) {
    console.error("Register error:", err);
    return res.status(500).json({ error: "Registration failed" });
  }
};

// Export the users array so referralController can see it
exports._users = users;
exports._rewardCoins = () => rewardCoins;
