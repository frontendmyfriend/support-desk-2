const express = require('express')
const path = require('path')
const dotenv = require('dotenv').config()
const colors = require('colors')
const cors = require('cors')
const { errorHandler } = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')

const PORT = process.env.PORT || 8000

connectDB()

const app = express()

app.use(cors({ origin: 'http://localhost:5173' }))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.get('/', (req, res) => {
  res.status(200).json({ message: 'Welcome to hell' })
})

//Routes
app.use('/api/users', require('./routes/userRoutes'))
app.use('/api/tickets', require('./routes/ticketRoutes'))




//serve frontend
if(import.meta.env.NODE_ENV === 'production'){
  //set static folder
  app.use(express.static(path.join(__dirname, '../frontend/build')))

  app.get('*', (req, res) => {
    res.sendFile(
      path.resolve(__dirname, '../', 'frontend', 'build', 'index.html')
    )
  })
}else{
  app.get('/', (req, res) => {
  res.status(200).json({ message: 'Welcome to the hell' })
})
}



app.use(errorHandler)

app.listen(PORT, () =>
  console.log(`server started on port ${PORT}`.cyan)
)
