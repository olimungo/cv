import React, { useEffect, useState } from 'react';

export function GetToKnowMe() {
    const [imageChevronHref, setImageChevronHref] = useState('');

    // Load assets
    useEffect(() => {
        const imageChevronDownUrl = new URL(
            '../assets/chevron-down.svg',
            import.meta.url
        );

        if (imageChevronDownUrl) {
            setImageChevronHref(imageChevronDownUrl.href);
        }
    }, []);

    return (
        <div className="mt-16 flex justify-center opacity-75 md:mt-32">
            <div className="mx-1 rounded-md border-2 border-fuchsia-200 bg-fuchsia-200 p-2 text-sm font-extrabold text-dark-space md:mx-4 md:px-4 md:text-lg">
                GET TO KNOW ME
            </div>

            <div className="mx-1 flex items-center rounded-md border-2 p-2 text-sm font-extrabold text-fuchsia-200 md:mx-4 md:px-4 md:text-lg">
                <img className="inline w-6 " srcSet={imageChevronHref} alt="" />

                <span className="mx-1">SCROLL DOWN</span>

                <img className="inline w-6 " srcSet={imageChevronHref} alt="" />
            </div>
        </div>
    );
}
