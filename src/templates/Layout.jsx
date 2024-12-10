import React from 'react';
import './Layout.scss';

function Layout ({
    title = 'No-Code React ⚡ Boilerplate',
    children
}) {
    return (
        <>
            <header className="ncr-layout-header">
                <h1>{title}</h1>
            </header>
            <section className="ncr-layout-section">
                {children}
            </section>
        </>
    );
}

export default Layout;