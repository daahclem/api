import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import ErrorPage from './ErrorPage';
import md5 from 'blueimp-md5';

const publickey = '3566d8678ffd4f14090725b3e5820164';
const privatekey = 'c732b5371030a1937f9f87a214a07713812ea681c';
const ts = new Date().getTime();
const stringToHash = ts + privatekey + publickey;
const hash = md5(stringToHash);
const baseUrl = 'https://gateway.marvel.com:443/v1/public/series';
const url = `${baseUrl}?ts=${ts}&apikey=${publickey}&hash=${hash}`;

const SingleCharacter = () => {
  const [singleSeries, setSingleSeries] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await axios.get(`${url}&id=${id}`);
        setSingleSeries(data.data.results);
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
          <ErrorPage name="Series" />
        ) : (
          <div className="p-3 mb-2 bg-dark text-white">
            <h2>Single Series</h2>
            {singleSeries.map((chars) => {
              const { id, title, description } = chars;
              return (
                <div key={id} className="container">
                  <div className="row">
                    <div className="col-sm">
                      <h3>{title}</h3>
                      <img
                        className="img-thumbnail"
                        src={`${chars.thumbnail.path}.${chars.thumbnail.extension}`}
                        alt={title}
                        aria-label="Series Logo"
                      />
                      <p>{description}</p>
                    </div>
                    <div className="col-sm">
                      <h3>Featured Comics</h3>
                      {chars.comics.items.map((items) => {
                        return (
                          <div key={items.resourceURI}>
                            <div className="container">
                              <Link
                                to={`/comics/${items.resourceURI.substring(
                                  items.resourceURI.lastIndexOf('/')
                                ).substring(1)}`}
                              >
                                <p className="text-white">{items.name}</p>
                              </Link>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    <div className="col-sm">
                      <h3>Featured Characters</h3>
                      {chars.characters.items.map((items) => {
                        return (
                          <div key={items.resourceURI}>
                            <Link
                              to={`/characters/${items.resourceURI.substring(
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
