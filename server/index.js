import express from 'express'
import * as dotenv from 'dotenv'
import cors from 'cors'
import connectDB from '../server/mongodb/connect.js';
import postRoutes from "../server/routes/postRoutes.js"
import pixieRoutes from "../server/routes/pixieRoutes.js"

dotenv.config();

const app = express()
app.use(cors())
app.use(express.json({ limit: '50mb' }));

//middleware
app.use('/api/v1/post', postRoutes);
app.use('/api/v1/pixie', pixieRoutes);


app.get('/', async (req, res) => {
    res.send('Hello from Pixie')
})

const startServer = async () => {
    try {
        connectDB(process.env.MONGODB_URL);
        app.listen(3300, () => console.log('Server started at http://localhost:3300'))
    } catch (err) {
        console.log(err)
    }


}
startServer()