"use client"

import { useEffect, useState } from "react";
import Image from "next/image"


const generateDeck = () => {

    const memoryCards = [
        "dwarf",
        "elf",
        "orc-connector",
        "orcish-ai-nextjs-framework",
        "orcishcity",
        "orcishlogo",
        "orcishmage",
        "textualgames"
      ]

    const deck = [...memoryCards, ...memoryCards];

    return deck.sort(() => Math.random() - 0.5)

};


export default function MemoryGame() {
    const [ cards, setCards ] = useState<string[]>(generateDeck())   // set the array cards
    const [ flipped, setFlipped ] = useState<number[]>([]); //store indexes of clicked images
    const [ solved, setSolved ] = useState<number[]>([]);


    useEffect( () => {

        const checkMatch = () => {
            const [ first, second ] = flipped;
            if(cards[first] === cards[second]) {
                setSolved([...solved, ...flipped])
            }
            setFlipped([])
        };

        if(flipped.length === 2) {
         setTimeout(checkMatch,1000);
        }

    }, [cards, flipped, solved ])

    const handleClick = ( index : number) => {
        if(!flipped.includes(index) && flipped.length < 2)
        {
            setFlipped([...flipped, index]);

        }
    }

    const msg = solved.length === cards.length
    const resetGame = () => {
        setCards(generateDeck());
        setFlipped([]);
        setSolved([]);

    }

  return (
    <>
    <audio autoPlay loop>
    <source src="/audio/music.mp3" type="audio/mpeg" />

    </audio>

    <h2 className="text-center mt-10 text-2xl">Try this memory game</h2>

    {msg && <h2 className="p-5"> You won!</h2>}

    <div className="flex flex-center grid grid-cols-4 gap-5 mt-10 content-center mx-40 ">

        { cards.map((card, index) => (
            <div 
            key={index} 
            onClick={() => handleClick(index)}
            className={`flex justify-center items-center bg-slate-200 w-28 h-28 transform
             cursor-pointer text-4xl text-black font-bold transition-transform duration-300"  
              ${flipped.includes(index) || solved.includes(index) ? "rotate-180" : ""}`}>

                {flipped.includes(index) || solved.includes(index) ?
                 ( <Image className="rotate-180"
                     src={`/images/${card}.webp`} fill alt="images"></Image>) : (
                    "?"
                 )
                }
            </div>
        ))
        }
        <button onClick={resetGame} className="p-5 bg-slate-500 rounded-md  mt-5 "> Reset Game </button>
    </div>
    </>

  )
}
