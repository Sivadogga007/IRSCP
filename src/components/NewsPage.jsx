import React, { useEffect, useState } from 'react';

const API_KEY = 'AIzaSyC1lTT_RGPic5Br-cJU0FVrV3LwnS4pQTE';
const SHEET_ID = '1dG0_jHTfJEvbX89u3-f7fujL50ozmLd3KRAuzD0CsHU';

const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
    });
};

const NewsPage = () => {

    const [newsArticles, setNewsArticles] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchData = async (sheetName) => {
        const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${sheetName}?key=${API_KEY}`;
        try {
            const response = await fetch(url);
            const result = await response.json();

            if (result.values) {
                const rows = result.values.slice(1);
                const formattedData = rows.map((row) => ({
                    timestamp: row[0] || '',
                    image: row[1] || 'placeholder-image-url.jpg',
                    title: row[2] || 'No Title Available',
                    description: row[3] || 'No Description Available',
                    location: row[4] || 'Unknown Location',
                    url: row[5] || '',
                }));
                setNewsArticles(formattedData.reverse());
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData('NEWS');
    }, []);

    return (
        // <div className="bg-slate-50">
        <div className="bg-gray-100 py-10 relative border-t border-gray-200">
            <h2 className="text-3xl leading-8 mt-10 font-lexend tracking-tight text-gray-900 sm:text-[40px] text-center">
                All News
            </h2>
            <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
                    {isLoading ? (
                        <p className="text-center text-gray-500">Loading news...</p>
                    ) : (
                        <>
                            {newsArticles.map((article) => (
                                <div
                                    key={article.timestamp}
                                    className="slider rounded-2xl bg-white bg-opacity-30 p-6 transition duration-300 shadow"
                                >
                                    <img
                                        src={article.image}
                                        alt={article.title || 'News'}
                                        className="h-48 w-full object-cover rounded-lg"
                                        loading="lazy"
                                        onError={(e) => {
                                            e.target.src = 'placeholder-image-url.jpg';
                                        }}
                                    />
                                    <div className="min-h-48 p-2">
                                        <h3 className="text-balance text-lg font-medium text-gray-900">
                                            {article.title}
                                        </h3>
                                        <span className="flex justify-between items-center text-sm text-gray-500">
                                            <p className="text-gray-500">{article.location}</p>
                                            <p className="text-gray-500">{formatDate(article.timestamp)}</p>
                                        </span>

                                        <p className="text-balance mt-2 text-gray-700">{article.description}</p>
                                        {article.url && (
                                            <a
                                                href={article.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-indigo-600 hover:text-indigo-800 font-semibold"
                                            >
                                                Read More
                                            </a>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </>

                    )}

                </div>
            </div>
        </div>
    );
};

export default NewsPage;
