const express = require("express")
const cors = require("cors")
const app = express()

app.use(cors())
app.use(express.json())

const todosRouter = require("./routes/todos")
app.use("/api/todos", todosRouter)

app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({ error: "Something went wrong!" })
})

app.use((req, res) => {
  res.status(404).json({ error: "Route not found" })
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
