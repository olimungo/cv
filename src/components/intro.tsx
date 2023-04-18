import React, { useEffect, useState } from 'react';
import { Button } from './button';

export function Intro(props: { onClick?: () => void }) {
    const defaultHandler = () => {};
    const { onClick = defaultHandler } = { ...props };

    const [containerClassName, setContainerClassName] = useState('');
    const [topClassName, setTopClassName] = useState('');
    const [bottomClassName, setBottomClassName] = useState('');
    const [container, setContainer] = useState<HTMLElement>();
    const [topSection, setTopSection] = useState<HTMLElement>();
    const [bottomSection, setBottomSection] = useState<HTMLElement>();

    useEffect(() => {
        const container = document.getElementById('container');
        const topSection = document.getElementById('top-section');
        const bottomSection = document.getElementById('bottom-section');

        if (container) {
            setContainer(container);
        }

        if (topSection) {
            setTopSection(topSection);
        }

        if (bottomSection) {
            setBottomSection(bottomSection);
        }
    }, []);

    const handleClick = () => {
        if (container) {
            setTimeout(() => {
                setContainerClassName('hidden');
                onClick();
            }, 1000);
        }

        if (topSection) {
            setTopClassName('zoom-in');
        }

        if (bottomSection) {
            setBottomClassName('slide-down');
        }
    };

    return (
        <div
            id="container"
            className={`${containerClassName} fixed z-50 flex h-full w-full flex-col items-center justify-center bg-transparent`}
        >
            <div
                id="top-section"
                className={`${topClassName} h-full w-full bg-dark-space`}
            >
                {/* <img srcSet={imageUrl.href} /> */}

                <div className="flex h-full items-center justify-center">
                    <div className="planet">
                        <div className="star one"></div>
                    </div>
                </div>
            </div>

            <div
                id="bottom-section"
                className={`${bottomClassName} h-2/6 w-full bg-dark-space`}
            >
                <div className="flex items-center justify-center">
                    <Button color="purple" onClick={handleClick}>
                        START MISSION
                    </Button>
                </div>
            </div>
        </div>
    );
}
