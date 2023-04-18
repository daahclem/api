import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import ErrorPage from './ErrorPage';
import md5 from 'blueimp-md5';

const publickey = '3566d8678ffd4f14090725b3e5820164';
const privatekey = '732b5371030a1937f9f87a214a07713812ea681c';
const ts = new Date().getTime();
const stringToHash = ts + privatekey + publickey;
const hash = md5(stringToHash);
const baseUrl = 'https://gateway.marvel.com:443/v1/public/characters';
const url = `${baseUrl}?ts=${ts}&apikey=${publickey}&hash=${hash}`;

const SingleCharacter = () => {
  const [singleCharacter, setSingleCharacter] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await axios.get(`${url}&id=${id}`);
        setSingleCharacter(data.data.results);
        setLoading(false);
      } catch (e) {
        setLoading(false);
        setError(true);
        console.log(e);
      }
    }

    fetchData();
  }, [id]);

  if (loading) {
    return (
      <div>
        <h2>Loading....</h2>
      </div>
    );
  } else {
    return (
      <React.Fragment>
        {error ? (
          <ErrorPage name="Character" />
        ) : (
          <div className="p-3 mb-2 bg-dark text-white">
            <h2>Single Character</h2>
            <br />
            <br />
            {singleCharacter.map((chars) => {
              const { id, name, description } = chars;
              return (
                <div key={id} className="container">
                  <div className="row">
                    <div className="col-sm">
                      <h3>{name}</h3>
                      <img
                        className="img-thumbnail"
                        src={`${chars.thumbnail.path}.${chars.thumbnail.extension}`}
                        alt={name}
                        aria-label="Character Logo"
                      />
                      <p>{description}</p>
                    </div>
                    <div className="col-sm">
                      <h3>Featured Comics</h3>
                      {chars.comics.items.map((items) => {
                        return (
                          <div key={items.resourceURI}>
                            <Link
                              to={`/comics/${items.resourceURI.substring(
                                items.resourceURI.lastIndexOf('/')
                              ).substring(1)}`}
                            >
                              <p className="text-white">{items.name}</p>
                            </Link>
                          </div>
                        );
                      })}
                    </div>
                    <div className="col-sm">
                      <h3>Featured Series</h3>
                      {chars.series.items.map((items) => {
                        return (
                          <div key={items.resourceURI}>
                            <Link
                              to={`/series/${items.resourceURI.substring(
                                items.resourceURI.lastIndexOf('/')
                              ).substring(1)}`}
                            >
                              <p className="text-white">{items.name}</p>
                            </Link>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </React.Fragment>
    );
  }
};

export default SingleCharacter;
