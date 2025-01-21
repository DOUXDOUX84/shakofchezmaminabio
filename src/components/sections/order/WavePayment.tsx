import React from 'react';

export const WavePayment = () => {
  return (
    <div className="bg-blue-50 p-4 rounded-lg">
      <p className="text-sm text-blue-800 mb-4">Paiement Wave disponible via QR code ou lien direct :</p>
      <div className="flex flex-col items-center">
        <img 
          src="/lovable-uploads/d7272e63-3e15-4089-9430-73d262e04a51.png" 
          alt="QR Code Wave"
          className="w-48 h-48 mb-4"
        />
        <a 
          href="https://pay.wave.com/m/M_MO1NT4Bhh6eN/c/sn/" 
          className="text-blue-600 hover:text-blue-800 text-sm underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          Cliquez ici pour payer avec Wave
        </a>
      </div>
    </div>
  );
};