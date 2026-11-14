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
  // Fotos guardadas como data URL (base64). Ficam fora das consultas comuns (select: false)
  // para a listagem não ficar pesada; são servidas por GET /produtos/:id/imagens/:indice.
  imagens: {
    type: [String],
    default: [],
    select: false,
  },
})

const Product = mongoose.model('Product', productSchema)

module.exports = Product
