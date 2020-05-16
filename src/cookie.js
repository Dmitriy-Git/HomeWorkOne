/*
 ДЗ 7 - Создать редактор cookie с возможностью фильтрации

 7.1: На странице должна быть таблица со списком имеющихся cookie. Таблица должна иметь следующие столбцы:
   - имя
   - значение
   - удалить (при нажатии на кнопку, выбранная cookie удаляется из браузера и таблицы)

 7.2: На странице должна быть форма для добавления новой cookie. Форма должна содержать следующие поля:
   - имя
   - значение
   - добавить (при нажатии на кнопку, в браузер и таблицу добавляется новая cookie с указанным именем и значением)

 Если добавляется cookie с именем уже существующей cookie, то ее значение в браузере и таблице должно быть обновлено

 7.3: На странице должно быть текстовое поле для фильтрации cookie
 В таблице должны быть только те cookie, в имени или значении которых, хотя бы частично, есть введенное значение
 Если в поле фильтра пусто, то должны выводиться все доступные cookie
 Если добавляемая cookie не соответсвует фильтру, то она должна быть добавлена только в браузер, но не в таблицу
 Если добавляется cookie, с именем уже существующей cookie и ее новое значение не соответствует фильтру,
 то ее значение должно быть обновлено в браузере, а из таблицы cookie должна быть удалена

 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

/*
 homeworkContainer - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то добавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */
const homeworkContainer = document.querySelector('#homework-container');
// текстовое поле для фильтрации cookie
const filterNameInput = homeworkContainer.querySelector('#filter-name-input');
// текстовое поле с именем cookie
const addNameInput = homeworkContainer.querySelector('#add-name-input');
// текстовое поле со значением cookie
const addValueInput = homeworkContainer.querySelector('#add-value-input');
// кнопка "добавить cookie"
const addButton = homeworkContainer.querySelector('#add-button');
// таблица со списком cookie
const listTable = homeworkContainer.querySelector('#list-table tbody');


const addCookies = (name, value) =>{
  return (document.cookie = name + '=' + value);
}

const deleteCookie = (cookie_name) => {
  var cookie_date = new Date();  // Текущая дата и время
  cookie_date.setTime(cookie_date.getTime() - 1);
  document.cookie = cookie_name += "=; expires=" + cookie_date.toGMTString();
}


const getCookies = () =>{

  let cookies = {};

  if (document.cookie.length === 0) {
    return cookies;
  }

  document.cookie.split('; ').forEach(cookie => {
    let pair = cookie.split('=');
    let [name, value] = cookie.split('=');
    cookies[name] = value;
  });

  return cookies;
}

const updateTable = () => {
    let cookies = getCookies();
  
    listTable.innerText = '';
    for(let cookie in cookies){
      if(
        !filterNameInput.value 
        || cookie.includes(filterNameInput.value)
        || cookies[cookie].includes(filterNameInput.value)){
        
          let row = listTable.insertRow(-1);
          let deleteButton = document.createElement('button');
          deleteButton.textContent = 'удалить';

          deleteButton.addEventListener('click', ()=>{
            deleteCookie(cookie);
            updateTable();
          })

          row.insertCell(0).textContent = cookie;
          row.insertCell(1).textContent = cookies[cookie];
          row.insertCell(2).appendChild(deleteButton);
        }
    }
  }


filterNameInput.addEventListener('keyup', function () {
  // здесь можно обработать нажатия на клавиши внутри текстового поля для фильтрации cookie
  updateTable();
});

addButton.addEventListener('click', () => {
  // здесь можно обработать нажатие на кнопку "добавить cookie"
  addCookies(addNameInput.value, addValueInput.value);
  updateTable();
  addNameInput.value = '';
  addValueInput.value = '';
});

document.addEventListener('DOMContentLoaded', () => {
  let cookies = getCookies();
  updateTable(cookies);
});
