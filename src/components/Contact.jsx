import React from 'react'


const Contact = () => {
    return (
        <section className="font-GT_Flexa md:h-screen about-div mt-10 mb-10 flex flex-col  items-center h-screen" id="contact">
            <h2 className="font-Bebas_Neue sm:text-2xl md:text-3xl uppercase flex justify-center items-center">Contact Me</h2>
            <div className="font-GT_Flexa w-4/5 p-6 md:w-1/3 text-sm max-w-prose text-justify leading-8 text-gray-light">
                <p>Contact me if you’ve got remote opportunities, internships, collaborations or you just wanna say hello 👋</p>
                <p>
                    You can also send me an <a className='text-mint font-bold' href="mailto:reinetoyosii@gmail.com">email</a> if contact forms aren't your thing.
                </p>
            </div>

            <div className='w-4/5 h-14 mb-6 bg-gray-200'>
                <form className="form font-GT_Flexa text-gray-light w-4/5 h-fit bg-gray-200" action="">
                    <div className="px-4 bg-gray-200">
                        <label htmlFor="Name" className="">
                            Name
                        </label>
                        <input
                            id="name"
                            name="name"
                            type="name"
                            autoComplete="name"
                            required
                            className="bg-transparent rounded-none relative block
                  w-full px-3 py-2 border border-gray-300
                  placeholder-gray-500 text-gray-900 rounded-t-md
                  sm:text-sm"
                            placeholder=""
                        />
                    </div>
                    <div className="px-4">
                        <label htmlFor="email-address" className="">
                            Email address
                        </label>
                        <input
                            id="email-address"
                            name="email"
                            type="email"
                            autoComplete="email"
                            required
                            className="appearance-none rounded-none relative block
                  w-full px-3 py-2 border-b border-gray-300
                  placeholder-gray-500 text-gray-900
                  outline-none focus:ring-indigo-500
                  focus:border-indigo-500 focus:z-10 sm:text-sm"
                            placeholder=""
                        />
                    </div>
                    <div className="px-4">
                        <label htmlFor="Message" className="">
                            Message
                        </label>
                        <input
                            id="message"
                            name="message"
                            type="text"
                            autoComplete="message"
                            required
                            className="appearance-none rounded-none relative block
                  w-full px-3 py-2 border border-gray-300
                  placeholder-gray-500 text-gray-900 rounded-t-md
                  focus:outline-none focus:ring-indigo-500
                  focus:border-indigo-500 focus:z-10 sm:text-sm"
                            placeholder=""
                        />
                    </div>
                </form>


            </div>
        </section>
    )
}

export default Contact;