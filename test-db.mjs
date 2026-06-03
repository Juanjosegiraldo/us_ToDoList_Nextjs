import dns from "node:dns";
import mongoose from "mongoose";

dns.setServers(["8.8.8.8", "1.1.1.1"]);

const uri = process.env.MONGODB_URI;
console.log("URI leída:", uri ? uri.replace(/:[^:@]+@/, ":****@") : "❌ undefined");

try {
  await mongoose.connect(uri, { serverSelectionTimeoutMS: 8000 });
  console.log("✅ DB Online — la conexión funciona");
} catch (err) {
  console.error("❌ Error:", err.message);
  if (err.reason) {
    console.error("\n--- Detalle por servidor ---");
    for (const [host, desc] of err.reason.servers ?? []) {
      console.error(host, "=>", desc.type, desc.error?.message ?? "");
    }
  }
} finally {
  await mongoose.disconnect();
  process.exit(0);
}
