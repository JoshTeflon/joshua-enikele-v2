"use client";

import { useEffect, useState } from "react";

import { getLagosTime } from "@/lib/utils";
import me from "@/content/me.json";

const Navigation = () => {
  const navigationItems = ["home", "work", "contact"]

  const { firstName, lastName, location } = me

  const [time, setTime] = useState(getLagosTime)

  useEffect(() => {
    const interval = setInterval(() => setTime(getLagosTime()), 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <nav className="p-2 w-full flex items-center justify-between uppercase">
      <h1 className="text-base tracking-wide font-nosifer">{firstName}.{lastName}</h1>

      <ul className="flex items-center space-x-16 text-sm">
        {navigationItems.map((item) => (
          <li key={item} className="">{item}</li>
        ))}
      </ul>

      <div className="text-sm">{location.city}, {location.country}: ({location.timezone}) {time}</div>
    </nav>
  )
}

export default Navigation