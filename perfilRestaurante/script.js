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
let flutuantes = document.querySelectorAll(".flutuante");
let addCategoriaWindow = flutuantes[0];
let removeCategoriaWindow = flutuantes[1];

async function getInfs() {
	try {
		let data = await fetch("../assets/php/get/getSelectedRestaurante.php").then(res => res.json());
		console.log(data);
	} catch (error) {
		console.log(error);
	}
}
getInfs();

let voltar = document.querySelector("#voltar");
voltar.addEventListener("click", () => {
	location.href = "../areaDePesquisa/index.html";
	localStorage.removeItem("selectedRestaurante");
});

// for (let i = 1; i <= selectedRestaurante.nota; i++) {
// 	const spanEmoji = document.createElement("span");
// 	spanEmoji.classList.add("emoji");
// 	spanEmoji.innerHTML = "⭐️";

// 	nota.appendChild(spanEmoji);
// }

// for (let i = 1; i <= 5 - selectedRestaurante.nota; i++) {
// 	const spanEmoji = document.createElement("span");
// 	spanEmoji.classList.add("emoji");
// 	spanEmoji.classList.add("desativado");
// 	spanEmoji.innerHTML = "⭐️";

// 	nota.appendChild(spanEmoji);
// }

// function buttonsADM() {
// 	removeCategoriaWindow.querySelector("div").innerHTML = "";
// 	if (selectedRestaurante.dono.email == logado.email) {
// 		if (selectedRestaurante.categoria.length > 0) {
// 			admButton[1].style.display = "flex";
// 			admButton[2].style.display = "flex";
// 			admButton[3].style.display = "none";
// 		} else {
// 			admButton[1].style.display = "none";
// 			admButton[2].style.display = "none";
// 			admButton[3].style.display = "none";
// 		}

// 		admButton[0].addEventListener("click", () => {
// 			addCategoriaWindow.style.display = "flex";
// 		});

// 		admButton[1].addEventListener("click", () => {
// 			removeCategoriaWindow.style.display = "flex";
// 		});

// 		addCategoriaWindow.querySelector("#cAdd").addEventListener("click", () => {
// 			if (addCategoriaWindow.querySelector("#cNome").value.length > 0) {
// 				let nome = addCategoriaWindow.querySelector("#cNome").value;
// 				selectedRestaurante.categoria.push({
// 					nome: nome,
// 					comidas: [],
// 				}, );
// 			}
// 			addCategoriaWindow.style.display = "none";
// 			buttonsADM();
// 		});

// 		selectedRestaurante.categoria.forEach(e => {
// 			let label = document.createElement("label");

// 			let b = document.createElement("b");
// 			b.innerHTML = e.nome;

// 			let input = document.createElement("input");
// 			input.type = "radio";
// 			input.value = e.nome;
// 			input.name = "removeCategoria";
// 			input.classList.add("selecao");
// 			label.appendChild(input);
// 			label.appendChild(b);
// 			removeCategoriaWindow.querySelector("div").appendChild(label);
// 		});




// 		flutuantes.forEach(e => {
// 			e.querySelector(".closeWindow").addEventListener("click", () => {
// 				e.style.display = "none";
// 			})
// 		})
// 	} else {
// 		admButton.forEach((e) => {
// 			e.style.display = "none";
// 		});
// 	}


// }