document.title = "💥Gang";
const game = document.querySelector(".active.tab").id;
const button = document.querySelector(`#${game}-guess-btn`);
const input = document.querySelector(`#${game}-guess`);

const content = document.getElementById("content");
const pedantix = "pedantix";
const pedantle = "pedantle";
const defaultOrder = "default";
const asc = "ascending";
const desc = "descending";
const bddPedantix = "wordsForPedantix";
const bddPedantle = "wordsForPedantle";
const myAppConfig = "myAppConfig";
let config =
	Object.keys(getConfig()).length >= 0
		? getConfig()
		: {
				orderWords: "default",
		  };
let guessBtnAttributeHasChanged = null;

// FUNCTIONS BDD
function setListWords(value) {
	localStorage.setItem(getAppBdd(), JSON.stringify(value));
}

function getListWords() {
	return JSON.parse(localStorage.getItem(getAppBdd())) ?? {};
}

function setConfig(value) {
	localStorage.setItem(myAppConfig, JSON.stringify(value));
}

function getConfig() {
	return JSON.parse(localStorage.getItem(myAppConfig)) ?? {};
}

// FUNCTIONS
function getAppBdd() {
	if (game === pedantix) return bddPedantix;
	else if (game === pedantle) return bddPedantle;
	return false;
}

// HANDLE FRONT
// Build arch html
const myAppContent = `<div id="my-app">
	<button type="button" class="collapsible btn">Show</button>
	<div class="content">
		<h1 class="text-center m-5">My app gang</h1>

		<header class="container-fluid text-center">
			<div class="row">
				<div class="col mb-5"><input class="px-3 py-1 rounded-3 border border-dark" id="my-app-input" type="text" /></div>
			</div>
		</header>

		<main class="container-fluid text-center">
			<p class="text-dark">Words's number : <span id="number-words"></span></p>

			<section id="my-app-container-actions">
				<div>
					<label class="label">Ordre</label><br />
					<select name="order" id="my-app-selectbox-order">
						<option value="default" ${config.orderWords === defaultOrder ? "selected" : ""}>Default</option>
						<option value="ascending" ${config.orderWords === asc ? "selected" : ""}>Croissant</option>
						<option value="descending" ${config.orderWords === desc ? "selected" : ""}>Décroissant</option>
					</select>
				</div>
				<button type="button" id="my-app-btn-remove-all-words" class="btn btn-danger btn-sm">Delete all words</button>
			</section>
			<div class="tab-content" id="pills-tabContent">
				<div class="tab-pane fade show active" id="my-app-container" role="tabpanel">
					<ul id="my-app-list-words" class="ul-words"></ul>
				</div>
			</div>
		</main>
	</div>
</div>
`;
const myAppJS = `<script
				src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/js/bootstrap.bundle.min.js"
				integrity="sha384-A3rJD856KowSb7dwlZdYEkO39Gagi7vIsF0jrRAoQmDKKtQBHUuLZ9AsSv4jD4Xa"
				crossorigin="anonymous"
			></script>`;

let myAppBtnLaunchScript = `<button id="my-app-btn-launch-script">Launch Script Gang</button>`;

const style = `<style>

.label {
	margin: 1rem;
	padding: 0.5rem;
    display: inline-block;
}

#my-app .collapsible {
  background-color: #eee;
  color: #444;
  cursor: pointer;
  padding: 18px;
  width: 100%;
  border: none;
  text-align: left;
  outline: none;
  font-size: 15px;
  margin-top : 15px;
}

#my-app .collapsible:hover {
  background-color: #ccc;
}

#my-app .content {
  padding: 0 18px;
  display: none;
  overflow: hidden;
}

#my-app {
	text-align: center;
}

#my-app button {
	cursor:pointer;
}

#my-app .btn {
    display: inline-block;
    font-weight: 400;
    text-align: center;
    white-space: nowrap;
    vertical-align: middle;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    border: 1px solid transparent;
    padding: 0.375rem 0.75rem;
    font-size: 1rem;
    line-height: 1.5;
    border-radius: 0.25rem;
    transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;
}

#my-app .text-center {
	text-align: center
}

#my-app .btn-sm {
    padding: 0.25rem 0.5rem;
    font-size: .875rem;
    line-height: 1.5;
    border-radius: 0.2rem;
}

#my-app .btn-danger {
    color: #fff;
    background-color: #dc3545;
    border-color: #dc3545
}
#my-app .btn:focus, #my-app .btn:hover {
    text-decoration: none;
}
#my-app .btn-danger:hover {
    color: #fff;
    background-color: #c82333;
    border-color: #bd2130;
}



#my-app h1 {
	margin-top: 1em;
}

#my-app header {
	margin-top: 1em;
}

#my-app-list-words {
	list-style: none;
	display: flex;
	flex-flow: row wrap;
	justify-content: space-around;
	align-items: center;
	align-content: center;
	padding: 20px;
}

#my-app-list-words li {
	padding: 2%;
    min-width: 1rem;
	-webkit-transition-duration: 0.3s;
	transition-duration: 0.3s;
	-webkit-transition-property: color, background-color;
	transition-property: color, background-color;
	border-radius: 10px;
}

#my-app-list-words li:hover {
	background-color: rgb(255, 71, 71);
	color: white;
	border-radius: 10px;
	cursor: pointer;
}

#my-app-container-actions {
	display:flex;
	justify-content:flex-start;

}

#my-app-btn-remove-all-words {
	margin-left: auto;
	align-self: center;
}

#my-app-selectbox-order {
	padding: 0.2rem;
}

</style>
	`;

document.head.insertAdjacentHTML("beforeend", style);
content.insertAdjacentHTML("beforeend", myAppContent);
document.getElementsByClassName("aside")[0].insertAdjacentHTML("beforeend", myAppBtnLaunchScript);

// get main elements
const myAppContainer = document.getElementById("my-app");
const myAppInput = document.getElementById("my-app-input");
const myAppBtnRemoveAllWords = document.getElementById("my-app-btn-remove-all-words");
myAppBtnLaunchScript = document.getElementById("my-app-btn-launch-script");
const myAppListWords = document.getElementById("my-app-list-words");
const myAppNumOfWords = document.getElementById("number-words");

myAppInput.style.width = "20%";

function init() {
	renderListWords();
	renderNumberOfWords();
}

function renderNumberOfWords() {
	myAppNumOfWords.textContent = Object.keys(getListWords())?.length;
}

function renderListWords() {
	let words = Object.entries(getListWords());
	let ordered = null;
	let config = getConfig();

	if (config.orderWords === asc) {
		ordered = words.sort((a, b) => {
			if (a[1] < b[1]) return 1;
			if (a[1] > b[1]) return -1;
			return 0;
		});
	} else if (config.orderWords === desc) {
		ordered = words.sort((a, b) => {
			if (a[1] < b[1]) return -1;
			if (a[1] > b[1]) return 1;
			return 0;
		});
	}

	words = ordered ?? words;

	myAppListWords.textContent = "";
	if (words && words.length > 0) {
		for (const w of words) {
			renderAWordInList(w[1], w[0]);
		}
	}
}

function renderAWordInList(word, index = null) {
	let li = document.createElement("li");
	const words = getListWords();
	li.textContent = word;
	li.dataset.game = game;
	li.dataset.id = index ?? Object.keys(words).length - 1;
	li.classList.add("text-center");
	addListenerRemoveWord(li);
	myAppListWords.prepend(li);
	renderNumberOfWords();
}

function renderRemoveAWordInList(element) {
	myAppListWords.removeChild(element);
	renderNumberOfWords();
}

// collapse section
let coll = document.querySelector(".collapsible");

coll.addEventListener("click", function () {
	this.classList.toggle("active");
	var content = this.nextElementSibling;
	if (content.style.display === "block") {
		content.style.display = "none";
		this.textContent = "Show";
	} else {
		content.style.display = "block";
		this.textContent = "Hide";
	}
});

// config : order by...
document.getElementById("my-app-selectbox-order").addEventListener("change", function (e) {
	let config = getConfig();
	switch (e.target.value) {
		case "default":
			config.orderWords = defaultOrder;
			break;
		case "ascending":
			config.orderWords = asc;
			break;
		case "descending":
			config.orderWords = desc;
			break;
		default:
			console.log("don't know this order");
	}

	setConfig(config);
	renderListWords();
});

// MANAGES WORDS LIST

{
	// add words to bdd
	myAppInput.addEventListener("keypress", function (e) {
		if (e.key === "Enter") {
			let newWord = this.value.trim().toLowerCase();
			let index = "";

			if (!newWord) return;

			// get words from bdd
			let words = getListWords();
			// insert if not already exist
			if (Object.values(words).indexOf(newWord) === -1) {
				index = Date.now();
				words[index] = newWord;
			} else {
				alert("déjà dans la bdd");
				return;
			}

			// update bdd
			setListWords(words);
			renderListWords();
			this.value = "";
		}
	});

	// listener remove word
	function addListenerRemoveWord(element) {
		element.addEventListener("click", function (e) {
			// init
			const target = e.target;
			const wordId = target.dataset.id;

			// insert html element
			const words = getListWords();
			delete words[wordId];
			setListWords(words);
			renderRemoveAWordInList(target);
		});
	}

	// listener remove all words
	myAppBtnRemoveAllWords.addEventListener("click", function (e) {
		setListWords({});
		myAppListWords.innerHTML = "";
		renderNumberOfWords();
	});
}

// LAUNCH APP SCRIPT

{
	myAppBtnLaunchScript.addEventListener("click", function () {
		const words = getListWords();

		if (Object.keys(words).length <= 0) return false;
		const observerConfig = { attributes: true };
		let index = 0;

		const observer = new MutationObserver((mutations) => {
			guessBtnAttributeHasChanged = mutations.every((mutation) => {
				if (mutation.type == "attributes") {
					if (mutation.attributeName === "disabled") guessBtnAttributeHasChanged = mutation.target.disabled;
					if (guessBtnAttributeHasChanged === false) {
						index++;

						if (index < Object.keys(words).length) {
							input.value = words[Object.keys(words)[index]];
							button.click();
						} else {
							//disconnect();
						}
					}
				}
			});
		});

		observer.observe(button, observerConfig);

		if (Object.keys(words).length) {
			input.value = words[Object.keys(words)[index]];
			button.click();
		}

		function disconnect() {
			observer.disconnect();
		}
	});
}

init();
