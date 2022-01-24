import authRoutes from "./auth";
import userRoutes from "./user";
export const initializeRoutes = (app: any) => {
  app.use("/auth", authRoutes);
  app.use("/user", userRoutes);
};
