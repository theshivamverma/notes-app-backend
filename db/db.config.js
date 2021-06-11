const mongoose = require("mongoose")

async function initializeDBConnection(){
    try {
        const result = await mongoose.connect(process.env.DB_URI, {
            useCreateIndex: true,
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        if(result){
            console.log("DB Connected")
        }
    } catch (error) {
        console.log(error)
    }
}

module.exports = { initializeDBConnection }