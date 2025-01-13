const prices = {
    Small: {
        Margherita: 28,
        Marinara: 28,
        Funghi: 30,
        Valentina: 34,
        Salame: 34,
        Vegetariana: 36,
        Vezuvio: 34,
        Amore: 36,
        Siciliana: 36,
        Diavola: 36,
        Rustica: 36, 
        Fantazja: 35,
        Piotra: 37, 
        ExtraPicante: 37,
        Spinaci: 37,
        Carciofi: 37,
        Salsiccia: 37,
        Parmeńska: 40
    },
    Large: {
        Margherita: 35,
        Marinara: 35,
        Funghi: 37,
        Valentina: 44,
        Salame: 44,
        Vegetariana: 46,
        Vezuvio: 44,
        Amore: 46,
        Siciliana: 46,
        Diavola: 46,
        Rustica: 46, 
        Fantazja: 45,
        Piotra: 47, 
        ExtraPicante: 47,
        Spinaci: 47,
        Carciofi: 47,
        Salsiccia: 47,
        Parmeńska: 50
    }
};
const extrasPrices = {
Small: 3.00,
Large: 3.50
};

let totalOrderPrice = 0;

const pizzaSize = document.getElementById("pizzaSize");
const styleSection = document.getElementById("styleSection");
const smallPizzaTypes = document.getElementById("pizzaTypeSmall");
const pizzaTypeLarge = document.getElementById("pizzaTypeLarge");
const largePizzaTypeLabel = document.getElementById("largePizzaTypeLabel");
const halfOptions = document.getElementById("halfOptions");
const extrasSection = document.getElementsByClassName("extras")[0];
const previewType = document.getElementById("previewType");
const previewSize = document.getElementById("previewSize");
const previewStyle = document.getElementById("previewStyle");
const previewExtras = document.getElementById("previewExtras");
const orderMessage = document.getElementById("orderMessage");
const smallPizzaTypeLabel = document.getElementById("smallPizzaTypeLabel");
const totalPriceElement = document.createElement("li");
totalPriceElement.innerHTML = `Cena: <span id="totalPrice">0</span> zł`;
document.getElementById("ingredientsPreview").appendChild(totalPriceElement);
const orderSummary = document.getElementById("orderSummary");
const totalOrderPriceElement = document.getElementById("totalOrderPrice");

styleSection.style.display = "none";
smallPizzaTypes.style.display = "none";
pizzaTypeLarge.style.display = "none";
largePizzaTypeLabel.style.display = "none";
halfOptions.style.display = "none";
smallPizzaTypeLabel.style.display = "none";
extrasSection.style.display = "none";
document.querySelector('.option').style.display = 'none';

pizzaSize.addEventListener("change", () => {
    if (pizzaSize.value === "Mała") {
        smallPizzaTypes.style.display = "block";
        smallPizzaTypeLabel.style.display = "block";
        pizzaTypeLarge.style.display = "none";
        largePizzaTypeLabel.style.display = "none";
        halfOptions.style.display = "none";
        styleSection.style.display = "none";
        extrasSection.style.display = "none";
    } else if (pizzaSize.value === "Duża") {
        styleSection.style.display = "block";
        smallPizzaTypes.style.display = "none";
        smallPizzaTypeLabel.style.display = "none";
        pizzaTypeLarge.style.display = "none";
        largePizzaTypeLabel.style.display = "none";
        halfOptions.style.display = "none";
        extrasSection.style.display = "none";
    }
});

smallPizzaTypes.addEventListener("change", () => {
    extrasSection.style.display = "block";
    document.querySelector('.option').style.display = 'block';
});

pizzaTypeLarge.addEventListener("change", () => {
    extrasSection.style.display = "block";
    document.querySelector('.option').style.display = 'block';
});

halfOptions.addEventListener("change", () => {
    extrasSection.style.display = "block";
    document.querySelector('.option').style.display = 'block';
});

document.querySelectorAll('input[name="pizzaStyle"]').forEach((radio) => {
    radio.addEventListener("change", () => {
        if (radio.value === "Pół na pół") {
            halfOptions.style.display = "block";
            pizzaTypeLarge.style.display = "none";
            largePizzaTypeLabel.style.display = "none";
            extrasSection.style.display = "none";
        } else {
            halfOptions.style.display = "none";
            pizzaTypeLarge.style.display = "block";
            largePizzaTypeLabel.style.display = "block";
            extrasSection.style.display = "none";
        }
        document.querySelector('.option').style.display = 'block';
    });
});

function updatePreview() {
    let selectedType = '';
    let style = '';
    let firstHalf = '';
    let secondHalf = '';
    let extrasList = [];
    let totalPrice = 0;

    const size = pizzaSize.value;
    const styleValue = document.querySelector('input[name="pizzaStyle"]:checked');
    const pizzaOption = document.querySelector('input[name="pizzaOption"]:checked');

    if (size === "Mała") {
        selectedType = smallPizzaTypes.value;
        previewSize.textContent = "Mała";
        previewType.textContent = selectedType || "Nie wybrano";
        previewStyle.textContent = "Cała";
        totalPrice = prices.Small[selectedType] || 0;
    }

    else if (size === "Duża") {
        style = styleValue ? styleValue.value : "Cała";
        previewSize.textContent = "Duża";

        if (style === "Cała") {
            selectedType = pizzaTypeLarge.value;
            previewStyle.textContent = "Cała";
            previewType.textContent = selectedType;
            totalPrice = prices.Large[selectedType] || 0;
        } else if (style === "Pół na pół") {
            firstHalf = document.getElementById("firstHalf").value;
            secondHalf = document.getElementById("secondHalf").value;
            previewStyle.textContent = "Pół na pół";
            previewType.textContent = `${firstHalf} / ${secondHalf}`;
            totalPrice = (prices.Large[firstHalf] / 2) + (prices.Large[secondHalf] / 2) || 0;
        }
    }

    const extrasChecked = document.querySelectorAll('.extras input:checked');
    extrasChecked.forEach(extra => {
        extrasList.push(extra.value);
        totalPrice += size === "Mała" ? extrasPrices.Small : extrasPrices.Large;
    });

    if (pizzaOption) {
        if (pizzaOption.value === "Na wynos") {
            totalPrice += size === "Mała" ? 2.50 : 3.00;
        }
    }

    previewExtras.textContent = extrasList.length > 0 ? extrasList.join(", ") : "Brak dodatkowych składników";

    previewOption.textContent = pizzaOption ? pizzaOption.value : "Nie wybrano";

    document.getElementById("totalPrice").textContent = totalPrice.toFixed(2);
}

function showConfirmationMessage() {
    orderMessage.textContent = "Twoje zamówienie zostało dodane!";
    orderMessage.style.display = "block";
    orderMessage.style.backgroundColor = "#d4edda";
    orderMessage.style.color = "#155724";
    orderMessage.style.fontWeight = "bold";
}

function addPizzaToOrder() {
    const size = pizzaSize.value;
    const styleValue = document.querySelector('input[name="pizzaStyle"]:checked');
    const pizzaOption = document.querySelector('input[name="pizzaOption"]:checked');
    let selectedType = '';
    let style = '';
    let firstHalf = '';
    let secondHalf = '';
    let extrasList = [];
    let totalPrice = 0;

    orderMessage.textContent = "";
    orderMessage.style.display = "none";

    if (size === "Mała" && (!pizzaOption || !smallPizzaTypes.value)) {
        alert("Proszę wybrać wszystkie opcje przed dodaniem zamówienia!");
        return;
    }

    if (size === "Duża" && (!pizzaOption || !styleValue || (styleValue.value === "Cała" && !pizzaTypeLarge.value) || (styleValue.value === "Pół na pół" && (!document.getElementById("firstHalf").value || !document.getElementById("secondHalf").value)))) {
        alert("Proszę wybrać wszystkie opcje przed dodaniem zamówienia!");
        return;
    }

    if (size === "Mała") {
        selectedType = smallPizzaTypes.value;
        totalPrice += prices.Small[selectedType] || 0;
    }

    else if (size === "Duża") {
        style = styleValue ? styleValue.value : "Cała";

        if (style === "Cała") {
            selectedType = pizzaTypeLarge.value;
            totalPrice += prices.Large[selectedType] || 0;
        } else if (style === "Pół na pół") {
            firstHalf = document.getElementById("firstHalf").value;
            secondHalf = document.getElementById("secondHalf").value;
            totalPrice += (prices.Large[firstHalf] / 2) + (prices.Large[secondHalf] / 2) || 0;
        }
    }

    const extrasChecked = document.querySelectorAll('.extras input:checked');
    extrasChecked.forEach(extra => {
        extrasList.push(extra.value);
        totalPrice += size === "Mała" ? extrasPrices.Small : extrasPrices.Large;
    });

    if (pizzaOption) {
        if (pizzaOption.value === "Na wynos") {
            totalPrice += size === "Mała" ? 2.50 : 3.00;
        }
    }

    if (selectedType || (firstHalf && secondHalf)) {
        const orderItem = document.createElement("li");
        orderItem.textContent = `Pizza: ${selectedType || `${firstHalf} / ${secondHalf}`} | Rozmiar: ${size} | Typ: ${style || "Cała"} | Dodatki: ${extrasList.join(", ") || "Brak"} | Opcja: ${pizzaOption ? pizzaOption.value : "Nie wybrano"} | Cena: ${totalPrice.toFixed(2)} zł`;
        orderSummary.appendChild(orderItem);

        totalOrderPrice += totalPrice;
        totalOrderPriceElement.textContent = totalOrderPrice.toFixed(2);
        showConfirmationMessage();
    }

    pizzaForm.reset();
    smallPizzaTypes.style.display = "none";
    smallPizzaTypeLabel.style.display = "none";
    pizzaTypeLarge.style.display = "none";
    largePizzaTypeLabel.style.display = "none";
    halfOptions.style.display = "none";
    styleSection.style.display = "none";
    extrasSection.style.display = "none";
    document.querySelector('.option').style.display = 'none';
}

addToOrderButton.addEventListener("click", () => {
    const size = pizzaSize.value;
    const styleValue = document.querySelector('input[name="pizzaStyle"]:checked');
    const pizzaOption = document.querySelector('input[name="pizzaOption"]:checked');
    const smallPizzaType = smallPizzaTypes.value;
    const largePizzaType = pizzaTypeLarge.value;
    const firstHalf = document.getElementById("firstHalf").value;
    const secondHalf = document.getElementById("secondHalf").value;

    if (size === "Mała" && (!pizzaOption || !smallPizzaType)) {
        alert("Proszę wybrać wszystkie opcje przed dodaniem zamówienia!");
    } else if (size === "Duża" && (!pizzaOption || !styleValue || (styleValue.value === "Cała" && !largePizzaType) || (styleValue.value === "Pół na pół" && (!firstHalf || !secondHalf)))) {
        alert("Proszę wybrać wszystkie opcje przed dodaniem zamówienia!");
    } else {
        addPizzaToOrder();
        updatePreview();
        showConfirmationMessage();
    }
});