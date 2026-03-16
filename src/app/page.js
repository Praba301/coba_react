'use client';

import React, { useState, useEffect } from 'react';
import GameBoard from '../components/GameBoard';
import ScoreBoard from '../components/ScoreBoard';

import { GiCardJoker } from 'react-icons/gi';

import {
FaAppleAlt,
FaLemon,
FaHeart,
FaStar,
FaFish,
FaDog,
FaCat,
FaLeaf
} from 'react-icons/fa';

const ICONS = [
{ icon: FaAppleAlt, color: '#ef4444' },
{ icon: FaLemon, color: '#eab308' },
{ icon: FaHeart, color: '#ec4899' },
{ icon: FaStar, color: '#f97316' },
{ icon: FaFish, color: '#38bdf8' },
{ icon: FaDog, color: '#a78bfa' },
{ icon: FaCat, color: '#f472b6' },
{ icon: FaLeaf, color: '#4ade80' }
];

const shuffleArray = (array) => {

const shuffled = [...array];

for (let i = shuffled.length - 1; i > 0; i--) {

const j = Math.floor(Math.random() * (i + 1));

[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];

}

return shuffled;

};

const createCards = (level) => {

let pairCount = 4;

if (level === 'medium') pairCount = 6;

if (level === 'hard') pairCount = 8;

const selectedIcons = ICONS.slice(0, pairCount);

const paired = selectedIcons.flatMap((item, index) => [

{ id: index * 2, icon: item.icon, color: item.color, pairId: index },

{ id: index * 2 + 1, icon: item.icon, color: item.color, pairId: index }

]);

return shuffleArray(paired);

};

export default function Home() {

const [level, setLevel] = useState('easy');

const [cards, setCards] = useState([]);

const [flippedCards, setFlippedCards] = useState([]);

const [matchedCards, setMatchedCards] = useState([]);

const [moves, setMoves] = useState(0);

const [time, setTime] = useState(0);

useEffect(() => {

setCards(createCards(level));

setFlippedCards([]);

setMatchedCards([]);

setMoves(0);

setTime(0);

}, [level]);

useEffect(() => {

const timer = setInterval(() => {

setTime(prev => prev + 1);

}, 1000);

return () => clearInterval(timer);

}, []);

useEffect(() => {

if (flippedCards.length === 2) {

const [firstId, secondId] = flippedCards;

const firstCard = cards.find(c => c.id === firstId);

const secondCard = cards.find(c => c.id === secondId);

setMoves(prev => prev + 1);

if (firstCard.pairId === secondCard.pairId) {

setMatchedCards(prev => [...prev, firstId, secondId]);

setFlippedCards([]);

} else {

const timer = setTimeout(() => {

setFlippedCards([]);

}, 800);

return () => clearTimeout(timer);

}

}

}, [flippedCards, cards]);

const handleCardFlip = (id) => {

if (flippedCards.length < 2 && !flippedCards.includes(id)) {

setFlippedCards(prev => [...prev, id]);

}

};

const resetGame = () => {

setCards(createCards(level));

setFlippedCards([]);

setMatchedCards([]);

setMoves(0);

setTime(0);

};

return (

<div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 p-4">

<h1 className="text-4xl font-bold mb-4 text-white flex items-center gap-3">

<GiCardJoker className="text-yellow-300 text-4xl" />

Memory Card

</h1>

{/* LEVEL SELECTOR */}

<div className="flex gap-3 mb-6">

<button

onClick={() => setLevel('easy')}

className={`px-4 py-2 rounded-full font-semibold ${level === 'easy'

? 'bg-yellow-400 text-indigo-900'

: 'bg-white/20 text-white'

}`}

>

Easy (4)

</button>

<button

onClick={() => setLevel('medium')}

className={`px-4 py-2 rounded-full font-semibold ${level === 'medium'

? 'bg-yellow-400 text-indigo-900'

: 'bg-white/20 text-white'

}`}

>

Medium (6)

</button>

<button

onClick={() => setLevel('hard')}

className={`px-4 py-2 rounded-full font-semibold ${level === 'hard'

? 'bg-yellow-400 text-indigo-900'

: 'bg-white/20 text-white'

}`}

>

Hard (8)

</button>

</div>

<ScoreBoard

moves={moves}

time={time}

matchedCount={matchedCards.length / 2}

totalPairs={cards.length / 2}

onReset={resetGame}

/>

<div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl shadow-2xl">

<GameBoard

cards={cards}

flippedCards={flippedCards}

matchedCards={matchedCards}

onFlip={handleCardFlip}

/>

</div>

</div>

);

}