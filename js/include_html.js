
async function includeHTML(callback) {
    let includeElements = document.querySelectorAll('[w3-include-html]');
    let promises = [];

    for (let i = 0; i < includeElements.length; i++) {
        const element = includeElements[i];
        let file = element.getAttribute("w3-include-html"); // "includes/header.html"
        let promise = fetch(file)
            .then(resp => {
                if (resp.ok) {
                    return resp.text();
                } else {
                    throw new Error('Page not found');
                }
            })
            .then(text => {
                element.innerHTML = text;
            });

        promises.push(promise);
    }

    // Wait for all fetches to complete
    await Promise.all(promises);
    // All fetches are done, call the callback
    callback();
}
