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

//#region isTimeRangesIntersect
var timeR1 = {
  t1: Date,
  t2: Date
}

var timeR2 = {
  t1: Date,
  t2: Date
}

function isTimeRangesIntersect(timeRange1, timeRange2) {
  timeR1.t1 = new Date("1970-01-01T" + timeRange1[0]);
  timeR1.t2 = new Date("1970-01-01T" + timeRange1[1]);

  timeR2.t1 = new Date("1970-01-01T" + timeRange2[0]);
  timeR2.t2 = new Date("1970-01-01T" + timeRange2[1]);

  if (timeR1.t1 == "Invalid Date" ||
    timeR1.t2 == "Invalid Date" ||
    timeR2.t1 == "Invalid Date" ||
    timeR2.t2 == "Invalid Date") {
    console.error("Invalid date");
    return;
  }

  if ((timeR1.t2 > timeR2.t1 && timeR1.t2 < timeR2.t2) ||
    (timeR1.t1 > timeR2.t1 && timeR1.t1 < timeR2.t2) ||
    (timeR1.t1 < timeR2.t1 && timeR1.t2 > timeR2.t2) ||
    (timeR1.t1 > timeR2.t1 && timeR1.t2 < timeR2.t2)) {
    return true;
  }
  else {
    return false;
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
  if (!typeof sourceString == "string" || !typeof oldString == "string" || !typeof newString == "string") {
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

