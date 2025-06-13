function add_new_user(elem) {
    let parent = elem.parentNode
    let name = parent.querySelector('input').value
    if(name == ''){
        alert('Пустое имя')
        return
    }
    else{
        let users_zone = document.querySelector('.users_zone')
        let div = document.createElement('tr')
        div.classList.add('one_user')
        div.innerHTML = `
<td class="name">${name}</td>
<td class="summ">0 р</td>
<td>
<input type="number">
<button onclick="add_sum(this)"><i class="fa fa-plus-circle" aria-hidden="true"></i></button>
<button onclick="delete_user(this)"><i style="color: black;" class="fa fa-trash" aria-hidden="true"></i></button>
</td>
<td class="history"></td>`
        users_zone.prepend(div)
    }
    local_add_new_user(name)
}

function delete_user(elem) {
    let temp = confirm('Точно удалить?')
    console.log(elem.parentNode)
    let name = elem.parentNode.parentNode.querySelector('.name').innerHTML
    if(temp){
        elem.parentNode.parentNode.remove()
    }
    local_delete_user_by_name(name)
}

function add_sum(elem) {
    let user = elem.parentNode.parentNode
    let name = elem.parentNode.parentNode.querySelector('.name').innerHTML
    let summ = user.querySelector('.summ').innerHTML.split(' ')[0]
    let entered_summ = user.querySelector('input').value

    entered_summ = parseInt(entered_summ)
    summ = parseInt(summ)

    console.log(entered_summ)

    if(entered_summ == 0){
        console.log('1')
        return
    }
    else if(isNaN(entered_summ)){
        console.log('2')
        return
    }

    user.querySelector('.summ').innerHTML = (summ+entered_summ)+' р'

    let history = user.querySelector('.history')
    history.innerHTML = history.innerHTML + entered_summ + ' + '

    user.querySelector('input').value = 0

    local_change_summ_for_user_by_name(name,summ+entered_summ)
    local_change_history_for_user_by_name(name,history.innerHTML)
}

function show_updates() {
    alert(`13.06.2025:
- Добавлена красивая анимация появления пользователей
- Переделана верстка с div на table (Теперь все ровно по столбцам, а не как до этого прыгало)

11.06.2025
- Проект создан
- Добавлена моя реклама c;
- Прописана вся логика
- Создана работа с localStorage
        `)
}