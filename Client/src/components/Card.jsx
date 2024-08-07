import { Link } from "react-router-dom";
const Card = (props) => {
  const { data } = props;
  return (
    <div className="bg-white shadow-[0_4px_12px_-5px_rgba(0,0,0,0.4)] w-full max-w-sm rounded-lg overflow-hidden mx-auto font-[sans-serif] mt-4">
      <Link to={data.url} className="min-h-[256px]">
        <img
          src="https://media.istockphoto.com/id/1205995997/photo/breaking-news-reporters-reporting-on-coronavirus-from-china.webp?b=1&s=170667a&w=0&k=20&c=tIRwqNF_3f1MQ32Mpuoj8qe9r8aSxk_YvvQ_YqJ7g3o="
          className="w-full"
        />
      </Link>

      <h3 className="text-black text-sm font-bold text-balance">
        {data.title}
      </h3>
      <div className="p-6 flex justify-center mx-5 py-5">
        <button
          type="button"
          className="px-5 py-2.5 rounded-lg text-white text-sm tracking-wider font-medium border border-current outline-none bg-green-500 hover:bg-green-600 active:bg-green-500"
        >
          Add
        </button>
        <button
          type="button"
          className="px-5 py-2.5 rounded-lg text-white text-sm tracking-wider font-medium border border-current outline-none bg-red-700 hover:bg-red-600 active:bg-red-700"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default Card;
