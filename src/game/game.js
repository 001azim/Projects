import React, { useEffect, useState } from "react";
import { FaRegHandRock, FaHandPaper, FaHandScissors } from "react-icons/fa";
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Game() {
    const [player1choice, setPlayer1Choice] = useState(0);
    const [player2choice, setPlayer2Choice] = useState(0);
    const [player1points, setPlayer1Points] = useState(0);
    const [player2points, setPlayer2Points] = useState(0);
    const [result, setResult] = useState("");
    const [count, setCount] = useState(0);
    const [buttonDisableFor1, setButtonDisableFor1] = useState(false);
    const [buttonDisableFor2, setButtonDisableFor2] = useState(true);
    const [gameOver, setGameOver] = useState(false);

    const choice = [<FaRegHandRock size={50} />, <FaHandPaper size={50} />, <FaHandScissors size={50} />];
    const choices = [<FaRegHandRock size={20} />, <FaHandPaper size={20} />, <FaHandScissors size={20} />];

    const navigate = useNavigate();
    const players = useSelector(state => state.game.players);

    const handleClick = (index) => {
        setCount(count + 1);
        let choosedItem = choice[index];
        setPlayer1Choice(choosedItem);
        setButtonDisableFor1(true);
        setButtonDisableFor2(false);
    }

    const handle2Click = (index) => {
        setCount(count + 1);
        let choosedItem = choice[index];
        setPlayer2Choice(choosedItem);
        setButtonDisableFor2(true);
        setButtonDisableFor1(false);
    }

    const reset = () => {
        window.location.reload();
        window.location.href = '/';
    }

    const defGameOver = () => {
        setButtonDisableFor1(true);
        setButtonDisableFor2(true);
    }

    const sendData = async () => {
        const formData = new FormData();
        console.log(result)

        if (result) {
            formData.append("player1", players.player1);
            formData.append("player2", players.player2);
            formData.append("winner", result);
            try {
                const response = await axios.post(`https://azim001.pythonanywhere.com/storehistory`, formData);
                console.log(response);
            } catch (error) {
                console.error(error);
            }
        }
    }

    useEffect(() => {
        if (!buttonDisableFor1) {
            if (player1choice.type === player2choice.type) {
                // Tie
            } else if (
                (player1choice.type === choice[0].type && player2choice.type === choice[2].type) ||
                (player1choice.type === choice[2].type && player2choice.type === choice[1].type) ||
                (player1choice.type === choice[1].type && player2choice.type === choice[0].type)
            ) {
                if (player1choice !== <></> && player2choice !== <></>) {
                    setPlayer1Points(player1points + 1);
                }
            } else {
                setPlayer2Points(player2points + 1);
            }

        }
        setwinner()
    }, [player1choice, player2choice,result])

    const setwinner=async()=>{
        if (player1points === 5 || player2points === 5) {
            if (player1points === 5) {
                setResult(players.player1)
                setGameOver(true)
                defGameOver()
                sendData()
            } else {
                setResult(players.player2)
                setGameOver(true)
                defGameOver()
            await    sendData()
            }
        }
    }

    return (
        <div className="flex flex-col items-center">
            <h1 className="text-3xl font-bold mt-8 mb-4">Rock Paper Scissors</h1>
            <h5 className="text-3xl font-bold mt-8 mb-4"> First one to score 6 points is the winner</h5>
            <div className="flex justify-between w-full max-w-lg">
                <div className="flex flex-col items-center">
                
                    <h3>{players.player1}: {player1points}</h3>
                    <div className="flex items-center">
                        <div>{buttonDisableFor2 ? player1choice : null}</div>
                        <div className="flex">
                            {choices.map((item, index) => (
                                <button
                                    key={index}
                                    disabled={buttonDisableFor1}
                                   
                                    onClick={() => handleClick(index)}
                                    className="button m-2"
                                >
                                    {item}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="flex flex-col items-center">
                    <h3>{players.player2}: {player2points}</h3>
                    <div className="flex items-center">
                        <div>{!buttonDisableFor1 ? player2choice : null}</div>
                        <div className="flex">
                            {choices.map((item, index) => (
                                <button
                                    key={index}
                                    disabled={buttonDisableFor2}
                                   
                                    onClick={() => handle2Click(index)}
                                    className="button m-2"
                                >
                                    {item}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            {gameOver && (
                <div className="flex flex-col items-center mt-4">
                    <h1 className="text-xl">Final result: {result} wins</h1>
                    <div className="flex mt-4">
                        <button onClick={() => reset()} className="button mr-4">Restart</button>
                        <button onClick={() => navigate('/history')} className="button">View History</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Game;
