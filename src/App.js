import { useEffect, useState } from 'react';
import Axios from 'axios';
import Dropdown from 'react-dropdown';
import { HiSwitchHorizontal } from 'react-icons/hi';
import 'react-dropdown/style.css';
import './App.css';

function App() {

    const [info, setInfo] = useState([]);
    const [input, setInput] = useState(0);
    const [from, setFrom] = useState("uah");
    const [to, setTo] = useState("eur");
    const [toHeaderUsd] = useState("usd");
    const [toHeaderEur] = useState("eur");
    const [headerOutputUsd, setHeaderOutputUsd] = useState(0);
    const [headerOutputEur, setHeaderOutputEur] = useState(0);
    const [options, setOptions] = useState([]);
    const [output, setOutput] = useState(0);

    useEffect(() => {
        Axios.get(
            `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${from}.json`)
            .then((res) => {
                setInfo(res.data[from]);
            })
    }, [from]);

    useEffect(() => {
        setOptions(Object.keys(info));
        convert();
        convertHeader();
    }, [info])

    function convert() {
        var rate = info[to];
        setOutput(input * rate);
    }

    function convertHeader() {
        var rateUsd = info[toHeaderUsd]
        var rateEur = info[toHeaderEur];
        setHeaderOutputUsd(1 * rateUsd);
        setHeaderOutputEur(1 * rateEur);
    }

  return (
      <div className="App">
          <header>
              {1+" UAH = "+headerOutputEur.toFixed(5) + " EUR "  + " - "+headerOutputUsd.toFixed(5) + " USD "}
          </header>
          <div className="container">
              <div className="left">
                  <h3>Amount</h3>
                  <input type="text"
                         placeholder="Enter the amount"
                         onChange={(e) => setInput(e.target.value)} />
              </div>
              <div className="middle">
                  <h3>From</h3>
                  <Dropdown options={options}
                            onChange={(e) => { setFrom(e.value) }}
                            value={from.toUpperCase()} placeholder="From" />
              </div>
              <div className="right">
                  <h3>To</h3>
                  <Dropdown options={options}
                            onChange={(e) => {setTo(e.value)}}
                            value={to.toUpperCase()} placeholder="To" />
              </div>
          </div>
          <div className="result">
              <button onClick={()=>{convert()}}>Convert</button>
              <h2>Converted Amount:</h2>
              <p>{input+" "+from.toUpperCase()+" = "+output.toFixed(2) + " " + to.toUpperCase()}</p>

          </div>
      </div>
  );
}

export default App;
