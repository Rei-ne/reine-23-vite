import React from 'react'
import ethers from '../assets/icons/logos_ethers.png';
import reactImg from '../assets/icons/akar-icons_react-fill.png';
import github from '../assets/icons/akar-icons_github-fill.png';
import javascript from '../assets/icons/akar-icons_javascript-fill.png';
import solidity from '../assets/icons/file-icons_solidity.png';
import python from '../assets/icons/akar-icons_python-fill.png';
import hardhat from '../assets/icons/file-type-hardhat.png';

const icons = [
    {
        id: 1,
        title: "ethers",
        image: ethers,

    },
    {
        id: 2,
        title: "react",
        image: reactImg,

    },
    {
        id: 3,
        title: "github",
        image: github,

    },
    {
        id: 4,
        title: "javascript",
        image: javascript,

    },
    {
        id: 5,
        title: "solidity",
        image: solidity,
    },
    {
        id: 6,
        title: "python",
        image: python,
    },
    {
        id: 7,
        title: "hardhat",
        image: hardhat,
    }
]


const Stack = () => {
    return (
        <div className='flex justify-center items-center flex-row flex-wrap gap-10'>

            {icons.map(icon => (
                <div className='h-7 w-7 border border-mint flex flex-col justify-between items-center' key={icon.id}>
                    <img className='p-2 h-4 mt-2' src={icon.image} />
                    <p className='font-GT_Flexa text-base p-2'>{icon.title}</p>
                </div>
            ))}

        </div>
    )
}

export default Stack