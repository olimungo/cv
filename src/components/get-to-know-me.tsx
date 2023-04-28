import React, { useEffect, useState } from 'react';

export function GetToKnowMe() {
    return (
        <div className="mt-36 flex justify-center text-sm opacity-75 md:text-lg">
            <div className="flex rounded-md border-2 border-fuchsia-200">
                <div className="bold bg-fuchsia-200 px-3 py-2 text-dark-space">
                    <div className="flex h-full items-center">
                        GET TO KNOW ME
                    </div>
                </div>

                <div className="flex items-center px-3 py-2">
                    <img
                        className="inline w-6 animate-ping"
                        srcSet="assets/chevron-down.svg"
                        alt=""
                    />

                    <div className="mx-1 text-fuchsia-200">SCROLL DOWN</div>

                    <img
                        className="inline w-6 animate-ping"
                        srcSet="assets/chevron-down.svg"
                        alt=""
                    />
                </div>
            </div>
        </div>
    );
}
