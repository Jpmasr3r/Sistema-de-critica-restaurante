let date = new Date();

let allRestaurantes = JSON.parse(localStorage.getItem("allRestaurantes"));
let selectedRestaurante = JSON.parse(localStorage.getItem("selectedRestaurante"));
let logado = JSON.parse(localStorage.getItem("logado"));

let nomeInf = document.querySelector("#nome");
let enderecoInf = document.querySelector("#endereco");
let donoInf = document.querySelector("#dono");
let notaInf = document.querySelector("#nota");

let admButton = document.querySelectorAll(".adm");
let flutuantes = document.querySelectorAll(".flutuante");
let addCategoriaWindow = flutuantes[0];
let removeCategoriaWindow = flutuantes[1];
let cardapio = document.querySelector("#cardapio").querySelector("div");
let addComidaWindow = document.querySelector("#addComidaWindow");
let removeComidaWindow = document.querySelector("#removeComidaWindow");

let criticasArea = document.querySelector("#areaCriticas");
let escreverCritica = document.querySelector("#escreverCritica");
let notaCritica = document.querySelector("#notaCritica");
let addCriticaButton = document.querySelector("#addCritica");

let voltar = document.querySelector("#voltar");

appendCategoriasEComidas();
printCriticas();

voltar.addEventListener("click", () => {
	location.href = "../areaDePesquisa/index.html";
	localStorage.removeItem("selectedRestaurante");
});

nome.innerHTML = selectedRestaurante.nome;
endereco.innerHTML = selectedRestaurante.endereco;
if (selectedRestaurante.dono.email == logado.email) {
	dono.innerHTML = `${selectedRestaurante.dono.nome} (Você)`;
} else {
	dono.innerHTML = selectedRestaurante.dono.nome;
}

dono.addEventListener("click", () => {
	localStorage.setItem("selectedPerfil", JSON.stringify(selectedRestaurante.dono));
	location.href = "../perfil/index.html";
});

function appendCategoriasEComidas() {
	cardapio.innerHTML = "";
	selectedRestaurante.categoria.forEach(e => {
		let div = document.createElement("div");
		div.classList.add("categoria");

		let h2 = document.createElement("h2");
		h2.innerHTML = e.nome;

		div.appendChild(h2);

		if (e.comidas.length > 0) {
			e.comidas.forEach(r => {
				let divComida = document.createElement("div");
				divComida.classList.add("comida");

				let imgComida = document.createElement("img");
				imgComida.classList.add("imagemComida");
				imgComida.src = r.imagem;

				let labelComidaNome = document.createElement("label");
				labelComidaNome.classList.add("nomeComida");
				labelComidaNome.innerHTML = r.nome;

				let labelComidaDesc = document.createElement("label");
				labelComidaDesc.classList.add("descricaoComida");
				labelComidaDesc.innerHTML = r.desc;

				let labelComidaPreco = document.createElement("label");
				labelComidaPreco.classList.add("valorComida");
				labelComidaPreco.innerHTML = `R$${r.preco}`;

				divComida.appendChild(imgComida);
				divComida.appendChild(labelComidaNome);
				divComida.appendChild(labelComidaDesc);
				divComida.appendChild(labelComidaPreco);

				div.appendChild(divComida);

			})

		}

		cardapio.appendChild(div)
	});
}

function save() {
	allRestaurantes.forEach((e, i) => {
		if (e.nome == selectedRestaurante.nome &&
			e.endereco == selectedRestaurante.endereco &&
			e.dono.email == selectedRestaurante.dono.email) {
			allRestaurantes.splice(i, 1);
			allRestaurantes.push(selectedRestaurante);
			localStorage.setItem("allRestaurantes", JSON.stringify(allRestaurantes));
		}
	})
}

if (selectedRestaurante.dono.email == logado.email) {
	showButtonWindows();
	function showButtonWindows() {
		if (selectedRestaurante.categoria.length > 0) {
			let invsivel = true;
			selectedRestaurante.categoria.forEach(e => {
				if (e.comidas.length > 0) {
					invsivel = false;
				}
			})

			if (!invsivel) {
				admButton[1].style.display = "flex";
				admButton[2].style.display = "flex";
				admButton[3].style.display = "flex";
			} else {
				admButton[1].style.display = "flex";
				admButton[2].style.display = "flex";
				admButton[3].style.display = "none";
			}

		} else {
			admButton[1].style.display = "none";
			admButton[2].style.display = "none";
			admButton[3].style.display = "none";
		}
	}


	//mostrar janela de adicionar categoria
	admButton[0].addEventListener("click", () => {
		addCategoriaWindow.style.display = "flex";
	});
	addCategoriaWindow.querySelector("#cAdd").addEventListener("click", () => {
		if (addCategoriaWindow.querySelector("#cNome").value.length > 0) {
			console.log("categoria adicionada");
			addCategoriaWindow.style.display = "none";
			let nome = addCategoriaWindow.querySelector("#cNome").value;
			selectedRestaurante.categoria.push({
				nome: nome,
				comidas: [],
			},
			);
			addCategoriaWindow.querySelector("#cNome").value = null;
			localStorage.setItem("selectedRestaurante", JSON.stringify(selectedRestaurante));
			showButtonWindows();
			appendCategoriasEComidas();
			save();
		}
	});

	//mostrar janela de remover categoria
	admButton[1].addEventListener("click", () => {
		removeCategoriaWindow.style.display = "flex";
		removeCategoriaWindow.querySelector("div").innerHTML = "";
		selectedRestaurante.categoria.forEach((e, i) => {
			let label = document.createElement("label");

			let b = document.createElement("b");
			b.innerHTML = e.nome;

			let input = document.createElement("input");
			input.type = "radio";
			input.value = e.nome;
			input.name = "removeCategoria";
			input.classList.add("selecao");
			label.appendChild(input);
			label.appendChild(b);
			removeCategoriaWindow.querySelector("div").appendChild(label);

			removeCategoriaWindow.querySelector("#cRemove").addEventListener("click", () => {
				if (input.checked) {
					console.log("categoria removida");
					selectedRestaurante.categoria.splice(i, 1);
					removeCategoriaWindow.style.display = "none";
					localStorage.setItem("selectedRestaurante", JSON.stringify(selectedRestaurante));
					input.checked = false;
					showButtonWindows();
					appendCategoriasEComidas();
					save();
				}
			});
		});
	});

	//mostrar janela de adicionar comida
	admButton[2].addEventListener("click", () => {
		addComidaWindow.style.display = "flex";

		addComidaWindow.querySelector("div").innerHTML = "";
		selectedRestaurante.categoria.forEach((e, i) => {
			let label = document.createElement("label");

			let b = document.createElement("b");
			b.innerHTML = e.nome;

			let input = document.createElement("input");
			input.type = "radio";
			input.value = e.nome;
			input.name = "removeCategoria";
			input.classList.add("selecao");
			label.appendChild(input);
			label.appendChild(b);
			addComidaWindow.querySelector("div").appendChild(label);

			addComidaWindow.querySelector("#coAdd").addEventListener("click", () => {
				if (input.checked) {
					console.log("comida adicionada");
					let comida = {
						imagem: URL.createObjectURL(addComidaWindow.querySelector("#coImg").files[0]),
						nome: addComidaWindow.querySelector("#coNome").value,
						desc: addComidaWindow.querySelector("#coDesc").value,
						preco: Number(addComidaWindow.querySelector("#coPreco").value).toFixed(2),
					}

					addComidaWindow.querySelector("#coImg").value = null;
					addComidaWindow.querySelector("#coNome").value = null;
					addComidaWindow.querySelector("#coDesc").value = null;
					addComidaWindow.querySelector("#coPreco").value = null;


					e.comidas.push(comida);
					addComidaWindow.style.display = "none";
					localStorage.setItem("selectedRestaurante", JSON.stringify(selectedRestaurante));
					input.checked = false;
					showButtonWindows();
					appendCategoriasEComidas();
					save();

				}
			});
		});
	});


	//mostrar janela de remover comida
	admButton[3].addEventListener("click", () => {
		removeComidaWindow.style.display = "flex";

		removeComidaWindow.querySelector("#seleCategoria").innerHTML = "";
		removeComidaWindow.querySelector("#seleComidas").innerHTML = "";

		selectedRestaurante.categoria.forEach((e, i) => {
			let label = document.createElement("label");

			let b = document.createElement("b");
			b.innerHTML = e.nome;

			let input = document.createElement("input");
			input.type = "radio";
			input.value = e.nome;
			input.name = "removeCategoria";
			input.classList.add("selecao");
			label.appendChild(input);
			label.appendChild(b);
			removeComidaWindow.querySelector("#seleCategoria").appendChild(label);

			input.addEventListener("click", () => {
				removeComidaWindow.querySelector("#seleComidas").innerHTML = "";
				e.comidas.forEach((r, j) => {
					let labelComida = document.createElement("label");

					let bComida = document.createElement("b");
					bComida.innerHTML = r.nome;

					let inputComida = document.createElement("input");
					inputComida.type = "radio";
					inputComida.value = r.nome;
					inputComida.name = "removeComida";
					inputComida.classList.add("selecao");
					labelComida.appendChild(inputComida);
					labelComida.appendChild(bComida);
					removeComidaWindow.querySelector("#seleComidas").appendChild(labelComida);

					removeComidaWindow.querySelector("#coRemove").addEventListener("click", () => {
						if (inputComida.checked) {
							console.log("comida removida");
							selectedRestaurante.categoria[i].comidas.splice(j, 1);
							removeComidaWindow.style.display = "none";
							localStorage.setItem("selectedRestaurante", JSON.stringify(selectedRestaurante));
							inputComida.checked = false;
							showButtonWindows();
							appendCategoriasEComidas();
							save();
						}
					});
				});
			})

		});
	});


	flutuantes.forEach(e => {
		e.querySelector(".closeWindow").addEventListener("click", () => {
			e.style.display = "none";
		});
	});

} else {
	admButton.forEach((e) => {
		e.style.display = "none";
	});
}

function printCriticas() {
	criticasArea.querySelector("div").innerHTML = "";
	selectedRestaurante.criticas.forEach((e,i) => {
		let divCritica = document.createElement("div");
		divCritica.classList.add("critica");

		let divUsuario = document.createElement("div");
		divUsuario.classList.add("usu");
		let imgUsuario = document.createElement("img");
		imgUsuario.classList.add("perfilUsu");
		imgUsuario.src = e.fez.foto;
		let labelUsuario = document.createElement("label");
		labelUsuario.classList.add("link");
		labelUsuario.innerHTML = e.fez.nome;
		divUsuario.appendChild(imgUsuario);
		divUsuario.appendChild(labelUsuario);

		labelUsuario.addEventListener("click", () => {
			localStorage.setItem("selectedPerfil", JSON.stringify(e.fez));
			location.href = "../perfil/index.html";
		})

		let divInformacoes = document.createElement("div");
		divInformacoes.classList.add("informacoes");
		let labelInformacoes1 = document.createElement("label");
		for (let i = 1; i <= 5; i++) {
			const spanEmoji = document.createElement("span");
			spanEmoji.classList.add("emoji");
			spanEmoji.innerHTML = "⭐️";

			if (i > e.nota) {
				spanEmoji.classList.add("desativado");
			}

			labelInformacoes1.appendChild(spanEmoji);
		}
		let labelInformacoes2 = document.createElement("label");
		labelInformacoes2.innerHTML = e.data;
		divInformacoes.appendChild(labelInformacoes1);
		divInformacoes.appendChild(labelInformacoes2);

		let divTexto = document.createElement("div");
		divTexto.classList.add("texto");
		let labelTexto = document.createElement("label");
		labelTexto.innerHTML = e.texto;
		divTexto.appendChild(labelTexto);


		divCritica.appendChild(divUsuario);
		divCritica.appendChild(divInformacoes);
		divCritica.appendChild(divTexto);

		if (e.fez.email == logado.email) {
			let buttonDelete = document.createElement("button");
			buttonDelete.classList.add("deleteCritica");
			buttonDelete.innerHTML = "Delete";
			divCritica.appendChild(buttonDelete);

			buttonDelete.addEventListener("click",() => {
				selectedRestaurante.criticas.splice(i, 1);
				localStorage.setItem("selectedRestaurante", JSON.stringify(selectedRestaurante));
				printCriticas();
				save();
			})

		}

		criticasArea.querySelector("div").appendChild(divCritica);

	})
	mediaNotas();
}

addCriticaButton.addEventListener("click", () => {
	if (notaCritica.value.length > 0 &&
		escreverCritica.value.length > 0) {
		let nota = Number(notaCritica.value);
		if (nota > 5) {
			nota = 5;
		}
		if (nota < 0) {
			nota = 0;
		}
		let critica = {
			fez: logado,
			restaurante: selectedRestaurante,
			nota: nota,
			texto: escreverCritica.value,
			data: `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`,
		}

		
		logado.criticas.push(critica);
		selectedRestaurante.criticas.push(critica);
		localStorage.setItem("selectedRestaurante", JSON.stringify(selectedRestaurante));
		printCriticas();
		save();
	}
})


function mediaNotas() {
	let media = 0;
	selectedRestaurante.criticas.forEach(e => {
		media += e.nota;
	});
	if(media != 0) {
		media /= selectedRestaurante.criticas.length;
	}

	selectedRestaurante.nota = media;
	notaInf.innerHTML = "";

	for (let i = 1; i <= 5; i++) {
		const spanEmoji = document.createElement("span");
		spanEmoji.classList.add("emoji");
		spanEmoji.innerHTML = "⭐️";

		if (i > selectedRestaurante.nota) {
			spanEmoji.classList.add("desativado");
		}

		notaInf.appendChild(spanEmoji);
	}


	localStorage.setItem("selectedRestaurante", JSON.stringify(selectedRestaurante));
	save();

	console.log(localStorage);
}