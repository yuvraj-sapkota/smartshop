import app from "./app.js";
import connectDB from "./config/db.js";

// start server
const PORT = process.env.PORT || 5000;

// connect database
connectDB();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
