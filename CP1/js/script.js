const cards = [
  { name: 'burger', img: 'https://jollibee.com.vn/media/catalog/product/cache/11f3e6435b23ab624dc55c2d3fe9479d/b/u/burger_-_7.png' },
  { name: 'fries', img: 'https://s7d1.scene7.com/is/image/mcdonalds/mcdonalds-fries-medium-april-promo:nutrition-calculator-tile?wid=822&hei=822&dpr=off' },
  { name: 'hotdog', img: 'https://upload.wikimedia.org/wikipedia/commons/b/b1/Hot_dog_with_mustard.png' },
  { name: 'icecream', img: 'https://upload.wikimedia.org/wikipedia/commons/d/da/Strawberry_ice_cream_cone_%285076899310%29.jpg' },
  { name: 'pizza', img: 'https://assets.surlatable.com/m/15a89c2d9c6c1345/72_dpi_webp-REC-283110_Pizza.jpg' },
  { name: 'water', img: 'https://dictionary.cambridge.org/vi/images/full/waterb_noun_002_40636.jpg?version=6.0.56' }
];

// Nhân đôi để tạo cặp và xáo trộn
let gameArray = [...cards, ...cards];
gameArray.sort(() => 0.5 - Math.random());

const grid = document.querySelector("#grid");
const result = document.querySelector("#result");

let chosenCards = [];
let chosenIds = [];
let matched = [];
let score = 0;
let lockBoard = false; //Khóa click khi đang kiểm tra

const backImg = "https://media.istockphoto.com/id/1162198273/vi/vec-to/bi%E1%BB%83u-t%C6%B0%E1%BB%A3ng-d%E1%BA%A5u-ch%E1%BA%A5m-h%E1%BB%8Fi-thi%E1%BA%BFt-k%E1%BA%BF-minh-h%E1%BB%8Da-vector-ph%E1%BA%B3ng.jpg?s=612x612&w=0&k=20&c=kLu3UwW8UqmExa6IR9ygcQxG5h5JJUIjaqQfIMODkK4=";

// Tạo board
function createBoard() {
  gameArray.forEach((card, i) => {
    const img = document.createElement("img");
    img.setAttribute("src", backImg);
    img.setAttribute("data-id", i);
    img.addEventListener("click", flipCard);
    grid.appendChild(img);
  });
}

// Kiểm tra match
function checkMatch() {
  const cardsImg = document.querySelectorAll("#grid img");
  const [id1, id2] = chosenIds;

  if (chosenCards[0] === chosenCards[1]) {
    score++;
    result.textContent = "Score: " + score + " Match!";
    cardsImg[id1].style.visibility = "hidden";
    cardsImg[id2].style.visibility = "hidden";
    matched.push(chosenCards);
  } else {
    result.textContent = "Score: " + score + " Không khớp, thử lại!";
    cardsImg[id1].setAttribute("src", backImg);
    cardsImg[id2].setAttribute("src", backImg);
  }

  chosenCards = [];
  chosenIds = [];

  if (matched.length === cards.length) {
    result.textContent = "Score: " + score + " Chúc mừng! Hoàn thành!";
  }
}

// Lật thẻ
function flipCard() {
  const id = this.getAttribute("data-id");

  if (lockBoard) return;           //Chặn click khi đang kiểm tra
  if (chosenIds.includes(id)) return; // tránh click 2 lần cùng thẻ

  chosenCards.push(gameArray[id].name);
  chosenIds.push(id);
  this.setAttribute("src", gameArray[id].img);

  if (chosenCards.length === 2) {
    lockBoard = true; //Khóa click
    setTimeout(() => {
      checkMatch();
      lockBoard = false; //Mở lại sau khi kiểm tra
    }, 800);
  }
}

createBoard();
