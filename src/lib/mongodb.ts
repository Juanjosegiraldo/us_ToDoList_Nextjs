import mongoose from "mongoose";
import dns from "node:dns";

const conectionDB = async () => {
  // readyState: 0 = desconectado, 1 = conectado, 2 = conectando
  if (mongoose.connection.readyState >= 1) return;

  // Solo en desarrollo: la red local bloquea el DNS por defecto y rompe la
  // resolución SRV (+srv) de Atlas. En producción (Vercel) NO se fuerza,
  // para usar el resolver de la plataforma.
  if (process.env.NODE_ENV !== "production") {
    dns.setServers(["8.8.8.8", "1.1.1.1"]);
  }

  await mongoose.connect(`${process.env.MONGODB_URI}`);
  console.log("DB Online");
};

export default conectionDB;
