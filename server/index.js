require('dotenv').config();
const express = require('express');
const cors = require('cors');
const zoomRoutes = require('./routes/zoom');

const app = express();
const PORT = process.env.PORT || 5005;

app.use(cors());
app.use(express.json());

app.use('/api/zoom', zoomRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});