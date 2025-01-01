import React from 'react';
import TeamSection from './Team';
import groupPhoto from "../files/group.webp"

const AboutPage = () => {
    return (
        <>
            <div className="bg-slate-50 py-10">
                <h2 className="font-lexend text-3xl text-center py-10 tracking-tight text-slate-900 sm:text-[40px]">
                    About Us
                </h2>
                <div className="max-w-[1425px] mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Upper Section: Image and Text */}
                    <div className="flex flex-col lg:flex-row lg:space-x-8 items-center lg:items-stretch">
                        {/* Left Side: Team Image */}
                        <div className="lg:w-7/12 flex-shrink-0">
                            <img
                                src={groupPhoto} // Replace with your team image URL
                                alt="Team"
                                className="w-full h-full rounded-lg shadow-lg object-cover"
                            />
                        </div>

                        {/* Right Side: Text */}
                        <div className="flex flex-col  mt-8 lg:mt-0 space-y-6">
                            <p className="text-md text-justify text-gray-700 leading-relaxed">
                                Institute Research Scholar Companion Programme (IRSCP) is a programme for the PhD Community of IIT Bombay with the primary objective to cater to the needs of research scholars.
                            </p>
                            <p className="text-md text-justify text-gray-700 leading-relaxed">
                                PhD life is a completely different chapter of student life in terms of cultural, socio-economic, and academic aspects. Newly arrived PhD students generally face many problems related to academic/non-academic issues. This led to the conception of the idea of companions for the new research scholars, similar to the Student Companion Programme for new post-graduate students. Companions will try to make life here at IITB feel like 'Home Away From Home' for newcomers.
                            </p>
                            <p className="text-md text-justify text-gray-700 leading-relaxed">
                                Under this program, a group of people is available in each department, called the companions group of the department. A companion will be assigned to every new PhD entrant to the department. They are to help new entrants regarding issues, whether academic or non-academic. They will guide them by conducting regular interactive sessions. New entrants can approach them anywhere, anytime without any hesitation.
                            </p>
                        </div>
                    </div>

                    {/* Lower Section: Three Boxes (Mission, Vision, History) */}
                    <div className="mt-16">
                        <ul role="list" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {boxesData.map((box) => (
                                <li
                                    key={box.title}
                                    className="rounded-lg p-6 bg-white shadow-md hover:shadow-xl transition-all duration-300 flex flex-col items-center justify-center"
                                    style={{ height: '300px' }} // Fixed height for consistent box size
                                >
                                    {/* Box Image */}
                                    <img
                                        className="w-36 h-36 object-cover rounded-lg "
                                        src={box.image}
                                        alt={box.title}
                                    />
                                    {/* Box Text */}
                                    <h3 className="text-xl font-semibold text-gray-800 sm:text-2xl md:text-3xl leading-tight tracking-tight mb-4">
                                        {box.title}
                                    </h3>
                                    <p className="text-center text-gray-700 text-base">{box.text}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
            <TeamSection />
        </>
    );
};

const boxesData = [
    {
        title: 'Mission',
        text: 'Our mission is to develop innovative technologies that improve the quality of life and address critical challenges.',
        image: '/files/1.png', // Replace with your actual image path
    },
    {
        title: 'Vision',
        text: 'We envision a future where technology empowers individuals and communities to reach their full potential.',
        image: '/files/2.png', // Replace with your actual image path
    },
    {
        title: 'History',
        text: 'Founded in 2010, our organization has a long history of innovation and dedication to excellence in technology.',
        image: '/files/3.png', // Replace with your actual image path
    }
];

export default AboutPage;
