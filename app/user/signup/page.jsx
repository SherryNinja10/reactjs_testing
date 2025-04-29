'use client';

import React, { useState } from 'react';

const Page = () => {
    const [name, setName] = useState('Aarshdeep');

    const toggleName = () => setName(name === 'Aarshdeep' ? 'Allan' : 'Aarshdeep');

    return (
        <div>
            <h1>Hello {name}</h1>
            <button onClick={toggleName} className="bg-white text-black px-4 py-2 rounded">Change Name</button>
        </div>
    )
}

export default Page;