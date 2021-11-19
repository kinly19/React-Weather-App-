import {useState, useEffect} from 'react';

const useFetch = (url, isLocationEmpty) => {

  const [data, setData] = useState(null);
  const [error, setIsError] = useState(null);

  useEffect(() => {
    if (!isLocationEmpty) {
      fetch(url)
        .then((response) => {
          if (!response.ok) {
            console.log("Error something went wrong");
            throw Error("Error could not fetch data for that resourse");
          }
          return response.json();
        })
        .then((data) => {
          setData(data);
          setIsError(null);
        })
        .catch((error) => {
          setIsError(error.message);
        });
    }
  }, [url]);

  return { data, error };
};
export default useFetch;