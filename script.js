let tg = window.Telegram.WebApp; 
tg.expand(); 

tg.MainButton.textColor = "#000000";
tg.MainButton.color = "#FAC000";

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
            button.style.backgroundColor = '#14d82e';
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
            button.style.backgroundColor = '#eea60a';
        }
        isClicked = !isClicked;
    });
});
    

Telegram.WebApp.onEvent('mainButtonClicked', function () {

    tg.sendData(`Заказ ${JSON.stringify(order)}`);
}); 
