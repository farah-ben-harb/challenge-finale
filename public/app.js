const symbolFilter =
  document.querySelector("#symbolFilter");

const refreshButton =
  document.querySelector("#refreshButton");

const marketTableBody =
  document.querySelector("#marketTableBody");

const status =
  document.querySelector("#status");

let marketData = [];

function formatPrice(price) {
  return price === null ? "-" : price;
}

function renderMarket(data) {
  marketTableBody.innerHTML = "";

  for (const row of data) {
    const tableRow =
      document.createElement("tr");

    tableRow.innerHTML = `
      <td>${row.symbol}</td>
      <td>${formatPrice(row.bestBid)}</td>
      <td>${formatPrice(row.bestAsk)}</td>
      <td>${row.totalQuantity}</td>
      <td>${row.quoteCount}</td>
    `;

    marketTableBody.appendChild(tableRow);
  }
}

function applySymbolFilter() {
  const normalizedSymbol =
    symbolFilter.value
      .trim()
      .toUpperCase();

  if (!normalizedSymbol) {
    renderMarket(marketData);
    return;
  }

  const filteredData =
    marketData.filter(
      row =>
        row.symbol.toUpperCase() === normalizedSymbol
    );

  renderMarket(filteredData);
}

async function loadMarket() {
  status.textContent = "Loading...";

  try {
    const response =
      await fetch("/api/market");

    if (!response.ok) {
      throw new Error(
        `HTTP ${response.status}`
      );
    }

    marketData =
      await response.json();

    status.textContent = "";

    applySymbolFilter();

  } catch (error) {
    console.error(error);

    status.textContent =
      "Unable to load market data";

    marketTableBody.innerHTML = "";
  }
}

refreshButton.addEventListener(
  "click",
  loadMarket
);

symbolFilter.addEventListener(
  "input",
  applySymbolFilter
);

loadMarket();