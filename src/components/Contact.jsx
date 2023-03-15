import React from 'react'
import reine from '../assets/images/reine-img.png'
import { useState } from 'react'

import '../styles/Contact.scss';

function Contact() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();

        setName("");
        setEmail("");
        setMessage("");
        alert(`Thank you for your message ${name}, Reine will be in touch `)

    }

    const handleChange = (event) => {
        setMessage(event.target.value)
    }

    const resetTextArea = () => {
        setMessage("");
    };

    return (
        <section className="font-GT_Flexa  mt-10 mb-10 flex flex-col md:flex-row md:flex-wrap justify-center  items-center h-screen relative" id="contact">
            <h2 className="font-Bebas_Neue sm:text-3xl md:text-3xl px-2 uppercase flex text-center justify-center items-center w-full">GET IN TOUCH</h2>
            <div className='sm:hidden md:flex items-center justify-center w-1/2 h-auto'>
                <img className="flex items-center justify-center" src={reine} alt="a picture of reine" />
            </div>
            <div className='flex flex-col items-center justify-center md:justify-around h-auto w-4/5 md:w-1/2'>
                <div className="flex flex-col items-center justify-center sm:h-10 h-12 font-GT_Flexa p-6 text-sm max-w-prose text-left leading-8 text-gray-light lg:max-w-md">
                    <div className='flex items-center h-auto w-full justify-center text-left'>
                        <p className='max-w-prose sm:leading-6 leading-8 text-gray-light sm:text-sm lg:text-base sm:text-center md:text-left' >Contact me if you’ve got remote job opportunities, web development gigs, collaborations or you just want to say hello 👋</p>
                    </div>
                    <div className='sm:hidden md:inline items-center h-fit w-full md:h-auto justify-start text-left'>
                        <p className='max-w-prose sm:hidden md:inline leading-8 text-gray-light sm:text-base lg:text-base' >You can send me an <a className='text-bold underline' href="mailto:reinetoyosii@gmail.com">
                            email
                        </a> if contact forms aren't your thing</p>
                    </div>
                </div>
                <div className='md:hidden'>
                    <button className='font-GT_Flexa uppercase border border-mint rounded-full w-10 h-5'>
                        <a className='no-underline' href="mailto:reinetoyosii@gmail.com">
                            send a mail
                        </a>

                    </button>
                </div>
                {/* contact form */}
                <div className='sm:hidden md:flex max-w-md w-full h-fit bg-gray-200 mt-6'>
                    <form className="font-GT_Flexa text-gray-light md:w-4/5  max-h-md flex flex-col bg-inherit rounded shadow mx-auto" onSubmit={handleSubmit}>
                        <div className="styled-input">
                            <input type="text" required value={name}
                                onChange={e => setName(e.target.value)} />
                            <label>Name</label>
                            <span></span> </div>
                        <div className="styled-input">
                            <input required value={email}
                                onChange={e => setEmail(e.target.value)} />
                            <label>Email</label>
                            <span></span> </div>
                        {/* <div className="styled-input">
                            <input type="email" required value={email}
                                onChange={e => setEmail(e.target.value)} />
                            <label>Email</label>
                            <span></span></div> */}
                        <div className="styled-input wide">
                            <textarea required rows="3" cols="12" value={message} onChange={handleChange}
                                onClick={resetTextArea}></textarea>
                            <label>Message</label>
                            <span></span> </div>

                        <button
                            type="submit"
                            className=""
                        >
                            Submit
                        </button>
                    </form>


                </div>
            </div>
        </section>
    )
}

export default Contact;