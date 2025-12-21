import cron from "node-cron";
import Task from "../Models/TaskModel";
import sendMail from "./SendMail";



// Runs every hour
cron.schedule("0 * * * *", async () => {
    try {
        console.log("Entered Deadline Reminder...");

        const now = new Date();

        const tomorrowStart = new Date(now);
        tomorrowStart.setDate(now.getDate() + 1);
        tomorrowStart.setHours(0, 0, 0, 0);

        const tomorrowEnd = new Date(tomorrowStart);
        tomorrowEnd.setHours(23, 59, 59, 999);

        const tasks = await Task.find({
            deadline: {
                $gte: tomorrowStart,
                $lte: tomorrowEnd
            },
            reminderSent: false
        });

        for (const task of tasks) {
            const to = task.assignedTo.email;
            const subject = "Task Deadline Reminder";
            const text = `Reminder: Your task "${task.title}" is due tomorrow.`;

            await sendMail(to, subject, text);

            task.reminderSent = true;
            await task.save();
        }

        console.log(`Reminder job executed. Mails sent: ${tasks.length}`);
    } catch (error) {
        console.error("Deadline reminder error:", error);
    }
});