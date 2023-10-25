let nomeRestaurante = document.querySelector("#nomeRestaurante");
let enderecoRestaurante = document.querySelector("#enderecoRestaurante");
let fotoRestaurante = document.querySelector("#fotoRestaurante");
let submit = document.querySelector("#submit");

let voltar = document.querySelector("#voltar");
voltar.addEventListener("click",() => {
    location.href = "../perfil/index.html";
})

let logado = localStorage.getItem("logado");
if (!logado) {
    logado = "";
} else {
    logado = JSON.parse(logado);
}
let allRestaurantes = localStorage.getItem("allRestaurantes");
if (!allRestaurantes) {
    allRestaurantes = [];
} else {
    allRestaurantes = JSON.parse(allRestaurantes);
}

let restaurante = {
    nome: "",
    endereco: "",
    foto: "",
    dono: "",
    nota: 0,
    criticas: [
        // {
        //     fez: "",
        //     notaDada: 0,
        //     texto: "",
        // }
    ],
    // categorias: [
    //     {
    //         nome: "",
    //         comidas: [
    //             {
    //                 imagem: "",
    //                 nome: "",
    //                 desc: "",
    //                 preco: 0,
    //             },
    //         ],
    //     },
    // ],
}

submit.addEventListener("click", () => {
    if (nomeRestaurante.value != "" &&
        enderecoRestaurante.value != "" &&
        fotoRestaurante.value != "" &&
        logado != "") {
        restaurante = {
            nome: nomeRestaurante.value,
            endereco: enderecoRestaurante.value,
            foto: fotoRestaurante.value,
            dono: logado,
            nota: 0,
            criticas: [],
            categoria: [],
        }
        console.log(restaurante);
        allRestaurantes.push(restaurante);
        localStorage.setItem("allRestaurantes", JSON.stringify(allRestaurantes));
        location.href = "../areaDePesquisa/index.html";

    } else {
        console.log("erro");
    }
});


