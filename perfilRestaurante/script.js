async function getLogado() {
	let data = await fetch("../assets/php/get/getLogado.php").then(res => res.text());
	if (data == "Nao Logado") {
		location.href = "../telaDeLogin/index.html";
	}
}
getLogado();

let nome = document.querySelector("#nome");
let endereco = document.querySelector("#endereco");
let dono = document.querySelector("#dono");
let nota = document.querySelector("#nota");

let admButton = document.querySelectorAll(".adm");

let addCritica = document.querySelector("#addCritica");
let escreverCritica = document.querySelector("#escreverCritica");
let notaCritica = document.querySelector("#notaCritica");
let date = new Date();
let areaCriticas = document.querySelector("#areaCriticas");

let cardapio = document.querySelector("#cardapio").querySelector("div");

let voltar = document.querySelector("#voltar");
voltar.addEventListener("click", () => {
	location.href = "/areaDePesquisa/index.html";
});

let carrinhoButton = document.querySelector("#carrinhoButton");
carrinhoButton.addEventListener("click", () => {
	location.href = "/carrinho/index.html";
});

async function getInfs() {
	try {
		const data = await fetch("../assets/php/get/getSelectedRestaurante.php").then(res => res.json());
		if (data.status) {
			nota.innerHTML = "Nota: ";
			nome.innerHTML = data.resNome;
			endereco.innerHTML = data.resEndereco;
			dono.innerHTML = data.userNome;
			dono.addEventListener("click", async () => {
				let data2 = await fetch(`../assets/php/set/setSelectedUser.php?id=${data.userID}`).then(res => res.text());
				if (data2 == "OK") {
					location.href = "../perfil/index.html";
				}
			})

			for (let i = 1; i <= 5; i++) {
				const spanEmoji = document.createElement("span");
				spanEmoji.classList.add("emoji");

				if (i <= data.resNota) {
					spanEmoji.innerHTML = "⭐️";
				} else {
					spanEmoji.classList.add("desativado");
					spanEmoji.innerHTML = "⭐️";
				}

				nota.appendChild(spanEmoji);
			}


			if (data.logado) {
				addCritica.disabled = true;
				adm();
			} else {
				admButton.forEach(e => {
					e.style.display = "none";
				});
				addCritica.addEventListener("click", () => {
					if (escreverCritica.value != "" && notaCritica.value != "") {
						if (notaCritica.value > 5) {
							notaCritica.value = 5;
						}
						if (notaCritica.value < 0) {
							notaCritica.value = 0;
						}
						critica = {
							texto: escreverCritica.value,
							nota: notaCritica.value,
							data: `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`
						}
						escreverCritica.value = "";
						notaCritica.value = "";
						setCritica(critica)
					}
				})
			}
		}
	} catch (error) {
		console.log(error);
	}
}
getInfs();

async function setCritica(critica) {
	let formData = new FormData();
	for (const i in critica) {
		let e = critica[i];
		formData.append(i, e);
	}

	let data = await fetch("../assets/php/set/setCritica.php", {
		method: "POST",
		body: formData,
	}).then(res => res.text());

	if (data == "OK") {
		printCriticas();
	} else {
		console.log(data);
	}
}

async function getCriticas() {
	try {
		let data = await fetch("../assets/php/get/getAllCriticas.php").then(res => res.json());
		return data;
	} catch (error) {
		console.log(error);
		return [];
	}
}

async function printCriticas() {
	let mediaCriticas = 0;
	areaCriticas.querySelector('div').innerHTML = "";
	allCriticas = await getCriticas();
	allCriticas.forEach(e => {
		let divCritica = document.createElement("div");
		divCritica.classList.add("critica");

		let divInfUser = document.createElement("div");
		divInfUser.classList.add("usu")

		let imgInfUser = document.createElement("img");
		imgInfUser.src = e.userFoto;
		imgInfUser.classList.add("perfilUsu");

		let aInfUser = document.createElement("a");
		aInfUser.innerHTML = e.userNome;

		aInfUser.addEventListener("click", async () => {
			let data = await fetch(`../assets/php/set/setSelectedUser.php?id=${e.userID}`).then(res => res.text());
			if (data == "OK") {
				location.href = "../perfil/index.html";
			}
		})

		divInfUser.appendChild(imgInfUser);
		divInfUser.appendChild(aInfUser);

		let divInfCritica = document.createElement("div");
		divInfCritica.classList.add("informacoes");

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

		areaCriticas.querySelector('div').appendChild(divCritica);

		mediaCriticas += e.criticaNota;
	});
	if (allCriticas.length > 0) {
		mediaCriticas /= allCriticas.length;
	} else {
		mediaCriticas = 0;
	}
	let formData = new FormData();
	formData.append("nota", mediaCriticas);

	let data = await fetch("../assets/php/set/setNotaRestaurante.php", {
		method: "POST",
		body: formData,
	}).then(res => res.text());

	if (data == "OK") {
		nota.innerHTML = "<label>Nota:</label>";
		for (let i = 1; i <= 5; i++) {
			const spanEmoji = document.createElement("span");
			spanEmoji.classList.add("emoji");

			if (i <= mediaCriticas) {
				spanEmoji.innerHTML = "⭐️";
			} else {
				spanEmoji.classList.add("desativado");
				spanEmoji.innerHTML = "⭐️";
			}

			nota.appendChild(spanEmoji);
		}
	}
}
printCriticas();

async function adm() {
	let flutuante = document.querySelectorAll(".flutuante");
	flutuante.forEach(e => {
		e.querySelector(".closeWindow").addEventListener("click", () => {
			e.style.display = "none";
		})
	});

	async function buttons() {
		let response = await fetch("/assets/php/get/getCategorias.php").then(res => res.json());
		if (!response.data.length) {
			document.querySelector("#removeCategoria").style.display = "none";
			document.querySelector("#addComida").style.display = "none";
			document.querySelector("#removeComida").style.display = "none";
		} else {
			document.querySelector("#removeCategoria").style.display = "flex";
			document.querySelector("#addComida").style.display = "flex";
			document.querySelector("#removeComida").style.display = "none";
		}
	}
	buttons();

	//add categoria
	let addCategoria = document.querySelector("#addCategoria");
	let addCategoriaWindow = document.querySelector("#addCategoriaWindow");
	addCategoria.addEventListener("click", () => {
		flutuante.forEach(e => {
			e.style.display = "none";
		});
		addCategoriaWindow.style.display = "flex";
	})

	document.querySelector("#cAdd").addEventListener("click", async () => {
		let formData = new FormData();
		formData.append("cNome", document.querySelector("#cNome").value);
		let data = await fetch("/assets/php/set/setCategoria.php", {
			method: "POST",
			body: formData,
		}).then(res => res.json());

		if (data.success) {
			addCategoriaWindow.style.display = "none";
			document.querySelector("#cNome").value = "";
			printCardapio();
			buttons();
		}

	})


	//remove categoria
	let removeCategoria = document.querySelector("#removeCategoria");
	let removeCategoriaWindow = document.querySelector("#removeCategoriaWindow");
	removeCategoria.addEventListener("click", async () => {
		let response = await fetch("/assets/php/get/getCategorias.php").then(res => res.json());
		flutuante.forEach(e => {
			e.style.display = "none";
		});
		removeCategoriaWindow.style.display = "flex";
		removeCategoriaWindow.querySelector("div").innerHTML = "";
		response.data.forEach(async e => {
			let label = document.createElement("label");

			let input = document.createElement("input");
			input.type = "radio";
			input.name = "categoria";
			input.value = e.categoriaID;
			input.classList.add("selecao");

			let b = document.createElement("b");
			b.innerHTML = e.categoriaNome;

			label.appendChild(input);
			label.appendChild(b);
			removeCategoriaWindow.querySelector("div").appendChild(label);

			removeCategoriaWindow.querySelector("#cRemove").addEventListener("click", async () => {
				if (input.checked) {
					let formData = new FormData();
					formData.append("categoriaID", input.value);
					let data = await fetch("/assets/php/remove/removeCategoria.php", {
						method: "POST",
						body: formData
					}).then(res => res.json());

					if (data.success) {
						removeCategoriaWindow.style.display = "none";
						buttons();
						printCardapio();
					} else {
						console.log(data);
					}

				}
			})
		})
	})





	//add Comida
	let addComida = document.querySelector("#addComida");
	let addComidaWindow = document.querySelector("#addComidaWindow");
	addComida.addEventListener("click", async () => {
		flutuante.forEach(e => {
			e.style.display = "none";
		});
		addComidaWindow.style.display = "flex";

		let response = await fetch("/assets/php/get/getCategorias.php").then(res => res.json());
		addComidaWindow.querySelector("div").innerHTML = "";
		response.data.forEach(async e => {
			let coNome = document.querySelector("#coNome");
			let coDesc = document.querySelector("#coDesc");
			let coPreco = document.querySelector("#coPreco");
			let coImg = document.querySelector("#coImg");

			let label = document.createElement("label");

			let input = document.createElement("input");
			input.type = "radio";
			input.name = "categoria";
			input.value = e.categoriaID;
			input.classList.add("selecao");

			let b = document.createElement("b");
			b.innerHTML = e.categoriaNome;

			label.appendChild(input);
			label.appendChild(b);
			addComidaWindow.querySelector("div").appendChild(label);

			addComidaWindow.querySelector("#coAdd").addEventListener("click", async () => {
				if (coNome.value != "" && coDesc.value != "" && coPreco.value != "" && coImg.files[0] != undefined && input.checked) {
					console.log("a");
					let formData = new FormData();
					formData.append("categoriaID", input.value);
					formData.append("comidaNome", coNome.value);
					formData.append("comidaDesc", coDesc.value);
					formData.append("comidaPreco", coPreco.value);
					formData.append("comidaFoto", coImg.files[0]);
					let data = await fetch("/assets/php/set/setComida.php", {
						method: "POST",
						body: formData
					}).then(res => res.json());

					if (data.success) {
						addComidaWindow.style.display = "none";
						buttons();
						printCardapio();
						console.log(data);
					} else {
						console.log(data);
					}
				}
			})

		})

	})

	//remove comida
	let removeComida = document.querySelector("#removeComida");

}

async function printCardapio() {
	let data = await fetch("/assets/php/get/getCategorias.php").then(res => res.json());

	if (data.success) {
		cardapio.innerHTML = "";
		data.data.forEach(async e => {
			let div = document.createElement("div");
			div.classList.add("categoria");

			let h2 = document.createElement("h2");
			h2.innerHTML = e.categoriaNome;

			div.appendChild(h2);

			let data2 = await fetch(`/assets/php/get/getComida.php?categoriaID=${e.categoriaID}`).then(res => res.json());

			// <div class="comida">
			//         <img src="../src/img/comidas/comida3.png" alt="" class="imagemComida">
			//         <label class="nomeComida">comida placeholder</label>
			//         <label class="descricaoComida">É gelado</label>
			//         <label class="valorComida">R$10,00</label>
			//     </div>
			data2.data.forEach(e => {
				let divComida = document.createElement("div");
				divComida.classList.add("comida")

				let imgComida = document.createElement("img");
				imgComida.src = e.comidaImagem;
				imgComida.classList.add("imagemComida");

				let labelComida1 = document.createElement("label");
				labelComida1.classList.add("nomeComida");
				labelComida1.innerHTML = e.comidaNome;

				let labelComida2 = document.createElement("label");
				labelComida2.classList.add("descricaoComida");
				labelComida2.innerHTML = e.comidaDescricao;

				let labelComida3 = document.createElement("label");
				labelComida3.classList.add("valorComida");
				labelComida3.innerHTML = `R$${e.comidaValor.toFixed(2)}`;

				divComida.appendChild(imgComida);
				divComida.appendChild(labelComida1);
				divComida.appendChild(labelComida2);
				divComida.appendChild(labelComida3);
				div.appendChild(divComida);
			})
			cardapio.appendChild(div);
		})
	}
}
printCardapio();