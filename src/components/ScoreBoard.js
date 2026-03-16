import React from 'react';

import {
FaClock,
FaMousePointer,
FaCheck,
FaRedo,
FaSyncAlt
} from 'react-icons/fa';

function ScoreBoard({ moves, time, matchedCount, totalPairs, onReset }) {

const isGameComplete = matchedCount === totalPairs;

return (

<div className="text-center mb-6">

<div className="flex justify-center gap-6 mb-4">

{/* WAKTU */}

<div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg">

<p className="text-sm text-indigo-200 flex items-center justify-center gap-1">

<FaClock /> Waktu

</p>

<p className="text-2xl font-bold text-white">
  {Math.floor(time / 60)}:{String(time % 60).padStart(2,"0")}
</p>

</div>

{/* PERCOBAAN */}

<div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg">

<p className="text-sm text-indigo-200 flex items-center justify-center gap-1">

<FaMousePointer /> Percobaan

</p>

<p className="text-2xl font-bold text-white">{moves}</p>

</div>

{/* DITEMUKAN */}

<div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg">

<p className="text-sm text-indigo-200 flex items-center justify-center gap-1">

<FaCheck /> Ditemukan

</p>

<p className="text-2xl font-bold text-white">

{matchedCount}/{totalPairs}

</p>

</div>

</div>

{isGameComplete && (

<p className="text-yellow-300 font-bold text-lg mb-3">

🎉 Selamat! Kamu menang dalam {moves} percobaan!

</p>

)}

<button

onClick={onReset}

className="px-6 py-2 bg-yellow-400 text-indigo-900 font-bold rounded-full hover:bg-yellow-300 transition shadow-lg flex items-center gap-2 mx-auto"

>

{isGameComplete ? <FaRedo /> : <FaSyncAlt />}

{isGameComplete ? 'Main Lagi' : 'Acak Ulang'}

</button>

</div>

);

}

export default ScoreBoard;