# GreenCheck

 Используется для проверки введенных данных. Также содержит функцию проверки даты.<br>

 Функции:<br>
  Green(Elem, typeObj) - Функция окраски измененной записи в зеленый цвет
                         или в красный, если значение элемента не удовлетворяет
                         шаблонные условия переданные при вызове функции.<br>
  CheckDate(EDate)     - Функция проверки даты. Возвращает либо откоректированную дату,
                         либо False если дата введена не верно.<br>
  In_array(val, arr)   - Функция проверки существования в массиве arr элемента со значением val.<br>

 Переменные:<br>
  ChangeElemForm       - Показывает изменены ли поля формы.<br>
  ErrElem              - Ссылка на последний неверно введенный элемент.<br>

 Настраеваемые переменные:<br>
  Green_DisabledList   - Список элементов, которые будут блокироваться или разблокироваться
                         при изменении значения полей. Устанавливается в виде масива
                         [элем., элем., ...] или обьекта JQ.<br>
  Green_ColorCollect   - Коллекция, которая отвечает за элементы и цвета в которые будут окрашены
                         эти элементы при их разблокировке. Данные необходимо записывать в формате:
                         [{elm: элемент, clr: "цвет"}, {elm: элемент, clr: "цвет"}, ...].<br>
