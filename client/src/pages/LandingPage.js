
import React from 'react';
import { Link as ScrollLink } from 'react-scroll';
import bar from '../images/bars.png'


const LandingPage = () => {

  

  return (
    <><div className='jumbotron '>
      <section className="parallax bg-blend-multiply bg-slate-400 ">
        <div className="px-4  mx-auto max-w-screen-xl  text-center py-24 lg:py-56">
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-white md:text-5xl lg:text-6xl">Welcome to Expensify</h1>
          <p className="mb-8 text-lg font-normal text-gray-300 lg:text-xl sm:px-16 lg:px-48">The personalized Expense management system to track all your daily expenses and incomes.</p>
          <div className="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0">
            <ScrollLink to="login-section" smooth={true} duration={50} className="inline-flex justify-center items-center py-3 px-5 text-base font-bold text-center text-white rounded-lg bg-emerald-600 hover:bg-emerald-800 focus:ring-4 focus:ring-emerald-600 cursor-pointer">
              Scroll to Login
              <svg className="w-6 h-6 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </ScrollLink>
          </div>
        </div>
      </section>
    </div>
    
    <div>
    <section className="parallax py-12 md:py-24 bg-blend-multiply bg-slate-400">
    <div class="w-full max-w-6xl mx-auto px-4 sm:px-6 md:px-8 relative mt-[-6rem] ">
        <div class="shadow rounded-xl">
            <div class="grid overflow-hidden text-white shadow-xl md:grid-cols-2 bg-emerald-600 rounded-lg px-20 py-16">
                <aside class="p-8 space-y-4 md:p-32">
                    <h2 class="text-2xl font-bold tracking-tight md:text-4xl font-headline">
                        Ready to dive in?
                       .
                    </h2>

                    <p class="font-medium text-blue-100 md:text-2xl">
                        Just login once, enter your amount and forget.
                    </p>

                    <button>
                        <ScrollLink to="login-section" smooth={true} duration={50} class="bg-white text-blue-600 px-4 py-2 mt-3 rounded-xl">
                            Get Started
                        </ScrollLink>
                    </button>
                </aside>

                <aside class="relative hidden md:block">
                    <img class="absolute inset-0 object-cover object-left-top w-full h-full mt-16 -mr-16 rounded-tl-lg rounded-tr-lg" src={bar} alt="Discover our beautiful panel" />
                </aside>
            </div>
        </div>
    </div>
</section>
      </div>
      </>

  )
}

export default LandingPage;
