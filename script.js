let tg = window.Telegram.WebApp; 
tg.expand(); 

tg.MainButton.textColor = "#FFFFFF"
tg.MainButton.color = "#2cab37"

var button = document.getElementById('button_1');
let isClicked = false;

button.addEventListener('click', function ()
{

    if (!isClicked) {
        button.textContent = 'Добавлено';
        button.style.backgroundColor = '#14d82e';
    }
    else
    {
        button.textContent = '+ Добавить';
        button.style.backgroundColor = '#eea60a';
    }    
    isClicked = !isClicked;
    tg.sendData('Товар добавлен'); 
}
)
