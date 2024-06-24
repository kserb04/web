let cart = JSON.parse(localStorage.getItem('cart'));
let cartQ = JSON.parse(localStorage.getItem('cartQ'));
let counters = JSON.parse(localStorage.getItem('counters'));

if (!cart) {
    cart = [];
    cartQ = 0;
}

if (!counters) {
    counters = [];
}

function save() {
    localStorage.setItem('cart', JSON.stringify(cart));
    localStorage.setItem('cartQ', JSON.stringify(cartQ));
    localStorage.setItem('counters', JSON.stringify(counters));
}

function updateNumber() {
    cartQ = 0;
    let cart = JSON.parse(localStorage.getItem('cart'));
    cart.forEach ((item) => {
        cartQ += item.quantity;
    })
    const s = document.getElementById("number");
    if (cartQ > 0) {
        s.textContent = cartQ;
    }
    save();

}

// cart = [];
// cartQ = 0;
// counters = [];
save();
