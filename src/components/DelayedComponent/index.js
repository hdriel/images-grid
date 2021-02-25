import { useState, useEffect } from 'react';

const DelayedComponent = ({ children, waitBeforeShow = 500 }) => {
    const [isShown, setIsShown] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setIsShown(true), waitBeforeShow);
        return () => clearTimeout(timer);
    }, [waitBeforeShow]);

    return isShown ? children : null;
};

export default DelayedComponent;