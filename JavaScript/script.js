// item example
// {
//   name: 'Name',
//   description: 'Description',
//   expirationDate: '01-30-1999'
// }

Date.prototype.getToday = function () {
  return [(((this.getMonth()+1) < 10)?"0":"") + (this.getMonth()+1), ((this.getDate() < 10)?"0":"") + this.getDate(), this.getFullYear().toString()];
};

const filterByExpiration = (items) => {
  // change this function to return only current items
  // where expirationDate > today's date

  let currDateArray = new Date().getToday();

//Using filter method for array

  return items.filter(function (item) {
    let expDateArray = item.expirationDate.split('-');
      return (currDateArray[0] < expDateArray[0]) ||
        (currDateArray[0] === expDateArray[0] && currDateArray[1] < expDateArray[1] && currDateArray[2] <= expDateArray[2]);
  });

//OR using reduce method for array

//  return items.reduce(function (prev, curr) {
//    let expDateArray = curr.expirationDate.split('-');
//    return (currDateArray[0] < expDateArray[0]) ||
//         (currDateArray[0] === expDateArray[0] && currDateArray[1] < expDateArray[1] && currDateArray[2] <= expDateArray[2])
//         ? prev.push(curr) : null, prev;
// }, []);
};


