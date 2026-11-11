require('dotenv').config()
const cors = require('cors')

const express = require('express') //armazenando o codigo da função

const connectDatabase = require('./config/database') //caso falhe, add .js
const productRoutes = require('./routes/productRoutes')
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");
const profileRoutes = require("./routes/profileRoutes");
const logger = require('./middlewares/loggerMiddleware');
const errorHandler = require('./middlewares/errorMiddleware');
const orderRoutes = require("./routes/orderRoutes");

const app = express(); // amarzenando o return da função, que é um obejto nesse caso

connectDatabase();

app.use(cors());

app.use(express.json()); 

app.use(logger); //acessa o header da requisição e loga o endpoint (metodo + URL)

app.use(productRoutes);

app.use(userRoutes);

app.use(authRoutes);

app.use(profileRoutes);

app.use(orderRoutes);

// app.use((req, res) => {
//     console.log("Rota não encontrada:", req.method, req.originalUrl);
// });

app.use((req, res) => {
  res.status(404).json({
    erro: 'Rota não encontrada.',
  })
})

app.use(errorHandler)

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`)
})
