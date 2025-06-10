import React from 'react';
import HeaderHome from './header';
import FooterHome from './footer';

export default function HomeLayout(props: any) {
    const { children } = props;
    
    return (
        <>
            <div><HeaderHome /></div>
            <div>
                {children}
            </div>
            {/* <div><FooterHome /></div> */}
        </>
    );
}
