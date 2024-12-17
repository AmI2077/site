let tg = window.Telegram.WebApp; 
tg.expand(); 

tg.MainButton.textColor = "#ffffff";
tg.MainButton.color = "#274f36";

var buttons = document.querySelectorAll('.button'); 
var prices = document.querySelectorAll('.price').textContent;
var items = document.querySelectorAll('.title').textContent;

let totalprice = [];
let order = new Map();
var totalSum = 0; 

buttons.forEach(button => {
    let isClicked = false;
    button.addEventListener('click', function () {
        const item = button.closest('.item');
        const title = item.querySelector('.title').textContent;
        const price = item.querySelector('.price').textContent;
        let int_price = parseInt(price);

        if (!isClicked) {
            totalprice.push(int_price);
            order.set(title, int_price)
            button.textContent = 'Добавлено';
            button.style.backgroundColor = '#274f36';
            button.style.color = '#ffffff'
            item.style.boxShadow = '0 0px 50px rgba(0, 0, 0, 0.7)';
            totalSum = totalprice.reduce((a, b) => a + b, 0);
            //alert(`Цена товара: ${totalSum}`);
            tg.MainButton.setText(`Общая стоимость: ${totalSum}`);
            tg.MainButton.show();
        }
        else {
            order.delete(title);
            const index = totalprice.indexOf(int_price);
            if (index > -1) {
                totalprice.splice(index, 1); 
            }
            totalSum = totalprice.reduce((a, b) => a + b, 0);
            tg.MainButton.setText(`Общая стоимость: ${totalSum}`);
            button.textContent = '+ Добавить';
            button.style.backgroundColor = '#ee7203';
            button.style.color = '#000000'
            item.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
        }
        if (totalSum == 0) {
            tg.MainButton.hide()
        }
        isClicked = !isClicked;
    });
});
    

// Telegram.WebApp.onEvent('mainButtonClicked', function () {
//     const orderDetails = Array.from(order.entries()).map(([title, price]) => `${title}: ${price}`).join('\n');
//     tg.sendData(`Ваш заказ:\n${orderDetails}`);
// });

Telegram.WebApp.onEvent('mainButtonClicked', function () {
    // Создаем объект для заказа
    let orderObject = {};
    order.forEach((price, title) => {
        orderObject[title] = price;
    });

    // Отправляем объект как JSON
    tg.sendData(JSON.stringify(orderObject));
});
