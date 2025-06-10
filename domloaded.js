// Формат - 
// name: str
// summ: int 
// history: str

if(localStorage.getItem('users') == undefined){
    localStorage.setItem('users','[]')
}

function _getUsers() {
    return JSON.parse(localStorage.getItem('users'))
}
function _setUsers(users) {
    localStorage.setItem('users',JSON.stringify(users))
}

function local_add_new_user(name) {
    let users = _getUsers()
    users.push({'name':name,'summ':0,'history':''})
    console.log(users)
    _setUsers(users)
}
function local_change_summ_for_user_by_name(name,sum) {
    let users = _getUsers()
    for (let x = 0; x < users.length; x++) {
        const element = users[x];
        if(element['name'] == name){
            users[x]['summ'] = sum
            _setUsers(users)
            return
        }
    }
}
function local_change_history_for_user_by_name(name,history) {
    let users = _getUsers()
    for (let x = 0; x < users.length; x++) {
        const element = users[x];
        if(element['name'] == name){
            users[x]['history'] = history
            _setUsers(users)
            return
        }
    }
}

function local_delete_user_by_name(name) {
    let users = _getUsers()
    for (let x = 0; x < users.length; x++) {
        const element = users[x];
        if(element['name'] == name){
            users.splice(x,1)
            _setUsers(users)
            return
        }
    }
}

let temp = _getUsers()

for (let x = 0; x < temp.length; x++) {
    const element = temp[x];
    let users_zone = document.querySelector('.users_zone')
    let div = document.createElement('div')
    div.classList.add('one_user')
    div.innerHTML = `
    <div class="name">${element['name']}</div>
        <div class="summ">${element['summ']} р</div>
        <input type="number" placeholder="Цена" value="0">
        <button onclick="add_sum(this)">+</button>
        <button onclick='delete_user(this)'>Удалить пользователя</button>
        <span class="history">${element['history']}</span>`
    users_zone.prepend(div)
}