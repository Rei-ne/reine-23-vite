import React from 'react'
import reine from '../assets/images/reine-img.png'
import { useState } from 'react'

import '../styles/Contact.scss'
const Contact = () => {

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
        <section className="font-GT_Flexa  mt-10 mb-10 flex flex-row flex-wrap justify-center  items-center h-screen relative" id="contact">
            <h2 className="font-Bebas_Neue sm:text-3xl md:text-3xl px-2 uppercase flex text-center justify-center items-center w-full ">GET IN TOUCH</h2>
            <div className='sm:hidden md:flex items-center justify-center w-1/2 h-full'>
                <img className="" src={reine} alt="a picture of reine" />
            </div>
            <div className='flex flex-col items-center justify-around lg:justify-center h-full md:w-1/2'>
                <div className="flex flex-col items-center justify-center h-14  font-GT_Flexa w-4/5 p-6 md:w-full  text-sm max-w-prose text-left leading-8 text-gray-light">
                    <div className='flex items-center h-fit md:w-fit md:h-auto justify-start text-left w-4/5'>
                        <p className='max-w-prose sm:leading-6 leading-8 text-gray-light sm:text-base md:text-base' >Contact me if you’ve got remote job opportunities, web development gigs, collaborations or you just want to say hello 👋</p>
                    </div>
                    <div className='flex items-center h-fit md:w-fit md:h-auto justify-start text-left w-4/5'>
                        <p className='max-w-prose sm:hidden md:inline leading-8 text-gray-light sm:text-base md:text-base' >You can send me an <a className='text-bold underline' href="mailto:reinetoyosii@gmail.com">
                            email
                        </a> if contact forms aren't your thing</p>
                    </div>
                </div>
                <div className='mt-10 md:hidden'>
                    <button className='font-GT_Flexa uppercase border border-mint rounded-full w-10 h-5'>
                        <a className='no-underline' href="mailto:reinetoyosii@gmail.com">
                            send a mail
                        </a>

                    </button>
                </div>
                {/* contact form */}
                <div className='sm:hidden md:flex w-4/5 h-fit bg-gray-200'>
                    <form className="font-GT_Flexa text-gray-light md:w-4/5  max-h-md flex flex-col bg-inherit max-w-md rounded shadow mx-auto" onSubmit={handleSubmit}>
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

        </section >
    )
}

export default Contact;