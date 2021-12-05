import React, { useState, useEffect } from "react";
import { PokemonList } from "./components/PokemonList";
import { Pagination } from "./components/Pagination";
import axios from "axios";

function App() {
  const [pokemon, setPokemon] = useState([]);
  const [currentPageUrl,setPageUrl] = useState("https://pokeapi.co/api/v2/pokemon/");
  const [nextPageUrl,setNextPageUrl] = useState("");
  const [prevPageUrl,setPrevPageUrl] = useState("");
  const [loading,setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    let cancel
    axios.get(currentPageUrl,{
      cancelToken: new axios.CancelToken(c => cancel = c)
    }).then(res => {
      setNextPageUrl(res.data.next);
      setPrevPageUrl(res.data.previous);
      setPokemon(res.data.results.map(p => p.name))
    })
    setLoading(false);

    return () =>  cancel()
  }, [currentPageUrl]);

  function gotoNextPage() {
    setPageUrl(nextPageUrl);
  }

  function gotoPrevPage() {
    setPageUrl(prevPageUrl);
  }
  
  if (loading) {
    return <h1>Loading...</h1>;
  }
  

  return (
    <>
      <PokemonList pokemon={pokemon} />
      <Pagination
        gotoNextPage={nextPageUrl ? gotoNextPage : false}
        gotoPrevPage={prevPageUrl ? gotoPrevPage : false}
      />
    </>
  );
}

export default App;
