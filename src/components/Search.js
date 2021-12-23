import React, { useState, useEffect } from "react";
import axios from "axios";

const Search = () => {
  const [term, setTerm] = useState("programming");
  const [debouncedterm, setDebouncedTerm] = useState("programming");
  const [results, setResults] = useState([]);

  // console.log(results);

  // console.log('I run with every render');

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedTerm(term);
    }, 10000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [term]);

  useEffect(() => {
    const search = async () => {
      // axios.get('something') : returns 'response' and data is one of the field of it
      const { data } = await axios.get("https://en.wikipedia.org/w/api.php", {
        params: {
          action: "query",
          list: "search",
          origin: "*",
          format: "json",
          srsearch: debouncedterm,
        },
      }).catch((error) => {
        // here you will have access to error.response
        console.log(error.response)
    });

      setResults(data.query.search);
    };

    search();
  }, [debouncedterm]);
  
  
  
  

  // useEffect(() => {
  // we can't use async and await directly in useEffect so , that thing will be done indirectly using another function inside it.
  // There are 3 ways to do it

  // 1st way :

  // const search = async () => {
  //   // axios.get('something') : returns 'response' and data is one of the field of it
  //   const { data } = await axios.get("https://en.wikipedia.org/w/api.php", {
  //     params: {
  //       action: "query",
  //       list: "search",
  //       origin: "*",
  //       format: "json",
  //       srsearch: term,
  //     },
  //   });

  //   setResults(data.query.search);
  // };

  // if (term && !results.length)
  // {
  //   search();
  // }
  // else {
  //   const timeoutId =  setTimeout(() => {
  //     if (term) {
  //       search();
  //     }
  //   }, 1000);

  //   return()=>{
  //     clearTimeout(timeoutId);
  //   };

  // }

  // 2nd way :

  // (async () => {
  //   await axios.get('aafds');
  // })();

  //3rd way : using promise

  // axios.get("adfsd").then((response) => {
  //   console.log(response.data);
  // });

  // }, [term]);

  
  
  
  const renderedResults = results.map((result) => {
    return (
      <div key={result.pageid} className="item">
        <div className="right floated content">
          <a
            className="ui button"
            href={`https://en.wikipedia.org?curid=${result.pageid}`}
          >
            Go
          </a>
        </div>

        <div className="content">
          <div className="header">{result.title}</div>

          {/* below code : remove the html code from text  */}
          <span dangerouslySetInnerHTML={{ __html: result.snippet }}></span>
        </div>
      </div>
    );
  });

  return (
    <div>
      <div className="ui form">
        <div className="field">
          <label> Enter Search Term : </label>
          <input
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            className="input"
          />
        </div>
      </div>

      <div className="ui celled list">{renderedResults}</div>
    </div>
  );
};

export default Search;
