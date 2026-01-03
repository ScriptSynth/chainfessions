
import React from 'react';

export default function LinkGraph() {
    return (
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-1 relative overflow-hidden h-[400px]">

            <div className="absolute top-6 left-6 z-10">
                <h3 className="text-lg font-semibold text-white">Domain Authority Growth</h3>
                <p className="text-xs text-gray-500">Live Network Connectivity</p>
            </div>

            <div className="w-full h-full flex items-center justify-center bg-black/50 rounded-xl">
                {/* Placeholder for 3D Graph (Three.js / React Three Fiber / Spline) */}
                <div className="text-center">
                    <div className="w-32 h-32 mx-auto bg-indigo-500/10 rounded-full animate-pulse border border-indigo-500/30 flex items-center justify-center mb-4 relative">
                        <div className="absolute inset-0 border border-indigo-400/20 rounded-full animate-[spin_10s_linear_infinite]" />
                        <div className="w-4 h-4 bg-indigo-500 rounded-full shadow-[0_0_20px_rgba(99,102,241,1)]" />
                    </div>
                    <p className="text-indigo-400 text-sm font-mono">[3D Interactive Graph]</p>
                    <p className="text-gray-600 text-xs mt-2">Nodes representing verified backlinks</p>
                </div>
            </div>

            {/* Overlay Stats */}
            <div className="absolute bottom-6 right-6 flex gap-4">
                <div className="bg-black/80 backdrop-blur-sm border border-gray-800 p-3 rounded-lg">
                    <div className="text-xs text-gray-500 uppercase">Current DR</div>
                    <div className="text-xl font-bold text-white">24 <span className="text-green-500 text-xs text-normal">+2.1</span></div>
                </div>
                <div className="bg-black/80 backdrop-blur-sm border border-gray-800 p-3 rounded-lg">
                    <div className="text-xs text-gray-500 uppercase">Links Added</div>
                    <div className="text-xl font-bold text-white">128</div>
                </div>
            </div>
        </div>
    );
}
