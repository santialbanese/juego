import React, { useState, useEffect, useRef } from 'react';

function GuessTheNumber() { 
  const [targetNumber, setTargetNumber] = useState(generateRandomNumber());
  const [guess, setGuess] = useState('');
  const [attemptsLeft, setAttemptsLeft] = useState(5);
  const [message, setMessage] = useState('');
  const [gameOver, setGameOver] = useState(false);
  const [guessHistory, setGuessHistory] = useState([]);
  const [wins, setWins] = useState(0);
  const [losses, setLosses] = useState(0);
  const [attemptStats, setAttemptStats] = useState([0, 0, 0, 0, 0]);
  const statsRef = useRef(null);

  function generateRandomNumber() {
    return Math.floor(Math.random() * 100) + 1;
  }

  useEffect(() => {
    const storedWins = localStorage.getItem('wins');
    const storedLosses = localStorage.getItem('losses');
    const storedAttemptStats = localStorage.getItem('attemptStats');
    if (storedWins) setWins(parseInt(storedWins, 10));
    if (storedLosses) setLosses(parseInt(storedLosses, 10));
    if (storedAttemptStats) setAttemptStats(JSON.parse(storedAttemptStats));
  }, []);

  useEffect(() => {
    localStorage.setItem('wins', wins);
    localStorage.setItem('losses', losses);
    localStorage.setItem('attemptStats', JSON.stringify(attemptStats));
  }, [wins, losses, attemptStats]);

  const handleGuess = (e) => {
    e.preventDefault();
    if (gameOver) return;

    const userGuess = parseInt(guess, 10);

    if (isNaN(userGuess) || userGuess < 1 || userGuess > 100) {
      setMessage('⚠️ Por favor, ingresa un número válido entre 1 y 100.');
      return;
    }

    if (guessHistory.some((attempt) => attempt.number === userGuess)) {
      setMessage('⚠️ Ya has intentado este número. Prueba con otro diferente.');
      return;
    }

    const remainingAttempts = attemptsLeft - 1;
    let feedback = '';

    if (userGuess === targetNumber) {
      feedback = 'Correcto 🎉';
      setMessage(`🎉 ¡Felicidades! Adivinaste el número ${targetNumber}.`);
      setGameOver(true);
      setWins(wins + 1);
      if (remainingAttempts >= 0 && remainingAttempts < 5) {
        const updatedAttemptStats = [...attemptStats];
        updatedAttemptStats[5 - remainingAttempts - 1] += 1;
        setAttemptStats(updatedAttemptStats);
      }
      scrollToStats();
    } else if (userGuess > targetNumber) {
      feedback = 'Muy alto 📉';
      setMessage('📉 El número es más pequeño.');
    } else {
      feedback = 'Muy bajo 📈';
      setMessage('📈 El número es más grande.');
    }

    setGuessHistory([...guessHistory, { number: userGuess, feedback }]);
    setGuess('');
    setAttemptsLeft(remainingAttempts);

    if (remainingAttempts === 0 && userGuess !== targetNumber) {
      setMessage(`❌ ¡Juego terminado! El número era ${targetNumber}.`);
      setGameOver(true);
      setLosses(losses + 1);
      scrollToStats();
    }
  };

  const handleReset = () => {
    setTargetNumber(generateRandomNumber());
    setGuess('');
    setAttemptsLeft(5);
    setMessage('');
    setGameOver(false);
    setGuessHistory([]);
  };

  const scrollToStats = () => {
    statsRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="game-container">
      <h1 className="game-title">🎲 Adivina el Número</h1>
      <p className="game-instructions">
        Intenta adivinar el número entre <span>1</span> y <span>100</span>.
        <br />
        Tienes <span>{attemptsLeft}</span> {attemptsLeft === 1 ? 'intento' : 'intentos'} restantes.
      </p>

      <form className="guess-form" onSubmit={handleGuess}>
        <input
          type="number"
          className="guess-input"
          value={guess}
          onChange={(e) => setGuess(e.target.value)}
          placeholder="Ingresa tu número"
          disabled={gameOver}
        />
        <button type="submit" className="guess-button" disabled={gameOver}>
          Adivinar
        </button>
      </form>

      {message && <p className="message">{message}</p>}

      <div className="history-container">
        <h2>Historial de Intentos</h2>
        {guessHistory.length === 0 ? (
          <p>No hay intentos aún.</p>
        ) : (
          <ul className="history-list">
            {guessHistory.map((attempt, index) => (
              <li key={index} className="history-item">
                <span>Intento {index + 1}:</span> {attempt.number} - {attempt.feedback}
              </li>
            ))}
          </ul>
        )}
      </div>

      {gameOver && (
        <button className="reset-button" onClick={handleReset}>
          🔄 Jugar de Nuevo
        </button>
      )}

      <div className="stats-container" ref={statsRef}>
        <h2>Estadísticas</h2>
        <p>Partidas ganadas: {wins}</p>
        <p>Partidas perdidas: {losses}</p>
        {wins + losses > 0 && (
          <p>
            Porcentaje de aciertos: {Math.round((wins / (wins + losses)) * 100)}%
          </p>
        )}

        <details className="detailed-stats-container">
          <summary>Ver estadísticas detalladas</summary>
          {attemptStats.map((stat, index) => (
            <div key={index} className="attempt-stat">
              <span>Intento {index + 1}:</span>
              <div className="stat-bar">
                <div
                  className="stat-bar-fill"
                  style={{ width: `${wins > 0 ? Math.round((stat / wins) * 100) : 0}%` }}
                ></div>
                <span className="stat-bar-text">
                  {wins > 0 ? `${Math.round((stat / wins) * 100)}%` : '0%'}
                </span>
              </div>
            </div>
          ))}
        </details>
      </div>
    </div>
  );
}

export default GuessTheNumber;
