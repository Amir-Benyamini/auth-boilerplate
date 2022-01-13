import authRoutes from "./auth";

export const initializeRoutes = (app: any) => {
  app.use("/auth", authRoutes);
};
