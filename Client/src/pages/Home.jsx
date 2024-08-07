import { useEffect, useState } from "react";
import Card from "../components/Card";
import instance from "../helpers/instance";
import Navbar from "../components/Navbar";

const Home = () => {
  const [news, setNews] = useState([]);
  //   console.log(news.articles , "><>><<");

  const fetchData = async () => {
    try {
      let { data } = await instance({
        url: `https://newsapi.org/v2/top-headlines?country=id&apiKey=7258674c8bc44dfd990383f0c1bcc7c7`,
        method: "GET",
      });

      setNews(data.articles);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            {news.map((data) => (
              <Card data={data} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
