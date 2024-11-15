import InputMask from "react-input-mask";
import { useState } from "react";
import useAPI from "../hooks/cepDataAndMap";
import { CityInfo } from "../types/CityInfo";

interface IgetCityInfo {
  fnGetCityInfo: (cityInfo: CityInfo) => void;
}

interface IclearCityInfo {
  fnClearCityInfo: () => void;
}

function Aside({
  fnGetCityInfo,
  fnClearCityInfo,
}: IgetCityInfo & IclearCityInfo) {
  const api = useAPI();
  const [sCep, setCep] = useState<string>("");

  const handleCepChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCep(e.currentTarget.value);
  };

  async function handleClick() {
    const newCep = sCep.split("_").join("").split("-").join("");

    if (newCep.length < 8) {
      return;
    }

    try {
      const { cep, ddd, uf, estado, localidade, regiao } = await api.getCepData(
        newCep
      );

      const cityInfo: CityInfo = {
        ddd,
        uf,
        cidade: localidade,
        estado,
        regiao,
        cep,
      };
      fnGetCityInfo(cityInfo);
    } catch (error) {
      console.error("Erro ao buscar os dados do CEP:", error);
    }
  }

  function handleClearCityInfo() {
    setCep("");
    fnClearCityInfo();
  }

  return (
    <aside className="w-full h-fit flex flex-col gap-4 bg-neutral-950 p-4 text-white lg:min-w-[550px] lg:max-w-[550px] lg:gap-8 lg:min-h-screen lg:p-8">
      <div className="w-full flex items-center justify-between">
        <h1 className="text-2xl lg:text-[32px]">ZipFinder</h1>
        <p className="text-base">
          Powered by <strong className="text-pink-600">Visirium-IT</strong>
        </p>
      </div>
      <div className="w-full flex items-center gap-4">
        <button className="text-base rounded-lg bg-pink-600 p-2">
          {" "}
          Buscar por CEP
        </button>
        <button className="text-base rounded-lg bg-white p-2 text-black">
          {" "}
          Buscar por Cidade{" "}
        </button>
      </div>
      <InputMask
        mask="99999-999"
        value={sCep}
        placeholder="Digite o CEP (XXXXX-XXX)"
        onChange={handleCepChange}
        className="rounded-lg p-3 lg:p-4 text-black"
      />
      <button
        className="w-full p-3 text-white text-center bg-indigo-600 rounded-lg lg:p-4"
        onClick={handleClick}
      >
        Procurar
      </button>
      <button
        className="w-full p-3 text-white text-center bg-amber-600 rounded-lg lg:p-4"
        onClick={handleClearCityInfo}
      >
        Cancelar
      </button>
    </aside>
  );
}

export default Aside;
