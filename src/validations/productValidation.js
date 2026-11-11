const { z } = require("zod");

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

});

module.exports = {
  productSchema
};