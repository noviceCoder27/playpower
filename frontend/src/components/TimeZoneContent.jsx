import React from 'react';
import moment from 'moment-timezone';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import './TimeZone.css';
import { formatDate } from '../utils/formatDate';
import { useThemeContext } from './../context/ThemeContext';

const TimeZoneContent = ({ timeZones, setTimeZones, time, setTime, date }) => {

  const {lightTheme} = useThemeContext();

  const onDragEnd = (result) => {
    if (!result.destination) return;
    const reorderedTimeZones = Array.from(timeZones);
    const [removed] = reorderedTimeZones.splice(result.source.index, 1);
    reorderedTimeZones.splice(result.destination.index, 0, removed);
    setTimeZones(reorderedTimeZones);
  };

  const removeTimeZone = (index) => {
    const updatedTimeZones = timeZones.filter((_, i) => i !== index);
    setTimeZones(updatedTimeZones);
  };

  const handleRangeChange = (minutes, timezone) => {
    const newTime = moment.tz(timezone).startOf('day').add(minutes, 'minutes').format('HH:mm');
    setTime(moment.tz(newTime, 'HH:mm', timezone).utc().format('HH:mm'));
  };

  const getGMTOffset = (zone) => {
    const offset = moment.tz(zone.timezone).format('Z');
    return `GMT${offset}`;
  };

  const calculateSliderValue = (timezone) => {
    const zoneTime = moment.tz(`${date} ${time}`, 'YYYY-MM-DD HH:mm', 'UTC').tz(timezone);
    const minutes = zoneTime.hours() * 60 + zoneTime.minutes();
    return minutes % 1440; 
  };

  const wrapSliderValue = (value) => {
    if (value >= 1440) {
      return value - 1440;
    } else if (value < 0) {
      return value + 1440;
    }
    return value;
  };

  const handleWrappedRangeChange = (value, timezone) => {
    let minutes = parseInt(value);
    minutes = wrapSliderValue(minutes);
    handleRangeChange(minutes, timezone);
  };

  return (
    <div className="w-full p-4 mx-auto">
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="timezones">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {timeZones.map((zone, index) => (
                <Draggable key={zone.timezone} draggableId={zone.timezone} index={index}>
                  {(provided) => (
                    <div
                      className="flex relative flex-col items-center justify-between w-full p-2 mb-2 bg-gray-100 border border-gray-300 rounded"
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <div className="flex justify-between w-full gap-2 flex-wrap max-sm:justify-center">
                        <div>
                          <div className={`font-bold text-[1.5rem] mb-[1rem] ${lightTheme ? "text-gray-500": "text-black"}`}>{zone.title}</div>
                          <div className={`${lightTheme ? "text-gray-500": "text-black"}`}>{zone.timezone}</div>
                        </div>
                        <div className="flex gap-5 mr-10 max-sm:mr-[-2rem]">
                          <div className="relative flex flex-col justify-center">
                            <input
                              type="time"
                              value={moment.tz(`${date} ${time}`, 'YYYY-MM-DD HH:mm', 'UTC').tz(zone.timezone).format('HH:mm')}
                              onChange={(e) => setTime(moment.tz(e.target.value, 'HH:mm', zone.timezone).utc().format('HH:mm'))}
                              className="w-full p-2 mt-auto mb-auto border rounded h-fit"
                            />
                            <div className="absolute flex gap-10 -left-16 -bottom-3 w-[400px]">
                              <p className="text-gray-500">{getGMTOffset(zone)}</p>
                              <p className="text-gray-500">{formatDate(date)}</p>
                            </div>
                          </div>
                          <button
                            onClick={() => removeTimeZone(index)}
                            className="absolute top-0 right-2 rounded-full font-bold text-red-600 hover:text-red-800 hover:bg-red-200 h-[25px] w-[25px] flex items-center justify-center"
                          >
                            x
                          </button>
                        </div>
                      </div>

                      <div className="w-full mt-6 mb-4">
                        <div className="relative">
                          <div className="absolute flex justify-between w-[88%] text-xs text-gray-500 left-2 top-5">
                            {['12am', '3am', '6am', '9am', '12pm', '3pm', '6pm', '9pm'].map((label, i) => (
                              <span key={i} style={{ transform: 'translateX(-50%)' }}>{label}</span>
                            ))}
                          </div>
                          <input
                            type="range"
                            min="0"
                            max="1439"
                            step="15"
                            value={calculateSliderValue(zone.timezone)}
                            onChange={(e) => handleWrappedRangeChange(e.target.value, zone.timezone)}
                            className="w-full custom-range"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default TimeZoneContent;
