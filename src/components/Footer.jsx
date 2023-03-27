import React from 'react'

const Footer = () => {
    return (
        <div className="bg-black flex flex-col lg:flex-row lg:justify-around lg:h-10 lg:border-t-2 lg:mt-10 border-gray w-full items-center justify-center uppercase">
            <div>
                <h3 className='h-6 flex items-center justify-center font-GT_Flexa text-2xl font-bold text-white text-center'>let's connect</h3>
                <div className='font-GT_Flexa flex gap-8 items-center justify-center text-footer'>
                    <a className='text-footer no-underline hover:text-mint hover:underline' target="_blank" href="https://wa.me/08174240017?text=">whatsapp</a>
                    <a className='text-footer no-underline hover:text-mint hover:underline' target="_blank" href="https://www.linkedin.com/in/toyosi-odukale/">linkedin</a>
                    <a className='text-footer no-underline hover:text-mint hover:underline' target="_blank" href="https://github.com/Rei-ne">github</a>
                </div>
            </div>
            <div className='mt-10 flex flex-col text-center lg:text-left lg:mt-6 font-GT_Flexa text-footer '>
                <p className='py-2 '>Chopped by <a className='text-footer no-underline hover:text-mint hover:underline' target="_blank" href="https://twitter.com/Reine_Dev">Reine_Dev</a> </p>
                <p>Pixels by <a className='text-footer no-underline hover:text-mint hover:underline' target="_blank" href="https://twitter.com/mosessmax?s=20">Mosess</a> </p>
            </div>


        </div>
    )
}

export default Footer