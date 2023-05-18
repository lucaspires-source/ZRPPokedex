const express = require('express')
const app = express()
const router = require('./router/routes')
const cors = require('cors')
app.use('/api', cors(), router);


const port = process.env.PORT || 8000
app.listen(port, () => {
  console.log(`API Serving on: ${port}`)
})