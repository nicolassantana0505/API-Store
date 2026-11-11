const Product = require("../models/Product");

async function listarProdutos(filtros) {
  const { categoria, search, page = 1, limit = 10, precoMax } = filtros;

  const query = {};

  if (categoria) {
    query.categoria = categoria;
  }

  if (search) {
    query.nome = { $regex: search, $options: "i" };
  }

  if (precoMax) {
    query.preco = { $lte: Number(precoMax)}
  }

  const skip = (Number(page) - 1) * Number(limit);

  const produtos = await Product.find(query)
    .skip(skip)
    .limit(Number(limit));

  const total = await Product.countDocuments(query);

  return {
    data: produtos,
    page: Number(page),
    limit: Number(limit),
    total
  };
}

async function buscarProdutoPorId(id) {
  const produto = await Product.findById(id);

  return produto;
}

async function criarProduto(dados) {
  const novoProduto = await Product.create(dados);

  return novoProduto;
}

async function atualizarProduto(id, dados) {
  const produtoAtualizado = await Product.findByIdAndUpdate(id, dados, {
    new: true
  });

  return produtoAtualizado;
}

async function deletarProduto(id) {
  const produtoDeletado = await Product.findByIdAndDelete(id);

  return produtoDeletado;
}

module.exports = {
  listarProdutos,
  buscarProdutoPorId,
  criarProduto,
  atualizarProduto,
  deletarProduto
};