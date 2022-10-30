class Good {
    constructor (id, name, description,  sizes, price, available) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.sizes = sizes;
        this.price = price;
        this.available = available=== undefined ? 0: available;
    }
    setAvailable(value) {
        if (value == 1 || value == 0) {
            this.available = value;
        } else {
            console.log("Недопустимый параметр для признака доступности, допустимо 1 или 0");
        }
    }
}


class GoodList {
   #goods;
    constructor (goods, filter, sortPrice, sortDir) {
        this.#goods = goods;
        this.filter = filter === undefined ? /./i: filter;
        this.sortPrice = sortPrice === undefined ? false: sortPrice;
        this.sortDir = sortDir === undefined ? false: sortDir;
    }
    
    
    get list(){
        let productList = this.#goods.filter(good => this.filter.test(good.name));
        if(!this.sortPrice) {
            return productList;
        }
        if (this.sortDir) {
            return productList.sort((x, y) => (x.price - y.price));
        }
        return productList.sort((x, y) => (y.price - x.price));

    }

    add(goodAdd) {
        const idxIs = this.#goods.findIndex(goodIs => goodIs.id == goodAdd.id);
        if (idxIs >= 0) {
            console.log("Товар с id=", goodAdd.id, "уже есть в каталоге");
        } else {
            this.#goods.push(goodAdd);
        }
    }

    remove(idRemove) {
        const idxIs = this.#goods.findIndex(goodIs => goodIs.id == idRemove);
        if (idxIs >= 0) {
            this.#goods.splice(idxIs, 1);
        } else {
            console.log("Товара с id =", idRemove, "в каталоге нет");
        }
    }
}

class BasketGood extends Good {
    constructor (good, size, amount) {
        super (good.id, good.name, good.description, good.sizes, good.price, good.available);
        this.size = size;
        this.amount = amount;
    }
}

class Basket {
    constructor () {
        this.goods = [];
    }

    add (basketGood) {
        const idxIs = this.goods.findIndex(goodIs => goodIs.id == basketGood.id);
        if (idxIs >= 0 && this.goods[idxIs].size == basketGood.size) {
            this.goods[idxIs].amount += basketGood.amount;
        } else {
            this.goods.push(basketGood);
        }
    }

    clear () {
        this.goods = [];
        console.log("Корзина полностью очищена");
    }

    remove (good, size, amount) {
        const idxIs = this.goods.findIndex(goodIs => goodIs.id == good.id && goodIs.size == size);
        if (idxIs >= 0 && this.goods[idxIs].size == size && amount < this.goods[idxIs].amount) {
            this.goods[idxIs].amount -= amount;
        } else if (idxIs >= 0 && this.goods[idxIs].size == size && amount == this.goods[idxIs].amount) {
            this.goods.splice(idxIs, 1);
        } else if (idxIs >= 0 && this.goods[idxIs].size == size && amount > this.goods[idxIs].amount) {
            console.log("Удалить из корзины больше, чем есть не получится, проверьте!");
        } else {
            console.log("Такого товара в каталоге нет");
        }
    }

    removeUnavailable() {
        this.goods = this.goods.filter(good => good.available != 0);
    }

    get totalAmount () {
        if (this.goods.length !== 0) {
            const amounts = this.goods.map(good => good.amount).reduce((total, amount) => total + amount);
            return amounts;
        } else {
            return 0;
        }
        
    }

    get totalSum () {
        if (this.goods.length !== 0) {
            const sum = this.goods.map(good => good.price * good.amount).reduce((total, amount) => total + amount);
            return sum;
        } else {
            return 0;
        }                             
    }

}

// Экземпляры класса Good

good1 = new Good (1, "Костюм", "Модный", [48, 50, 52, 54], 8300, 1);
good2 = new Good (2, "Рукавицы для прогулок", "Шерсть", ["L", "XL"], 2300, 1);
good3 = new Good (3, "Ботинки классика", "Черные", [38, 39, 40, 42], 4500, 1);
good4 = new Good (4, "Костюм спортивный", "Серые", [48, 50, 52, 54], 3800, 1);
good5 = new Good (5, "Рубашка", "В полосочку", [44, 46, 48, 50], 9000, 1);
good6 = new Good (6, "Футболка спортивная", "С логотипом", ["S", "L", "XL", "XXL"], 1300, 1);
good7 = new Good (7, "Ботинки для похода", "Крепкие", [40, 41, 43, 45], 3900, 1);

// Изменение признака доступности, можно менять для проверки методов

good1.setAvailable(1);
good2.setAvailable(1);
good3.setAvailable(1);
good4.setAvailable(1);
good5.setAvailable(0);
good6.setAvailable(1);
good7.setAvailable(1);

// Массив экземпляров класса Good
goodsAll = [good1, good2, good3, good4, good5, good6,good7];
for (let i = 0; i < goodsAll.length; i++){
    console.log(goodsAll[i]);
}

// Экземпляры класса GoodList;// Фильтрация и сортировка goodList
goodList1 = new GoodList(goodsAll, /Ру/ig, true, true); // сортировка - да, по возрастанию цены
goodList2 = new GoodList(goodsAll, /спорт/ig, true, false); // сортировка - да, по убыванию цены
goodList3 = new GoodList(goodsAll, /для/g, false, true); // сортировка - нет
goodList4 = new GoodList(goodsAll, /./, false, true); // весь каталог

// Добавление и удаление товара в каталог товаров
// good8 = new Good (8, "Шапка", "Ушанка", ["большая", "маленькая"], 3900, 1);
// goodList4.add(good8);
// goodList4.remove(5);


// list = goodList1.list;
// list = goodList2.list;
// list = goodList3.list;
// list = goodList4.list;
// for (let i = 0; i < list.length; i++){
//     console.log(list[i]);
// }


// Экземпляры класса BasketGood
basketGood1 = new BasketGood(good1, 50, 3);
basketGood3 = new BasketGood(good3, 40, 2);
basketGood31 = new BasketGood(good3, 40, 5);
basketGood32 = new BasketGood(good3, 42, 3);
basketGood5 = new BasketGood(good5, 44, 1);

// Экземпляр класса Basket
basket1 = new Basket();

// Добавление товаров в basket1
basket1.add(basketGood1);
basket1.add(basketGood3);
basket1.add(basketGood31);
basket1.add(basketGood32);
basket1.add(basketGood5);


// Полная очистка корзины
// basket1.clear();


// Удаление товаров из корзины
// basket1.remove(good3, 42, 3);
// basket1.remove(good3, 40, 4);


// Удаление из корзины недоступных товаров
// basket1.removeUnavailable();

// console.log(basket1)
for (let i = 0; i < basket1.goods.length; i++){
    console.log(basket1.goods[i]);
}

// Вывод результирующих параметров
console.log("Общее количество товаров в корзине:", basket1.totalAmount);
console.log("Общая стоимость товаров в корзин:", basket1.totalSum);