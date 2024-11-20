let cart = [];

// Ингредиенты для каждого блюда
const ingredients = {
    'Борщ': 'Свекла, капуста, морковь, картофель, лук, чеснок, томатная паста.',
    'Суп куриный': 'Курица, картофель, морковь, лук, специи.'
};

// Функция для отображения ингредиентов в модальном окне
function showIngredients(dish) {
    document.getElementById('modal-title').textContent = dish;
    document.getElementById('modal-ingredients').textContent = ingredients[dish];
    document.getElementById('modal').style.display = 'flex';
}

// Закрытие модального окна
function closeModal() {
    document.getElementById('modal').style.display = 'none';
}

// Обновление отображения корзины
function updateCartDisplay() {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    cartItemsContainer.innerHTML = '';
    let total = 0;

    cart.forEach(item => {
        const itemElement = document.createElement('li');
        itemElement.textContent = `${item.name} - ${item.price} руб. × ${item.quantity}`;
        
        // Кнопки для уменьшения и увеличения количества товара
        const decreaseButton = document.createElement('button');
        decreaseButton.className = 'decrease-quantity';
        decreaseButton.textContent = '-';
        decreaseButton.onclick = function() {
            decreaseQuantity(item.name);
        };
        
        const increaseButton = document.createElement('button');
        increaseButton.className = 'increase-quantity';
        increaseButton.textContent = '+';
        increaseButton.onclick = function() {
            increaseQuantity(item.name);
        };
        
        // Добавляем обе кнопки перед названием товара
        itemElement.prepend(increaseButton);
        itemElement.prepend(decreaseButton);
        
        cartItemsContainer.appendChild(itemElement);
        total += item.price * item.quantity;
    });

    cartTotal.textContent = `Итого: ${total} руб.`;

    // Создание кнопки "Оплатить"
    const payButton = document.createElement('button');
    payButton.id = 'pay-button'; // Идентификатор для удобства
    payButton.textContent = 'Оплатить';
    payButton.style.marginTop = '10px'; // Небольшое отступание от списка товаров

    // Добавьте обработчик событий для кнопки "Оплатить"
    payButton.onclick = function() {
        window.open('payment_qr.html', '_blank'); // Замените на реальную логику оплаты
    };

    // Добавляем кнопку под списком товаров
    cartItemsContainer.appendChild(payButton);
}

// Убавление единицы товара
function decreaseQuantity(name) {
    const itemIndex = cart.findIndex(item => item.name === name);
    if (itemIndex !== -1) {
        cart[itemIndex].quantity -= 1;
        if (cart[itemIndex].quantity <= 0) {
            cart.splice(itemIndex, 1);
        }
        updateCartDisplay();
    }
}

// Увеличение единицы товара
function increaseQuantity(name) {
    const itemIndex = cart.findIndex(item => item.name === name);
    if (itemIndex !== -1) {
        cart[itemIndex].quantity++;
        updateCartDisplay();
    }
}

// Добавление товара в корзину
function addToCart(name, price) {
    const existingItem = cart.find(item => item.name === name);
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ name: name, price: parseInt(price), quantity: 1 });
    }
    updateCartDisplay();
}

// Очистка корзины
function clearCart() {
    cart = [];
    updateCartDisplay();
}

// Привязка кнопок добавления в корзину
document.querySelectorAll('.add-to-cart-btn').forEach(button => {
    button.addEventListener('click', () => {
        const name = button.getAttribute('data-name');
        const price = button.getAttribute('data-price');
        addToCart(name, price);
    });
});

//Кнопка скролла вниз
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}