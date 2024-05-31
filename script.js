var audio = new Audio('fart.mp3');
var bgMusic = new Audio('breaking.mp3');
bgMusic.loop = true;

bgMusic.volume = 0.3;

document.body.style.backgroundImage = 'url(railey.jpg)';
document.body.style.backgroundSize = '100% 100%';
document.body.style.backgroundRepeat = 'no-repeat';
document.body.style.backgroundPosition = 'center';

document.querySelector('#volume').oninput = function() {
  bgMusic.volume = this.value;
  audio.volume = this.value;
}

var fortunes = [
    "Gaganda ang araw mo ngayon.",
    "Gaganda ang araw mo bukas.",
    "May sorpresang nagaantay sayo.",
    "May makikilala kang bago.",
    "Makaka ace ka sa valo.",
    "Makakapasa ka sa exam.",
    "Makakapasa ka sa buhay.",
    "Makakapasa ka sa pagsubok.",
    "Makakapasa ka sa pagsubo.",
    "Tang ina mo nasa court ako, wag mo ako abalahin.",
    "Basketball is life",
    "Pogi ka",
    "Maganda ka",
    "Gwapo ka",
    "Papalpak ka sa buhay",
    "Papalpak ka sa exam",
    "Papalpak ka sa pagsubok",
    "Papalpak ka sa pagsubo",
    "Papalpak ka sa valo",
    "Papalpak ka sa basketball",
    "Papalpak ka sa court",
    "Papalpak ka sa pagibig",
    "Papalpak ka sa pagmamahal",
    "Papalpak ka sa pagkain",
    "Papalpak ka sa pagkanta",
    "Papalpak ka sa pagtawa",
    "Papalpak ka sa pagiyak",
    "Papalpak ka sa pagtulong",
    "Papalpak ka sa pagtakbo",
    "Papalpak ka sa paglakad",
    "Papalpak ka sa pagtayo",
    "Papalpak ka sa pagupo",
];

document.querySelector('#myButton').onclick = function() {
    var questionInput = document.querySelector('#questionInput');
    var question = questionInput.value;
    if (!question.endsWith('?')) {
        alert('Please enter a question!');
        return;
    }
    if (question.trim() === '') {
        alert('Please enter a question!');
        return;
    }
    var randomIndex = Math.floor(Math.random() * fortunes.length);
    var fortune = fortunes[randomIndex];
    var fortuneElement = document.querySelector('#fortune');
    fortuneElement.textContent = fortune;
    fortuneElement.style.animation = 'none';
    setTimeout(function() {
        fortuneElement.style.animation = '';
    }, 10);
    questionInput.value = '';
    audio.play();
}

window.onload = function() {
  bgMusic.play();
}