import { useState, useEffect } from "react";

import { getBookByID } from "../../hooks/axiosAPI";
import { useRandomImage } from "../../hooks/randomImage";

const BookDetails = ({ bookID }) => {
  const [bookData, setBookData] = useState([]);

  useEffect(() => {
    const getBookData = async () => {
      const resData = await getBookByID(`/getbook/${bookID?.id}`);
      setBookData(resData);
    };

    getBookData();
  }, [bookID]);

  return (
    <div className="text-center flex justify-center items-center p-8 w-full h-full border">
      <div
        key={bookData._id}
        className="w-full cursor-pointer text-left flex justify-center items-center flex-col"
      >
        <div
          className="border w-3/5 p-8 rounded-lg h-60"
          style={{
            backgroundImage: `url(${useRandomImage()})`,
            backgroundSize: "cover",
          }}
        ></div>
        <div>
          <h2 className="mt-4 text-lg font-semibold max-w-[100%] break-all">
            {bookData.title}
          </h2>
          <h2 className="mt-4 max-w-[100%] break-all">
            <span className="font-bold text-lg">Author: </span>
            {bookData.author}
          </h2>
          <h2 className="mt-4 max-w-[1000%] break-all">
            <span className="font-bold text-lg">Description: </span>
            {bookData.description}
          </h2>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
