import { useState } from "react";
import moment from 'moment-timezone';
import TimeZoneContent from "./TimeZoneContent";
import allTimeZones from './../timezones.json'
import { useEffect } from "react";
import ReverseIcon from './../assets/reverse.png'
import ShareIcon from './../assets/link.png'
import SunIcon from './../assets/sun.png'
import MoonIcon from './../assets/moon.png'
import { useThemeContext } from "../context/ThemeContext";
import './TimeZone.css'


const TimeConverter = ({setShowPopup}) => {
  const availableTimeZones = allTimeZones;
  const {lightTheme,setLightTheme} = useThemeContext();  
  const [timeZones, setTimeZones] = useState([
    { title: "Universal Time Coordinated", timezone: 'UTC' },
    { title: "Indian Standard Time", timezone: 'Asia/Kolkata' }
  ]);
  const [time, setTime] = useState(moment.utc().format('HH:mm'));
  const [date, setDate] = useState(moment().format('YYYY-MM-DD'));
  
  const generateShareableLink = () => {
    const state = {
      timeZones,
      time,
      date,
    };
    const encodedState = encodeURIComponent(JSON.stringify(state));
    const url = `${window.location.origin}?state=${encodedState}`;
    navigator.clipboard.writeText(url).then(() => {
      setShowPopup(true);
      setTimeout(() => {
        setShowPopup(false);
      },1000);
    });
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const encodedState = params.get('state');
    if (encodedState) {
      const decodedState = JSON.parse(decodeURIComponent(encodedState));
      setTimeZones(decodedState.timeZones);
      setTime(decodedState.time);
      setDate(decodedState.date);
    }
  }, []);

  const addTimeZone = (timezone) => {
    const zone = availableTimeZones.find((z) => z.timezone === timezone);
    if (zone && !timeZones.some((tz) => tz.timezone === zone.timezone)) {
      setTimeZones([...timeZones, zone]);
    }
  };

  const handleDateChange = (e) => {
    const selectedDate = e.target.value;
    setDate(selectedDate);
    const newTime = moment.tz(`${selectedDate} ${time}`, 'YYYY-MM-DD HH:mm', 'UTC').format('HH:mm');
    setTime(newTime);
  };

  const reverseTimeZones = () => {
    setTimeZones([...timeZones].reverse());
  };

  return (
    <div className={`max-lg:w-[90%] w-[60%] mt-10 border-2 border-gray-700 max-sm:h-[80vh] h-[70vh] min-h-[400px] ${lightTheme ? "bg-white" : "bg-gray-500"} overflow-y-hidden`}>
      <div className={`w-full p-3 ${lightTheme ? "bg-gray-700": "bg-black" }`}>
        <div className="relative flex flex-wrap justify-between w-full gap-2">
          <div className="mt-4 w-[50%]">
            <select
              onChange={(e) => addTimeZone(e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="">Add Timezone</option>
              {availableTimeZones.map((zone, index) => (
                <option key={index} value={zone.timezone}>{zone.title}</option>
              ))}
            </select>
          </div>
          <div className="flex gap-2 mt-auto">
            <input
              type="date"
              value={date}
              onChange={handleDateChange}
              className="px-2 py-1 border rounded"
            />
            <div className="flex items-center gap-2">
              <button
                onClick={reverseTimeZones}
                className="px-4 py-1 text-white bg-blue-400 rounded hover:bg-blue-500"
              >
                <img src = {ReverseIcon} alt = "Reverse Icon" className="w-8"/>
              </button>
              <button
                onClick={generateShareableLink}
                className="px-4 py-1 text-white bg-blue-400 rounded hover:bg-blue-500"
              >
                <img src = {ShareIcon} alt = "Link Icon" className="w-8"/>
              </button>
              <button
                onClick={() => setLightTheme(prev => !prev)}
                className="px-4 py-1 text-white bg-blue-400 rounded hover:bg-blue-500"
              >
                {lightTheme? 
                <img src = {SunIcon} alt = "Sun Icon" className="w-8"/>
                :
                <img src = {MoonIcon} alt = "Moon Icon" className="w-8"/>
                }
              </button>
            </div>
            
          </div>
        </div>
      </div>
      <div className="h-[80%] overflow-y-scroll overflow-x-hidden container">
        <TimeZoneContent
          timeZones={timeZones}
          setTimeZones={setTimeZones}
          time={time}
          setTime={setTime}
          date={date}
        />
      </div>
    </div>
  );
};

export default TimeConverter;
