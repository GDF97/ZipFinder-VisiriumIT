import { useEffect, useState } from "react";
import { CityInfo } from "../types/CityInfo";
import Card from "./Card";
import { TCoordinates } from "../types/Coordinates";
import Map from "./Map";

function Main(cityInfo: CityInfo) {
  const [coordinates, setCoordinates] = useState<TCoordinates>({
    lat: 0,
    lon: 0,
  });

  const fetchCoordinates = async () => {
    setCoordinates({ lat: 0, lon: 0 });
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?city=${cityInfo.cidade}&state=${cityInfo.uf}&format=json`
      );
      const data = await response.json();
      if (data.length > 0) {
        const { lat, lon } = data[0];
        console.log(lat, lon);
        setCoordinates({ lat, lon });
      } else {
        setCoordinates({ lat: 0, lon: 0 });
      }
    } catch (error) {
      console.error("Erro ao buscar as coordenadas:", error);
    }
  };

  useEffect(() => {
    fetchCoordinates();
    console.log(coordinates);
  }, [cityInfo]);

  return (
    <main className="w-full p-4 flex flex-col gap-4 lg:p-8 lg:gap-8">
      <section className="w-full flex flex-col gap-3 rounded-lg lg:p-4 lg:border lg:border-black">
        <h1 className="text-2xl text-pink-600 lg:text-[32px]">Mapa</h1>
        <div className="w-full h-[250px] bg-neutral-500 rounded-[4px] lg:h-[300px]">
          {coordinates.lat != 0 && coordinates.lon ? (
            <Map {...coordinates} />
          ) : (
            ""
          )}
        </div>
      </section>
      <section className="w-full flex flex-wrap justify-between gap-4 lg:justify-start">
        {Object.keys(cityInfo).map((key, index) => (
          <Card key={index} s={cityInfo[key as keyof CityInfo]} label={key} />
        ))}
      </section>
    </main>
  );
}

export default Main;
