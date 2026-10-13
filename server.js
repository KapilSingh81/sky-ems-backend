import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import departmentRouter from "./routes/departmentRoutes.js";
import { connectDB } from "./config/db.config.js";
import { swaggerSpec } from "./config/swagger.config.js";
import swaggerUi from "swagger-ui-express";
import designationRouter from "./routes/designationRoutes.js";
import companyRouter from "./routes/companyRoutes.js";
import leaveTypeRouter from "./routes/leaveTypeRoutes.js";
import holidayRouter from "./routes/holidayRoutes.js";
import roleRouter from "./routes/roleRoutes.js";
import commonRouter from "./routes/commonRoutes.js";
import employeeRouter from "./routes/employeeRoutes.js";

const app = express();
dotenv.config();

app.use(cors());
app.use(express.json());
app.use("/api/department", departmentRouter);
app.use("/api/designation", designationRouter);
app.use("/api/company", companyRouter);
app.use("/api/leaveType", leaveTypeRouter);
app.use("/api/holiday", holidayRouter);
app.use("/api/role", roleRouter);
app.use("/api/common", commonRouter);
app.use("/api/employee", employeeRouter);

const PORT = process.env.PORT;
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get("/", (req, res) => {
    res.send("API server is running successfully");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

connectDB()
    .then(() => {
        app.listen(PORT, () => console.log(`Api is listening on http://localhost:${PORT}`));
    })
    .catch((err) => {
        console.error("❌ DB Error:", err.message);
        process.exit(1);
    });