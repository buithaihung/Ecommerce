const app = require("./app");
const connectDatabase = require("./config/database");
const dotenv = require("dotenv");
//seting up config file
dotenv.config({ path: "backend/config/config.env" });
//Connecting to database
connectDatabase();
const server = app.listen(process.env.PORT, () => {
  console.log(
    `server start on PORT: ${process.env.PORT} in ${process.env.NODE_ENV} mode.`
  );
});
//Handle uncaught exceptions 
process.on('uncaughtException',err => {
  console.log(`ERROR: ${err.stack}`);
  console.log('Shutting down server due to uncaught exception');
  process.exit(1);
})

//Handle unhandled Promise rejections
process.on("unhandledRejection", (err) => {
  console.log(`ERROR: ${err.message}`);
  console.log("Shutting down the server due to Unhandle Promise Rejection");
  server.close(() => {
    process.exit(1);
  });
});
