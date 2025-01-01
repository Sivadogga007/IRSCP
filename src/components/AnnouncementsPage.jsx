import React, { useEffect, useState } from 'react';

export default function AllAnnouncements() {
  const [announcementData, setAnnouncementData] = useState([]);
  const API_KEY = 'AIzaSyC1lTT_RGPic5Br-cJU0FVrV3LwnS4pQTE';
  const SHEET_ID = '1dG0_jHTfJEvbX89u3-f7fujL50ozmLd3KRAuzD0CsHU';

  const formatDateTime = (timestamp) => {
    const date = new Date(timestamp);

    const formattedDate = date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });

    const formattedTime = date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });

    return { date: formattedDate, time: formattedTime };
  };

  const fetchData = async (sheetName) => {
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${sheetName}?key=${API_KEY}`;
    try {
      const response = await fetch(url);
      const result = await response.json();
      const rows = result.values.slice(1);
      const formattedData = rows.map(row => ({
        timestamp: row[0],
        text: row[1],
        place: row[2],
      }));
      setAnnouncementData(formattedData.reverse());
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData('Announcements');
  }, []);

  return (
    <div className="bg-gray-100 px-3 py-10 md:px-7 relative  border-t border-gray-200">
      <h2 className="text-3xl leading-8 mt-10 font-lexend tracking-tight text-gray-900 sm:text-[40px] text-center">
        All Announcements
      </h2>
      <ul
        role="list"
        className="grid grid-cols-1 mt-6 gap-6 p-4 sm:grid-cols-2 lg:grid-cols-3"
      >
        {announcementData.map((announcement, index) => {
          const { date, time } = formatDateTime(announcement.timestamp);
          return (
            <li
            key={announcement.text}
            className="flex flex-col sm:flex-row rounded-2xl bg-white p-6 border border-gray-1 justify-between gap-x-6 transition-all duration-300 ease-in-out"
          >
            <div className="flex min-w-0 gap-x-4">
              <div className="min-w-0 w-96 flex-auto">
                <p className="font-semibold leading-6 text-gray-900">{announcement.text}</p>
                <p className="mt-1 truncate text-xs leading-5 text-gray-500">{announcement.place}</p>
              </div>
            </div>
            <div className="shrink-0 flex sm:flex-col sm:items-end">
              <p className="hidden sm:flex text-sm leading-6 text-gray-900">{time}</p>
              <p className="text-sm leading-6 text-gray-900">{date}</p>
            </div>
          </li>
          );
        })}
      </ul>
    </div>
  );
}
