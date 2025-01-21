import React from 'react';

export const WavePayment = () => {
  return (
    <div className="mt-4 bg-[#00B6F0] bg-opacity-10 p-6 rounded-lg">
      <div className="flex flex-col items-center space-y-4">
        <img 
          src="/lovable-uploads/f1e41d93-f7de-4842-947d-8ce0e71e8161.png" 
          alt="QR Code Wave"
          className="w-64 h-64 object-contain"
        />
        <a 
          href="https://pay.wave.com/m/M_MO1NT4Bhh6eN/c/sn/" 
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#00B6F0] hover:text-[#0095c5] underline text-center font-medium transition-colors"
        >
          Cliquez ici pour payer avec Wave
        </a>
      </div>
    </div>
  );
};