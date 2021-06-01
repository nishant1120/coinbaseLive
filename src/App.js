import React, { useState, useEffect, useRef } from "react";
import Dashboard from "./components/DashBoard";
import Footer from "./components/Footer";
import DateRangeSelector from "./components/DateRangeSelector";


import "./App.css";


import { formatData } from "./utils";


export default function App() {
  const [currencies, setcurrencies] = useState([]);
  const [pair, setpair] = useState("BTC-USD");
  const [price, setprice] = useState("0.00");
  const [pastData, setpastData] = useState({});
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const ws = useRef(null);

  let first = useRef(false);
  const url = "https://api.pro.coinbase.com";
  



  useEffect(() => {
    ws.current = new WebSocket("wss://ws-feed.pro.coinbase.com");

    let pairs = [];

    const apiCall = async () => {
      await fetch(url + "/products")
        .then((res) => res.json())
        .then((data) => (pairs = data));

      // eslint-disable-next-line array-callback-return
      let filtered = pairs.filter((pair) => {
        if (pair.quote_currency === "USD") {
          return pair;
        }
      });

      filtered = filtered.sort((a, b) => {
        if (a.base_currency < b.base_currency) {
          return -1;
        }
        if (a.base_currency > b.base_currency) {
          return 1;
        }
        return 0;
      });

      setcurrencies(filtered);

      first.current = true;
      
    };

    apiCall();
  }, []);


  useEffect(() => {
    if (!first.current) {
      return;
    }


    let msg = {
      type: "subscribe",
      product_ids: [pair],
      channels: ["ticker"],
    };
    let jsonMsg = JSON.stringify(msg);
    ws.current.send(jsonMsg);




    let historicalDataURL = `${url}/products/${pair}/candles?&start=${startDate.format(
      "YYYY-MM-DDThh:mm:ss"
    )}&end=${endDate.format("YYYY-MM-DDThh:mm:ss")}&granularity=86400`;
    const fetchHistoricalData = async () => {
      let dataArr = [];
      await fetch(historicalDataURL)
        .then((res) => res.json())
        .then((data) => (dataArr = data));

      let formattedData = formatData(dataArr);
      setpastData(formattedData);
    };

    fetchHistoricalData();

    ws.current.onmessage = (e) => {
      let data = JSON.parse(e.data);
      if (data.type !== "ticker") {
        return;
      }

      if (data.product_id === pair) {
        setprice(data.price);
      }
    };
  }, [pair, startDate, endDate]);


  const handleSelect = (e) => {
    let unsubMsg = {
      type: "unsubscribe",
      product_ids: [pair],
      channels: ["ticker"],
    };
    let unsub = JSON.stringify(unsubMsg);

    ws.current.send(unsub); //unsubscribe from the prevois currency pair

    setpair(e.target.value); //set new currency
 
  };

  return (
    <>
    <div className="full">   

    <div class="rightSide">
      <img  className="logo" src="/logo.png" alt="" width="50%"/>
      <div className="quote">"Talk is Cheap, Show me the Code”<br/> – Linus Trovalds</div> 
    </div>
     <div className="container">

   {price==="0.00"?
   <div className="error">Select a currency pair or time duration</div>
 :""}
      <span class="pp"><span className="currText">Currency Pair</span>{
        <select className="currency" value={pair} onChange={handleSelect}>
          {currencies.map((cur, idx) => {
            return (
              <option className="currOptions" key={idx} value={cur.id}>
                {cur.display_name}
              </option>
            );
          })}
        </select>
      }</span>
      <DateRangeSelector
        startDate={startDate }
        setStartDate={setStartDate}
        endDate={endDate }
        setEndDate={setEndDate}
        hideTime
      />
      <Dashboard price={price} data={pastData} />

    </div>


    </div>
    <Footer price={price}/>

    </>
    
  );
}
