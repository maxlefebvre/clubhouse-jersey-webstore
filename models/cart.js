/*
Cart constructor. It will take the old object if there is one otherwise
creates new cart. Add function add new item to cart.
*/

module.exports = function Cart(oldCart) {
    this.items = oldCart.items || {};
    this.totalQty = oldCart.totalQty || 0;
    this.totalPrice = oldCart.totalPrice || 0;

    this.add = function(item, id) {
        var storedItem = this.items[id];
        if (!storedItem){
            storedItem = this.items[id] = {item: item, qty: 0, price: 0};
        }
        storedItem.qty++;
        storedItem.price = storedItem.item.price * storedItem.qty;
        this.totalQty++;
        this.totalPrice += storedItem.item.price;
        this.totalPrice = round(this.totalPrice, 2);
    }

    this.decreaseQty = function(id) {
        this.items[id].qty--;
        this.items[id].price -= this.items[id].item.price;
        this.items[id].price = round(this.items[id].price, 2);
        this.totalQty--;
        this.totalPrice -= this.items[id].item.price
        this.totalPrice = round(this.totalPrice, 2);

        if(this.items[id].qty <= 0) {
            delete this.items[id];
        }
    }
    this.increaseQty = function(id) {
        this.items[id].qty++;
        this.items[id].price += this.items[id].item.price;
        this.items[id].price = round(this.items[id].price, 2);
        this.totalQty++;
        this.totalPrice += this.items[id].item.price
        this.totalPrice = round(this.totalPrice, 2);
    }

    this.generateArray = function () {
        var arr = [];
        for (var id in this.items) {
            arr.push(this.items[id])
        }
        return arr;
    }
};

// Helper function for rounding in order to round numbers to decimal places with precision
function round(value, decimals) {
    return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
}