// BANCO DE DADOS DE SABORES
const salgadas = [
    { n: "Mussarela", d: "Mussarela, tomate, cebola e orégano." },
    { n: "Mussarela Crocante", d: "Mussarela, bacon, batata palha e tomate." },
    { n: "Calabresa", d: "Calabresa, cebola, orégano e azeitona." },
    { n: "Calabresa Especial", d: "Calabresa, cream cheese, cebola e orégano." },
    { n: "Calabresa com Barbecue", d: "Calabresa e molho barbecue." },
    { n: "Florença", d: "Mussarela, presunto, ovo, cebola e catupiry." },
    { n: "Misto", d: "Presunto, ovo, cebola, tomate e bacon." },
    { n: "Presunto", d: "Mussarela, presunto, tomate, cebola e azeitona." },
    { n: "Bacon", d: "Mussarela, bacon, cebola e azeitona." },
    { n: "Strogonoff", d: "Strogonoff, milho, batata palha." },
    { n: "Portuguesa", d: "Presunto, ovo, cebola, orégano e azeitona." },
    { n: "Americana", d: "Presunto, calabresa, cebola e batata palha." },
    { n: "Frango Especial", d: "Cream cheese, bacon, milho e batata palha." },
    { n: "Frango com Cheddar", d: "Frango, cheddar e milho." },
    { n: "Frango com Bacon", d: "Frango, bacon e cheddar." },
    { n: "Frango com Cream Cheese", d: "Frango, cream cheese e batata palha." },
    { n: "Frango com Catupiry", d: "Frango, tomate e catupiry." },
    { n: "Charque", d: "Mussarela, charque, tomate e cebola." },
    { n: "Charque com Cream Cheese", d: "Charque, cream cheese e cebola." },
    { n: "Lombo Canadense", d: "Lombo, catupiry e azeitonas." },
    { n: "Nordestina", d: "Carne seca, tomate, cebola e pimentão." },
    { n: "Pepperoni", d: "Mussarela, pepperoni e tomates." },
    { n: "Atum", d: "Mussarela, atum, cebola e azeitona." },
    { n: "Pit Shopp", d: "Frango, presunto, calabresa, ovo e catupiry." },
    { n: "Três Queijos", d: "Mussarela, cheddar e catupiry." },
    { n: "Moda Chefe", d: "Presunto, bacon, calabresa, ovo e milho." },
    { n: "Costela", d: "Mussarela, cebola e costela.", domingo: true }
];

const doces = [
    { n: "Brigadeiro", d: "Mussarela e chocolate granulado." },
    { n: "Chocolate", d: "Mussarela, chocolate e bolinhas crocantes." },
    { n: "Chocolate Crocante", d: "Amendoim e calda de chocolate." },
    { n: "Banana Nevada", d: "Choc. branco, cream cheese e banana." },
    { n: "Cartola", d: "Mussarela, banana, leite condensado e canela." },
    { n: "Beijinho", d: "Mussarela, beijinho e coco ralado." },
    { n: "Chocolate com Morango", d: "Chocolate ao leite e morango." },
    { n: "Kid’s", d: "Mussarela, Chocolare e M&M." },
    { n: "Sensação", d: "Chocolate e calda de morango." },
    { n: "2 Amores", d: "Chocolate preto e branco." },
    { n: "Romeu e Julieta", d: "Queijo e Goiabada." },
    { n: "Prestígio", d: "Chocolate, coco e leite condensado." }
];

// VARIÁVEIS DE CONTROLE
let cart = [];
let pizzaMontando = { t: '', p: 0, m1: null };
let myModal = null;

// NAVEGAÇÃO ENTRE TELAS
function showSection(s) {
    document.getElementById('home-section').style.display = s === 'home' ? 'block' : 'none';
    document.getElementById('cardapio-section').style.display = s === 'cardapio' ? 'block' : 'none';
    document.getElementById('btn-voltar-home').style.display = s === 'cardapio' ? 'block' : 'none';
    window.scrollTo(0,0);
}

function irParaPizzas() { 
    showSection('cardapio'); 
    mudarCategoria('pizzas'); 
    resetarSelecao(); 
}

function mudarCategoria(cat) {
    document.querySelectorAll('.categoria-item').forEach(el => el.style.display = 'none');
    document.getElementById('cat-' + cat).style.display = 'block';
}

// LOGICA DE MONTAGEM DA PIZZA
function abrirSabores(t, p, fatias) {
    pizzaMontando = { t: t, p: p, m1: null };
    document.getElementById('display-tamanho').innerText = t + " (" + fatias + ")";
    document.getElementById('secao-tamanhos').style.display = 'none';
    document.getElementById('secao-sabores').style.display = 'block';
    
    // Filtro de Domingo para a Pizza de Costela
    const isDomingo = new Date().getDay() === 0;
    const listaSalgadas = salgadas.filter(s => !s.domingo || isDomingo);
    
    renderizarLista('render-salgadas', listaSalgadas);
    renderizarLista('render-doces', doces);
}

function renderizarLista(id, lista) {
    const div = document.getElementById(id); div.innerHTML = '';
    lista.forEach(s => {
        div.innerHTML += `
        <div class="col-md-6 mb-2">
            <div class="card p-2 shadow-sm border-0 text-start h-100">
                <div class="d-flex justify-content-between align-items-center">
                    <div>
                        <strong class="d-block">${s.n}</strong>
                        <small class="text-muted" style="font-size:0.75rem">${s.d}</small>
                    </div>
                    <div class="d-flex gap-1">
                        <button class="btn btn-sm btn-danger btn-mini" onclick="addSabor('${s.n}', 'I')">Inteira</button>
                        <button class="btn btn-sm btn-outline-danger btn-mini" onclick="addSabor('${s.n}', 'M')">1/2</button>
                    </div>
                </div>
            </div>
        </div>`;
    });
}

function addSabor(nome, tipo) {
    if (tipo === 'I') { 
        addToCart(`Pizza ${pizzaMontando.t} (${nome})`, pizzaMontando.p); 
        resetarSelecao(); 
    } else { 
        if (!pizzaMontando.m1) { 
            pizzaMontando.m1 = nome; 
            document.getElementById('info-passo').innerHTML = `1ª Metade: <b class="text-danger">${nome}</b>. Selecione a 2ª!`; 
        } else { 
            addToCart(`Pizza ${pizzaMontando.t} (1/2 ${pizzaMontando.m1} + 1/2 ${nome})`, pizzaMontando.p); 
            resetarSelecao(); 
        } 
    }
}

function resetarSelecao() {
    document.getElementById('secao-tamanhos').style.display = 'block';
    document.getElementById('secao-sabores').style.display = 'none';
    pizzaMontando = { t: '', p: 0, m1: null };
    document.getElementById('info-passo').innerText = "Escolha Inteira ou a 1ª Metade";
}

// RENDERIZAR OUTROS PRODUTOS (CALZONES, BEBIDAS, ETC)
function renderOutros() {
    const cal = document.getElementById('render-calzones'); cal.innerHTML = '';
    [{n:'C. Pequeno', p:13}, {n:'C. Médio', p:18}, {n:'C. Grande', p:23}].forEach(i => {
        cal.innerHTML += `<div class="col-6 col-md-4"><div class="card p-3 border-0 shadow-sm h-100"><h6>${i.n}</h6><b class="text-success">R$ ${i.p.toFixed(2)}</b><button class="btn btn-sm btn-danger mt-2" onclick="addToCart('${i.n}', ${i.p})">Add</button></div></div>`;
    });
    const brot = document.getElementById('render-brotinhos'); brot.innerHTML = '';
    [{n:'Brotinho', p:13}, {n:'Brotão', p:18}].forEach(i => {
        brot.innerHTML += `<div class="col-6 col-md-4"><div class="card p-3 border-0 shadow-sm h-100"><h6>${i.n}</h6><b class="text-success">R$ ${i.p.toFixed(2)}</b><button class="btn btn-sm btn-danger mt-2" onclick="addToCart('${i.n}', ${i.p})">Add</button></div></div>`;
    });
    const beb = document.getElementById('render-bebidas'); beb.innerHTML = '';
    [{n:'Refri 1L', p:10}, {n:'Refri 2L', p:15}].forEach(i => {
        beb.innerHTML += `<div class="col-6 col-md-4"><div class="card p-3 border-0 shadow-sm h-100"><h6>${i.n}</h6><b class="text-success">R$ ${i.p.toFixed(2)}</b><button class="btn btn-sm btn-danger mt-2" onclick="addToCart('${i.n}', ${i.p})">Add</button></div></div>`;
    });
}

// SISTEMA DE CARRINHO
function addToCart(nome, preco) { cart.push({ nome, preco }); updateCartUI(); }
function removeItem(index) { cart.splice(index, 1); updateCartUI(); }

function updateCartUI() {
    const list = document.getElementById('cart-items-list'); let total = 0;
    list.innerHTML = cart.length === 0 ? '<p class="text-center text-muted">Vazio</p>' : '';
    cart.forEach((i, idx) => {
        total += i.preco;
        list.innerHTML += `
        <div class="d-flex justify-content-between align-items-center mb-2 border-bottom pb-2">
            <div><span class="d-block fw-bold" style="font-size:0.8rem">${i.nome}</span><small class="text-success fw-bold">R$ ${i.preco.toFixed(2)}</small></div>
            <button class="btn btn-sm text-danger" onclick="removeItem(${idx})"><i class="fas fa-trash-alt"></i></button>
        </div>`;
    });
    document.getElementById('cart-count').innerText = cart.length;
    document.getElementById('cart-total').innerText = `R$ ${total.toFixed(2)}`;
    document.getElementById('modal-total').innerText = `R$ ${total.toFixed(2)}`;
    document.getElementById('checkout-form').style.display = cart.length > 0 ? 'block' : 'none';
}

function abrirModalManual() {
    if(cart.length > 0) { 
        if(!myModal) myModal = new bootstrap.Modal(document.getElementById('carrinhoModal')); 
        myModal.show(); 
    } else alert("Adicione algo ao carrinho primeiro!");
}

// FINALIZAR PEDIDO (MENSAGEM PADRÃO DA PIZZARIA)
function finalizarPedido() {
    const n = document.getElementById('cliente-nome').value;
    const e = document.getElementById('endereco-cliente').value;
    const p = document.getElementById('cliente-pagamento').value;

    if(!n || !e) {
        return alert("Por favor, preencha seu nome e endereço de entrega!");
    }

    // CABEÇALHO PADRÃO
    let msg = "Olá, seja bem vindo a ratinho Delivery! 🍕🐭%0A%0A";
    
    // LISTA DOS ITENS
    msg += "*▪️ Pedido:*%0A";
    cart.forEach(i => {
        msg += `✅ ${i.nome}%0A`;
    });

    // DADOS DO CLIENTE
    msg += `%0A*▪️ Nome:* ${n}`;
    msg += `%0A*▪️ Endereço:* ${e}`;
    msg += `%0A*▪️ Forma de pagamento:* ${p}`;
    msg += `%0A%0A💰 *TOTAL:* ${document.getElementById('modal-total').innerText}`;

    // LINK DO WHATSAPP
    const fone = "5581992909581";
    window.open(`https://wa.me/${fone}?text=${msg}`, '_blank');
}

// STATUS DA LOJA (ABERTO/FECHADO)
function verificarStatus() {
    const h = new Date().getHours();
    // Aberto das 17h às 23h
    const status = (h >= 17 && h < 23) ? '<span class="badge bg-success">ABERTO</span>' : '<span class="badge bg-danger">FECHADO</span>';
    document.getElementById('status-loja').innerHTML = status;
    renderOutros();
}