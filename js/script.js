var botoesAdicionar = document.getElementsByClassName('adicionar');
var qtdProdutos = botoesAdicionar.length
var botoesRemover = document.getElementsByClassName('remover');

for (let i = 0; i < qtdProdutos; i++) {
    botoesAdicionar[i].addEventListener('click', () => {
        let quantidadeElement = document.getElementsByClassName('quantidade')[i];
        quantidade = parseInt(quantidadeElement.textContent);
        quantidade++;
        quantidadeElement.textContent = quantidade;
        atualizarTotalpreco();
    })
}

for (let i = 0; i < qtdProdutos; i++) {
    botoesRemover[i].addEventListener('click', () => {
        let quantidades = document.getElementsByClassName('quantidade');
        let quantidade = parseInt(quantidades[i].textContent);
        var precos = document.querySelectorAll('.card-body h4');
        let preco = parseInt(precos[i].textContent);
        if (quantidade > 0) {
            quantidade--;
            quantidades[i].textContent = quantidade;
            document.getElementById('total').textContent = parseInt(document.getElementById('total').textContent) - preco;
        }
    });
}

function atualizarTotalpreco() {
    var totalElement = document.getElementById('total');

    let total = 0;

    for (let i = 0; i < qtdProdutos; i++) {
        let quantidade = parseInt(document.getElementsByClassName('quantidade')[i].textContent)
        let preco = parseFloat(document.getElementsByClassName('adicionar')[i].getAttribute('preco'))
        total += quantidade * preco;
    }

    totalElement.textContent = total.toFixed(2);
}

function emitirPedido() {
    let pedidos = [];

    for (let i = 0; i < qtdProdutos; i++) {
        let quantidade = parseInt(document.getElementsByClassName('quantidade')[i].textContent)
        if (quantidade > 0) {
            let pedido = {
                nome: document.getElementsByClassName('card-title')[i].textContent,
                quantidade: quantidade,
                preco: parseFloat(document.getElementsByClassName('adicionar')[i].getAttribute('preco')),
            }
            pedidos.push(pedido);
        }
    }
    let precoTotal = parseFloat(document.getElementById('total').textContent)

    var mensagem = "Lista de pedidos:\n\n";

    pedidos.forEach((pedido) => {
        mensagem += "produto: " + pedido.nome + "\n" + "quantidade: " + pedido.quantidade + "\n" + "preço: " + pedido.preco + "\n\n"
    })
    mensagem += " preço total: " + precoTotal

    let mensagemCodificada = encodeURIComponent(mensagem);

    var linkWhatsApp = "https://wa.me/5571988242993?text=" + mensagemCodificada;

    window.location.href = linkWhatsApp;
}