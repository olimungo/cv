import React from 'react';
import { CenteredContainer } from '../centered-container';
import { Tag } from '../tag';
import { Panel } from '../panel';

export function BachelorCareerPanel(props: { className?: string }) {
    const { className = '' } = props;

    return (
        <div className={`${className} flex justify-center`}>
            <Panel className="w-full p-12">
                <CenteredContainer className="flex flex-col-reverse items-center md:flex-row">
                    <img
                        className="reveal-right mt-5 w-[15rem] shadow-glow md:mr-16 md:mt-0 md:w-[22rem]"
                        srcSet="assets/armstrong-number.png"
                    />

                    <div className="text-md text-fuchsia-100 md:text-2xl">
                        <div className="mb-5">
                            Bachelor in IT, Insitut Paul Lambin in Brussels.
                            <Tag label="1993" className="ml-3" />
                        </div>

                        <div className="mb-5">
                            End of study work at the European Commission in DG
                            XII - Research and Development.
                        </div>
                    </div>
                </CenteredContainer>
            </Panel>
        </div>
    );
}
