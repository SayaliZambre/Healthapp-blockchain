import './App.css';
import {useEffect} from "react";
import { loadAllData, loadMedical, loadNetwork,loadProvider, subscribeToEvents } from './store/interactions';
import {useDispatch} from "react-redux";
import {Navbar, Form, Data, Option} from "./components";
import config from "./config.json";
import {Route,Routes} from "react-router-dom";

function App() {
  const dispatch = useDispatch();
  const loadBlockchainData = async() => {
  const provider = loadProvider(dispatch);
  const chainId = await loadNetwork(provider,dispatch);
  const medical_config = config(chainId).MedicalRecord;
  const medical = await loadMedical(
    provider,
    medical_config.address,
    dispatch
  );
  loadAllData(provider,medical,dispatch);
  subscribeToEvents(medical,dispatch);
};

useEffect(() => {
  loadBlockchainData();
});

  return (
  <div className="App">
    <Navbar/>
    <Option/>
    <Routes>
      <Route path="/" exact element={<Form/>}/>
      <Route path="/Data" exact element={<Data/>}/>
    </Routes>
  </div>
  )
}

export default App;
