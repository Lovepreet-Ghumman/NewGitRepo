const copyBtn = document.querySelector("#btn button:nth-child(2)"); // Second button (Copy)
const quoteText = document.getElementById("quoteText");
const quoteAuthor = document.getElementById("quoteAuthor");
const nextQuoteBtn = document.querySelector("#btn button:nth-child(1)");
const my_api = "https://dummyjson.com/quotes/random";

copyBtn.addEventListener("click", () => {
    const textToCopy = `${quoteText.textContent} — ${quoteAuthor.textContent}`;
    navigator.clipboard.writeText(textToCopy)
        .then(() => {
            alert("Quote copied to clipboard!");
        })
        .catch(err => {
            console.error("Failed to copy:", err);
            alert("Failed to copy quote.");
        });
});

async function getQt(url) {
    try {
        let data;
        let attempts = 0;

        do {
            const response = await fetch(url);
            data = await response.json();
            attempts++;
        } while (data.quote.split(" ").length > 25 && attempts < 10);

        quoteText.innerText = `"${data.quote}"`;
        quoteAuthor.innerText = ` ${data.author}`;
    } catch (err) {
        console.error("Failed to fetch quote:", err);
        quoteText.innerText = "Oops! Couldn't load a quote.";
        quoteAuthor.innerText = "";
    }
}
getQt(my_api);


nextQuoteBtn.addEventListener("click", () => {
    getQt(my_api);
});
