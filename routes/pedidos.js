const path = require('path')
const Pedido = require("../controller/Pedido")

module.exports = app => {
    app.get('/pedido/novo/', (req, res) => {
        try {
            const pedido = new Pedido()
            let status = pedido.novo("Felipe 123", "Pizza de frango", 10)
            res.status(200).json(status)
        } catch (error) {
            res.status(500).json(error)
        }
    })

    app.get('/pedido/entregue', (req, res) => {
        try {
            const pedido = new Pedido()
            let status = pedido.atualizar(501, null, null, null, false)
            res.status(200).json(status)
        } catch (error) {
            res.status(500).json(error)
        }
    })

    app.get('/pedido/atualizar', (req, res) => {
        try {
            const pedido = new Pedido()
            let status = pedido.atualizar(501, "Felipe Germano", "Pizza de frango", 11, false)
            res.status(200).json(status)
        } catch (error) {
            res.status(500).json(error)
        }
    })

    app.get('/pedido/remover', (req, res) => {
        try {
            const pedido = new Pedido()
            let status = pedido.remover(501)
            res.status(200).json(status)
        } catch (error) {
            res.status(500).json(error)
        }
    })

    app.get('/pedido/procurar', (req, res) => {
        try {
            const pedido = new Pedido()
            let status = pedido.procurar(502)
            res.status(200).json(status)
        } catch (error) {
            res.status(500).json(error)
        }
    })

    app.get('/pedido/cliente/total', (req, res) => {
        try {
            const pedido = new Pedido()
            let status = pedido.totalPedidoCliente("Quirino Barra")
            res.status(200).json(status)
        } catch (error) {
            res.status(500).json(error)
        }
    })

    app.get('/pedido/produto/total', (req, res) => {
        try {
            const pedido = new Pedido()
            let status = pedido.totalPedidoProduto("Pizza Frango com Catupiry")
            res.status(200).json(status)
        } catch (error) {
            res.status(500).json(error)
        }
    })

    app.get('/pedido/produtos/mais/vendidos', (req, res) => {
        try {
            const pedido = new Pedido()
            let status = pedido.produtosMaisVendidos()
            res.status(200).json(status)
        } catch (error) {
            res.status(500).json(error)
        }
    })
}

