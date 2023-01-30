const fs = require('fs');
let carts = require('./carts.json');

export const cartsRepo = {
    getAll: () => carts,
    getById: id => carts.find(x => x.id.toString() === id.toString()),
    find: x => carts.find(x),
    create,
    update,
    delete: _delete
};

function create(cart) {
    cart.id = carts.length ? Math.max(...carts.map(x => x.id)) + 1 : 1;
    cart.dateCreated = new Date().toISOString();
    cart.dateUpdated = new Date().toISOString();
    carts.push(cart);
    saveData();
}

function update(id, params) {
    const cart = carts.find(x => x.id.toString() === id.toString());
    cart.dateUpdated = new Date().toISOString();
    Object.assign(cart, params);
    saveData();
}

function _delete(id) {
    carts = carts.filter(x => x.id.toString() !== id.toString());
    saveData();
    
}

function saveData() {
    fs.writeFileSync('./carts.json', JSON.stringify(carts));
}