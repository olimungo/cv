import React, { useEffect, useState } from 'react';

export function GetToKnowMe() {
    return (
        <div className="mt-24 flex justify-center text-sm opacity-75 md:mt-44 md:text-lg">
            <div className="flex rounded-md border-2 border-fuchsia-200">
                <div className="bold bg-fuchsia-200 px-3 py-2 text-dark-space">
                    <div className="flex h-full items-center">
                        GET TO KNOW ME
                    </div>
                </div>

                <div className="flex items-center px-3 py-2">
                    <img
                        className="inline w-4 animate-ping md:w-6"
                        srcSet="assets/chevrons.svg"
                        alt="icon chevron down"
                    />

                    <div className="mx-1 text-fuchsia-200">SCROLL DOWN</div>

                    <img
                        className="inline w-4 animate-ping md:w-6"
                        srcSet="assets/chevrons.svg"
                        alt="icon chevron down"
                    />
                </div>
            </div>
        </div>
    );
}
