import axios from "axios";
import { useEffect, useState } from "react";
import { FaCrown } from "react-icons/fa";
import { MdOutlineDownloading } from "react-icons/md";

export default function History() {
  useEffect(() => {
    fetchApi();
  }, []);

  const [history, setHistory] = useState(null);

  const fetchApi = async () => {
    try {
      const response = await axios(`https://azim001.pythonanywhere.com/history`);
      setHistory(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex justify-center items-center">
      <table className="table-fixed border-collapse w-full sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-1/3">
        <thead>
          <tr>
            <th className="border border-gray-400 px-4 py-2">PLAYER 1</th>
            <th className="border border-gray-400 px-4 py-2">PLAYER 2</th>
            <th className="border border-gray-400 px-4 py-2"><FaCrown/></th>
          </tr>
        </thead>
        <tbody>
          {history ? (
            history.map((item, index) => (
              <tr key={index}>
                <td className="border border-gray-400 px-4 py-2">{item.player1}</td>
                <td className="border border-gray-400 px-4 py-2">{item.player2}</td>
                <td className="border border-gray-400 px-4 py-2">{item.winner}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td className="border border-gray-400 px-4 py-2" colSpan="3"><MdOutlineDownloading/></td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
