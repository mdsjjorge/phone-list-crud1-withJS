// ==============================================================================
// declarations
// ==============================================================================

const userAPIUrl = 'https://630a617ef280658a59ce43bc.mockapi.io/phoneList';
const loaderElement = document.querySelector('#loader');
const formElement = document.querySelector('#form');
const nameInput = document.querySelector('#input-name');
const phoneInput = document.querySelector('#input-phone');

// ==============================================================================
// show and hide Loader
// ==============================================================================

const showLoader = () => {
    loaderElement.style.display = 'block'
}
const hideLoader = () => {
    loaderElement.style.display = 'none'
}

// ==============================================================================
// loadUserList
// ==============================================================================

const loadUserList = () => {
    showLoader();
    const handleData = (users) => {
        const userListElement = document.querySelector('#users');
        const userNames = users.map(user => `
            <div class="user-item">
                <p>${user.name}</p>
                <p>${user.phone}</p>
                <button id="delete-button-${user.id}" class="delete-button">x</button>
            </div>          
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

// ==============================================================================
// updateUserList
// ==============================================================================

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

// ==============================================================================
// create user
// ==============================================================================

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

// ==============================================================================
// delete user
// ==============================================================================

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

// ==============================================================================
// update user
// ==============================================================================

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

// ==============================================================================
// form event listener
// ==============================================================================

formElement.addEventListener('submit', (event) => {
    event.preventDefault();

    const newUser = { name: nameInput.value, phone: phoneInput.value };

    nameInput.value = '';
    phoneInput.value = '';

    createUser(newUser);
})

// ===================================================================================


// const loadData = (url, callback) => {
//     fetch(url).then((response) => {
//         response.json().then((data) => {
//             callback(data)
//         })
//     })
// }

// const postData = (url, data, callback) => {
//     const fetchOptions = {
//         method: 'POST',
//         headers: {'Content-type': 'application/json; charset=UTF-8'},
//         body: JSON.stringify(data),
//     }

//     fetch(url, fetchOptions).then(() => {
//         callback()
//     })
// }

// const usersApiUrl = 'https://630a617ef280658a59ce43bc.mockapi.io/users'
// const userListElement = document.querySelector('#users')

// const fetchUsers = () => {
//     loadData(usersApiUrl, (users) => {
//         const userNames = users.map(user => `<p>${user.name}</p>`)
//         userListElement.innerHTML = userNames.join('')
//         console.log(users)
//     })
// }


// const registerFormElement = document.querySelector('#register-form')
// const nameInputElement = document.querySelector('#name-input')

// registerFormElement.addEventListener('submit', (event) => {
//     event.preventDefault()
//     const userData = { name: nameInputElement.value }
//     postData(usersApiUrl, userData, () => {
//         fetchUsers()
//         nameInputElement.value = ''
//     })
// })

// fetchUsers()
