//#region catVasiliy
var catVasiliy = {
  name: 'Василий',
  birthday: new Date(),
  listOfFears: ['vacuum cleaner', 'beep'],
  listOfLove: ['ksksks'],
  meow: function () {
    console.log('Meow!');
  },
  reaction: function (feeling) {
    if (this.listOfFears.indexOf(feeling) > -1) {
      this.meow();
      console.log('run from here!!!!')
    }
    else if (this.listOfLove.indexOf(feeling) > -1) {
      console.log('purr');
    }
    else {
      console.log('Meow?');
    }
  },
};
//#endregion

//#region cashBox
var payment = {
  amount: 0,
  info: ""
}

var refund = {
  amount: 0,
  info: ""
}

var cashbox = {
  amount: 0,
  addPayment: function (payment) {
    if (!Number.isInteger(payment.amount)) {
      console.log("payment.amount не является числом");
    }
    else {
      if (payment.amount !== 0) {
            this.amount += payment.amount;
            console.log("Тип транзакции: Начисление");
            console.log("Сумма начисления: " + payment.amount);
            console.log("Комментарий: " + payment.info);
            console.log("Текущая сумма счета: " + this.amount);
      }
      else {
        console.error("Ошибка: Сумма не должна быть равна 0");
      }
    }
  },
  refundPayment: function (refund) {
    if (!Number.isInteger(refund.amount)) {
      console.log("refund.amount не является числом");
    }
    else {
      if (refund.amount >= 0) {
        if ((this.amount - refund.amount) >= 0) {
          this.amount -= refund.amount;
          console.log("Тип транзакции: Возврат");
          console.log("Сумма возврата: " + refund.amount);
          console.log("Комментарий: " + refund.info);
          console.log("Текущая сумма счета: " + this.amount);
        }
        else {
          console.error("Ошибка: Недостаточно средств");
        }
      }
      else {
        console.error("Ошибка: Сумма должна быть больше 0");
      }
    }
  },
};

// cashbox.addPayment({ amount: -10, info: 'Оплата штрафа'}); // show error (console), amount not affected
// cashbox.addPayment({  amount: 10,  info: 'Оплата ЖКХ' }); // cashbox amount = 10

// cashbox.refundPayment({  amount: 10,  info: 'Возврат клиенту' }); // cashbox amount = 0
// cashbox.refundPayment({  amount: 10,  info: 'Возврат клиенту' }); // cashbox amount not affected (warning)
//#endregion

//#region pullOutArray
function pullOutArray(myArray) {
  var result = myArray.reduce((c, v) => {
    if (Number.isInteger(v) && !Number.isNaN(v)) {
      return c.concat(v);
    }
    else if (Array.isArray(v)) {
      var childArray = [];
      v.forEach(element => {
        if (typeof element == "number") childArray = childArray.concat(element);
      });
      return c.concat(childArray);
    }
    else {
      return c.concat([]);
    }
  }, []);
  console.log(result);
}

// pullOutArray([1, 2, 3]); // return [1, 2, 3]
// pullOutArray([]); // return []
// pullOutArray([1, [2, 3, 4], 5]); // return [1, 2, 3, 4, 5]
// pullOutArray([1, [2, 3, 4], 5, [1]]); // return [1, 2, 3, 4, 5, 1]
// pullOutArray([1, [1], null, NaN, ['test']]); // return [1, 1]
//#endregion

class Interval {
  constructor(start, end) {
    this.start = start;
    this.end = end;
  }
}

//Шаблон ввода промежутка времени: hh:mm-hh:mm
function IsTimeRangesIntersect(timeRange1, timeRange2) {
  var timeR1 = timeRange1.split('-');
  var timeR1Left = timeR1[0].split(':');
  var timeR1Right = timeR1[1].split(':');

  var timeR2 = timeRange2.split('-');
  var timeR2Left = timeR2[0].split(':');
  var timeR2Right = timeR2[1].split(':');

  if (timeR1.length !== 2) {
    console.log("Шаблон ввода: hh:mm-hh:mm");
    console.error("Неверный ввод");
    return;
  }
  if (timeR1Left.length  !== 2  ||
      timeR1Right.length !== 2  ||
      timeR2Left.length  !== 2  ||
      timeR2Right.length !== 2) {
    console.log("Шаблон ввода: hh:mm-hh:mm");
    console.error("Неверный ввод");
    return;
  }

  if ((parseInt(timeR1Right[0]) < parseInt(timeR1Left[0])) &&
      (parseInt(timeR2Right[0]) < parseInt(timeR2Left[0]))) {
    var firstBeforeMidnight       = new Interval(parseInt(timeR1Left[0] * 60) + parseInt(timeR1Left[1]), 23 * 60 + 59);
    var firstPastMidnight         = new Interval(0, parseInt(timeR1Right[0] * 60) + parseInt(timeR1Right[1]));
    var secondBeforeMidnight      = new Interval(parseInt(timeR2Left[0] * 60) + parseInt(timeR2Left[1]), 23 * 60 + 59);
    var secondPastMidnight        = new Interval(0, parseInt(timeR2Right[0] * 60) + parseInt(timeR2Right[1]));

    return (IsOverlap(firstBeforeMidnight.start, firstBeforeMidnight.end, secondBeforeMidnight.start, secondBeforeMidnight.end)
         || IsOverlap(firstBeforeMidnight.start, firstBeforeMidnight.end, secondPastMidnight.start, secondPastMidnight.end)
         || IsOverlap(firstPastMidnight.start, firstPastMidnight.end, secondBeforeMidnight.start, secondBeforeMidnight.end)
         || IsOverlap(firstPastMidnight.start, firstPastMidnight.end, secondPastMidnight.start, secondPastMidnight.end));
  }
  else if (parseInt(timeR1Right[0]) < parseInt(timeR1Left[0])) {
    var beforeMidnight       = new Interval(parseInt(timeR1Left[0] * 60) + parseInt(timeR1Left[1]), 23 * 60 + 59);
    var pastMidnight         = new Interval(0, parseInt(timeR1Right[0] * 60) + parseInt(timeR1Right[1]));
    var secondTimeInterval   = new Interval(parseInt(timeR2Left[0] * 60) + parseInt(timeR2Left[1]), parseInt(timeR2Right[0] * 60) + parseInt(timeR2Right[1]));

    return (IsOverlap(beforeMidnight.start, beforeMidnight.end, secondTimeInterval.start, secondTimeInterval.end)
         || IsOverlap(pastMidnight.start, pastMidnight.end, secondTimeInterval.start, secondTimeInterval.end));
  }
  else if (parseInt(timeR2Right[0]) < parseInt(timeR2Left[0])) {
    var beforeMidnight      = new Interval(parseInt(timeR2Left[0] * 60) + parseInt(timeR2Left[1]), 23 * 60 + 59);
    var pastMidnight        = new Interval(0, parseInt(timeR2Right[0] * 60) + parseInt(timeR2Right[1]));
    var firstTimeInterval   = new Interval(parseInt(timeR1Left[0] * 60) + parseInt(timeR1Left[1]), parseInt(timeR1Right[0] * 60) + parseInt(timeR2Right[1]));

    return (IsOverlap(beforeMidnight.start, beforeMidnight.end, firstTimeInterval.start, firstTimeInterval.end) 
         || IsOverlap(pastMidnight.start, pastMidnight.end, firstTimeInterval.start, firstTimeInterval.end));
  }
  else {
    return IsOverlap(timeR1Left, timeR1Right, timeR2Left, timeR2Right);
  }
}

function IsOverlap(leftStart, leftEnd, rightStart, rightEnd) {
  if (leftStart > rightEnd || rightStart > leftEnd) {
    return false;
  }
  else {
    return true;
  }
}
//#endregion

//#region check
function check(data, expectedType) {
  var lowerCaseData = String(expectedType).toLowerCase();
  if (lowerCaseData === 'array' && Array.isArray(data)) {
    return true;
  }
  else if (lowerCaseData === 'number' && Number.isInteger(data)) {
    return true;
  }
  else if (lowerCaseData === 'nan' && Number.isNaN(data)) {
    return true;
  }
  else if (lowerCaseData === 'null' && data === null) {
    return true;
  }
  else if (lowerCaseData === 'string' && typeof data === 'string') {
    return true;
  }
  else if (lowerCaseData === 'boolean' && typeof data === 'boolean') {
    return true;
  }
  else if (lowerCaseData === 'object' && typeof data === 'object') {
    return true;
  }
  else {
    return false;
  }
}
//#endregion

//#region replaceString
function replaceString(sourceString, oldString, newString) {
  if (typeof sourceString !== 'string' || typeof oldString !== 'string'  || typeof newString !== 'string' ) {
    console.log("Неверные параметры");
    return false;
  }

  var index = sourceString.search(oldString);
  if (index > -1) {
    var result = sourceString.replace(oldString, newString);
    return result;
  }
  else {
    console.log("Искомая строка не найдена");
    return false;
  }
}
//#endregion