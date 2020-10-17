
var precision;
var stockPriceDelta;
var stockPrice;
var buyingPower;
var shares;
var growth; 
var netWorth;
var averageSharePrice;
var shareValueTotal;
var simulatorIsOpperating;
var simulatorPace;
var initialSharePrice;
var totalTransactions;

// add split stock function here


function startSimulation() {
	precision = 100; // 2 decimals
	stockPriceDelta = 0;
	stockPrice = Math.floor(Math.random() * 100);
	initialSharePrice = stockPrice;
	buyingPower = 100.00;
	shares = 0;
	growth = 1.2; // This economy grows at about 2%
	netWorth = 100.00;
	averageSharePrice = 0;
	shareValueTotal = 0;
	simulatorIsOpperating = true;
	simulatorPace = setInterval(simulateNext, 800);
	totalTransactions = 0;
}

startSimulation();


function splitShares() {
	let split = Math.floor(Math.random() * 5) + 2;
	stockPrice = stockPrice / split;
	shares = shares * split;
	showError(`Stocks Have split at ${split}:1 ratio` , `${split}:1`, "Split Alert")
}



function generateStockPrice() {
	stockPriceDelta = Math.floor(Math.random() * (2 * precision - 1 * precision) + 1 * precision) / (1*precision);
	if (stockPriceDelta > stockPrice) {
		stockPrice += stockPriceDelta; 
	}
	else {
		var plusOrMinus = Math.random() < 0.5 ? -1 : 1;

		if (plusOrMinus == 1) {
			stockPrice += stockPriceDelta * plusOrMinus * growth; 
		} 
		else {
			stockPrice += stockPriceDelta * plusOrMinus; 
		}
	}
}

function adjustNetWorth() {
	netWorth = buyingPower + (stockPrice * shares);
}

function calculateAverageSharePrice() {
	if (shares > 0) {
		averageSharePrice = shareValueTotal / shares;
	}
	else {
		shareValueTotal = 0;
		averageSharePrice = 0;
	}
}

function buy() {
	// body...
	if (buyingPower > stockPrice) {
		totalTransactions++;
		buyingPower -= stockPrice;
		shares++;
		shareValueTotal += stockPrice;
	}
	else {
		showError("Not enough Money", "Short: $" + toTwoDecimal(stockPrice - buyingPower), "Transaction Error")
		console.log("NO MONEY");
	}
}

function sell() {
	// body...
	if (shares > 0) {
		totalTransactions++;
		buyingPower += stockPrice;
		shares--;
		shareValueTotal -= stockPrice;
	}
	else {
		showError("You have no more shares to sell", "Buy more to sell", "Transaction Error")
		console.log("NO SHARES");
	}
	
}

function toTwoDecimal(num) {

	return parseFloat(num).toFixed(2);

}

function showError(message, smallMessage, header) {

	document.getElementById('delta').textContent = smallMessage;
	document.getElementById('message').textContent = message;
	document.getElementById('toastHeader').textContent = header;
	



	$('.toast').toast('show');

}

function updateDocuments() {

	document.getElementById('stockPrice').textContent = "CURPR: $" + toTwoDecimal(stockPrice);
	document.getElementById('buyingPower').textContent = "Buy Power: $" + toTwoDecimal(buyingPower);
	document.getElementById('shares').textContent = "Your shares: " + shares;
	document.getElementById('averageShare').textContent = "Average Buy price: $" + toTwoDecimal(averageSharePrice);
	document.getElementById('netWorth').textContent = "Portfolio Value: $" + toTwoDecimal(netWorth);

}

function giveFeedback() {
	window.location.href = "mailto:economysimulator@gmail.com?subject=feedback&body=message%20goes%20here";
}

function endSimulation() {
	simulatorIsOpperating = false;
	clearInterval(simulatorPace);
	document.getElementById('totalValue').textContent = toTwoDecimal(netWorth);
	document.getElementById('totalTransactions').textContent = totalTransactions;
	document.getElementById("endScreen").style.display = "block";
}


document.onkeydown = function(e) {
    e = e || window.event;
    var key = e.which || e.keyCode;
    if(key == 66) {
        buy();
    }
    else if (key == 83) {
    	sell()
    }
    else if (key == 81 && simulatorIsOpperating) {
    	endSimulation();
    }
    else if (key == 70 && !simulatorIsOpperating) {
        giveFeedback();
    }
    else if (key == 82 && !simulatorIsOpperating) {
        startSimulation();
        document.getElementById("endScreen").style.display = "none";
    }
}

function simulateNext() {

	let ranNum = Math.floor(Math.random() * 10);
	console.log(ranNum)
	console.log(stockPrice - initialSharePrice)

	if (stockPrice - initialSharePrice > 200 &&  ranNum == 2) {
		splitShares();
	}

	generateStockPrice();
	adjustNetWorth();
	calculateAverageSharePrice();
	updateDocuments();

}














