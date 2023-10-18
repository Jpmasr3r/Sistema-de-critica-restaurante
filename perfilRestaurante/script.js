let voltar = document.querySelector("#voltar");
voltar.addEventListener("click", () => {
	location.href = "../areaDePesquisa/index.html";
	localStorage.removeItem("selectedRestaurante");
});

let selectedRestaurante = JSON.parse(localStorage.getItem("selectedRestaurante"));
let logado = JSON.parse(localStorage.getItem("logado"));
let nome = document.querySelector("#nome");
let endereco = document.querySelector("#endereco");
let dono = document.querySelector("#dono");
let nota = document.querySelector("#nota");
let admButton = document.querySelectorAll(".adm");

buttonsADM();

nome.innerHTML = selectedRestaurante.nome;
endereco.innerHTML = selectedRestaurante.endereco;
if(selectedRestaurante.dono.email == logado.email) {
	dono.innerHTML = `${selectedRestaurante.dono.nome} (Você)`;
}else {
	dono.innerHTML = selectedRestaurante.dono.nome;
}

dono.addEventListener("click", () => {
	localStorage.setItem("selectedPerfil", JSON.stringify(selectedRestaurante.dono));
	location.href = "../perfil/index.html";
});

for (let i = 1; i <= selectedRestaurante.nota; i++) {
	const spanEmoji = document.createElement("span");
	spanEmoji.classList.add("emoji");
	spanEmoji.innerHTML = "⭐️";

	nota.appendChild(spanEmoji);
}

for (let i = 1; i <= 5 - selectedRestaurante.nota; i++) {
	const spanEmoji = document.createElement("span");
	spanEmoji.classList.add("emoji");
	spanEmoji.classList.add("desativado");
	spanEmoji.innerHTML = "⭐️";

	nota.appendChild(spanEmoji);
}

function buttonsADM() {
	if (selectedRestaurante.dono.email == logado.email) {
		if(selectedRestaurante.categoria.length <= 0) {
			admButton[1].style.display = "none";
			admButton[2].style.display = "none";
			admButton[3].style.display = "none";
		}else {
			admButton[2].style.display = "none";
			admButton[3].style.display = "none";
		}
		
	} else {
		admButton.forEach((e) => {
			e.style.display = "none";
		});
	}


}	





