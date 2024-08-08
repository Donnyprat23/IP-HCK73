import { useEffect, useState } from "react";
import Card from "../components/Card";
import instance from "../helpers/instance";
import Navbar from "../components/Navbar";
import instance2 from "../helpers/instance2";

const Home = () => {
  const [news, setNews] = useState([]);
  const [AInews, setAINews] = useState([]);
  const [search, setSearch] = useState("");

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

  const getNewsFromAI = async (e) => {
    e.preventDefault()
    try {
      let { data } = await instance2({
        url: `/search`,
        method: "POST",
        data: {
          search,
        },
      });
      setAINews(data.response.news);      
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
    getNewsFromAI()
  }, []);
  return (
    <>
      <form onSubmit={getNewsFromAI} className="flex rounded-full border-2 border-blue-500 overflow-hidden max-w-md mx-auto font-[sans-serif]">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          type="text"
          placeholder="Search News"
          className="w-full outline-none bg-white text-sm px-5 py-3"
        />
        <button
          type="submit"
          className="flex items-center justify-center bg-blue-500 hover:bg-blue-950 px-6"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 192.904 192.904"
            width="18px"
            className="fill-white"
          >
            <path d="m190.707 180.101-47.078-47.077c11.702-14.072 18.752-32.142 18.752-51.831C162.381 36.423 125.959 0 81.191 0 36.422 0 0 36.423 0 81.193c0 44.767 36.422 81.187 81.191 81.187 19.688 0 37.759-7.049 51.831-18.751l47.079 47.078a7.474 7.474 0 0 0 5.303 2.197 7.498 7.498 0 0 0 5.303-12.803zM15 81.193C15 44.694 44.693 15 81.191 15c36.497 0 66.189 29.694 66.189 66.193 0 36.496-29.692 66.187-66.189 66.187C44.693 147.38 15 117.689 15 81.193z"></path>
          </svg>
        </button>
      </form>

      {/* AINews */}
      {AInews.length > 0 && (
      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            {AInews.map((data) => (
              <Card data={data} />
            ))}
          </div>
        </div>
      </div>

      )}

      {AInews.length < 1 && (
      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            {news.map((data) => (
              <Card data={data} />
            ))}
          </div>
        </div>
      </div>

      )}

    </>
  );
};

export default Home;
