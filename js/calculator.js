document.addEventListener("DOMContentLoaded", () => {
    // Elements
    const elements = {
        amount_people: document.getElementById("people"),
        amount_minutes: document.getElementById("minutes"),
        saved_water: document.getElementById("water"),
        saved_money: document.getElementById("money"),
    };

    // Set defaults
    elements.amount_minutes.setAttribute("min", 1);
    elements.amount_people.setAttribute("min", 1);
    elements.amount_minutes.value = 8;
    elements.amount_people.value = 2;

    calculateSavings();

    // Convert to thousands seperator
    const formatNumber = (x, fixed) => {
        return x.toFixed(fixed).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    // Calculate savings
    const calculateSavings = () => {
        const flowRate = 9;
        const showerL = elements.amount_minutes.value * flowRate;

        const waterCost = 4;
        const waterCostL = waterCost / 1000;
        const waterCostShower = waterCostL * showerL;

        const heat = 0.04;
        const heatCostKwh = 0.4;
        const heatCostL = heatCostKwh * heat;
        const heatCostShower = showerL * heatCostL;

        const totalCostShower = heatCostShower +  waterCostShower;

        const savingShowerMoney = totalCostShower * 0.3;
        const savingShowerMoneyYear = savingShowerMoney * 365;

        const savingShowerLiter = showerL * 0.3;
        const savingShowerLiterYear = savingShowerLiter * 365;

        elements.saved_water.innerHTML = formatNumber(savingShowerLiterYear * (elements.amount_people.value), 0) + "L";
        elements.saved_money.innerHTML = "£" + formatNumber((savingShowerMoneyYear * (elements.amount_people.value)), 0);
    };

    // Change on every input change
    elements.amount_people.addEventListener("input", () => calculateSavings());
    elements.amount_minutes.addEventListener("input", () => calculateSavings());
});