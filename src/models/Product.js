const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true,
  },
  preco: {
    type: Number,
    required: true,
  },
  categoria: {
    type: String,
    required: true,
  },
  estoque: {
    type: Number,
    required: true,
  },
  vendeu_muito: {
    type: Boolean,
    required: true,
  },
})

const Product = mongoose.model('Product', productSchema)

module.exports = Product
