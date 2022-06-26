// react imports
import { useState, useEffect } from 'react';

// custom hook koji nam vraća recepte iz json baze
export const useFetch = (url, method = 'GET') => {
  // podaci iz baze
  const [data, setData] = useState(null);
  // informacija o učitavanju
  const [isPending, setIsPending] = useState(false);
  // greške
  const [error, setError] = useState(null);
  // upit iz pretrage
  const [options, setOptions] = useState(null);

  // ovo pozivamo samo kada čuvamo nov recept u json-u
  const postData = (postData) => {
    setOptions({
      method: "POST", //metoda
      headers: {
        "Content-Type": "application/json" //lokacija za čuvanje
      },
      body: JSON.stringify(postData) //način čuvanja podataka
    })
  }

  useEffect(() => {
    // kontroler koristimo za prekid daljeg učitavanja kada jednom učitamo potrebne podatke
    const controller = new AbortController()

    // asinhrona funkcija koja vraća recepte
    const fetchData = async (fetchOptions) => {
      // postavljamo informaciju o učitavanju na true
      setIsPending(true)
      
      try {
        // odgovor na pokušaj servera da vrati podatke
        const res = await fetch(url, { ...fetchOptions, signal: controller.signal })
        if(!res.ok) { // ukoliko je došlo do greške prilikom povezivanja sa serverom
          throw new Error(res.statusText)
        }
        // unosimo json deo odgovora od servera u varijablu data
        const data = await res.json()

        // prekidamo učitavanje
        setIsPending(false)
        // postavljamo podatke na ono što je vraćeno
        setData(data)
        // označavamo da nema više grešaka
        setError(null)
      } catch (err) { // u slučaju greške
        if (err.name === "AbortError") {
          console.log("the fetch was aborted")
        } else {
          setIsPending(false)
          setError('Could not fetch the data')
        }
      }
    }

    // ako samo vraćamo recepte nemamo dodatne parametre i 
    // to radimo korišćenjem GET metode
    if(method === "GET") {
      fetchData();
    } 
    // ukoliko postavljamo novi recept
    // potrebno je da imamo prosleđene parametre (options) i njih prosleđujemo funkciji fetchData
    if(method === "POST" && options) {
      fetchData(options);
    }

    // prekid učitavanja podataka
    return () => {
      controller.abort()
    }

  }, [url, options, method])

  return { data, isPending, error, postData}
}