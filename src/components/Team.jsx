import React, { useEffect, useState } from 'react';

const API_KEY = 'AIzaSyC1lTT_RGPic5Br-cJU0FVrV3LwnS4pQTE';
const SHEET_ID = '1zLCoLKEF5u3H1Eff7ceAyZiKWuvu5uNRxtoi4iwF3og';

const Card = ({ entry }) => (
    <div className="card m-10">
        <div className="card__side card__side--front bg-white rounded-xl p-6 shadow-lg text-center">
            <img
                className="w-40 h-40 rounded-full mx-auto mb-4 object-cover"
                src={entry.image}
                alt={entry.name}
            />
            <h3 className="mt-2 text-lg font-medium text-gray-900">{entry.name}</h3>
            <p className="mt-2 text-sm text-gray-500">{entry.position}</p>
            <p className="mt-2 text-sm text-gray-500">{entry.department}</p>
        </div>
        <div className="card__side card__side--back flex flex-col justify-center items-center bg-slate-200 rounded-xl p-6 shadow-lg text-center space-y-4">
            <a href={`mailto:${entry.email}`} className="flex flex-col items-center">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-8 h-8 text-gray-900 mb-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                </svg>
                <p className="text-md text-indigo-700 hover:underline">{entry.email}</p>
            </a>
        </div>
    </div>
);

const TeamSection = () => {
    const [data, setData] = useState({});
    const roles = [
        { name: 'Faculty Coordinators', key: 'FC' },
        { name: 'Overall Coordinators', key: 'OC' },
        { name: 'Department Coordinators', key: 'DC' },
        { name: 'MRS Nominees', key: 'MRSNominee' },
        { name: 'Nominees', key: 'Nominee' },
    ];

    const fetchData = async (sheetName) => {
        const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${sheetName}?key=${API_KEY}`;
        try {
            const response = await fetch(url);
            const result = await response.json();
            const rows = result.values.slice(1); // Exclude header row
            return rows.map((row) => ({
                name: row[0],
                position: row[1],
                email: row[2],
                department: row[3],
                image: row[4],
            }));
        } catch (error) {
            console.error(`Error fetching ${sheetName} data:`, error);
            return [];
        }
    };

    useEffect(() => {
        (async () => {
            const newData = {};
            for (const role of roles) {
                newData[role.key] = await fetchData(role.key);
            }
            setData(newData);
        })();
    }, []);

    return (
        <div className="bg-slate-50 py-16 shadow-inner">
            <div className="px-8 text-center">
                <h2 className="font-lexend text-3xl py-10 tracking-tight text-slate-900 sm:text-[40px]">
                    Our Team
                </h2>
            </div>
            {roles.map((role) => (
                <div key={role.key}>
                    <p className="text-3xl text-center font-semibold text-indigo-600 my-6 tracking-wide uppercase">
                        {role.name}
                    </p>
                    <div className="flex justify-center items-center flex-wrap">
                        {data[role.key]?.map((entry, index) => (
                            <Card entry={entry} key={index} />
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default TeamSection;
