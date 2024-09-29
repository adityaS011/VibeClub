'use client';
import Image from 'next/image';
import React from 'react';

const PartyUFO = () => {
  return (
    <div className='fixed top-0 left-0 w-full h-20 pointer-events-none z-50  md:flex'>
      <div className='ufo relative w-20 rounded-full  animate-partyUFO hover:animate-shake transition-transform duration-300 ease-in-out'>
        <Image
          src='/assets/images/ufo.svg'
          width='200'
          height='70' // Adjust height to fit your design
          alt='ufo'
          className='absolute top-0 left-0 w-full object-contain'
        />
        <div className='ufo-light absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-8 h-8 rounded-full bg-blue-400 opacity-70 animate-blink'></div>
      </div>

      <style jsx>{`
        .ufo-light {
          box-shadow: 0 0 20px 15px rgba(0, 128, 255, 0.7);
        }

        @keyframes partyUFO {
          0% {
            transform: translate(0, 0);
          }
          25% {
            transform: translate(1300px, 50px) rotate(10deg);
          }
          50% {
            transform: translate(400px, 150px) rotate(-15deg);
          }
          75% {
            transform: translate(900px, 250px) rotate(10deg);
          }
          100% {
            transform: translate(0, 350px) rotate(0deg);
          }
        }

        .animate-partyUFO {
          animation: partyUFO 10s ease-in-out infinite;
        }

        @keyframes blink {
          0%,
          100% {
            opacity: 0.7;
          }
          50% {
            opacity: 0.2;
          }
        }

        .animate-blink {
          animation: blink 1s infinite;
        }
      `}</style>
    </div>
  );
};

export default PartyUFO;
