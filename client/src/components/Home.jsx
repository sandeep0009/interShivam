import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Home = () => {
  const [data, setData] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log(res.data.data)
      setData(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container mx-auto mt-8 p-4">
      <button
        onClick={fetchData}
        className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
      >
        Load Data
      </button>

      <table className="table-auto w-full mt-4">
        <thead>
          <tr className="bg-slate-900 text-white">
            <th className="py-2 px-4">First name</th>
            <th className="py-2 px-4">Last name</th>
            <th className="py-2 px-4">Email</th>
            <th className="py-2 px-4">Address</th>
            <th className="py-2 px-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((record) => (
            <tr key={record.id} className="border-b">
              <td className="py-2 px-4 text-center">{record.Fname}</td>
              <td className="py-2 px-4 text-center">{record.Lname}</td>
              <td className="py-2 px-4 text-center">{record.email}</td>
              <td className="py-2 px-4 text-center">{record.address}</td>
              <td className="py-2 px-4 m-auto">
                <Link
                  to={`/update/${record.id}`}
                  className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
                >
                  Update
                </Link>
                <button
                  onClick={() => handleDelete(record.id)}
                  className="bg-red-500 text-white p-2 rounded hover:bg-red-600 focus:outline-none focus:shadow-outline-red ml-2"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
