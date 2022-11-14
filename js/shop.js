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

    const updateList = (items, price) => {
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

        finalPrice.innerHTML = `£${price.toFixed(2)}`;
    };

    /**
     * General - amount selector
     */

    const minusAmount = (minus, amount) => {
        if (Number(amount.value) !== 0) {
            const updatedAmount = Number(amount.value) - 1;
            amount.value = updatedAmount;

            if (updatedAmount === 0) {
                minus.classList.add("inactive");
            };

            return updatedAmount;
        } else {
            return 0;
        };
    };

    const plusAmount = (minus, amount) => {
        const updatedAmount = Number(amount.value) + 1;
        amount.value = updatedAmount;

        if (updatedAmount !== 0) {
            minus.classList.remove("inactive");
        };

        return updatedAmount;
    };

    /**
     * Main product - amount selector
     */

    // Elements
    const minusMain = document.getElementById("minus-main") ?? null;
    const plusMain = document.getElementById("plus-main") ?? null;
    const amountMain = document.getElementById("amount-main") ?? null;
    const priceMain = 99;

    if (amountMain) {
        amountMain.setAttribute("value", 1);
    };

    arrayOfItems.push({
        name: "Discovery Package",
        amount: 1,
        price: priceMain,
    });

    if (minusMain || plusMain || amountMain) {
        minusMain.addEventListener("click", () => {
            const amount = minusAmount(minusMain, amountMain);
            const price = "£" + Number(priceMain * amount).toFixed(2);
            totalPrice = Number(Number(totalPrice) - Number(priceMain * amount)).toFixed(2);

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

            let finalTotalPrice = 0;

            for (let i = 0; i < arrayOfItems.length; i++) {
                finalTotalPrice = Number(arrayOfItems[i].price.split("£")[1]) + finalTotalPrice;
            };

            updateList(arrayOfItems, finalTotalPrice);
        });

        plusMain.addEventListener("click", () => {
            const amount = plusAmount(minusMain, amountMain);
            const price = "£" + Number(priceMain * amount).toFixed(2);
            totalPrice = Number(Number(totalPrice) + Number(priceMain * amount)).toFixed(2);

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

            let finalTotalPrice = 0;

            for (let i = 0; i < arrayOfItems.length; i++) {
                finalTotalPrice = Number(arrayOfItems[i].price.split("£")[1]) + finalTotalPrice;
            };

            updateList(arrayOfItems, finalTotalPrice);
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
        const priceRefill = 9.99;

        minusRefill.addEventListener("click", () => {
            const amount = minusAmount(minusRefill, amountRefill);
            const price = "£" + Number(priceRefill * amount).toFixed(2);
            totalPrice = Number(Number(totalPrice) - Number(priceRefill * amount)).toFixed(2);

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

            let finalTotalPrice = 0;

            for (let i = 0; i < arrayOfItems.length; i++) {
                finalTotalPrice = Number(arrayOfItems[i].price.split("£")[1]) + finalTotalPrice;
            };

            updateList(arrayOfItems, finalTotalPrice);
        });

        plusRefill.addEventListener("click", () => {
            const amount = plusAmount(minusRefill, amountRefill);
            const price = "£" + Number(priceRefill * amount).toFixed(2);

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

            let finalTotalPrice = 0;

            for (let i = 0; i < arrayOfItems.length; i++) {
                finalTotalPrice = Number(arrayOfItems[i].price.split("£")[1]) + finalTotalPrice;
            };

            updateList(arrayOfItems, finalTotalPrice);
        });
    });


    /**
     * Cartridge - amount selector
     */

    // Elements
    const cartridgeBoxes = document.querySelectorAll(".cartridge-box");

    cartridgeBoxes.forEach((cartridge) => {
        const nameCartridge = cartridge.querySelector(".name-cartridge");
        const minusCartridge = cartridge.querySelector(".minus-cartridge");
        const plusCartridge = cartridge.querySelector(".plus-cartridge");
        const amountCartridge = cartridge.querySelector(".amount-cartridge");
        const priceCartridge = 24.99;

        minusCartridge.addEventListener("click", () => {
            const amount = minusAmount(minusCartridge, amountCartridge);
            const price = "£" + Number(priceCartridge * amount).toFixed(2);
            totalPrice = Number(Number(totalPrice) - Number(priceCartridge * amount)).toFixed(2);

            for (let i = 0; i < arrayOfItems.length; i++) {
                if (amount === 0) {
                    if (arrayOfItems[i].name === nameCartridge.innerHTML) {
                        arrayOfItems.splice(i, 1);
                    };
                } else {
                    if (arrayOfItems[i].name === nameCartridge.innerHTML) {
                        arrayOfItems[i].amount = amount;
                        arrayOfItems[i].price = price;
                    };
                };
            };

            let finalTotalPrice = 0;

            for (let i = 0; i < arrayOfItems.length; i++) {
                finalTotalPrice = Number(arrayOfItems[i].price.split("£")[1]) + finalTotalPrice;
            };

            updateList(arrayOfItems, finalTotalPrice);
        });

        plusCartridge.addEventListener("click", () => {
            const amount = plusAmount(minusCartridge, amountCartridge);
            const price = "£" + Number(priceCartridge * amount).toFixed(2);

            if (amount === 1) {
                arrayOfItems.push({
                    name: nameCartridge.innerHTML,
                    amount: amount,
                    price: price
                });
            } else {
                for (let i = 0; i < arrayOfItems.length; i++) {
                    if (arrayOfItems[i].name === nameCartridge.innerHTML) {
                        arrayOfItems[i].amount = amount;
                        arrayOfItems[i].price = price;
                    };
                };
            };

            let finalTotalPrice = 0;

            for (let i = 0; i < arrayOfItems.length; i++) {
                finalTotalPrice = Number(arrayOfItems[i].price.split("£")[1]) + finalTotalPrice;
            };

            updateList(arrayOfItems, finalTotalPrice);
        });
    });
});