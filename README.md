# GreenCheck

 Используется для проверки введенных данных. Также содержит функцию проверки даты.<br>

 ### Функции:<br>
   - #### Green(Elem, typeObj) 
  <p>Функция окраски измененной записи в зеленый цвет или в красный, если значение элемента не удовлетворяет шаблонные условия переданные при вызове функции.</p>
  
   - #### CheckDate(EDate)     
  <p>Функция проверки даты. Возвращает либо откоректированную дату, либо False если дата введена не верно.</p>
  
   - #### In_array(val, arr)   
  <p>Функция проверки существования в массиве arr элемента со значением val.</p>

 ### Переменные:<br>
   - #### ChangeElemForm       
  <p>Показывает изменены ли поля формы.</p>
  
   - #### ErrElem              
  <p>Ссылка на последний неверно введенный элемент.</p>

 ### Настраеваемые переменные:<br>
   - #### Green_DisabledList   
  <p>Список элементов, которые будут блокироваться или разблокироваться при изменении значения полей. Устанавливается в виде масива [элем., элем., ...] или обьекта JQ.</p>
  
   - #### Green_ColorCollect    
  <p>Коллекция, которая отвечает за элементы и цвета в которые будут окрашены эти элементы при их разблокировке. Данные необходимо записывать в формате:<br> [{elm: элемент, clr: "цвет"}, {elm: элемент, clr: "цвет"}, ...].</p>
