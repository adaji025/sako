// Basic plan slider
var basicSlider = document.getElementById("basic-slider");
var basicSliderAmount = document.getElementById("basic-slider-amount");
var basicDeliveryCount = document.querySelector(".basic-delivery-count");

// standard plan slider
var standardSlider = document.getElementById("standard-slider");
var standardSliderAmount = document.getElementById("standard-slider-amount");
var standardDeliveryCount = document.querySelector(".standard-delivery-count");

// platinum plan slider
var platinumSlider = document.getElementById("platinum-slider");
var platinumSliderAmount = document.getElementById("platinum-slider-amount");
var platinumDeliveryCount = document.querySelector(".platinum-delivery-count");

// tooltip
var toolTipBasic = document.getElementsByClassName("noUi-tooltip")[0];
var toolTipStandard = document.getElementsByClassName("noUi-tooltip")[1];
var toolTipPlatinum = document.getElementsByClassName("noUi-tooltip")[2];

//
function basicPlanTooltip() {
	var toolTip = document.getElementsByClassName("noUi-tooltip")[0];
	var node = document.createElement("SPAN"); // Create a <li> node
	var textnode = document.createTextNode(" Deliveries"); // Create a text node
	node.appendChild(textnode); // Append the text to <li>
	toolTip.appendChild(node); // Append <li> to <ul> with id="myList"
}

// //
function standardPlanTooltip() {
	var toolTip = document.getElementsByClassName("noUi-tooltip")[2];
	var node = document.createElement("SPAN"); // Create a <li> node
	var textnode = document.createTextNode(" Deliveries"); // Create a text node
	node.appendChild(textnode); // Append the text to <li>
	toolTip.appendChild(node); // Append <li> to <ul> with id="myList"
}

//
function platinumPlanTooltip() {
	var toolTip = document.getElementsByClassName("noUi-tooltip")[1];
	var node = document.createElement("SPAN"); // Create a <li> node
	var textnode = document.createTextNode(" Deliveries"); // Create a text node
	node.appendChild(textnode); // Append the text to <li>
	toolTip.appendChild(node); // Append <li> to <ul> with id="myList"
}

// Basic slider
noUiSlider.create(basicSlider, {
	start: [3],
	connect: true,
	range: {
		min: 3,
		max: 10,
	},
	tooltips: [wNumb({ decimals: 0 })],
	pips: {
		mode: "values",
		values: [3, 10],
		density: 0,
	},
	connect: "lower",
});

basicSlider.noUiSlider.on("update", function (values, handle) {
	basicSliderAmount.innerHTML =
		Math.round(values[handle]) * 400 - Math.round(values[handle]) * 400 * 0.1;
	basicDeliveryCount.innerHTML = Math.round(values[handle]);
});
basicSlider.noUiSlider.on("update", basicPlanTooltip);

// plantinum slider
noUiSlider.create(platinumSlider, {
	start: [11],
	connect: true,
	range: {
		min: 26,
		max: 100,
	},
	tooltips: [wNumb({ decimals: 0 })],
	pips: {
		mode: "values",
		values: [26, 100],
		density: 0,
	},
	connect: "lower",
});

platinumSlider.noUiSlider.on("update", function (values, handle) {
	platinumSliderAmount.innerHTML =
		Math.round(values[handle]) * 400 - Math.round(values[handle]) * 400 * 0.15;
	platinumDeliveryCount.innerHTML = Math.round(values[handle]);
});
platinumSlider.noUiSlider.on("update", platinumPlanTooltip);

// standard slider
noUiSlider.create(standardSlider, {
	start: [11],
	connect: true,
	range: {
		min: 11,
		max: 25,
	},
	tooltips: [wNumb({ decimals: 0 })],
	pips: {
		mode: "values",
		values: [11, 25],
		density: 0,
	},
	connect: "lower",
});

standardSlider.noUiSlider.on("update", function (values, handle) {
	standardSliderAmount.innerHTML =
		Math.round(values[handle]) * 400 - Math.round(values[handle]) * 400 * 0.12;
	standardDeliveryCount.innerHTML = Math.round(values[handle]);
});

standardSlider.noUiSlider.on("update", standardPlanTooltip);
