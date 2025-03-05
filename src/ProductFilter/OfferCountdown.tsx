import { useState, useEffect, JSX } from "react";

interface TimeLeft {
    days?: number;
    hours?: number;
    minutes?: number;
    seconds?: number;
}

interface OfferCountdownProps {
    expirationDate: string;
}

const OfferCountdown: React.FC<OfferCountdownProps> = ({ expirationDate }) => {
    const calculateTimeLeft = () => {
        const difference = +new Date(expirationDate) - +new Date();
        let timeLeft: TimeLeft = {};

        if (difference > 0) {
            timeLeft = {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60),
            };
        }

        return timeLeft;
    };

    const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

    useEffect(() => {
        const timer = setTimeout(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearTimeout(timer);
    });

    const timerComponents: JSX.Element[] = [];

    Object.keys(timeLeft).forEach((interval) => {
        if (!timeLeft[interval as keyof TimeLeft]) {
            return;
        }

        timerComponents.push(
            <span key={interval}>
                {timeLeft[interval as keyof TimeLeft]} {interval}{" "}
            </span>
        );
    });

    return (
        <p className="offer_countdown mb-0">{timerComponents.length ? timerComponents : <span>Offer expired</span>}</p>
    );
};

export default OfferCountdown;
