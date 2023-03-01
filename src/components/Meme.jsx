import { useEffect, useState } from "react"
export default function Meme(){

    const [meme, setMeme] = useState({
        topText: "",
        bottomText: "",
        randomImage: "http://i.imgflip.com/1bij.jpg"
        
    })

    const [allMeme, setAllMeme] = useState([])

    useEffect(() => {
        fetch("https://api.imgflip.com/get_memes")
            .then(res => res.json())
            .then(data => setAllMeme(data.data.memes))
    }, [])

    function getMemeImage(){
            const randomNumber = Math.floor(Math.random() * allMeme.length)
            const url = allMeme[randomNumber].url
            setMeme(prevMeme => ({...prevMeme, randomImage: url }))
        }

        function handleChange(event){
            const {name, value} = event.target
            setMeme(prevMeme => ({
                ...prevMeme,
                [name] : value
            }))
        }

    return(
        <main>
            <div className="form">
                <input 
                        className="form--input" 
                        placeholder="top text" 
                        type="text" 
                        name="topText"
                        onChange={handleChange}
                        value={Meme.topText}/>

                <input 
                        className="form--input" 
                        placeholder="bottom text" 
                        type="text" 
                        name="bottomText"
                        onChange={handleChange}
                        value = {Meme.bottomText}/>


                <button 
                        className="form--button" 
                        onClick={getMemeImage}>Get a new meme image 
                        </button>
            </div>
            <div className="meme">
                <img src={meme.randomImage} className="meme--image" />
                <h2 className="meme--text top">{meme.topText}</h2>
                <h2 className="meme--text bottom">{meme.bottomText}</h2>
            </div>

        </main>
    )
}