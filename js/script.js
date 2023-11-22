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
        let preco = parseFloat(document.getElementsByClassName('adicionar')[i].getAttribute('preco'));
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
    let endereco = document.getElementById('inputEndereco').value;
    let complemento = document.getElementById('inputComplemento').value;
    if (endereco == "") {
        alert('Antes de emitir seu pedido, por favor preencha o endereço');
    } else {
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
            mensagem += "produto: " + pedido.nome + "\n" + "quantidade: " + pedido.quantidade + "\n" + "preço: " + pedido.preco + "\n\n";
        })
        mensagem += "preço total: " + precoTotal + "\nEndereço: " + endereco;
        if (complemento != "") { mensagem += "\nComplemento: " + complemento }

        let mensagemCodificada = encodeURIComponent(mensagem);

        var linkWhatsApp = "https://wa.me/5571988242993?text=" + mensagemCodificada;

        window.location.href = linkWhatsApp;
    }
}

function enviarFormulario(event) {
    event.preventDefault();

    let form = document.getElementById('contact-form');
    let nome = form.querySelector('#nameForm').value;
    let email = form.querySelector('#emailForm').value;
    let mensagem = form.querySelector('#messageForm').value;

    console.log("Nome: " + nome);
    console.log("Email: " + email);
    console.log("Mensagem: " + mensagem);

    if (nome != "" && email != "" && mensagem != "") {
        let msgWpp = "Nome: " + nome + "\nEmail: " + email + "\nMensagem: " + mensagem;

        let mensagemCodificada = encodeURIComponent(msgWpp);

        var linkWhatsApp = "https://wa.me/5571988242993?text=" + mensagemCodificada;

        window.location.href = linkWhatsApp;
    }

}