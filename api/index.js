const express = require('express')
const cors = require('cors')
const router = require('./routes')

const app = express()
const port = 3000

app.use(cors())
app.use(express.json())
router(app)

app.listen(port || 3000, () => console.log(`Server is running on port ${port}`));