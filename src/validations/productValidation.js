const { z } = require("zod");

// Cada item de "imagens" é uma foto nova (data URL) ou uma foto que já existe
// no produto (caminho /produtos/<id>/imagens/<n>), para mantê-la ao editar.
const FOTO_NOVA = /^data:image\/(jpeg|png|webp);base64,[A-Za-z0-9+/=]+$/;
const FOTO_EXISTENTE = /^\/produtos\/[a-f0-9]{24}\/imagens\/\d+$/;
const MAX_IMAGENS = 5;
const MAX_CARACTERES_POR_IMAGEM = 900000; // ~650 KB de imagem

const imagemSchema = z
  .string()
  .max(MAX_CARACTERES_POR_IMAGEM, "Cada imagem deve ter no máximo ~650 KB.")
  .refine(
    (v) => FOTO_NOVA.test(v) || FOTO_EXISTENTE.test(v),
    "Imagem inválida. Use JPG, PNG ou WebP.",
  );

const productSchema = z.object({
  nome: z
    .string()
    .min(3, "O nome deve ter pelo menos 3 caracteres."),

  preco: z
    .number()
    .positive("O preço deve ser maior que zero."),

  categoria: z
    .string()
    .min(1, "A categoria é obrigatória."),

  estoque: z
    .number()
    .min(0, "O estoque não pode ser negativo."),
  
  vendeu_muito: z
    .boolean(),

  imagens: z
    .array(imagemSchema)
    .max(MAX_IMAGENS, `Envie no máximo ${MAX_IMAGENS} imagens.`)
    .optional(),
});

module.exports = {
  productSchema,
  FOTO_EXISTENTE
};
