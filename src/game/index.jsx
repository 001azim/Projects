import React, { useState } from 'react'
import * as Yup from 'yup'
import { string } from 'yup'
import { setplayernames } from '../slice/gameslice'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom' 
import stoneimg from '../images/stone.jpg'

function Index() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [error, setError] = useState({})
  const players = useSelector(state => state.game.players)

  const userSchema = Yup.object().shape({
    player1: string().required("Player 1 name is required"),
    player2: string().required("Player 2 name is required"),
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await userSchema.validate(players, { abortEarly: false });
      navigate('/game');
    } catch (error) {
      if (error.inner) {
        const newError = {};
        error.inner.forEach((eachError) => {
          newError[eachError.path] = eachError.message;
        });
        setError(newError);
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(setplayernames({...players, [name]: value}));
  };

  return (
    <div 
      className="flex flex-col items-center justify-center h-screen" 
      style={{ 
        backgroundImage: `url(${stoneimg})`, 
        backgroundSize: 'cover', 
        backgroundPosition: 'center' 
      }}
    >
      <form onSubmit={handleSubmit} className="bg-white bg-opacity-75 p-8 rounded-lg shadow-lg">
        <h3 className="text-2xl font-semibold mb-6">Enter Player Names</h3>
        <input 
          type="text" 
          placeholder="ex-azim" 
          name="player1" 
          value={players.player1} 
          onChange={handleChange} 
          className="border border-gray-300 rounded-lg px-4 py-2 mb-4 w-64 focus:outline-none focus:border-blue-500" 
        />
        {error.player1 && <div className="text-red-500 mb-4">{error.player1}</div>}
        <input 
          type="text" 
          placeholder="ex-jack" 
          name="player2" 
          value={players.player2} 
          onChange={handleChange} 
          className="border border-gray-300 rounded-lg px-4 py-2 mb-4 w-64 focus:outline-none focus:border-blue-500" 
        />
        {error.player2 && <div className="text-red-500 mb-4">{error.player2}</div>}
        <button 
          type="submit" 
          className="bg-blue-500 text-white rounded-lg px-6 py-2 font-semibold hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
        >
          Start Game
        </button>
      </form>
    </div>
  );
}

export default Index;
