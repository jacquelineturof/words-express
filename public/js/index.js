const xhrButton = document.querySelector("#xhr");
const fetchButton = document.querySelector("#fetch");
const jqueryButton = document.querySelector("#jquery");
const axiosButton = document.querySelector("#axios");
const select = document.querySelector("select");
const input = document.querySelector("input");
const results = document.querySelector(".results");
const errors = document.querySelector("#errors");

// WORDS API endpoint
const baseUrl = "https://wordsapiv1.p.mashape.com/words/";
const headers = new Headers({
    "X-Mashape-Key": "e97584c616msh855255976d633e5p1e5784jsnd72ecfb56fea"
});
const header = "X-Mashape-Key";
const key =  "e97584c616msh855255976d633e5p1e5784jsnd72ecfb56fea";

xhrButton.addEventListener("click", () => {
    results.innerHTML = ""; // reset results
    // Get form data
    const word = getTextInput();
    const dataRequested = select.value;

    if (word) {
        // Create the Url
        const fullUrl = baseUrl + word + "/" + dataRequested;

        // Get data from api
        const XHR = new XMLHttpRequest();
        XHR.onreadystatechange = function() {
        if (XHR.readyState == 4 && XHR.status == 200) {
            const response = JSON.parse(XHR.responseText);
            getSelectInput(response, word, dataRequested);
        } 

        if (XHR.readyState == 4 && XHR.status === 404) {
            const icon = document.createElement("i");
            errors.appendChild(icon);
            icon.classList.add("fas");
            icon.classList.add("fa-exclamation-circle");

            const p = document.createElement("p");
            p.innerHTML = "I don't think that's a word, try again!";
            errors.appendChild(p);
            errors.classList.add("errors");
        }
    };
        // Send request with proper headers
        XHR.open("GET", fullUrl);
        XHR.setRequestHeader(header, key);
        XHR.send();
    }
});

fetchButton.addEventListener("click", async () => {
    results.innerHTML = ""; // reset results
    // Get form data
    const word = getTextInput();
    const dataRequested = select.value;
    
    if (word) {
        try {
            // Create the Url
            const fullUrl = baseUrl + word + "/" + dataRequested;
            const res = await fetch(fullUrl, { headers });
            const data = await res.json();
            getSelectInput(data, word, dataRequested);
        } catch (e) {
            console.log(e.message);
        }
    }
});

jqueryButton.addEventListener("click", async () => {
    results.innerHTML = ""; // reset results
    // Get form data
    const word = getTextInput();
    const dataRequested = select.value;

    if (word) {
        // Create the Url
        const fullUrl = baseUrl + word + "/" + dataRequested;
        
        try {
            const data = await $.ajax({
                type: "GET",
                headers: {  "X-Mashape-Key": "e97584c616msh855255976d633e5p1e5784jsnd72ecfb56fea" },
                url: fullUrl
            });
            getSelectInput(data, word, dataRequested);
          } catch (e) {
            console.log(e);
          }
    }
});

axiosButton.addEventListener("click", async() => {
    results.innerHTML = ""; // reset results
    // Get form data
    const word = getTextInput();
    const dataRequested = select.value;

    if (word) {
        // Create the Url
        const fullUrl = baseUrl + word + "/" + dataRequested;
        try {
            const response = await axios(fullUrl, { headers: {  "X-Mashape-Key": "e97584c616msh855255976d633e5p1e5784jsnd72ecfb56fea" } });
            getSelectInput(response.data, word, dataRequested);
        } catch(e) {
            console.log(e);
        }
    }
});

const getTextInput = () => {
    if (!input.value) {
        alert("Please enter a word!");
        return null;
    } else {
        return input.value;
    }
};

const getSelectInput = (data, word, selectValue) => {
    switch(selectValue) {
        case "definitions":
            getDefinitions(data.definitions, word);
            break;
        case "synonyms":
            getSynonyms(data.synonyms, word);
            break;
            case "antonyms":
            getAntonyms(data.antonyms, word);
            break;
        case "rhymes":
            getRhymes(data.rhymes, word);
            break;
    }
};

const getDefinitions = (wordData, word) => {
    // Set up results header
    createHeader("Definition(s)", word);

    // Get and display all definitions in data
    for (let i = 0; i < wordData.length; i++) {
        const p = document.createElement("p");
        p.innerText = wordData[i].definition;
        results.appendChild(p);
    }
};

const getSynonyms = (wordData, word) => {
        // Set up results header
        createHeader("Synonym(s)", word);
    
        // Get and display all synonym in data
        if (wordData.length === 0) {
            const p = document.createElement("p");
            p.innerText = `Could not find any synonyms for ${word}`;
            results.appendChild(p);
        } else {
            // Get and display all synonyms in data
            for (let i = 0; i < wordData.length; i++) {
                const p = document.createElement("p");
                p.innerText = wordData[i];
                results.appendChild(p);
            }
        }
};

const getAntonyms = (wordData, word) => {
    // Set up results header
    createHeader("Antonym(s)", word);

        // Get and display all antonyms in data
        if (wordData.length === 0) {
            const p = document.createElement("p");
            p.innerText = `Could not find any antonyms for ${word}`;
            results.appendChild(p);
        } else {
            for (let i = 0; i < wordData.length; i++) {
                const p = document.createElement("p");
                p.innerText = wordData[i];
                results.appendChild(p);
            }
        }
};

const getRhymes = (data, word) => {
    // Set up results header
    createHeader("Rhyme(s)", word);

    for (let i = 0; i < data.all.length; i++) {
        const p = document.createElement("p");
        p.innerText = data.all[i];
        results.appendChild(p);
     }
};

const createHeader = (requestType, word) => {
    // Set up results header
    const h4 = document.createElement("h4");
    h4.innerText = `${requestType} with ${word}`;
    results.appendChild(h4);
    const divider = document.createElement("hr")
    results.appendChild(divider);
};
