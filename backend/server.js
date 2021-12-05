const app = require("./app");
const connectDatabase = require("./config/database");
// const dotenv = require("dotenv");
const cloudinary = require('cloudinary');
//seting up config file
if(process.env.NODE_ENV !== 'PRODUCTION') require('dotenv').dotenv.config({ path: "backend/config/config.env" });



//Connecting to database
connectDatabase();
//seting up cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})
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
