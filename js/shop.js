document.addEventListener("DOMContentLoaded", () => {
    /**
     * Change thumbnails
     */

    // Elements
    const elements = {
        mainImage: document.getElementById("main-image"),
        thumbnails: document.querySelectorAll(".thumbnail"),
    };
    
    elements.thumbnails.forEach((thumbnail) => {
        thumbnail.addEventListener("click", () => {
            elements.mainImage.src = thumbnail.src;
            elements.mainImage.srcset = thumbnail.srcset;
        });
    });

    /**
     * Add to cart - create list item
     */

    // Elements
    const finalPrice = document.getElementById("total-price");

    // Variables
    let arrayOfItems = [];
    let totalPrice = 0;

    const updateList = (items) => {
        document.querySelectorAll(".list-item").forEach((item) => {
            item.remove();
        });

        items.forEach((item) => {
            const listItemWrapper = document.createElement("div");
            listItemWrapper.classList.add("list-item");

            const listItemName = document.createElement("span");
            listItemName.classList.add("list-item-name");
            listItemName.innerHTML = `${item.name} | ${item.amount}x`;

            const listItemPrice = document.createElement("span");
            listItemPrice.classList.add("list-item-price");
            listItemPrice.innerHTML = `${item.price}`;

            listItemWrapper.appendChild(listItemName);
            listItemWrapper.appendChild(listItemPrice);

            const mainWrapper = document.querySelector(".line-items");
            mainWrapper.appendChild(listItemWrapper);
        });

        finalPrice.innerHTML = `£${totalPrice}`;
    };

    /**
     * General - amount selector
     */

    const minusAmount = (minus, amount) => {
        if (Number(amount.innerHTML) !== 0) {
            const updatedAmount = Number(amount.innerHTML) - 1;
            amount.innerHTML = updatedAmount;

            if (updatedAmount === 0) {
                minus.classList.add("inactive");
            };

            return updatedAmount;
        } else {
            return 0;
        };
    };

    const plusAmount = (minus, amount) => {
        const updatedAmount = Number(amount.innerHTML) + 1;
        amount.innerHTML = updatedAmount;

        if (updatedAmount !== 0) {
            minus.classList.remove("inactive");
        };

        return updatedAmount;
    };

    /**
     * Main product - amount selector
     */

    // Elements
    const minusMain = document.getElementById("minus-main");
    const plusMain = document.getElementById("plus-main");
    const amountMain = document.getElementById("amount-main");
    const priceMain = 89;

    if (minusMain || plusMain || amountMain) {
        minusMain.addEventListener("click", () => {
            const amount = minusAmount(minusMain, amountMain);
            const price = "£" + Number(priceMain * amount).toFixed(2);
            totalPrice = Number(totalPrice) - Number(priceMain * amount).toFixed(2);
    
            for (let i = 0; i < arrayOfItems.length; i++) {
                if (amount === 0) {
                    if (arrayOfItems[i].name === "Discovery Package") {
                        arrayOfItems.splice(i, 1);
                    };
                } else {
                    if (arrayOfItems[i].name === "Discovery Package") {
                        arrayOfItems[i].amount = amount;
                        arrayOfItems[i].price = price;
                    };
                };
            };
    
            updateList(arrayOfItems);
        });
    
        plusMain.addEventListener("click", () => {
            const amount = plusAmount(minusMain, amountMain);
            const price = "£" + Number(priceMain * amount).toFixed(2);
            totalPrice = Number(totalPrice) + Number(priceMain * amount).toFixed(2);

            if (amount === 1) {
                arrayOfItems.push({
                    name: "Discovery Package",
                    amount: amount,
                    price: price
                });
            } else {
                for (let i = 0; i < arrayOfItems.length; i++) {
                    if (arrayOfItems[i].name === "Discovery Package") {
                        arrayOfItems[i].amount = amount;
                        arrayOfItems[i].price = price;
                    };
                };
            };
    
            updateList(arrayOfItems);
        });
    };

    /**
     * Refill - amount selector
     */

    // Elements
    const refillBoxes = document.querySelectorAll(".refill-box");

    refillBoxes.forEach((refill) => {
        const nameRefill = refill.querySelector(".name-refill");
        const minusRefill = refill.querySelector(".minus-refill");
        const plusRefill = refill.querySelector(".plus-refill");
        const amountRefill = refill.querySelector(".amount-refill");
        const priceRefill = 5;

        minusRefill.addEventListener("click", () => {
            const amount = minusAmount(minusRefill, amountRefill);
            const price = "£" + Number(priceRefill * amount).toFixed(2);
            totalPrice = Number(totalPrice) - Number(priceRefill * amount).toFixed(2);

            for (let i = 0; i < arrayOfItems.length; i++) {
                if (amount === 0) {
                    if (arrayOfItems[i].name === nameRefill.innerHTML) {
                        arrayOfItems.splice(i, 1);
                    };
                } else {
                    if (arrayOfItems[i].name === nameRefill.innerHTML) {
                        arrayOfItems[i].amount = amount;
                        arrayOfItems[i].price = price;
                    };
                };
            };

            updateList(arrayOfItems);
        });

        plusRefill.addEventListener("click", () => {
            const amount = plusAmount(minusRefill, amountRefill);
            const price = "£" + Number(priceRefill * amount).toFixed(2);
            totalPrice = Number(totalPrice) + Number(priceRefill * amount).toFixed(2);

            if (amount === 1) {
                arrayOfItems.push({
                    name: nameRefill.innerHTML,
                    amount: amount,
                    price: price
                });
            } else {
                for (let i = 0; i < arrayOfItems.length; i++) {
                    if (arrayOfItems[i].name === nameRefill.innerHTML) {
                        arrayOfItems[i].amount = amount;
                        arrayOfItems[i].price = price;
                    };
                };
            };

            updateList(arrayOfItems);
        });
    });
});
