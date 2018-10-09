//select Elements  && defining variables
const results = document.querySelector(".container");
const btnSetPrice = document.querySelector("#btnSetPrice");

//define functions and classes
class Bitcoin {
  constructor(price) {
    /* Create properties using this and invoke methods that should be called automatically here */
    this.price = price;

    // This array to gather the data from api 
    this.data = [];
    // This property in global inside the class
    this.rate = 0;

    /**  In these two arrays are to create the final Results to Show in html  **/
    // In this new array is to save the rates 
    this.rates = [];
    // In this table gather the Codes or Prices 
    this.tabla = [];

    // I call the method initial when I create the instance of the class
    this.getPrices();
  }


  getPrices() {
    $.ajax({
      url: "https://bitpay.com/api/rates",
      dataType: "json",
      success: data => {
        console.log(data)
        // I save the data from Api to the Global vars of the class. With this I can access to the data in every piece inside and outside the class
        this.data = data;

        // I call a new method to fill the global var rates
        this.getRates();
      },
      error: error => {
        console.log("There was an error");
      }
    })
  }
  setPrices() {
    console.log("Running setPrices... I should first console.log nums to see if I'm using the resources properly")
    var nprice = prompt("Please enter a new code", "New Code");
    if (nprice != null) {
      this.price = nprice.toUpperCase();
      this.validate();
    }
  }
  refresh() {
    console.log("Refreshing the prices");
    results.innerHTML = "";
    this.validate();
  }

  validate() {
    this.data.forEach(fcode => {
      if (fcode.code === this.price) {
        this.getPrices();
      }
    });
  }


  /* Get The rates of the cod by default */

  getRates() {

    // Call the function gets with the rates of the default codes from the global property  data //
    var usd = this.getUSD();
    var eur = this.getEUR();
    var gbp = this.getGBP();
    var epj = this.getEPJ();
    var cad = this.getCAD();

    // Save these values (rates) in the array Rates to create my final table 
    this.rates.push(usd);
    this.rates.push(eur);
    this.rates.push(gbp);
    this.rates.push(epj);
    this.rates.push(cad);
    this.rates.push(this.getNewCoin(this.price)); // This is the new column created by GetNew Price 
    this.tabla.push("BTC/" + this.price); // this is the new get to create the Header in the table with the Code
    // I call this method to elaborate my final Table.
    this.displayTable();
  }


  /* This is de gets methods to elaborate the rates table */

  getNewCoin(btc) {
    btc = btc.toUpperCase();
    let nbtc = this.data.filter(nbt => nbt.code === btc);
    this.rate = nbtc[0].rate.toFixed(2);
    return nbtc[0].rate.toFixed(2);
  }

  getUSD() {
    var usd = this.data.filter(usd => usd.code === "USD");
    this.tabla.push("BTC/USD");
    return usd[0].rate.toFixed(2);
  }
  getEUR() {
    var eur = this.data.filter(eur => eur.code === "EUR");
    this.tabla.push("BTC/EUR");
    return eur[0].rate.toFixed(2);
  }
  getGBP() {
    var gbp = this.data.filter(gbp => gbp.code === "GBP");
    this.tabla.push("BTC/GBP");
    return gbp[0].rate.toFixed(2);
  }
  getEPJ() {
    var jpy = this.data.filter(jpy => jpy.code === "JPY");
    this.tabla.push("BTC/JPY");
    return jpy[0].rate.toFixed(2);
  }
  getCAD() {
    var cad = this.data.filter(cad => cad.code === "CAD");
    this.tabla.push("BTC/CAD");
    return cad[0].rate.toFixed(2);
  }


  // Once I have all the data in the two arrays I process to elaborate my final Results.
  displayTable() {

    // This is to avoid repeat the data in the array.
    let _tabla = new Set(this.tabla);
    // I recorver the data in the regular array to manipulate better.
    let tabla = [];
    for (let t of _tabla) {
      tabla.push(t);
    }

    // This is to avoid repeat the data in the array.
    let _rate = new Set(this.rates);
    // I recorver the data in the regular array to manipulate better.
    let rate = [];
    for (let j of _rate) {
      rate.push(j);
    }

    // I create a new vars to create the table html
    let data = `
      <table>
      <thead>
        <tr>
        <th>Price </th>
    `;

    // I scan the Tabla data with the code name and I update the var data 
    for (let i = 0; i < tabla.length; i++) {
      data += `
    
      <th>${tabla[i]}</th> 

      `;
    }

    // I close the header of the html table
    data += ` </tr>
    </thead>
    <tbody>
     <tr> <td>1</td>`;

    // I create a new var to create the body of the html table
    let _row = ``;
    // I scan the table of the rates to update the body html table
    for (let k = 0; k < rate.length; k++) {
      _row += `
      <td>${rate[k]}</td> 
      `;
    }
    _row += ` </tr>
    </tbody>
    </table>
    `;

    // I close the body and the html table

    // I concaten both vars 
    data += _row;

    // Finally I assing the Var of the elements Container with the results of the var 
    results.innerHTML = data;
  }
}


// I create events listener of the button Get New Price
btnSetPrice.addEventListener("click", () => {
  newBT.setPrices();
});

// Create the new instance of the Bitcoin class.
let newBT = new Bitcoin("ALL");

//adding event listeners, calling functions, and creating instances of classes