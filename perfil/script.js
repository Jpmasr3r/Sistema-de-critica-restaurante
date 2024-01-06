async function getLogado() {
	let data = await fetch("../assets/php/get/getLogado.php").then(res => res.text());
	if (data == "Nao Logado") {
		location.href = "../telaDeLogin/index.html";
	}
}
getLogado();

getInfs();

// let carrinhoButton = document.querySelector("#carrinhoButton");
// carrinhoButton.addEventListener("click", () => {
// 	location.href = "../carrinho/index.html";
// });

let voltar = document.querySelector("#voltar");
voltar.addEventListener("click", () => {
	location.href = "../areaDePesquisa/index.html";
})

let addR = document.querySelector("#addR");
addR.addEventListener("click", () => {
	location.href = "../cadastrarRestaurante/index.html";
});

let nome = document.querySelector("#nome");
let telefone = document.querySelector("#telefone");
let tipo = document.querySelector("#tipo");
let perfil = document.querySelector("#perfil");
let areaCriticas = document.querySelector("#areaCriticas");

async function getInfs() {
	try {
		let data = await fetch("../assets/php/get/getSelectedUser.php").then(res => res.json());
		nome.innerHTML = `<label>Nome: </label>${data.nome}`;
		telefone.innerHTML = `<label>Telefone: </label>55+ 51 ${data.telefone}`;
		tipo.innerHTML = `${data.tipo}`.toUpperCase();
		perfil.src = data.foto;
		printCriticas();
		if (data.logado) {
			addR.style.display = "flex";
		}
	} catch (error) {
		console.log(error.getMessage());
	}
}

async function getCriticas() {
	try {
		let data = await fetch("../assets/php/get/getAllCriticasUser.php").then(res => res.json());
		console.log(data);
		return data;
	} catch (error) {
		console.log(error);
		return [];
	}
}

async function printCriticas() {
	allCriticas = await getCriticas();
	allCriticas.forEach(e => {
		let divCritica = document.createElement("div");
		divCritica.classList.add("link");
		divCritica.classList.add("critica");

		let divInfUser = document.createElement("div");
		divInfUser.classList.add("usu")

		let imgInfUser = document.createElement("img");
		imgInfUser.src = e.userFoto;
		imgInfUser.classList.add("perfilUsu");

		let aInfUser = document.createElement("a");
		aInfUser.innerHTML = e.userNome;

		divInfUser.appendChild(imgInfUser);
		divInfUser.appendChild(aInfUser);

		let divInfCritica = document.createElement("div");
		divInfCritica.classList.add("informacoes");

		let aInfRes = document.createElement("a");
		aInfRes.innerHTML = e.restauranteNome;

		divInfCritica.appendChild(aInfRes);

		divCritica.addEventListener("click", async () => {
			try {
				let data = await fetch(`../assets/php/set/setSelectedRestaurante.php?id=${e.restauranteID}`).then(res => res.text());
				if (data == "OK") {
					location.href = "../perfilRestaurante/index.html";
				}
			} catch (error) {
				console.log("Error: " + error.getMessage());
			}
		});

		let labelNotaCritica = document.createElement("label");
		for (let i = 1; i <= 5; i++) {
			const spanEmoji = document.createElement("span");
			spanEmoji.classList.add("emoji");

			if (i <= e.criticaNota) {
				spanEmoji.innerHTML = "⭐️";
			} else {
				spanEmoji.classList.add("desativado");
				spanEmoji.innerHTML = "⭐️";
			}

			labelNotaCritica.appendChild(spanEmoji);
		}

		let labelDataCritica = document.createElement("label");
		labelDataCritica.innerHTML = e.criticaData;

		divInfCritica.appendChild(labelNotaCritica);
		divInfCritica.appendChild(labelDataCritica);

		let divTextoCritica = document.createElement("div");
		divTextoCritica.classList.add("texto");

		let labelTextoCritica = document.createElement("label");
		labelTextoCritica.innerHTML = e.criticaTexto;

		divTextoCritica.appendChild(labelTextoCritica);

		divCritica.appendChild(divInfUser);
		divCritica.appendChild(divInfCritica);
		divCritica.appendChild(divTextoCritica);

		areaCriticas.appendChild(divCritica);
	});
}