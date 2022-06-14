const numberDetect = (num) => {
  const bnNum = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
  num = String(num);
  if (num[num.length - 1] === ".") return 0;
  if (!isNaN(num)) return Number(num);
  else {
    let bnN = "";
    for (let i = 0; i < num.length; i++) {
      if (bnNum.indexOf(num[i]) < 0) return 0;
      bnN += bnNum.indexOf(num[i]);
    }
    return Number(bnN);
  }
};

const calculation = (value) => {
  value = value.split("\n");
  let result = 0;
  for (let i = 0; i < value.length; i++) {
    let num = value[i].trim().split(" ");
    if (numberDetect(num[num.length - 1]))
      result += numberDetect(num[num.length - 1]);
    else result += numberDetect(num[num.length - 2]);
  }
  return result;
};

const compare = (arr1, arr2) => {
  if (arr1.length != arr2.length) {
    return true;
  }
  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i].length != arr2[i].length) return true;
    for (let j = 0; j < arr1[i].length; j++) {
      if (arr1[i][j] !== arr2[i][j]) return true;
    }
  }
  return false;
};

const encode = (value) => {
  value = String(value);
  let result = "";
  for (let i = 0; i < value.length; i++) {
    let ascii = value[i].charCodeAt();
    result += parseInt(ascii / 18) + String(ascii % 18).padStart(2, "0");
  }
  return result;
};

export { calculation, compare, encode };
