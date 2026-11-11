const { z } = require("zod");

const orderSchema = z.object({
    itens: z.array(
        z.object({
            produtoId: z.string().min(1, "O produto é obrigatorio"),
            quantidade: z
            .number()
            .int("A quantidade deve ser um numero inteiro")
            .positive("A quantidade deve ser maior que zero")
        })
    )
    .min(1, "O pedido precisa ter pelo menos um item")
});

module.exports = {
    orderSchema
};