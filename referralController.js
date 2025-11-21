const authController = require("./authController");

// use the same in-memory array
const users = authController._users;
const getRewardCoins = authController._rewardCoins;

exports.applyReferral = (req, res) => {
  try {
    const { userEmail, referralCode } = req.body;

    if (!userEmail || !referralCode) {
      return res
        .status(400)
        .json({ error: "Email and referral code are required" });
    }

    const user = users.find((u) => u.email === userEmail);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const refUser = users.find((u) => u.referralCode === referralCode);
    if (!refUser) {
      return res.status(400).json({ error: "Invalid referral code" });
    }

    if (refUser.email === user.email) {
      return res.status(400).json({ error: "Cannot use own referral code" });
    }

    const rewardCoins = getRewardCoins();
    user.coins += rewardCoins;

    return res.json({
      message: "Referral applied successfully",
      coins: user.coins
    });
  } catch (err) {
    console.error("Apply referral error:", err);
    return res.status(500).json({ error: "Something went wrong" });
  }
};
