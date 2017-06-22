/*!
 *=====GreenCheck.js=====================================================
 * ������������ ��� �������� ��������� ������. ����� �������� ������� �������� ����.
 *
 * �������:
 *  Green(Elem, typeObj) - ������� ������� ���������� ������ � ������� ����
 *                         ��� � �������, ���� �������� �������� �� �������������
 *                         ��������� ������� ���������� ��� ������ �������.
 *  CheckDate(EDate)     - ������� �������� ����. ���������� ���� ����������������� ����,
 *                         ���� False ���� ���� ������� �� �����.
 *  In_array(val, arr)   - ������� �������� ������������� � ������� arr �������� �� ��������� val.
 *
 * ����������:
 *  ChangeElemForm       - ���������� �������� �� ���� �����.
 *  ErrElem              - ������ �� ��������� ������� ��������� �������.
 *
 * ������������� ����������:
 *  Green_DisabledList   - ������ ���������, ������� ����� ������������� ��� ����������������
 *                         ��� ��������� �������� �����. ��������������� � ���� ������
 *                         [����., ����., ...] ��� ������� JQ.
 *  Green_ColorCollect   - ���������, ������� �������� �� �������� � ����� � ������� ����� ��������
 *                         ��� �������� ��� �� �������������. ������ ���������� ���������� � �������:
 *                         [{elm: �������, clr: "����"}, {elm: �������, clr: "����"}, ...].
 *========================================================================
 */

var Green_DisabledList = [];
var Green_ColorCollect = [];

var ChangeElemForm = false; //- �������� �� ���� �����
var ErrElem = null;         //- ������ �� ��������� ������� ��������� �������, ��� ���� ����� ������� ��� ��������
                            //� ������ ��������� �������� ������� ��������.

//������� ������� ���������� ������ � ������� ���� ��� � �������, ���� �������� �������� ��
//������������� ��������� ������� ���������� ��� ������ ���������.
function Green(Elem, typeObj)
{
/*
  Elem    - �������, �������� �������� ���������� ���������.
  typeObj - ��������� 3(8) ��������: "standart" ("str", "s"), "num" ("n"), "date" ("d"). ������������ � ����������� �� 
            ����� ��������� �������� �� ��� ���� ��������. ��� �������� "standart" ��� ������ �������� �������� 
            ������ ����� ������ ��������� ���������� �����. ���� �������� ������ ������, �� ������ ������ ����� 
            ��������� �������� ����������.
*/

  UnDisabled_ContstElems = function() { //������� ������������� ��������� �� ������ Green_DisabledList
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

  Disabled_ContstElems = function() { //������� ���������� ��������� �� ������ Green_DisabledList
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
    Elem.value = Elem.value.replace(/[���]/g, '"');
  }

  if (ErrElem)  //���� ���������� ErrElem �������� ������ �� �������, � ������� ���� ������� �� ������ ��������, �� ����������� �����
  {             //������� ������� � ������ ���������� ������� � ���� �� �� �������� � ����������� - ��������� �������� ������������ ��������
    if ((ErrElem != Elem)) {ErrElem.value = ""}
    else                   {ErrElem = null    }
  }
  switch(true)
  {
    case ((In_array(typeObj, ["standart", "str", "s"])) || (Elem.value == "")): //�������� ���������� �������� � ���������� "standart" ������� �������� ������ �� ���������� �������
      if ((typeof($) != "undefined") && ($.mask)) {
        if (typeObj == "date") {
          $.mask.set(Elem, "OrigDate");
        }
      }

      if (Elem.value) {           //�������� �� null � undefined
        if(~(Elem.value.search(/"/g))) {
          var lastpos = 0;
          var kk = 0;
          var foundPos = 0;

          while(true) {         //�������������� ���������� �������.
            foundPos = Elem.value.indexOf('"', lastpos);
            if (foundPos == -1) break; //���� ������ �� ����� �������

            kk++
            lastpos = foundPos + 1; // ���������� ����� �� ���������
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

    case (In_array(typeObj, ["date", "d"])): //�������� ����������� ����� ���� ���������� � ��������� ���������� ������� � ���������� "date"
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

    case (In_array(typeObj, ["num", "n"])): //�������� ����������� ����� ����� ���������� � ��������� ���������� ������� � ���������� "num"
        Elem.value = Elem.value.replace(",", ".");
        Elem.value = Elem.value.replace(/[^\d.]/g, '');
        
        if (!(isNaN(Elem.value))) {
          Elem.style.color = 'rgb(0, 128, 0)';  //Green
          UnDisabled_ContstElems();
          return true;
        }
    break;
  }
  //==============��� ����� ������� ����������� � ��� ������, ���� �� ����������� ���� �� ������� �������� �������� �� ���.==========
                //����� ������� �� ������� �� ���������� ���� ����� ����.
  Elem.style.color = "rgb(255, 0, 0)"   //Red
  Disabled_ContstElems();

  ErrElem = Elem //���� ������� ������ �� �����, �� ������ �� ���� ����������� � ���� ���������� � ������������ ��� �������� ��������
                 //�������� ���� �������� �������� ������� ��������.
  return false;
  //=================================================================================================================================
}

//������� �������� ����. ���������� ��� ����������� ���� ������� ����������������� ����.
function CheckDate(EDate)
{
/*
  EDate - ���� ������� ���������� ���������.
*/
  if (!(~EDate.search(/\d/g))) {
    return false;
  }

  if (~EDate.search(/[^\d\.]/g)){
    EDate = EDate.replace(/[^\d\.]/g, '')              //�������� ������ ��������
    alert("������� ������ �������.")
  }

  if (~EDate.search(/^\d*\.\d*\.\d*$/g)) {
    EDate = EDate.replace(/^(?!0)\d{1}\./g, '0$&');    //��������������� �����

    EDate = EDate.replace(/\.(?!0)(?=\d{1}\.)/g, '.0');//��������������� ������

    EDate = EDate.replace(/\.(?=\d{3}$)/g, '.2');      //��������������� ����
    EDate = EDate.replace(/\.(?=\d{2}$)/g, '.20');
    EDate = EDate.replace(/\.(?=\d{1}$)/g, '.200');
  }

  s = EDate.search(/\d{2}\.\d{2}\.\d{4}/g);
  if (!(~s))
  {
    alert("������������ ������ ����!\n\n������ ���� dd.mm.yyyy");
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