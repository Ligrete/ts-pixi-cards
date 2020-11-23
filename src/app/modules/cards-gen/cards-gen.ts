

export class CardsGen {

  array: any[];

  constructor() {
    this.array = this.genCardSuits();
  }

  

  genCardSuits() {
    var namedCards = ['Jack', 'Quenn', 'King', 'Ace'];
    var Order: number;

    var cardsArray: any[] = [{
      type: "asda",
      order: "0",
      code: "asda",
      sprite: "sd"
    }];

    cardsArray.pop();

    for (var indexSuit = 0; indexSuit < 4; indexSuit++) {
      for (var index = 0; index < 13; index++) {
        Order = index + 2;
        if (index <= 8) {
          switch (indexSuit) {
            case 0:
              cardsArray.push({
                type: "0",
                order: Order.toString(),
                code: "d" + (index + 2),
              });
              break;

            case 1:
              cardsArray.push({
                type: "1",
                order: Order.toString(),
                code: "h" + (index + 2),
              });
              break;

            case 2:
              cardsArray.push({
                type: "2",
                order: Order.toString(),
                code: "s" + (index + 2),
              });
              break;
            case 3:
              cardsArray.push({
                type: "3",
                order: Order.toString(),
                code: "c" + (index + 2),
              });
              break;

            default:
              break;
          }
        } else {
          switch (indexSuit) {
            case 0:
              cardsArray.push({
                type: "0",
                order: namedCards[index - 9],
                code: "d" + namedCards[index - 9].slice(0, 1).toLowerCase(),
              });
              break;

            case 1:
              cardsArray.push({
                type: "1",
                order: namedCards[index - 9],
                code: "h" + namedCards[index - 9].slice(0, 1).toLowerCase(),
              });
              break;

            case 2:
              cardsArray.push({
                type: "2",
                order: namedCards[index - 9],
                code: "s" + namedCards[index - 9].slice(0, 1).toLowerCase(),
              });
              break;
            case 3:
              cardsArray.push({
                type: "3",
                order: namedCards[index - 9],
                code: "c" + namedCards[index - 9].slice(0, 1).toLowerCase(),
              });
              break;

            default:
              break;
          }
        }
      }
    }
    var result = this.shuffle(cardsArray);
    console.log("result", result);
    return result
  }

  shuffle(arrayIn: any) {
    let array = [];
    array = arrayIn;
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array
  }
}
