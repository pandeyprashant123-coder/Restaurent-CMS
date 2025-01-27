import "dotenv/config";
import express from "express";
import connectDB from "./config/database.js";
import ProductRoute from "./routes/ProductRoute.js";
import categoryRouter from "./routes/Categories.js";
import PaymentRoute from "./routes/PaymentRoutes.js";
import cors from "cors";
import AuthRoute from "./routes/AuthRoutes.js";
import Cartroute from "./routes/CartRoute.js";
import SearchAndFilterRoute from "./routes/SearchAndFilterRoute.js";
import UserRoute from "./routes/UserRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import brandRoute from "./routes/BrandRoutes.js";
import EcommerceRoutes from "./routes/EcommerceRoutes.js";
import RestaurantRoute from "./routes/RestaurantRoutes.js";
import foodRoutes from "./routes/foodRoutes.js";
import addonRoutes from "./routes/addonRoutes.js";

const app = express();
connectDB();
const apiRoute = "/api";

// Middleware
app.use(express.json());

const corsOptions = {
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders: "Content-Type,Authorization",
};
app.use(cors(corsOptions));

// Default route
app.get("/", (req, res) => {
  res.json({ message: "Hello!" });
});

// Routes
app.use(`${apiRoute}/v1`, [
  ProductRoute,
  AuthRoute,
  categoryRouter,
  Cartroute,
  SearchAndFilterRoute,
  orderRoutes,
  brandRoute,
  RestaurantRoute,
  foodRoutes,
  addonRoutes,
]);
app.use(`${apiRoute}/v1/payment`, PaymentRoute);
app.use(`${apiRoute}/v1/user`, UserRoute);
app.use(`${apiRoute}/v1/ecommerce`, EcommerceRoutes);

const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
