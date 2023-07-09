require('dotenv').config();
const app = require('./app');
PORT = process.env.PORT || 9000;
app.listen(PORT, () => {
  console.log(`Server linsten on port ${PORT}...`);
})