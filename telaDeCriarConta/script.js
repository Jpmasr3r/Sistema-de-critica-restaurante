let nome = document.querySelector("#nome");
let email = document.querySelector("#email");
let telefone = document.querySelector("#telefone");
let senha = document.querySelector("#senha");
let Vsenha = document.querySelector("#Vsenha");
let selecao = document.querySelectorAll(".selecao");
let foto = document.querySelector("#foto");

let erroTexto = document.querySelector("#erroTexto");

let logar = document.querySelector("#logar");
logar.addEventListener("click", () => {
    location.href = "../telaDeLogin/index.html";
})

let addConta = document.querySelector("#addConta");
addConta.addEventListener("click", () => {
    if (nome.value != "" &&
        email.value != "" &&
        telefone.value != "" &&
        senha.value != "" &&
        Vsenha.value != "" &&
        (selecao[0].checked || selecao[1].checked) &&
        foto.value != "") {

        erroTexto.style.display = "none";

        if (senha.value == Vsenha.value) {
            erroTexto.style.display = "none";

            let user = {
                nome: nome.value,
                email: email.value,
                telefone: telefone.value,
                senha: senha.value,
                tipo: "",
                foto: foto.files[0],
            }

            selecao.forEach((e) => {
                if (e.checked) {
                    user.tipo = e.value
                }
            })

            addUser(user);

        } else {
            erroTexto.style.display = "flex";
            erroTexto.innerHTML = "As senhas são diferentes";

        }



    } else {
        erroTexto.style.display = "flex";
        erroTexto.innerHTML = "Faltam informações";
    }
})

async function addUser(user) {
    let formData = new FormData();
    for (const i in user) {
        let e = user[i];
        formData.append(i, e);
    }

    let data = await fetch("../assets/php/addUser.php", {
        method: "POST",
        body: formData,
    }).then(res => res.json());

    erroTexto.style.display = "flex";
    erroTexto.innerHTML = data.status;

    if(data.status == "Usuario cadastrado com sucesso") {
        location.href = "../telaDeLogin/index.html";
    }

}