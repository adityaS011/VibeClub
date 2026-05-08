"use client";

import { useEffect, useState } from "react";
import { Clock } from "lucide-react";

type EventCountdownProps = {
  startDateTime: Date;
  endDateTime: Date;
};

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

const EventCountdown = ({ startDateTime, endDateTime }: EventCountdownProps) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);
  const [status, setStatus] = useState<"upcoming" | "live" | "ended">("upcoming");

  useEffect(() => {
    const calculate = () => {
      const now = Date.now();
      const start = new Date(startDateTime).getTime();
      const end = new Date(endDateTime).getTime();

      if (now >= end) {
        setStatus("ended");
        setTimeLeft(null);
        return;
      }
      if (now >= start) {
        setStatus("live");
        setTimeLeft(null);
        return;
      }

      const diff = start - now;
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((diff % (1000 * 60)) / 1000),
      });
      setStatus("upcoming");
    };

    calculate();
    const timer = setInterval(calculate, 1000);
    return () => clearInterval(timer);
  }, [startDateTime, endDateTime]);

  if (status === "ended") {
    return (
      <div className="flex items-center gap-2 text-red-500 dark:text-red-400">
        <Clock className="h-4 w-4" />
        <span className="p-medium-14 font-semibold">Event has ended</span>
      </div>
    );
  }

  if (status === "live") {
    return (
      <div className="flex items-center gap-2">
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" />
        </span>
        <span className="p-medium-14 font-semibold text-green-600 dark:text-green-400">
          Live now!
        </span>
      </div>
    );
  }

  if (!timeLeft) return null;

  const units = [
    { value: timeLeft.days, label: "Days" },
    { value: timeLeft.hours, label: "Hrs" },
    { value: timeLeft.minutes, label: "Min" },
    { value: timeLeft.seconds, label: "Sec" },
  ];

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-1.5 text-grey-500 dark:text-grey-400">
        <Clock className="h-4 w-4" />
        <span className="p-regular-14">Starts in</span>
      </div>
      <div className="flex gap-2">
        {units.map(({ value, label }) => (
          <div
            key={label}
            className="flex flex-col items-center bg-primary-500/10 dark:bg-primary-500/20 rounded-xl px-3 py-2 min-w-[52px]"
          >
            <span className="text-xl font-bold text-primary-500 tabular-nums leading-tight">
              {String(value).padStart(2, "0")}
            </span>
            <span className="text-[10px] text-grey-500 dark:text-grey-400 uppercase tracking-wider">
              {label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventCountdown;
