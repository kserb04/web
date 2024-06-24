const s = document.getElementById("number");
updateNumber();

function ispisi() {
    const cartBody = document.getElementById('cart-body');
    cartBody.innerHTML = '';

    cart.forEach(product => {
        const row = document.createElement('tr');
        const nameCell = document.createElement('td');
        nameCell.textContent = product.productName;
        const quantityCell = document.createElement('td');
        quantityCell.innerHTML = `
            <span>${product.quantity}</span>
            <button class="plus" data-productid="${product.productId}">+</button>
            <button class="minus" data-productid="${product.productId}">-</button>
        `;
        row.appendChild(nameCell);
        row.appendChild(quantityCell);
        cartBody.appendChild(row);
    });
    const plusB = document.querySelectorAll('.plus');
    const minusB = document.querySelectorAll('.minus');

    plusB.forEach(button => {
    button.addEventListener('click', (event) => {
        const productId = event.target.getAttribute('data-productid');
        const index = counters.findIndex(item => item.productId === parseInt(productId));
        counters[index].quantity++;
        const product = cart.find(item => item.productId === parseInt(productId));
        product.quantity++;
        save();
        ispisi();
        updateNumber();
        });
    });

    minusB.forEach(button => {
        button.addEventListener('click', (event) => {
            const productId = event.target.getAttribute('data-productid');
            const product = cart.find(item => item.productId === parseInt(productId));
            product.quantity--;
            const index = counters.findIndex(item => item.productId === parseInt(productId));
            counters[index].quantity--;
            if (product.quantity == 0) {
                const index2 = cart.findIndex(item => item.productId === parseInt(productId));
                cart.splice(index2, 1);
                console.log(index2);
                console.log(cart);
            }
            save();
            ispisi();
            updateNumber();
        });
    });
};

ispisi();
updateNumber();
