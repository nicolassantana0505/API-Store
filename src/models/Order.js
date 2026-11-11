const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
    {
        usuario: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        itens: [
            {
                produto: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Product",
                    required: true
                },
                nome: {
                    type: String,
                    required: true
                },
                preco: {
                    type: Number,
                    required: true
                },
                quantidade: {
                    type: Number,
                    required: true
                },
                subtotal: {
                    type: Number,
                    required: true
                }
            }
        ],
        total: {                                                         
            type: Number,
            required:true
        },
        status: {
            type: String,
            enum: ["pendente", "pago", "enviado", "cancelado"],
            default: "pendente"
        }
    },
    {
        timestamps: true
    }
);

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;