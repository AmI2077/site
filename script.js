let tg = window.Telegram.WebApp; 
tg.expand(); 

tg.MainButton.textColor = "#000000";
tg.MainButton.color = "#FAC000";

var buttons = document.querySelectorAll('.button'); 
var prices = document.querySelectorAll('.price').textContent;

let totalprice = [];

buttons.forEach(button => {
    let isClicked = false;
    button.addEventListener('click', function () {
        const item = button.closest('.item');
        const price = item.querySelector('.price').textContent;
        let int_price = parseInt(price);

        if (!isClicked) {
            totalprice.push(int_price);
            button.textContent = 'Добавлено';
            button.style.backgroundColor = '#14d82e';
            const totalSum = totalprice.reduce((a, b) => a + b, 0);
            alert(`Цена товара: ${totalSum}`);
            tg.MainButton.setText("Общая стоимость: ", {totalSum});
            tg.MainButton.show();
        }
        else {
            const index = totalprice.indexOf(int_price);
            if (index > -1) {
                totalprice.splice(index, 1); // Удаляем цену из массива
            }
            const totalSum = totalprice.reduce((a, b) => a + b, 0);
            tg.MainButton.setText("Общая стоимость: ", {totalSum});
            button.textContent = '+ Добавить';
            button.style.backgroundColor = '#eea60a';
        }
        isClicked = !isClicked;
    });
});
    

tg.MainButton.addEventListener('click', function () {
    tg.sendData("Товар добавлен");
}); 
