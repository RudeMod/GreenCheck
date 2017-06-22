/*!
 *=====GreenCheck.js=====================================================
 * Используется для проверки введенных данных. Также содержит функцию проверки даты.
 *
 * Функции:
 *  Green(Elem, typeObj) - Функция окраски измененной записи в зеленый цвет
 *                         или в красный, если значение элемента не удовлетворяет
 *                         шаблонные условия переданные при вызове функции.
 *  CheckDate(EDate)     - Функция проверки даты. Возвращает либо откоректированную дату,
 *                         либо False если дата введена не верно.
 *  In_array(val, arr)   - Функция проверки существования в массиве arr элемента со значением val.
 *
 * Переменные:
 *  ChangeElemForm       - Показывает изменены ли поля формы.
 *  ErrElem              - Ссылка на последний неверно введенный элемент.
 *
 * Настраеваемые переменные:
 *  Green_DisabledList   - Список элементов, которые будут блокироваться или разблокироваться
 *                         при изменении значения полей. Устанавливается в виде масива
 *                         [элем., элем., ...] или обьекта JQ.
 *  Green_ColorCollect   - Коллекция, которая отвечает за элементы и цвета в которые будут окрашены
 *                         эти элементы при их разблокировке. Данные необходимо записывать в формате:
 *                         [{elm: элемент, clr: "цвет"}, {elm: элемент, clr: "цвет"}, ...].
 *========================================================================
 */

var Green_DisabledList = [];
var Green_ColorCollect = [];

var ChangeElemForm = false; //- Изменены ли поля формы
var ErrElem = null;         //- Ссылка на последний неверно введенный элемент, для того чтобы удалить его значение
                            //в случае изменения значения другого элемента.

//Функция окраски измененной записи в зеленый цвет или в красный, если значение элемента не
//удовлетворяет шаблонные условия переданные при вызове процедуры.
function Green(Elem, typeObj)
{
/*
  Elem    - Элемент, значение которого необходимо проверить.
  typeObj - Принимает 3(8) значения: "standart" ("str", "s"), "num" ("n"), "date" ("d"). Соответвенно в зависимости от 
            этого параметра проводит ту или иную проверку. При значении "standart" или пустом значении элемента 
            данные будут всегда считаться введенными верно. Если передать пустую строку, то данные всегда будут 
            считаться ошибочно введенными.
*/

  UnDisabled_ContstElems = function() { //Функция разблокировки элементов из списка Green_DisabledList
    if (Green_DisabledList.length > 0) {
      for (i=0; i<Green_DisabledList.length; i++) {
        Green_DisabledList[i].disabled = "";
      }
    }
    if (Green_ColorCollect.length > 0) {
      for (i=0; i<Green_ColorCollect.length; i++) {
        Green_ColorCollect[i][0].style.color = Green_ColorCollect[i][1];
      }
    }
  }

  Disabled_ContstElems = function() { //Функция блокировки элементов из списка Green_DisabledList
    if (Green_DisabledList.length > 0) {
      for (i=0; i<Green_DisabledList.length; i++) {
        Green_DisabledList[i].disabled = "disabled";
      }
    }
    if (Green_ColorCollect.length > 0) {
      for (i=0; i<Green_ColorCollect.length; i++) {
        Green_ColorCollect[i][0].style.color = "graytext";
      }
    }
  }

  ChangeElemForm = true;

  if (Elem.value) {
    Elem.value = Elem.value.replace(/[”“„]/g, '"');
  }

  if (ErrElem)  //Если переменная ErrElem содержит ссылку на элемент, в который было введено не верное значение, то проверяется какой
  {             //элемент изменен в момент выполнения функции и если он не сходится с сохраненным - удаляется значение сохранненого элемента
    if ((ErrElem != Elem)) {ErrElem.value = ""}
    else                   {ErrElem = null    }
  }
  switch(true)
  {
    case ((In_array(typeObj, ["standart", "str", "s"])) || (Elem.value == "")): //Элементы вызывающие функццию с параметром "standart" требуют проверку только на количество кавычек
      if ((typeof($) != "undefined") && ($.mask)) {
        if (typeObj == "date") {
          $.mask.set(Elem, "OrigDate");
        }
      }

      if (Elem.value) {           //Проверка на null и undefined
        if(~(Elem.value.search(/"/g))) {
          var lastpos = 0;
          var kk = 0;
          var foundPos = 0;

          while(true) {         //Подсчитывается количество кавычек.
            foundPos = Elem.value.indexOf('"', lastpos);
            if (foundPos == -1) break; //Если больше не нашли кавычек

            kk++
            lastpos = foundPos + 1; // продолжить поиск со следующей
          }

          if ((kk % 2) != 0) {
            Elem.value = Elem.value + '"';
          }
        }
      }

      Elem.style.color = 'rgb(0, 128, 0)';  //Green
      UnDisabled_ContstElems();
      return true;
    break;

    case (In_array(typeObj, ["date", "d"])): //Проверка коректности ввода даты происходит у элементов вызывающих функцию с параметром "date"
      if ((typeof($) != "undefined") && ($.mask)) {
        $.mask.unset(Elem);
      }
      CkD = CheckDate(Elem.value)
      if (CkD) {
        Elem.value = CkD;


        Elem.style.color = 'rgb(0, 128, 0)';  //Green
        UnDisabled_ContstElems();
        return true;
      }
    break;

    case (In_array(typeObj, ["num", "n"])): //Проверка коректности ввода числа происходит у элементов вызывающих функцию с параметром "num"
        Elem.value = Elem.value.replace(",", ".");
        Elem.value = Elem.value.replace(/[^\d.]/g, '');
        
        if (!(isNaN(Elem.value))) {
          Elem.style.color = 'rgb(0, 128, 0)';  //Green
          UnDisabled_ContstElems();
          return true;
        }
    break;
  }
  //==============Эта часть функции выполняется в том случае, если не выполнилось одно из условий проверки элемента на тип.==========
                //Иначе функция не доходит до выполнения этой части кода.
  Elem.style.color = "rgb(255, 0, 0)"   //Red
  Disabled_ContstElems();

  ErrElem = Elem //Если элемент введен не верно, то ссылка на него сохраняется в этой переменной и используется для удаления значения
                 //элемента если изменили значения другого элемента.
  return false;
  //=================================================================================================================================
}

//Функция проверки даты. Возвращает при прохождении всех условий откоректированную дату.
function CheckDate(EDate)
{
/*
  EDate - Дата которую необходимо проверить.
*/
  if (!(~EDate.search(/\d/g))) {
    return false;
  }

  if (~EDate.search(/[^\d\.]/g)){
    EDate = EDate.replace(/[^\d\.]/g, '')              //Удаление лишних символов
    alert("Удалены лишние символы.")
  }

  if (~EDate.search(/^\d*\.\d*\.\d*$/g)) {
    EDate = EDate.replace(/^(?!0)\d{1}\./g, '0$&');    //Автоисправление числа

    EDate = EDate.replace(/\.(?!0)(?=\d{1}\.)/g, '.0');//Автоисправление месяца

    EDate = EDate.replace(/\.(?=\d{3}$)/g, '.2');      //Автоисправление года
    EDate = EDate.replace(/\.(?=\d{2}$)/g, '.20');
    EDate = EDate.replace(/\.(?=\d{1}$)/g, '.200');
  }

  s = EDate.search(/\d{2}\.\d{2}\.\d{4}/g);
  if (!(~s))
  {
    alert("Неправильный формат даты!\n\nДолжно быть dd.mm.yyyy");
    return false;
  }
  else
  {
    dd = EDate.substr(0, 2).replace(/^0/g, '');
    mm = EDate.substr(3, 2).replace(/^0/g, '');
    yyyy = EDate.substr(6, 4).replace(/^0/g, '');
    date_1 = mm + "/" + dd + "/" + yyyy;

    var d = new Date(date_1);

    var d_dd = d.getDate();
    if ( d_dd < 10 ) d_dd = '0' + d_dd;
    var d_mm = d.getMonth()+1;
    if ( d_mm < 10 ) d_mm = '0' + d_mm;
    var d_yy = d.getFullYear();
    d = d_dd+'.'+d_mm+'.'+d_yy;

    if ((new Date(date_1) != 'Invalid Date') && (new Date(date_1) != 'NaN') && (EDate == d))
    {
      return EDate;
    }
    else
    {
      return false;
    }
  }
}

function In_array(val, arr) 
{
  for(var i = 0; i < arr.length; i++) 
  {
    if(arr[i] == val) return true;
  }
  return false;
}