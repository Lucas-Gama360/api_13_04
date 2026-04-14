class Item {
    nome: String;
    quantidade: Number;
    preco: Number;

    constructor(nome: String, quantidade: Number, preco: Number) {
        this.nome = nome;
        this.quantidade = quantidade;
        this.preco = preco;
    }
}

export { Item }