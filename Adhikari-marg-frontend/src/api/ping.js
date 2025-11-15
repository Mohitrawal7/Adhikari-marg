export default async function handler(req, res) {
  try {
    await fetch("https://adhikari-marg.onrender.com");
    res.status(200).json({ ok: true, message: "Backend pinged successfully" });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
}