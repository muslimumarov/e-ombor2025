// components/EImzoLoginButton.tsx
import React from 'react';

const EImzoLoginButton: React.FC = () => {
    const clientId = 'YOUR_CLIENT_ID'; // E-imzo.uz dan olasiz
    const redirectUri = 'http://localhost:8000/callback'; // backenddagi redirect URI
    const eimzoAuthUrl = `https://sso.e-imzo.uz/auth?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=code`;

    const handleEImzoLogin = () => {
        window.location.href = eimzoAuthUrl;
    };

    return (
        <button
            onClick={handleEImzoLogin}
            className="mt-4 w-full rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 py-3 font-medium
            text-white opacity-90 shadow-lg transition-all hover:brightness-110 focus:outline-none focus:ring-2
            focus:ring-green-400/50"
        >
            🖋 E-Imzo orqali kirish
        </button>
    );
};

export default EImzoLoginButton;
