"use client"

import { useEffect, useState } from "react";

const location = {
  city: "Lagos",
  country: "NGA",
  timezone: "GMT+1",
};

const getLagosTime = () => {
  return new Date().toLocaleTimeString("en-GB", {
    timeZone: "Africa/Lagos",
    hour: "2-digit",
    minute: "2-digit",
  })
}

const Navigation = () => {
  const [time, setTime] = useState(getLagosTime)

  useEffect(() => {
    const interval = setInterval(() => setTime(getLagosTime()), 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <nav className="p-2 w-full flex items-center justify-between uppercase">
      <h1 className="text-base tracking-wide font-nosifer">joshua.enikele</h1>

      <ul className="flex items-center space-x-16 text-sm">
        <li>home</li>
        <li>work</li>
        <li>contact</li>
      </ul>

      <div className="text-sm">{location.city}, {location.country}: ({location.timezone}) {time}</div>
    </nav>
  )
}

export default Navigation