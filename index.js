import express from 'express'
import cors from 'cors'
import paymentRoute from './routes/paymentRoute.js'
import bodyParser from 'body-parser'

const PORT = process.env.PORT || 5000

const app = express()

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/payment', paymentRoute)

app.listen(PORT, () => console.log(`server is running on port ${PORT}`))

