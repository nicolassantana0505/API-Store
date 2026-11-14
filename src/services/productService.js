const Product = require("../models/Product");
const { FOTO_EXISTENTE } = require("../validations/productValidation");

// A API nunca devolve o base64 na lista: devolve só os caminhos das fotos.
const caminhosDasImagens = (id, qtd = 0) =>
  Array.from({ length: qtd }, (_, i) => `/produtos/${id}/imagens/${i}`);

function comCaminhos(produto) {
  const { imagens, qtdImagens, ...resto } = produto;
  const qtd = qtdImagens ?? (imagens ? imagens.length : 0);
  return { ...resto, imagens: caminhosDasImagens(produto._id, qtd) };
}

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

  const produtos = await Product.aggregate([
    { $match: query },
    { $sort: { _id: 1 } },
    { $skip: skip },
    { $limit: Number(limit) },
    { $addFields: { qtdImagens: { $size: { $ifNull: ["$imagens", []] } } } },
    { $project: { imagens: 0 } },
  ]);

  const total = await Product.countDocuments(query);

  return {
    data: produtos.map(comCaminhos),
    page: Number(page),
    limit: Number(limit),
    total
  };
}

async function buscarProdutoPorId(id) {
  const produto = await Product.findById(id).select("+imagens").lean();

  return produto ? comCaminhos(produto) : null;
}

async function criarProduto(dados) {
  // Ao criar, só aceita fotos novas (não há o que "manter").
  const imagens = (dados.imagens ?? []).filter((img) => !FOTO_EXISTENTE.test(img));
  const novoProduto = await Product.create({ ...dados, imagens });

  return comCaminhos(novoProduto.toObject());
}

async function atualizarProduto(id, dados) {
  const atual = await Product.findById(id).select("+imagens").lean();

  if (!atual) return null;

  const { imagens, ...resto } = dados;

  // Sem "imagens" no corpo = não mexe nas fotos. Com a lista = ela vira a nova galeria,
  // trocando cada caminho existente pela foto que já estava guardada.
  if (imagens) {
    resto.imagens = imagens
      .map((img) => {
        if (!FOTO_EXISTENTE.test(img)) return img;
        const [, produtoId, indice] = img.match(/^\/produtos\/([a-f0-9]{24})\/imagens\/(\d+)$/);
        return produtoId === String(id) ? (atual.imagens ?? [])[Number(indice)] : undefined;
      })
      .filter(Boolean);
  }

  const produtoAtualizado = await Product.findByIdAndUpdate(id, resto, {
    new: true
  })
    .select("+imagens")
    .lean();

  return produtoAtualizado ? comCaminhos(produtoAtualizado) : null;
}

async function deletarProduto(id) {
  const produtoDeletado = await Product.findByIdAndDelete(id);

  return produtoDeletado;
}

// Devolve { tipo, buffer } da foto, ou null se não existir.
async function obterImagem(id, indice) {
  const produto = await Product.findById(id).select("imagens").lean();
  const dataUrl = produto?.imagens?.[indice];

  if (!dataUrl) return null;

  const m = dataUrl.match(/^data:(image\/(?:jpeg|png|webp));base64,(.+)$/s);

  if (!m) return null;

  return { tipo: m[1], buffer: Buffer.from(m[2], "base64") };
}

module.exports = {
  listarProdutos,
  buscarProdutoPorId,
  criarProduto,
  atualizarProduto,
  deletarProduto,
  obterImagem
};
