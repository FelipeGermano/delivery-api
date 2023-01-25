const path = require("path")
const jsonfile = require("jsonfile")

class Pedido {
    constructor(){
        this.file = path.join(__dirname, "../pedidos.json")
        this.pedido = jsonfile.readFileSync(this.file);
    }
    
    _save(nextID = null, pedidos){
        let pedido = {
            nextId: nextID != null ? nextID : this.pedido.nextId,
            pedidos: pedidos
        }

        jsonfile.writeFileSync(this.file, pedido, { spaces: 4 })
    }

    convertData(data){
        return new Date(data).toLocaleString()
    }

    novo(cliente, produto, valor, entregue = false){       
        let nextID = (this.pedido.nextId + 1)
        
        let novoPedido = {
            "id": this.pedido.nextId,
            "cliente": cliente,
            "produto": produto,
            "valor": parseFloat(valor),
            "entregue": entregue,
            "timestamp": new Date()
        }

        let pedidos = this.pedido.pedidos
        pedidos.push(novoPedido)

        this._save(nextID, pedidos)

        return novoPedido
    }

    atualizar(id, cliente = null, produto = null, valor = null, entregue = null){
        let pedidos = [], pedido
        this.pedido.pedidos.forEach(item => {
            if(item.id === id){
                item.cliente = cliente != null ? cliente : item.cliente
                item.produto = produto != null ? produto : item.produto
                item.valor = valor != null ? valor : item.valor
                item.entregue = entregue != null ? entregue : item.entregue
                pedido = item
            }

            pedidos.push(item)
        });

        this._save(null, pedidos)

        return pedido
    }

    remover(id){
        let pedidos = [], pedido = {}
        this.pedido.pedidos.forEach(item => {
            if(item.id !== id){
                pedidos.push(item)
            }else{
                pedido = item
            }
        });

        this._save(null, pedidos)

        return pedido
    }

    procurar(id){
        return this.pedido.pedidos.find((item) => item.id === id)
    }

    totalPedidoCliente(cliente){
        let total = 0
        this.pedido.pedidos.forEach((pd) => {
            if(pd.cliente === cliente && pd.entregue){
                total += pd.valor
            }
        })

        return { total }
    }

    totalPedidoProduto(produto){
        let total = 0
        this.pedido.pedidos.forEach((pd) => {
            if(pd.produto === produto && pd.entregue){
                total += pd.valor
            }
        })

        return { total }
    }

    produtosMaisVendidos(){
        let lista = {}
        this.pedido.pedidos.forEach((item) => {
            if(item.entregue){
                lista[item.produto] = lista[item.produto] != undefined ? lista[item.produto] + 1 : 1
            }
        })
        
        return lista
    }

}

module.exports = Pedido