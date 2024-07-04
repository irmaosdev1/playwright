function AbrirModal(ev) {
  ev.preventDefault();
  const formulario = document.getElementById("formUrl");
  const formAdd = document.getElementById("formAddPessoa");

  formAdd.reset();

  const btnModalAdicionar = document.getElementById("btnModalAdd");
  const btnModalEditar = document.getElementById("editarModal");

  btnModalAdicionar.style.display = "block";
  if (btnModalEditar) {
    btnModalEditar.style.display = "none";
  }

  const myModal = new bootstrap.Modal("#modal", {
    keyboard: false,
  });

  if (formulario.checkValidity()) {
    myModal.show();
  } else {
    formulario.reportValidity();
  }

  const modal = document.getElementById("modal");

  modal.addEventListener("shown.bs.modal", () => {
    const myInput = document.getElementById("nome");
    myInput.focus();
  });

  const btnX = document.getElementById("botaoX");
  const btnCancel = document.getElementById("botaoCancelar");

  btnX.onclick = function () {
    myModal.hide();
  };
  btnCancel.onclick = function () {
    myModal.hide();
  };
}

function Adicionar(ev) {
  ev.preventDefault();

  const tiposArray = document.getElementsByName("gridRadios");
  let tipo = "";

  tiposArray.forEach((element) => {
    if (element.checked == true) {
      tipo = element.value;
    }
  });

  const dados = {
    nome: document.getElementById("nome").value,
    email: document.getElementById("email").value,
    tipo: tipo,
  };

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(dados),
  };

  const urlAPI = document.getElementById("urlInput");
  const url = urlAPI.value + "/pessoa";
  const formularioAdd = document.getElementById("formAddPessoa");
  const btnXAdd = document.getElementById("botaoX");

  if (formularioAdd.checkValidity()) {
    fetch(url, options)
      .then(function () {
        alert("Pessoa adicionada com sucesso.");
        formularioAdd.reset();
        AbrirTabela();
        btnXAdd.click();
      })
      .catch(function () {
        alert("Erro ao adicionar pessoa!");
      });
  } else {
    formularioAdd.reportValidity();
  }
}

function AbrirTabela() {
  const myModalPosTabela = new bootstrap.Modal("#modal", {
    keyboard: false,
  });
  const urlAPI = document.getElementById("urlInput");
  const url = urlAPI.value + "/pessoa";
  const tabelaCorpo = document.getElementById("tabelaBody");
  tabelaCorpo.innerHTML = "";

  const formulario = document.getElementById("formUrl");
  const tabela = document.getElementById("divTabela");
  const paragrafo = document.getElementById("semRegistro");

  let dados = "";
  if (formulario.checkValidity()) {
    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then(function (data) {
        dados = data;

        dados.forEach((element) => {
          let nomeTabela = element.nome;
          let emailTabela = element.email;
          let tipoNum = element.tipo;
          let idPessoa = element._id;
          let tipoTabela = "";

          if (tipoNum == 1) {
            tipoTabela = "Cliente";
          } else if (tipoNum == 2) {
            tipoTabela = "Fornecedor";
          } else if (tipoNum == 3) {
            tipoTabela = "Empregado";
          }

          let tr = document.createElement("tr");
          tabelaCorpo.appendChild(tr);

          let cel1 = document.createElement("td");
          cel1.innerText = nomeTabela;
          tr.appendChild(cel1);

          let cel2 = document.createElement("td");
          cel2.innerText = emailTabela;
          tr.appendChild(cel2);

          let cel3 = document.createElement("td");
          cel3.innerText = tipoTabela;
          tr.appendChild(cel3);

          let cel4 = document.createElement("td");
          tr.appendChild(cel4);

          var btnEditar = document.createElement("button");
          btnEditar.className = "btn btn-secondary";
          btnEditar.innerHTML = "Editar";

          btnEditar.onclick = function () {
            const urlEditar = url + "/" + idPessoa;
            let inputNome = document.getElementById("nome");
            let inputEmail = document.getElementById("email");
            let inputTipo = document.getElementsByName("gridRadios");
            let indiceTipo = parseInt(tipoNum) - 1;

            inputNome.value = nomeTabela;
            inputEmail.value = emailTabela;
            inputTipo[indiceTipo].checked = true;

            const btnModalAdicionar = document.getElementById("btnModalAdd");
            btnModalAdicionar.style.display = "none";

            const btnEditarApagar = document.getElementById("editarModal");
            if (btnEditarApagar) {
              btnEditarApagar.remove();
            }

            var btnModalEditar = document.createElement("button");
            btnModalEditar.className = "btn btn-primary";
            btnModalEditar.innerHTML = "Editar Pessoa";
            btnModalEditar.id = "editarModal";

            btnModalEditar.onclick = function () {
              const tiposArrayEditar = document.getElementsByName("gridRadios");
              let tipoEditar = "";

              tiposArrayEditar.forEach((element) => {
                if (element.checked == true) {
                  tipoEditar = element.value;
                }
              });

              const dados = {
                nome: document.getElementById("nome").value,
                email: document.getElementById("email").value,
                tipo: tipoEditar,
              };

              const options = {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                  Accept: "application/json",
                },
                body: JSON.stringify(dados),
              };

              fetch(urlEditar, options)
                .then(function () {
                  myModalPosTabela.hide();
                  alert("Pessoa editada com sucesso.");
                  AbrirTabela();
                })
                .catch(function () {
                  alert("Erro ao editar pessoa!");
                });
            };
            const divRodape = document.getElementById("rodape");
            divRodape.appendChild(btnModalEditar);

            myModalPosTabela.show();
          };

          cel4.appendChild(btnEditar);

          var btnDeletar = document.createElement("button");
          btnDeletar.className = "btn btn-danger ms-1";
          btnDeletar.innerHTML = "Deletar";

          btnDeletar.onclick = function () {
            const urlDelete = url + "/" + idPessoa;
            if (confirm("Deseja deletar " + nomeTabela + "?")) {
              fetch(urlDelete, { method: "DELETE" })
                .then(() => alert("Pessoa deletada com sucesso."))
                .then(tr.parentNode.removeChild(tr))
                .catch(function () {
                  alert("Erro ao deletar pessoa.");
                });
            }
          };

          cel4.appendChild(btnDeletar);
        });

        if (dados != "") {
          tabela.style.display = "block";
          paragrafo.style.display = "none";
        } else {
          tabela.style.display = "none";
          paragrafo.style.display = "block";
        }
      })
      .catch(function () {
        paragrafo.text = "Erro";
      });
  }

  myModalPosTabela.hide();
}

function AtualizarTabela() {
  const formulario = document.getElementById("formUrl");
  if (formulario.checkValidity()) {
    AbrirTabela();
  }
}
