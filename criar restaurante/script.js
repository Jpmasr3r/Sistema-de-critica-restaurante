let nome = document.querySelector("#nome");
let endereco = document.querySelector("#endereco");
let foto = document.querySelector("#foto");
let logado = JSON.parse(localStorage.getItem("logado"))

let restaurantes = [];
restaurantes = localStorage.getItem("restaurantes");
if(!restaurantes) {
    restaurantes = [];
}else {
    restaurantes = JSON.parse(restaurantes);
}

let criar = document.querySelector("#criar");

criar.addEventListener("click",() => {
    let res;

    if(foto.value == "") {
        res = {
            nome: nome.value,
            endereco: endereco.value,
            src: "../src/img/perfil.png",
            nota: 0,
            dono: logado,
            cardapio: [],
            criticas: [],
        }
    }else {
        res = {
            nome: nome.value,
            endereco: endereco.value,
            src: foto.value,
            nota: 0,
            dono: logado,
            cardapio: [],
            criticas: [],
        }
    }

    restaurantes.push(res);

    restaurantes = JSON.stringify(restaurantes);
    localStorage.setItem("restaurantes",restaurantes);

    location.href = "."           
     
});

