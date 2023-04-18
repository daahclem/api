import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Pagination from "./Pagination";
import ErrorPage from "./ErrorPage";
import SearchCharacter from "./SearchCharacter";
import "../App.css";
import md5 from "blueimp-md5";

const publickey = "3566d8678ffd4f14090725b3e5820164";
const privatekey = "732b5371030a1937f9f87a214a07713812ea681c";
const ts = new Date().getTime();
const stringToHash = ts + privatekey + publickey;
const hash = md5(stringToHash);
const baseUrl = "https://gateway.marvel.com:443/v1/public/series";
const url = `${baseUrl}?ts=${ts}&apikey=${publickey}&hash=${hash}`;
const LIMIT = 20;

const Series = () => {
  const [loading, setLoading] = useState(true);
  const [showsSeries, setSeriesData] = useState({});
  const [nextPage, setNextPage] = useState(true);
  const [previousPage, setPreviousPage] = useState(false);
  const [error, setError] = useState(false);
  const [searchData, setSearchData] = useState(undefined);
  const [searchTerm, setSearchTerm] = useState("");
  let { page } = useParams();
  page = parseInt(typeof page === "undefined" ? 0 : page);

  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await axios.get(url + "&offset=" + page * LIMIT);
        setSeriesData(data.data.results);
        setLoading(false);
        data.data.results.length === 0 ? setError(true) : setError(false);
        page > 0 ? setPreviousPage(true) : setPreviousPage(false);
        page + 1 >= Math.ceil(data.data.total / LIMIT) ? setNextPage(false) : setNextPage(true);
      } catch (e) {
        setLoading(false);
        setNextPage(false);
        setError(true);
        console.log(e);
      }
    }
    fetchData();
  }, [page]);

  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await axios.get(url + "&titleStartsWith=" + searchTerm);
        setSearchData(data.data.results);
        setLoading(false);
        setPreviousPage(false);
        setNextPage(false);
      } catch (e) {
        setLoading(true);
        setNextPage(false);
        setError(true);
        console.log(e);
      }
    }
    if (searchTerm) {
      fetchData();
    } else {
      page > 0 ? setPreviousPage(true) : setPreviousPage(false);
      setNextPage(true);
    }
  }, [searchTerm]);

  const searchValue = async (value) => {
    setSearchTerm(value);
  };

  if (page >= 0) {
    if (loading) {
      return (
        <div>
          {error ? (
            <ErrorPage name="Page" />
          ) : (
            <>
              <h2>Loading....</h2>
              <br />
              <br />
              Wait please
            </>
          )}
        </div>
      );
    } else {
      return (
        <React.Fragment>
          {error ? (
            <ErrorPage name="Page" />
          ) : (
            <div className="p-3 mb-2 bg-dark text-white">
              <h2>Series</h2>
              <SearchCharacter searchValue={searchValue} callFrom="Series" />
              <br />
              <Pagination
                page={page}
                nextPage={nextPage}
                previousPage={previousPage}
                callFrom="Series"
              />
              <div className="row row-col-sm-2  row-cols-md-3  row-cols-lg-4 g-5 my-3 mx-4">
                {searchTerm
                  ? searchData &&
                    searchData.map((chars) => {
                        const { id, title } = chars;
                        return (
                          <div className="col" key={id}>
                            <div className="card text-white bg-dark mb-3 border-light h-100">
                              <Link to={`/series/${id}`}>
                                <img
                                  src={`${chars.thumbnail.path}.${chars.thumbnail.extension}`}
                                  className="card-img-top img-thumbnail"
                                  alt={title}
                                  aria-label="Series Logo"
                                />
                                <div className="card-body">
                                  <h3>{title}</h3>
                                </div>
                              </Link>
                            </div>
                          </div>
                        );
                      })
                  : showsSeries.map((chars) => {
                      const { id, title } = chars;
                      return (
                        <div className="col" key={id}>
                          <div className="card text-white bg-dark mb-3 border-light h-100">
                            <Link to={`/series/${id}`}>
                              <img
                                src={`${chars.thumbnail.path}.${chars.thumbnail.extension}`}
                                className="card-img-top img-thumbnail"
                                alt={title}
                                aria-label="Series Logo"
                              />
                              <div className="card-body">
                                <h3>{title}</h3>
                              </div>
                            </Link>
                          </div>
                        </div>
                      );
                    })}
              </div>
              <Pagination
                page={page}
                nextPage={nextPage}
                previousPage={previousPage}
                callFrom="Series"
              />
            </div>
          )}
        </React.Fragment>
      );
    }
  } else {
    return (
      <div>
        <ErrorPage name="Page" />
      </div>
    );
  }
};

export default Series;
