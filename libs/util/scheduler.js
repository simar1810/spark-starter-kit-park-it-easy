import cron from "node-cron";


export const demoScheduler = async () => {
  // 02:00-AM IST && 08:30-PM UTC
  cron.schedule("30 20 * * *", async () => {
    try {
      
    } catch (error) {
      console.error("Error updating subscription status:", error);
    }
  });
};