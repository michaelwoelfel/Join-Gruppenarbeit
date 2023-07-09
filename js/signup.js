let users = [];

const STORAGE_TOKEN = '9DSY3OMJBPC4FF2QNS6I226NK6HRNQV27XWIWUO8';
const STORAGE_URL = 'https://remote-storage.developerakademie.org/item';


async function addUser() {
    registerBtn.disabled = true;
    let userName = document.getElementById('username').value;
    let userMail = document.getElementById('usermail').value;
    let userPassword = document.getElementById('userpassword').value;
    users.push({
        username: userName,
        mail: userMail,
        password: userPassword,
    });
    await setItem('users', JSON.stringify(users));
    resetForm();
    hideSignup();
  
 
    

}

function hideSignup() {
    document.getElementById('showsignup').classList.remove('hidesignupsuccess');
    document.getElementById('hidesignup').classList.add('hidesignupsuccess');
}

function openWindow() {
    window.open('index.html','_self');
}

async function init() {
    loadUsers();
}

async function loadUsers() {
    try {
        users = JSON.parse(await getItem('users'));
    } catch (e) {
        console.error('Loading error:', e);
    }
}

function resetForm() {
    registerBtn.disabled = false;
    document.getElementById('username').value = '';
    document.getElementById('usermail').value = '';
    document.getElementById('userpassword').value = '';
}



async function setItem(key, value) {
    const payload = { key, value, token: STORAGE_TOKEN };
    return fetch(STORAGE_URL, { method: 'POST', body: JSON.stringify(payload) })
        .then(res => res.json());
}

async function getItem(key) {
    const url = `${STORAGE_URL}?key=${key}&token=${STORAGE_TOKEN}`;
    return fetch(url).then(res => res.json()).then(res => {
        if (res.data) {
            return res.data.value;
        } throw `Could not find data with key "${key}".`;
    });
}