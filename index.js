import connectToDb from "./config/db.js";
import { app } from "./app.js"

connectToDb()
    .then(() => {
        app.listen(process.env.PORT || 4000, () => {
            console.log(`Server is running on port ${process.env.PORT}`);
        })
    })
    .catch((err) => {
        console.log("MONGO db connection failed !!! ", err);
    })