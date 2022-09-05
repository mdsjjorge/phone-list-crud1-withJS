
const userAPIUrl = 'https://630a617ef280658a59ce43bc.mockapi.io/phoneList';
const loaderElement = document.querySelector('#loader');
const getForm = document.querySelector('#get-form');
const nameInput = document.querySelector('#input-name');
const phoneInput = document.querySelector('#input-phone');

// ========================================================================
// show and hide Loader
// ========================================================================

const showLoader = () => {
    loaderElement.style.display = 'block'
}
const hideLoader = () => {
    loaderElement.style.display = 'none'
}

// ========================================================================
// loadUserList
// ========================================================================

const loadUserList = () => {
    showLoader();
    const handleData = (users) => {
        const userListElement = document.querySelector('#users');
        const userNames = users.map(user => `
        <section id="list-item">
            <span class="user-item">
                <p> 
                    <strong>Name: </strong> ${user.name} | 
                    <strong>Phone number: </strong>  ${user.phone}
                </p>
                <div >
                    <button id="update-button-${user.id}" class="update-button">
                        <img src="img/update.png" width="20px">
                    </button> 
                    <button id="delete-button-${user.id}" class="delete-button">
                        <img src="img/delete.png" width="20px">
                    </button>
                </div>
            </span>     
        </section>         
        `);
        if (users.length > 0) {
            userListElement.innerHTML = userNames.join('');
            const deleteButtons = document.querySelectorAll('.delete-button');
            deleteButtons.forEach(button => {
                button.addEventListener('click', () => {
                    const userId = button.id.replace('delete-button-', '');
                    deleteUser(userId);
                })
            })
        } else {
            userListElement.innerHTML = 'Nenhum telefone cadastrado...';
        }
    }
    fetch(userAPIUrl).then((response) => {
        hideLoader();
        response.json().then(handleData);
    }).catch((e) => {
        console.log(e);
    })
}

// ========================================================================
// updateUserList
// ========================================================================

// const updateUserList = () => {
//     showLoader();
//     const handleData = (users) => {
//         const userListElement = document.querySelector('#users');
//         const userNames = users.map(user => `
//             <div class="user-item">
//                 <p>${user.name}</p>
//                 <p>${user.phone}</p>
//                 <button id="delete-button-${user.id}" class="delete-button">x</button>
//             </div>          
//         `);
//         if (users.length > 0) {
//             userListElement.innerHTML = userNames.join('');
//             const deleteButtons = document.querySelectorAll('.delete-button');
//             deleteButtons.forEach(button => {
//                 button.addEventListener('click', () => {
//                     const userId = button.id.replace('delete-button-', '');
//                     deleteUser(userId);
//                 })
//             })
//         } else {
//             userListElement.innerHTML = 'Nenhum telefone cadastrado...';
//         }
//     }
//     fetch(userAPIUrl).then((response) => {
//         hideLoader();
//         response.json().then(handleData);
//     }).catch((e) => {
//         console.log(e);
//     })
// }

// ========================================================================
// create user
// ========================================================================

const createUser = (newUser) => {
    showLoader();
    fetch(userAPIUrl, {
        method: 'POST',
        body: JSON.stringify(newUser),
        headers: { 'Content-type': 'application/json; charset=UTF-8' }
    }).then(() => {
        hideLoader();
        loadUserList();
    })
}

// ========================================================================
// delete user
// ========================================================================

const deleteUser = (userId) => {
    showLoader();
    fetch(userAPIUrl + '/' + userId, {
        method: 'DELETE',
        headers: { 'Content-type': 'application/json; charset=UTF-8' }
    }).then(() => {
        hideLoader();
        loadUserList();
    })
}

// ========================================================================
// update user
// ========================================================================

const updateUser = (userId) => {
    showLoader();
    fetch(userAPIUrl + '/' + userId, {
        method: 'PUT',
        headers: { 'Content-type': 'application/json; charset=UTF-8' }
    }).then(() => {
        hideLoader();
        updateUserList();
    })
}

loadUserList();

// ========================================================================
// form event listener
// ========================================================================

getForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const newUser = { name: nameInput.value, phone: phoneInput.value };

    nameInput.value = '';
    phoneInput.value = '';

    createUser(newUser);
})
