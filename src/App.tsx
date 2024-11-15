import { useEffect, useState } from "react";
import Aside from "./components/Aside";
import Main from "./components/Main";
import { CityInfo } from "./types/CityInfo";

function App() {
  const [city, setCity] = useState<CityInfo | null>(null);

  function getCityInfo(cityInfo: CityInfo | null) {
    setCity(cityInfo);
  }

  function clearCityInfo() {
    setCity(null);
  }

  useEffect(() => {
    console.log(city);
  }, [city]);

  return (
    <div className="w-full min-h-screen flex flex-col font-inter lg:flex-row">
      <Aside fnGetCityInfo={getCityInfo} fnClearCityInfo={clearCityInfo} />
      {city && <Main {...city} />}
    </div>
  );
}

export default App;
