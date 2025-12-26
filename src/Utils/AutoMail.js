import cron from "node-cron";
import Task from "../Models/TaskModel.js";
import sendEmail from "./SendMail.js";



// Runs every hour
cron.schedule("2 13 * * *", async () => {
    try {
        console.log("Entered Deadline Reminder...");

        const now = new Date();

        const tomorrowStart = new Date(now);
        tomorrowStart.setDate(now.getDate() + 1);
        tomorrowStart.setHours(0, 0, 0, 0);

        const tomorrowEnd = new Date(tomorrowStart);
        tomorrowEnd.setHours(23, 59, 59, 999);

        const tasks = await Task.find({
            $or: [
                {
                    deadline: {
                        $gte: tomorrowStart,
                        $lte: tomorrowEnd
                    }
                },
                {
                    deadline: { $lt: now }
                }
            ],
            status: { $ne: "Completed" },
        }).populate("createdBy");


        for (const task of tasks) {
            const to = task.createdBy.email;

            if (task.deadline > now) {
                const subject = "Task Deadline Reminder";
                const text = `Reminder: Your task "${task.title}" is due tomorrow.`;

                await sendEmail(to, subject, text);
                await task.save();
            } else {
                const subject = "Task Overdue Notification";
                const text = `⚠️ Task Overdue Alert
                The task "${task.title}" has passed its deadline and is currently overdue.
                Please take immediate action to complete or update the task status.
                Deadline: ${new Date(task.deadline).toLocaleDateString()}
                If this task has already been completed, kindly update the status to avoid further reminders.`;

                await sendMail(to, subject, text);

                task.reminderSent = true;
                await task.save();
            }
        }

        console.log(`Reminder job executed. Mails sent: ${tasks.length}`);
    } catch (error) {
        console.error("Deadline reminder error:", error);
    }
});