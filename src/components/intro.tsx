import React, { useEffect, useState } from 'react';
import { Button } from './button';

export function Intro(props: { onClick?: () => void }) {
    const defaultHandler = () => {};
    const { onClick = defaultHandler } = props;

    const [topClass, setTopClass] = useState('');
    const [bottomClass, setBottomClass] = useState('');
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
            container.inert = true;

            setTimeout(() => {
                setTopClass('hidden');
                setBottomClass('hidden');
            }, 1500);
        }

        onClick();

        if (topSection) {
            setTopClass('zoom-in');
        }

        if (bottomSection) {
            setBottomClass('slide-down');
        }
    };

    return (
        <div
            id="container"
            className={`fixed top-0 z-50 flex h-full w-full flex-col items-center justify-center bg-transparent`}
        >
            <div
                id="top-section"
                className={`${topClass} h-full w-full bg-dark-space`}
            >
                <div className="flex h-full items-center justify-center">
                    <div className="planet">
                        <div className="star one"></div>
                    </div>
                </div>
            </div>

            <div
                id="bottom-section"
                className={`${bottomClass} flex h-2/6 w-full flex-col items-center bg-dark-space`}
            >
                <div className="flex items-center justify-center">
                    <Button color="purple" onClick={handleClick}>
                        START MISSION
                    </Button>
                </div>

                <div className="mt-16 max-w-xs text-center text-xs text-fuchsia-200 md:max-w-2xl md:text-base">
                    This site is totally reactive but the user experience is
                    improved on large displays
                </div>
            </div>
        </div>
    );
}
