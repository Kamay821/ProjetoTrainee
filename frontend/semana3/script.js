const estadosPorUF = {
  AC: "Acre", AL: "Alagoas", AP: "Amapá", AM: "Amazonas", BA: "Bahia", CE: "Ceará",
  DF: "Distrito Federal", ES: "Espírito Santo", GO: "Goiás", MA: "Maranhão",
  MT: "Mato Grosso", MS: "Mato Grosso do Sul", MG: "Minas Gerais", PA: "Pará",
  PB: "Paraíba", PR: "Paraná", PE: "Pernambuco", PI: "Piauí", RJ: "Rio de Janeiro",
  RN: "Rio Grande do Norte", RS: "Rio Grande do Sul", RO: "Rondônia", RR: "Roraima",
  SC: "Santa Catarina", SP: "São Paulo", SE: "Sergipe", TO: "Tocantins"
};

function buscarCEP(cepManual) {
  const input = document.getElementById("cepInput");
  const cep = (cepManual || input.value).replace(/\D/g, '');

  if (cep.length !== 8) {
    mostrarErro("Digite um CEP válido com 8 números.");
    return;
  }

  fetch(`https://viacep.com.br/ws/${cep}/json/`)
    .then(response => {
      if (!response.ok) throw new Error("Erro na requisição");
      return response.json();
    })
    .then(data => {
      if (data.erro) {
        mostrarErro("CEP não encontrado.");
        return;
      }

      document.getElementById("cepTitulo").textContent = `CEP ${data.cep}`;
      document.getElementById("logradouro").textContent = data.logradouro || "-";
      document.getElementById("complemento").textContent = data.complemento || "-";
      document.getElementById("bairro").textContent = data.bairro || "-";
      document.getElementById("localidade").textContent = data.localidade || "-";
      document.getElementById("uf").textContent = data.uf || "-";
      document.getElementById("estado").textContent = estadosPorUF[data.uf] || "-";
      
      const endereco = `${data.logradouro}, ${data.localidade}`;
      document.getElementById("linkMaps").href = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(endereco)}`;
      
      document.getElementById("resultado").style.display = "block";
      salvarHistorico(data.cep);
      exibirHistorico();
    })
    .catch(() => mostrarErro("Erro ao buscar o CEP. Tente novamente."));
}

function mostrarErro(msg) {
  const modal = document.getElementById("modalErro");
  const mensagem = document.getElementById("mensagemErro");
  mensagem.textContent = msg;
  modal.style.display = "flex";
}

function fecharModal() {
  document.getElementById("modalErro").style.display = "none";
}

// Histórico de CEPs
function salvarHistorico(cep) {
  let historico = JSON.parse(localStorage.getItem("historicoCEP")) || [];
  historico = historico.filter(item => item !== cep); // remove duplicados
  historico.unshift(cep); // adiciona no topo
  historico = historico.slice(0, 5); // mantém só os 5 mais recentes
  localStorage.setItem("historicoCEP", JSON.stringify(historico));
}

function exibirHistorico() {
  const historico = JSON.parse(localStorage.getItem("historicoCEP")) || [];
  const lista = document.getElementById("listaHistorico");
  lista.innerHTML = "";
  historico.forEach(cep => {
    const li = document.createElement("li");
    li.textContent = cep;
    li.onclick = () => buscarCEP(cep);
    lista.appendChild(li);
  });

  if (historico.length > 0) {
    document.getElementById("historico").style.display = "block";
  }
}

// Carrega histórico ao abrir
window.onload = exibirHistorico;
