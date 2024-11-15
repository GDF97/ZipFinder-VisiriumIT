export default function useAPI() {
  return {
    getCepData: async (cep: string) => {
      try {
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }

        const data = await response.json();
        return data;
      } catch (error) {
        console.error("Erro ao buscar os dados do CEP:", error);
        throw error;
      }
    },
    getCepMapImage: () => {},
  };
}
