export class FilterService {
  private currentDate = new Date();

  filterByExpiration(items) {
    const currMonth = (((this.currentDate.getMonth() + 1) < 10) ? "0" : "") + (this.currentDate.getMonth() + 1);
    const currDate = ((this.currentDate.getDate() < 10) ? "0" : "") + this.currentDate.getDate();
    const currYear = this.currentDate.getFullYear().toString();

    return items.filter(function (item) {
      let expDateArray = item.expirationDate.split('-');
      return (currMonth < expDateArray[0]) ||
        (currMonth === expDateArray[0] && currDate < expDateArray[1] && currYear <= expDateArray[2]);
    });
  };
}




