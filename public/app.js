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
  return price === null
    ? "-"
    : price;
}


function renderMarket(data) {

  marketTableBody.innerHTML = "";

  if (data.length === 0) {
    marketTableBody.innerHTML = `
      <tr>
        <td colspan="5">
          No market data
        </td>
      </tr>
    `;

    return;
  }

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

  const requestedSymbol =
    symbolFilter.value
      .trim()
      .toUpperCase();

  if (!requestedSymbol) {
    renderMarket(marketData);
    return;
  }

  const filteredData =
    marketData.filter(
      row =>
        row.symbol.toUpperCase() === requestedSymbol
    );

  renderMarket(filteredData);
}


async function loadMarket() {

  status.textContent = "Loading...";

  refreshButton.disabled = true;

  try {

    const response =
      await fetch("/api/market");

    if (!response.ok) {
      throw new Error(
        `HTTP error ${response.status}`
      );
    }

    const data =
      await response.json();

    marketData = data;

    status.textContent = "";

    applySymbolFilter();

  } catch (error) {

    console.error(
      "Unable to load market data:",
      error
    );

    status.textContent =
      "Unable to load market data";

    marketTableBody.innerHTML = "";

  } finally {

    refreshButton.disabled = false;

  }
}


symbolFilter.addEventListener(
  "input",
  applySymbolFilter
);


refreshButton.addEventListener(
  "click",
  loadMarket
);


loadMarket();