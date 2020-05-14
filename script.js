let deck;


async function createDeck() {
	const response = await fetch(
		"https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1",
	);
	const json = await response.json();
	return json;
}
async function drawOut(deck, amount) {
	const response = await fetch(
		"https://deckofcardsapi.com/api/deck/" +
		deck.deck_id +
		"/draw/?count=" +
		amount,
	);
	const json = await response.json();
	return json;
}

let cardContainer = document.getElementById("card-container");

async function makeNewDeck() {
	deck = await createDeck();
	if (!deck.success) console.error("Error getting the deck from the API");
	//clear any card
	cardContainer.innerHTML = "";
}

async function drawCards(amount) {
	//first clear all the other cards
	cardContainer.innerHTML = "";

	const drawnCards = await drawOut(deck, amount);

	if (drawnCards.cards.length <= 0) cardContainer.innerHTML = "No more cards";
	for (let i = 0; i < drawnCards.cards.length; i++) {
		if (drawnCards.cards.length <= 0) break;
		let element = document.createElement("img");
		element.src = drawnCards.cards[i].image;
		element.className = "card";
		cardContainer.appendChild(element);
	}
}

makeNewDeck();
