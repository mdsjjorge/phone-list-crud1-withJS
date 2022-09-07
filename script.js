
const userAPIUrl = 'https://630a617ef280658a59ce43bc.mockapi.io/phoneList';
const loaderElement = document.querySelector('#loader');
const modal = document.querySelector('.modal-container');
const tbody = document.querySelector('tbody');
const inputName = document.querySelector('#input-name');
const inputPhone = document.querySelector('#input-phone');
const btnSave = document.querySelector('#btnSave');
const modalForm = document.querySelector('#modal-form');

let itens;
let id;
let mockId;

// ========================================================================
// show and hide Loader
// ========================================================================
const showLoader = () => {
    loaderElement.style.display = 'block';
}
const hideLoader = () => {
    loaderElement.style.display = 'none';
}
// ========================================================================
// openModal
// ========================================================================
const openModal = (edit = false, index = 0) => {
    modal.classList.add('active');
  
    modal.onclick = e => {
        if (e.target.className.indexOf('modal-container') !== -1) {
            modal.classList.remove('active');
        }
    }
    const findItem = itens.find(t => t.id == index);
    id = itens.indexOf(findItem);
    mockId = index;
  
    if (edit) {
        inputName.value = findItem.name;
        inputPhone.value = findItem.phone;
    } else {
        inputName.value = '';
        inputPhone.value = '';
    }
}
// ========================================================================
// editItem
// ========================================================================
 function editItem(index) {
    openModal(true, index)
}
// ========================================================================
// loadItens
// ========================================================================
 
function loadItens() {
    tbody.innerHTML = '';
    readItensBD();
}

// ========================================================================
// handleData
// ========================================================================
const handleData = (userBody) => {
    itens = userBody;
    userBody.forEach(element => {       
        let tr = document.createElement('tr');
        // console.log(element.name, element.id);
      
        tr.innerHTML = `
        <td>${element.name}</td>
        <td>${element.phone}</td>
        <td class="action">
            <button onclick="editItem(${element.id})" 
                    class="update-button">
                <img src="img/update.png" width="20px">
            </button> 
        </td>
        <td class="action">
            <button onclick="deleteItemBD(${element.id})"
                    class="delete-button">
                <img src="img/delete.png" width="20px">
            </button>
        </td>
        `;
        tbody.appendChild(tr);
    });
}
// ========================================================================
// API methods
// ========================================================================
// ------------------------------------ CREATE
const createItemBD = (userBody) => {
    showLoader();
    fetch(userAPIUrl, {
        method: 'POST',
        body: JSON.stringify(userBody),
        headers: { 'Content-type': 'application/json; charset=UTF-8' }
    }).then(() => {
        hideLoader();
        loadItens();
    })
}
// ------------------------------------ READ
const readItensBD = () => {
    showLoader();
    fetch(userAPIUrl).then((response) => {
        hideLoader();
        return response.json();

    }).then((data) => {
        handleData(data);

    }).catch((e) => {
        console.log(e.message);
    })
}
// ------------------------------------ UPDATE
const updateItemBD = (userId, inputUser) => {
    showLoader();
    fetch(userAPIUrl + '/' + userId, {
        method: 'PUT',
        body: JSON.stringify(inputUser),
        headers: { 'Content-type': 'application/json; charset=UTF-8' }
    }).then(() => {
        hideLoader();
        loadItens();
    })
}
// ------------------------------------ DELETE
const deleteItemBD = (userId) => {
    showLoader();
    fetch(userAPIUrl + '/' + userId, {
        method: 'DELETE',
        headers: { 'Content-type': 'application/json; charset=UTF-8' }
    }).then(() => {
        hideLoader();
        loadItens();
    })
}
// ========================================================================
// form event listener
// ========================================================================
modalForm.addEventListener('submit', (event) => {
    event.preventDefault();

    if (inputName.value == '' || inputPhone == '') {
        alert('Please, fill all the fields!');
    }  
    const inputUser = { name: inputName.value, phone: inputPhone.value };

    inputName.value = '';
    inputPhone.value = '';

    if (id == -1) {
        createItemBD(inputUser);
    } else {
        updateItemBD(mockId, inputUser);
    }
    
    modal.classList.remove('active');   
})

loadItens();
