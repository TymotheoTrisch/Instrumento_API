const galeria = document.querySelector('.galeria-instrumentos');
const url = 'http://localhost:3000/instrumentos';
let instumentoArrayLength = 0;
const formCreate = document.querySelector('.form-instrumento')
const formEdit = document.querySelector('.form-edit-instrumento')
const infoInstrumento = document.querySelector('.info-instrumento')
const voltar = document.querySelectorAll('.voltar i')

const nome = document.querySelector('.nome')
const imagem = document.querySelector('.imagem')
const familia = document.querySelector('.familia')
const tipo = document.querySelector('.tipo')
const material = document.querySelector('.material')
const origem = document.querySelector('.origem')
const descricao = document.querySelector('.descricao')
const btn_editar = document.querySelector('.btn-editar')
const btn_excluir = document.querySelector('.btn-excluir')

voltar.forEach((voltar) => {
    voltar.addEventListener('click', () => {
        infoInstrumento.classList.remove('active');
        removerDetalhesInstrumento()
    })
})


function createInstrumentoListItem(instrumento) {
    const div = document.createElement('div');
    div.classList.add('container')

    div.innerHTML = `
    <img src="${instrumento.imagem}" alt="Instrumento" class="imagem">
    `;

    const imagem = div.querySelector('.imagem');
    imagem.addEventListener('click', () => {
        infoInstrumento.classList.add('active');
        detalhesInstrumento(instrumento)
    });

    return div;
}

function detalhesInstrumento(instrumento) {
    nome.innerHTML = instrumento.nome
    imagem.src = instrumento.imagem
    familia.innerHTML = `<span>Família: </span>${instrumento.familia}`
    tipo.innerHTML = `<span>Tipo: </span>${instrumento.tipo}`
    material.innerHTML = `<span>Material: </span>${instrumento.material}`
    origem.innerHTML = `<span>Origem: </span>${instrumento.origem}`
    descricao.innerHTML = `<span>Descrição: </span>${instrumento.descricao}`
    btn_editar.addEventListener('click', () => {
        editar(instrumento)
    })
    btn_excluir.addEventListener('click', () => {
        delet(instrumento.id)
    })
}

function removerDetalhesInstrumento() {
    nome.innerHTML = ''
    imagem.innerHTML = ''
    familia.innerHTML = ''
    tipo.innerHTML = ''
    material.innerHTML = ''
    origem.innerHTML = ''
    descricao.innerHTML = ''
}

function listInstrumentos() {
    fetch(url)
        .then(res => {
            if (!res.ok) {
                throw new Error('Erro ao obter lista de instrumentos');
            }
            return res.json();
        })
        .then(data => {
            galeria.innerHTML = '';
            data.forEach(instrumento => {
                const div = createInstrumentoListItem(instrumento);
                galeria.appendChild(div);
            });
        })
        .catch(error => console.error(error.message));
}


function criar() {
    formCreate.classList.add('active')
}


function adicionar() {

    let id = instumentoArrayLength + 1;
    fetch(url)
        .then(res => res.json())
        .then(data => {
            data.forEach(instrumento => {
                if (instrumento.id == id) {
                    
                    id++;
                }
            });
            const name = document.getElementById('nome').value
            const image = document.getElementById('imagem').value
            const family = document.getElementById('familia').value
            const type = document.getElementById('tipo').value
            const material = document.getElementById('material').value
            const origin = document.getElementById('origem').value
            const describe = document.getElementById('descricao').value
            
            


            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id: id, nome: name, imagem: image, familia: family, tipo: type, material: material, origem: origin, descricao: describe }),
            })
                .then(res => {
                    if (!res.ok) {
                        alert('Erro ao adicionar instrumento');
                        throw new Error('Erro ao adicionar instrumento');
                    }
                    return res.json();
                })
                .then(() => {
                    listInstrumentos();
                })
                .catch(error => console.error(error.message));
        })


}

function editar(instrumento) {
    document.getElementById('id').value = instrumento.id
    document.getElementById('unome').value = instrumento.nome
    document.getElementById('uimagem').value = instrumento.imagem
    document.getElementById('ufamilia').value = instrumento.familia
    document.getElementById('utipo').value = instrumento.tipo
    document.getElementById('umaterial').value = instrumento.material
    document.getElementById('uorigem').value = instrumento.origem
    document.getElementById('udescricao').value = instrumento.descricao

    infoInstrumento.classList.remove('active')
    formEdit.style.display = 'flex'
}

function update() {
    const id = document.getElementById('id').value
    const name = document.getElementById('unome').value
    const image = document.getElementById('uimagem').value
    const family = document.getElementById('ufamilia').value
    const type = document.getElementById('utipo').value
    const material = document.getElementById('umaterial').value
    const origin = document.getElementById('uorigem').value
    const describe = document.getElementById('udescricao').value

    console.log(id, name, image, family, type, material, origin, describe);


    fetch(`${url}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: id, nome: name, imagem: image, familia: family, tipo: type, material: material, origem: origin, descricao: describe }),
    })
        .then(res => {
            if (!res.ok) {
                throw new Error('Erro ao editar instrumento');
            }
            return res.json();
        })
        .then(() => {
            listInstrumentos();
        })
        .catch(error => console.error(error.message));
}

function delet(id) {
    fetch(`${url}/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then(res => {
            if (!res.ok) {
                throw new Error('Erro ao deletar instrumento');
            }
            return res.json();
        })
        .then(() => {
            alert("Instrumento deletado");
            listInstrumentos();
        })
        .catch(error => console.error(error.message));
}


const btnUCancelar = document.getElementById('btn-ucancelar')
btnUCancelar.addEventListener('click', () => {
    infoInstrumento.classList.add('active')
    formEdit.style.display = 'none'

})

const btnCancelar = document.getElementById('btn-cancelar')
btnCancelar.addEventListener('click', () => {
    formCreate.classList.remove('active')

})

listInstrumentos()