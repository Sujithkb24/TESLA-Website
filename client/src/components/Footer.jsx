import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer
            id="footer"
            className="relative py-8 md:py-12"
            style={{ backgroundColor: 'var(--color-black)', color: 'var(--color-gold)' }}
        >
            {/* Gold Top Border with Gradient */}
            <div
                className="absolute top-0 left-0 w-full h-1"
                style={{ 
                    background: 'linear-gradient(90deg, var(--color-gold) 0%, var(--color-light-gold) 50%, var(--color-gold) 100%)'
                }}
            ></div>

            {/* Decorative Background Pattern */}
            <div className="absolute inset-0 opacity-5 pointer-events-none">
                <div className="absolute top-5 left-10 w-32 h-32 md:w-48 md:h-48 rounded-full blur-3xl" style={{ backgroundColor: 'var(--color-gold)' }}></div>
                <div className="absolute bottom-5 right-10 w-32 h-32 md:w-48 md:h-48 rounded-full blur-3xl" style={{ backgroundColor: 'var(--color-gold)' }}></div>
            </div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
                    {/* Left Section - Branding */}
                    <div className="lg:col-span-4 flex flex-col items-center lg:items-start text-center lg:text-left">
                        {/* Logos */}
                        <div className="flex items-center gap-3 mb-4">
                            <img 
                                src="/TESLA-Logo.png" 
                                alt="Tesla Logo" 
                                className="h-12 sm:h-14 lg:h-16 hover:scale-110 transition-transform duration-300" 
                            />
                            <div 
                                className="h-12 sm:h-14 lg:h-16 w-px"
                                style={{ backgroundColor: 'var(--color-gold)' }}
                            ></div>
                            <img 
                                src="/JSS-STU-Logo 1.png" 
                                alt="JSS Logo" 
                                className="h-12 sm:h-14 lg:h-16 hover:scale-110 transition-transform duration-300" 
                            />
                        </div>

                        {/* Title */}
                        <h2 
                            className="text-xl sm:text-2xl lg:text-3xl font-bold mb-2 uppercase tracking-wide"
                            style={{ color: 'var(--color-gold)' }}
                        >
                            TESLA - SJCE
                        </h2>

                        {/* Address */}
                        <p className="text-xs sm:text-sm leading-relaxed" style={{ color: 'var(--color-gray)' }}>
                            JSS Science and Technology University<br />
                            Mysuru - 570009, Karnataka
                        </p>
                    </div>

                    {/* Vertical Divider - Desktop Only */}
                    <div className="hidden lg:flex lg:col-span-1 items-stretch justify-center">
                        <div
                            className="w-px self-stretch"
                            style={{ backgroundColor: 'rgba(201, 161, 84, 0.3)' }}
                        ></div>
                    </div>

                    {/* Right Section - Links */}
                    <div className="lg:col-span-7 grid grid-cols-3 gap-4 sm:gap-6 lg:gap-10">
                        {/* Club Links */}
                        <div>
                            <h3 
                                className="font-bold uppercase text-xs sm:text-sm lg:text-base mb-2 sm:mb-3 pb-1 sm:pb-2 border-b-2"
                                style={{ 
                                    color: 'var(--color-gold)',
                                    borderColor: 'var(--color-gold)'
                                }}
                            >
                                Club
                            </h3>
                            <ul className="space-y-1.5 sm:space-y-2.5">
                                <li>
                                    <Link 
                                        to="/about" 
                                        className="text-[10px] sm:text-xs lg:text-sm hover:translate-x-1 inline-block transition-all duration-300"
                                        style={{ color: 'var(--color-gray)' }}
                                        onMouseEnter={(e) => e.target.style.color = 'var(--color-gold)'}
                                        onMouseLeave={(e) => e.target.style.color = 'var(--color-gray)'}
                                    >
                                        → About Us
                                    </Link>
                                </li>
                                <li>
                                    <Link 
                                        to="/events" 
                                        className="text-[10px] sm:text-xs lg:text-sm hover:translate-x-1 inline-block transition-all duration-300"
                                        style={{ color: 'var(--color-gray)' }}
                                        onMouseEnter={(e) => e.target.style.color = 'var(--color-gold)'}
                                        onMouseLeave={(e) => e.target.style.color = 'var(--color-gray)'}
                                    >
                                        → Events
                                    </Link>
                                </li>
                                <li>
                                    <Link 
                                        to="/teams" 
                                        className="text-[10px] sm:text-xs lg:text-sm hover:translate-x-1 inline-block transition-all duration-300"
                                        style={{ color: 'var(--color-gray)' }}
                                        onMouseEnter={(e) => e.target.style.color = 'var(--color-gold)'}
                                        onMouseLeave={(e) => e.target.style.color = 'var(--color-gray)'}
                                    >
                                        → Teams
                                    </Link>
                                </li>
                                <li>
                                    <Link 
                                        to="/blog" 
                                        className="text-[10px] sm:text-xs lg:text-sm hover:translate-x-1 inline-block transition-all duration-300"
                                        style={{ color: 'var(--color-gray)' }}
                                        onMouseEnter={(e) => e.target.style.color = 'var(--color-gold)'}
                                        onMouseLeave={(e) => e.target.style.color = 'var(--color-gray)'}
                                    >
                                        → Blog
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        {/* Social Media */}
                        <div>
                            <h3 
                                className="font-bold uppercase text-xs sm:text-sm lg:text-base mb-2 sm:mb-3 pb-1 sm:pb-2 border-b-2"
                                style={{ 
                                    color: 'var(--color-gold)',
                                    borderColor: 'var(--color-gold)'
                                }}
                            >
                                Connect
                            </h3>
                            <ul className="space-y-1.5 sm:space-y-2.5">
                                <li>
                                    <a
                                        href="https://www.instagram.com/tesla_sjce/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-1 sm:gap-2 text-[10px] sm:text-xs lg:text-sm hover:translate-x-1 transition-all duration-300"
                                        style={{ color: 'var(--color-gray)' }}
                                        onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-gold)'}
                                        onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-gray)'}
                                    >
                                        <svg className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                                        </svg>
                                        <span className="hidden sm:inline">Instagram</span>
                                        <span className="sm:hidden">Instagram</span>
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="https://www.linkedin.com/company/tesla-sjce/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-1 sm:gap-2 text-[10px] sm:text-xs lg:text-sm hover:translate-x-1 transition-all duration-300"
                                        style={{ color: 'var(--color-gray)' }}
                                        onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-gold)'}
                                        onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-gray)'}
                                    >
                                        <svg className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                                        </svg>
                                        <span className="hidden sm:inline">LinkedIn</span>
                                        <span className="sm:hidden">LinkedIn</span>
                                    </a>
                                </li>
                            </ul>
                        </div>

                        {/* Support */}
                        <div>
                            <h3 
                                className="font-bold uppercase text-xs sm:text-sm lg:text-base mb-2 sm:mb-3 pb-1 sm:pb-2 border-b-2"
                                style={{ 
                                    color: 'var(--color-gold)',
                                    borderColor: 'var(--color-gold)'
                                }}
                            >
                                Support
                            </h3>
                            <ul className="space-y-1.5 sm:space-y-2.5">
                                <li>
                                    <Link 
                                        to="#footer" 
                                        className="text-[10px] sm:text-xs lg:text-sm hover:translate-x-1 inline-block transition-all duration-300"
                                        style={{ color: 'var(--color-gray)' }}
                                        onMouseEnter={(e) => e.target.style.color = 'var(--color-gold)'}
                                        onMouseLeave={(e) => e.target.style.color = 'var(--color-gray)'}
                                    >
                                        → FAQ
                                    </Link>
                                </li>
                                <li>
                                    <Link 
                                        to="#footer" 
                                        className="text-[10px] sm:text-xs lg:text-sm hover:translate-x-1 inline-block transition-all duration-300"
                                        style={{ color: 'var(--color-gray)' }}
                                        onMouseEnter={(e) => e.target.style.color = 'var(--color-gold)'}
                                        onMouseLeave={(e) => e.target.style.color = 'var(--color-gray)'}
                                    >
                                        → Contact Us
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
