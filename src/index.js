document.addEventListener("DOMContentLoaded", () => {
    const pupsUrl = "http://localhost:3000/pups"
    const dogBar = document.querySelector("#dog-bar");
    const dogInfo = document.querySelector("#dog-info");
    const img = document.createElement("img");
    const h2 = document.createElement("h2");
    const button = document.createElement("button");
    dogInfo.appendChild(img);
    dogInfo.appendChild(h2);

    fetch(pupsUrl)
        .then(resp => resp.json())
        .then(data => {
            data.forEach((pup) => addNameToBar(pup))
        })

    function addNameToBar(pup) {
        const span = document.createElement("span");
        span.textContent = pup.name;
        dogBar.appendChild(span);
        span.addEventListener("click", () => pupClicked(pup))
    }

    function pupClicked(pup) {
        img.src = pup.image;
        h2.textContent = pup.name;
        if (dogInfo.contains(button) === false) {
            dogInfo.appendChild(button);
        }
        if (pup.isGoodDog) {
            button.textContent = "Good Dog!";
        } else {
            button.textContent = "Bad Dog!";
        }
        button.addEventListener("click", () => buttonClicked(pup.isGoodDog, pup));
    }

    // button.addEventListener("click", () => buttonClicked(button.parentNode));

    function buttonClicked(isGoodDog, pup) {
        let good = true;
        if (isGoodDog) {
            good = false;
        }
        fetch(`http://localhost:3000/pups/${pup.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Accept : "application/json"
            },
            body: JSON.stringify({
                "isGoodDog": good,
            }),
        })
            .then(resp => resp.json())
            .then(data => {
                if(good){
                    button.textContent = "Good Dog!"
                } else {
                    button.textContent = "Bad Dog!"
                }
            })
    }
})