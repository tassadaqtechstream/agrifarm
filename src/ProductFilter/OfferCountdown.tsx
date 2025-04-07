import React, { useState, useEffect } from 'react';

interface OfferCountdownProps {
    expirationDate: string;
}

interface TimeRemaining {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    total: number;
}

const OfferCountdown: React.FC<OfferCountdownProps> = ({ expirationDate }) => {
    const [timeRemaining, setTimeRemaining] = useState<TimeRemaining>({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        total: 0
    });

    const calculateTimeRemaining = (): TimeRemaining => {
        const difference = new Date(expirationDate).getTime() - new Date().getTime();

        if (difference <= 0) {
            return {
                days: 0,
                hours: 0,
                minutes: 0,
                seconds: 0,
                total: 0
            };
        }

        return {
            days: Math.floor(difference / (1000 * 60 * 60 * 24)),
            hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((difference / 1000 / 60) % 60),
            seconds: Math.floor((difference / 1000) % 60),
            total: difference
        };
    };

    useEffect(() => {
        const updateTimer = (): void => {
            setTimeRemaining(calculateTimeRemaining());
        };

        // Initial calculation
        updateTimer();

        // Update every second
        const timerId = setInterval(updateTimer, 1000);

        return () => {
            clearInterval(timerId);
        };
    }, [expirationDate]);

    const formatNumber = (num: number): string => {
        return num < 10 ? `0${num}` : num.toString();
    };

    if (timeRemaining.total <= 0) {
        return <p className="text-danger">Expired</p>;
    }

    return (
        <p className="countdown-timer">
            {timeRemaining.days > 0 && `${timeRemaining.days}d `}
            {formatNumber(timeRemaining.hours)}h {formatNumber(timeRemaining.minutes)}m {formatNumber(timeRemaining.seconds)}s
        </p>
    );
};

export default OfferCountdown;