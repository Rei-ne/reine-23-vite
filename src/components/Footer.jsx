import React from 'react'

const Footer = () => {
    return (
        <div className="hidden bg-black flex items-center justify-center uppercase">
            <div>
                <h3 className='font-GT_Flexa text-mint'>let's connect</h3>
                <div className='flex items-center justify-center text-footer'>
                    <a className='text-footer no-underline' href="#">whatsapp</a>
                    <a className='text-footer no-underline' href="#">linkedin</a>
                    <a className='text-footer no-underline' href="#">github</a>
                </div>
                <div className='text-footer'>
                    <p>Chopped by Reine</p>
                    <p>Pixels by Mosess</p>
                </div>
            </div>

        </div>
    )
}

export default Footer