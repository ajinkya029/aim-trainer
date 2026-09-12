import React,{useEffect,useRef,useState} from 'react';
import {createRoot} from 'react-dom/client';
import './style.css';

const GAME_TIME=30;
function App(){
 const [running,setRunning]=useState(false),[time,setTime]=useState(GAME_TIME),[score,setScore]=useState(0),[hits,setHits]=useState(0),[misses,setMisses]=useState(0),[target,setTarget]=useState({x:50,y:50,size:58});
 const [best,setBest]=useState(()=>Number(localStorage.getItem('aimBest')||0));
 const [last,setLast]=useState(null); const area=useRef(null);
 const accuracy=hits+misses?Math.round(hits/(hits+misses)*100):0;
 const spawn=()=>{const size=Math.floor(42+Math.random()*35);setTarget({x:8+Math.random()*84,y:10+Math.random()*78,size});};
 const start=()=>{setScore(0);setHits(0);setMisses(0);setTime(GAME_TIME);setLast(null);spawn();setRunning(true)};
 useEffect(()=>{if(!running)return; if(time<=0){setRunning(false);setBest(b=>{const n=Math.max(b,score);localStorage.setItem('aimBest',n);return n});return;} const id=setTimeout(()=>setTime(t=>t-1),1000);return()=>clearTimeout(id)},[running,time,score]);
 const hit=e=>{e.stopPropagation();if(!running)return;setHits(h=>h+1);setScore(s=>s+1);setLast('hit');spawn();};
 const miss=()=>{if(running){setMisses(m=>m+1);setLast('miss')}};
 return <main>
  <section className="hero"><div><p className="eyebrow">REACTION • PRECISION • SPEED</p><h1>AIM<span>TRAINER</span></h1><p className="sub">Click targets as quickly and accurately as possible.</p></div><button className="start" onClick={start}>{running?'RESTART':'START GAME'}</button></section>
  <section className="stats"><div><b>{score}</b><span>SCORE</span></div><div><b>{time}s</b><span>TIME LEFT</span></div><div><b>{accuracy}%</b><span>ACCURACY</span></div><div><b>{best}</b><span>BEST SCORE</span></div></section>
  <section className="game-wrap">
   <div className="game" ref={area} onClick={miss}>
    <div className="grid"></div>
    {!running && <div className="overlay"><h2>{time===0?'TIME UP!':'READY?'}</h2><p>{time===0?`Final score: ${score} • Accuracy: ${accuracy}%`:'Press Start Game to begin your training.'}</p><button onClick={start}>{time===0?'PLAY AGAIN':'START'}</button></div>}
    {running && <button aria-label="target" className="target" onClick={hit} style={{left:`${target.x}%`,top:`${target.y}%`,width:target.size,height:target.size}}><i></i><em></em></button>}
    {running&&<div className={'flash '+(last||'')}></div>}
   </div>
  </section>
  <footer><span>⚡ Pro tip: focus on accuracy first, speed follows.</span><span>Built with React + Vite</span></footer>
 </main>
}
createRoot(document.getElementById('root')).render(<App/>);
