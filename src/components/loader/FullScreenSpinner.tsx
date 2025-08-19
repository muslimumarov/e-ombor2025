// src/components/FullScreenSpinner.tsx
import React from "react";

const FullScreenSpinner: React.FC = () => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/70">
            <div className="size-20 animate-spin rounded-full border-y-4 border-blue-500"></div>
        </div>
    );
};

export default FullScreenSpinner;
