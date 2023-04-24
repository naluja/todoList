let todoInput, errorInfo, todoList, btnAdd
let todoText, btnComplete, btnEdit, btnDelete
let editPopup, popupInput, submitBtn, cancelBtn, todoToEdit, popupInstruction

const main = () => { 
    prepareDomElement()
    prepareDomEvents()
}

const prepareDomElement = () => {
    todoInput = document.querySelector('.todoInput')
    errorInfo = document.querySelector('.errorInfo')
    todoList = document.querySelector('.todoList')
    btnAdd = document.querySelector('.add')

    todoText = document.querySelector('.text')

    editPopup = document.querySelector('.editPopup')
    popupInput = document.querySelector('.popupInput')
    submitBtn = document.querySelector('.submit')
    cancelBtn = document.querySelector('.cancel')
    popupInstruction = document.querySelector('.popupInstruction')

}

const prepareDomEvents = () => {
    btnAdd.addEventListener('click', addNewItem)
    todoList.addEventListener('click', checkClick)
    submitBtn.addEventListener('click', editTodoValue)
    cancelBtn.addEventListener('click', cancelPopup)
    todoInput.addEventListener('keyup', enterKeyCheck)


}

const addNewItem = () => {
    if (todoInput.value !== ''){
        let newLi = document.createElement('li')
        newLi.textContent = todoInput.value
        newLi.classList.add('listItem')

        let newP = document.createElement('p')
        newP.classList.add('text')

        newLi.append(newP)
        createButtons(newLi)

        todoList.append(newLi)

        todoInput.value = ''
        errorInfo.textContent = ''
    }
    else {
        errorInfo.textContent = 'Field cannot be empty'
    }
}

const createButtons = (newLi) => {
    const div = document.createElement('div')
    div.classList.add('list-btn')
    const btnC = document.createElement('button')
    btnC.classList.add('complete')
    btnC.innerHTML = '<i class="fas fa-check"></i>'

    const btnE = document.createElement('button')
    btnE.classList.add('edit')
    btnE.textContent = 'edit'

    const btnD = document.createElement('button')
    btnD.classList.add('delete')
    btnD.innerHTML = '<i class="fas fa-xmark"></i>'
    div.append(btnC, btnE, btnD)
    newLi.append(div)

}

const checkClick = (e) => {
    console.log(e.target)
    if (e.target.matches('.complete')){
        completed(e)
    } else if (e.target.matches('.delete')){
        deleted(e)
    }
    else if(e.target.matches('.edit')){
        edit(e)
    }
}

const completed = e =>{
    e.target.closest('li').classList.toggle('completed')
}
const deleted = e => {
    e.target.closest('li').remove()
    const liItems = todoList.querySelectorAll('li')
    if (liItems.length === 0){
        errorInfo.textContent = "You're TODO is empty"
    }
}

const edit = e => {
    todoToEdit = e.target.closest('li')
    editPopup.style.display = 'flex'
    popupInput.value = todoToEdit.firstChild.textContent

}

const editTodoValue = () => {
    popupInstruction.textContent = 'Edit your todo'
    if (popupInput.value !== ''){
    todoToEdit.firstChild.textContent = popupInput.value 
    editPopup.style.display = 'none'
    popupInput.value = ''
    }
    else {
        popupInstruction.textContent = "You can't submit an empty field. If you don't want to edit click cancel"
    }

    
}

const cancelPopup = () =>{
    editPopup.style.display = 'none'
    popupInput.value = ''
}

const enterKeyCheck = e => {
    if (e.key === 'Enter'){
        addNewItem()
    }
}
document.addEventListener('DOMContentLoaded', main)