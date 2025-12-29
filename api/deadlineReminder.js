import { runDeadlineReminder } from "../src/Utils/AutoMail.js";
import "../src/DbConfig/ConnectDB.js"



export default async function handler(req, res) {
  try {
    await runDeadlineReminder();
    res.status(200).json({ success: true });
  } catch (error) {
    console.error("Deadline reminder error:", error);
    res.status(500).json({ error: error.message });
  }
}