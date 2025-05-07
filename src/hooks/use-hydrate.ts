import React from 'react'

export const useHydrate = () => {
    const [hydrate, setHydrate] = React.useState(false)

    React.useEffect(()=> setHydrate(true), []);

    return hydrate;
}
