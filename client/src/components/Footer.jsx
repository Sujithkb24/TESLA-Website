const Footer = () => {
    return (
        <footer id="footer" className="bg-black text-[#B8860B] text-center py-10 relative">
            {/* Gold Top Border */}
            <div className="absolute top-0 left-0 w-full h-1 bg-[#B8860B]"></div>

            <div className="max-w-full mx-auto flex flex-col md:flex-row items-center justify-between px-6 space-y-8 md:space-y-0">
                {/* Left Section (30%) */}
                <div className="w-full md:w-3/10 flex flex-col items-center justify-center text-center">
                    <div className="flex items-center space-x-4">
                        <img src="/TESLA-Logo.png" alt="Tesla Logo" className="h-15 md:h-20" />
                        <img src="/JSS-STU-Logo 1.png" alt="JSS Logo" className="h-15 md:h-20" />
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold mt-4 uppercase">TESLA - SJCE</h2>
                    <p className="text-lg md:text-xl uppercase">
                        JSS Science and Technology <br />University <br />
                        Mysuru - 570009
                    </p>
                </div>

                {/* Vertical Divider */}
                <div className="hidden md:flex h-48 w-0.5 bg-[#B8860B] mx-6"></div>

                {/* Right Section (70%) */}
                <div className="w-full md:w-7/10 flex flex-col items-center justify-center text-center">
                    {/* Subscribe Section */}
                    {/* <div className="w-full h-10 sm:w-3/5 flex items-center mb-6 border border-[#B8860B] rounded-full overflow-hidden">
                        <input
                            type="email"
                            placeholder="E-MAIL"
                            className="flex-grow px-4 py-2 md:py-3 bg-transparent text-white focus:outline-none placeholder-[#B8860B] text-lg border-none"
                        />
                        <button className="px-6 md:px-10 py-2 md:py-3 bg-[#B8860B] text-black font-semibold rounded-none">
                            SUBSCRIBE
                        </button>
                    </div> */}

                    {/* Links Section */}
                    <div className="w-full sm:w-4/5 flex flex-row items-center justify-around gap-6 text-lg text-left">
                        <div className="self-start">
                            <h3 className="font-bold uppercase text-left sm:text-left">CLUB</h3>
                            <ul className="space-y-1 text-left sm:text-left">
                                <li>About Us</li>
                                <li>Events</li>
                                <li>Electrovaganza</li>
                            </ul>
                        </div>
                        <div className="self-start">
                            <h3 className="font-bold uppercase text-left sm:text-left">SOCIAL MEDIA</h3>
                            <ul className="space-y-1 text-left sm:text-left">
                                <li>Instagram</li>
                                <li>LinkedIn</li>
                            </ul>
                        </div>
                        <div className="self-start">
                            <h3 className="font-bold uppercase text-left sm:text-left">GET HELP</h3>
                            <ul className="space-y-1 text-left sm:text-left">
                                <li>FAQ</li>
                                <li>Contact Us</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
