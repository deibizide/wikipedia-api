const button = document.querySelector('.search-btn');
const input = document.querySelector('.search-input');
const results = document.querySelector('.results');
const resultContainer = document.querySelector('.results-container');

let userInput;

function getData() {
    const endPoint =
        `https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=11&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch=${userInput}` +
        '&origin=*';
    resultContainer.innerHTML = '';
    axios
        .get(endPoint)
        .then(resp => {
            // handle success
            const pages = resp.data.query.pages;

            Object.values(pages).map(results => {
                const desc = results.extract.slice(0, 250) + '...';
                resultContainer.innerHTML += `
                    <div class="item-result">
                    <a href="https://en.wikipedia.org/?curid=${results.pageid}" target="_blank" class="card animated bounceInUp">
                        <h2 class="result-title">${results.title}</h2>
                        <p class="result-desc">${desc}</p>
                    </a>
                </div>
                `;
            });
        })
        .catch(error => {
            // handle error
            resultContainer.innerHTML += `
                 <div class="item-result">
                  <h2 class="result-title">🚨🚨There is an error: ${error}🚨🚨</h2>
                </div>
                `;
        });
}

function handleKeyEvent(e) {
    if (e.key === 'Enter') {
        getData();
    }
}

input.addEventListener('keydown', handleKeyEvent);
button.addEventListener('click', getData);
input.addEventListener('input', () => {
    userInput = input.value;
});
