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
<button onclick="add_from_price_list(this)"><i class="fa fa-bars" aria-hidden="true"></i></button>
<button onclick="add_sum(this)"><i class="fa fa-plus-circle" aria-hidden="true"></i></button>
<button onclick="delete_user(this)"><i style="color: black;" class="fa fa-trash" aria-hidden="true"></i></button>
</td>
<td class="history"></td>`
        users_zone.prepend(div)
    }
    local_add_new_user(name)
}

function delete_user_confirmed_real(elem) {
    // debugger
    console.log('gfgd')
    let block = elem.parentNode.parentNode
    let name = block.querySelector('.name').innerHTML
    void block.offsetWidth
    block.style.animation = 'opacity_low 1s ease-in-out forwards'
    // block.parentNode.style = '--i: -'+block.offsetHeight+'px'
    // block.parentNode.style.animation = 'marginUp 1s ease-in-out forwards'
    // block.parentNode.style.marginTop = '-'+block.offsetHeight+'px'

    // Блок с поднятием нижних блоков наверх
    let allUsers = document.querySelectorAll('.one_user')
    let up = false
    let downed_users = []
    

    for (let x = 0; x < allUsers.length; x++) {
        const element = allUsers[x];
        if (up) {
            element.style.animation = 'none'
            void element.offsetWidth
            element.style = '--i: -'+(block.offsetHeight+4)+'px'
            element.style.animation = 'marginUp 1s forwards'
            downed_users.push(element)
            continue
        }
        if(element == block){
            up = true
        }
    }

    setTimeout(function () {
        // block.parentNode.style.animation = ''
        for (let x = 0; x < downed_users.length; x++) {
            const element = downed_users[x];
            element.style = ''
        }
        block.remove()
    },1000)
    
    local_delete_user_by_name(name)
}

function delete_user(elem) {
    let confirm = document.createElement('button')
    let decline = document.createElement('button')
    let timings = 300
    let parent = elem.parentNode
    let copy = elem
    console.log(elem.classList)
    elem.classList.remove('animScaleMINUS')
    elem.classList.remove('animScalePLUS')
    void elem.offsetWidth

    confirm.innerHTML = `<i class="fa fa-check-circle" style="color:green" aria-hidden="true"></i>`
    decline.innerHTML = `<i class="fa fa-minus-circle" style="color:red" aria-hidden="true"></i>`

    confirm.setAttribute('onclick','delete_user_confirmed_real(this)')
    // confirm.addEventListener('onclick',function () {
    //     console.log('test1')
    //     delete_user_confirmed(elem)
    // })

    

    confirm.classList.add('animScalePLUS')
    decline.classList.add('animScalePLUS')

    elem.classList.add('animScaleMINUS')

    setTimeout(function(){
        parent.append(confirm)
        // parent.append(decline)
        elem.remove()
    }, timings)
    setTimeout(function () {
        confirm.classList.remove('animScalePLUS')
        decline.classList.remove('animScalePLUS')

        void confirm.offsetWidth
        void decline.offsetWidth

        confirm.classList.add('animScaleMINUS')
        decline.classList.add('animScaleMINUS')

        setTimeout(function () {
            parent.append(copy)
            copy.classList.add('animScalePLUS')
            void copy.offsetWidth
            confirm.remove()
            decline.remove()
        },timings)
    },5000)
    

    // let temp = confirm('Точно удалить?')
    // console.log(elem.parentNode)
    // let name = elem.parentNode.parentNode.querySelector('.name').innerHTML
    // if(temp){
    //     elem.parentNode.parentNode.remove()
    // }
    // local_delete_user_by_name(name)
}

function delete_user_confirmed() {
    
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
    alert(`17.06.2025:
- Добавлена система прайс листа
        
16.06.2025:
- Изменение потдверждения удаления пользователя
- Ебануто красивая анимация удаления пользователя
        
13.06.2025:
- Добавлена красивая анимация появления пользователей
- Переделана верстка с div на table (Теперь все ровно по столбцам, а не как до этого прыгало)

11.06.2025
- Проект создан
- Добавлена моя реклама c;
- Прописана вся логика
- Создана работа с localStorage
        `)
}

function add_test_users(num) {
    for (let x = 0; x < num; x++) {
        document.querySelector('fieldset').querySelector('input').value = 'test'+x
        add_new_user(document.querySelector('fieldset').querySelector('button'))
    }
}

function show_price_list_settings(){
    let price_list = document.querySelector('.price_list')
    price_list.style.animation = 'blurScaleAndOpacity .5s forwards'
    price_list.style.display = 'block'
    price_list_paste_saved()
}

function close_price_list_settings(){
    let price_list = document.querySelector('.price_list')
    price_list.style.animation = 'none'
    void price_list.offsetWidth
    price_list.style.animation = 'blurScaleAndOpacity .5s forwards reverse'
    setTimeout(function () {
        price_list.style.display = 'none'
    },500)
}

function delete_one_price(elem) {
    // $.notify('Успешно удален один элемент из прайс листа','success')
    let name = elem.parentNode.querySelector('input').value
    console.log(name)
    if(local_delete_one_price_list(name)){
        elem.parentNode.remove()
        $.notify('Успешно удалено','success')
    }
    else{
        $.notify("Не найдено такое название в локальной базе данных\nПопробуйте перезайти в прайс лист")
    }
    
}

function price_list_paste_saved() {
    let saved = _getPriceList()
    console.log(saved)
    let price_list = document.querySelector('.price_list').querySelector('.prices')
    price_list.innerHTML = ''
    for (let x = 0; x < saved.length; x++) {
        const element = saved[x];
        let key = Object.keys(element)[0]
        let value = element[key]
        let div = document.createElement('div')
        div.classList.add('one_price')
        div.innerHTML = `
        <input type="text" placeholder="Название" value="${key}">
        <input type="number" placeholder="Цена" value="${value}">
        <button onclick="delete_one_price(this)" ><i class="fa fa-ban" aria-hidden="true"></i></button>
        `
        price_list.append(div)
    }
}

function add_one_price() {
    let price_list = document.querySelector('.price_list').querySelector('.prices')
    // price_list.innerHTML = ''
    var div = document.createElement('div')
    div.classList.add('one_price')
    div.innerHTML = `<input type="text" placeholder="Название">
        <input type="number" placeholder="Цена">
        <button onclick="delete_one_price(this)" ><i class="fa fa-ban" aria-hidden="true"></i></button>`
    console.log(div)
    price_list.prepend(div)
}

function save_prices() {
    let new_prices = []
    let all_prices = document.querySelectorAll('.one_price')
    for (let x = 0; x < all_prices.length; x++) {
        const element = all_prices[x];
        let name = element.querySelectorAll('input')[0].value
        let price = element.querySelectorAll('input')[1].value
        if(name == ''){continue}
        else if(price == ''){continue}
        new_prices.push({[name]:price})
    }
    _setPriceList(new_prices)
    $.notify('Успешно сохранено','success')
    close_price_list_settings()
}

function add_from_price_list(elem) {
    let plain = elem.getBoundingClientRect()
    console.log(plain)
    let div = document.createElement('div')
    div.classList.add('added_price_list')
    div.style.left = (plain.left + plain.width + 4) + 'px'
    div.style.top = plain.top + 'px'
    let prices = _getPriceList()
    let name = elem.parentNode.parentNode.querySelector('.name').innerHTML
    div.innerHTML+= '<span style="display:none;">'+name+'</span>'
    for (let x = 0; x < prices.length; x++) {
        const element = prices[x];
        let key = Object.keys(element)[0]
        let value = element[key]
        div.innerHTML+= `<button onclick="add_price_sum(${value},'${name}',this)">${key} ${value}p</button>`
    }
    div.style.animation = 'blurScaleAndOpacity .5s forwards'
    document.body.prepend(div)
    let interval = setInterval(function(){
        let temp = div.getBoundingClientRect().height
        plain = elem.getBoundingClientRect()
        div.style.top = plain.top - (temp / 2) + 'px'
    },20)
    setTimeout(function(){
        div.style.animation = null
        void div.offsetWidth
        div.style.animation = 'blurScaleAndOpacity .5s forwards reverse'
        setTimeout(function(){
            clearInterval(interval)
            div.remove()
        },500)
    },5000)
}

function add_price_sum(price,name,elem) {
    console.log(price)
    console.log(name)
    let temp = document.querySelectorAll('.one_user')
    for (let x = 0; x < temp.length; x++) {
        const element = temp[x];
        let namee = element.querySelector('.name').innerHTML
        if(namee == name){
            element.querySelector('input').value = price
            element.querySelector('.fa-plus-circle').click()
            break
        }
    }
    let div = elem.parentNode
    div.style.animation = null
    void div.offsetWidth
    div.style.animation = 'blurScaleAndOpacity .5s forwards reverse'
    setTimeout(function(){
        div.remove()
    },500)
}