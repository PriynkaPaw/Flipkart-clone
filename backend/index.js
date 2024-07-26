const express = require("express");
require("dotenv/config");
const Product = require("./models/product");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const app = express();
const mongoose = require("mongoose");
const api = process.env.API_URL;
const productRouter = require("./routers/products");
const usersRouter = require("./routers/users");
const categoryRouter = require("./routers/categories");
const subCategoryRouter = require("./routers/sub_category");
const adminRouter = require("./routers/adminRouter");
const CreateUserByAdminRouter = require("./routers/createUserRouter");
const authJwt = require("./helper/jwt");
const cors = require("cors");
const errorHandler = require("./helper/errorHandler");
const orderRouter = require("./routers/order");
const cartProductRouter = require("./routers/cartItemRouter");
const path = require("path");

// Middleware
app.use(cors());
app.options("*", cors());
app.use(bodyParser.json());
// app.use(authJwt())

app.use(errorHandler);
app.use(morgan("tiny"));
app.use(express.urlencoded({ extended: false }));

app.use(`${api}/product`, productRouter);
app.use(`${api}/users`, usersRouter);
app.use(`${api}/category`, categoryRouter);
app.use(`${api}/order`, orderRouter);
app.use(`${api}/subCategory`, subCategoryRouter);
app.use(`${api}/admin`, adminRouter);
app.use(`${api}/admin/createuser`, CreateUserByAdminRouter);
app.use(`${api}/user/cart-item`, cartProductRouter);

app.use(
  "/public/uploads",
  express.static(path.join(__dirname, "./public/uploads"))
);

const connection = process.env.MONGO_CONNECTION_URL;
mongoose
  .connect(connection)
  .then(() => {
    console.log("connected to database..");
  })
  .catch((err) => {
    console.log("error", err);
  });

app.listen(4441, () => {
  console.log(`server is listening on port 4441`);
});
