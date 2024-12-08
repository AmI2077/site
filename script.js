let tg = window.Telegram.WebApp; 
tg.expand(); 

tg.MainButton.textColor = "#FFFFFF";
tg.MainButton.color = "#2cab37";
tg.MainButton.setText("Оформить");

var button = document.getElementById('button_1'); 
let isClicked = false;

button.addEventListener('click', function () {

    if (!isClicked) {
        button.textContent = 'Добавлено';
        button.style.backgroundColor = '#14d82e';
        tg.MainButton.show();
    }
    else {
        button.textContent = '+ Добавить';
        button.style.backgroundColor = '#eea60a';
        tg.MainButton.hide();
    }
    isClicked = !isClicked;
}); 
