import { useState } from "react";

const FAQ = () => {
    const [openIndex, setOpenIndex] = useState(null);

    const toggleAccordion = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section
            id="FAQs"
            aria-labelledby="faq-title"
            className="relative overflow-hidden border-t border-slate-200 bg-slate-50 py-20 sm:py-32"
        >
            <img
                alt=""
                loading="lazy"
                width={1558}
                height={946}
                decoding="async"
                data-nimg={1}
                className="absolute left-1/2 top-0 max-w-none -translate-y-1/4 translate-x-[-30%]"
                style={{ color: "transparent" }}
                src="https://salient.tailwindui.com/_next/static/media/background-faqs.55d2e36a.jpg"
            />
            <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-2xl lg:mx-0">
                    <h2
                        id="faq-title"
                        className="font-lexend text-3xl tracking-tight text-slate-900 sm:text-[40px]"
                    >
                        Frequently Asked Questions
                    </h2>
                    <p className="mt-6 text-lg tracking-tight text-slate-700">
                        For any other help, don’t hesitate to contact IRSCP Members. We’re
                        always ready to help you! Wish you a happy and successful journey in
                        IIT Bombay.
                    </p>
                </div>
                <section className="mt-12">
                    <dl className="divide-y divide-gray-300">
                        {faqData.map((faq, index) => (
                            <div key={index} className="py-4">
                                <summary
                                    onClick={() => toggleAccordion(index)}
                                    className="flex cursor-pointer items-center justify-between text-xl font-lexend text-slate-900 group hov"
                                >
                                    {faq.question}
                                    <svg
                                        className={`ml-4 mt-0.5 h-6 w-6 flex-none stroke-slate-700 transition-transform duration-300 ease-in-out ${openIndex === index ? "rotate-180" : ""
                                            }`}
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                        strokeWidth={2}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <path d="M18 12H6" />
                                        <path className={`${openIndex === index ? "hidden" : ""}`} d="M12 6v12" />
                                    </svg>
                                </summary>
                                <div
                                    className={`overflow-hidden transition-[max-height] duration-500 ease-in-out ${openIndex === index ? "max-h-screen" : "max-h-0"
                                        }`}
                                >
                                    <div className="pt-4 text-lg text-slate-700">
                                        <div
                                            className="prose prose-slate max-w-none"
                                            dangerouslySetInnerHTML={{
                                                __html: faq.answer.replace(/\n/g, "<br />"),
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </dl>
                </section>
            </div>
        </section>
    );
};


const faqData = [
    {
        question: "How do I reach IIT Bombay?",
        answer: `Railway:
        If you get down at Mumbai Central, you can take a local train to Andheri, which is the nearest station to IIT Bombay in the Western Railway suburban line.

        If you get down at Kalyan/Dadar/Thane/CST which comes under the Central Railway suburban line, you can take a slow local to Kanjur Marg/Vikhroli which are the nearest local stations to IIT Bombay.
        
        On reaching any of the railway stations you can take a bus/taxi or auto-rickshaw to IIT Bombay.
        From Lokmanya Tilak Terminus, you may take an auto/taxi to IITB as taking a local train might involve too many changeovers.
      
        Note: Auto-rickshaws and Black-Yellow Taxis in Mumbai charge you by the meter hence there is no necessity to haggle.
        
        Airport:
        IIT Bombay is around 10 km from Chhatrapati Shivaji International Airport, Mumbai, and around 12 km from Santacruz Domestic Airport. Please make use of the prepaid taxi/auto-rickshaw services available at both domestic and international terminals to reach IIT Bombay if that is your preferred choice.
        
        You can also book an Ola/Uber from the airport.`,
    },
    {
        question: "What are my hostel and room number?",
        answer: `If you have opted for hostel accommodation, then a mail regarding accommodation facility (temporary/permanent) is usually sent a few days before orientation. You are required to show your ID card and offer letter to avail of the facility. You can go to the Hall Manager’s office of your assigned hostel to complete the required paperwork and get your room number.
       
        For any dispute and queries, you can contact, Hostels Coordinating Unit (HCU) at hcu.office@iitb.ac.in.
        In case, if you have not received any details about accommodation, you can call your IRSCP mentor for assistance.`,
    },
    {
        question: "Is there any provision for married students’ accommodation?",
        answer: `A married student may apply for married students’ quarters after his/her coursework is over. However, due to limitations in availability, the waiting list is long and it may take up to 2 years. Since HRAs are available for Ph.D. scholars, there is always an option of renting a house outside the campus.`,
    },
    {
        question: "Is there any provision for the accommodation for parents?",
        answer: `There is no provision for the accommodation for parents. We would recommend taking a hotel nearby for parents.`,
    },
    {
        question: "What is the schedule of Orientation? What if I miss it?",
        answer: `Generally the full schedule of orientation is about 3 days.

        First day is for Institute Orientation. Registration Kit, PhD Handbooks, IRSCP Handbooks are provided on this day. You are informed the various facilities available at IIT Bombay, extracurricular activities, the various clubs in IIT Bombay, etc.
        
        Second day is for Department Orientation and details on course registration.
        
        Third day is for Departmental labs visit and other activities. You may get to interact with the seniors in your department (Very beneficial!).
        
        We recommend that you do not miss any of the days as they can be very beneficial for you. However, in case you miss it for any reason, we suggest you write an email to your department for the absence.`,
    },
    {
        question: "What documents do I need to bring during the orientation?",
        answer: `Kindly try to bring the following documents:
        ● Offer letter from IIT Bombay
        ● Qualifying Exam Scorecard (Gate/JAM/CEED)
        ● 10th and 12th marksheets
        ● Semester wise grade sheet or mark-sheet / Final transcript
        ● Provisional Degree Certificate / Degree Certificate
        ● Migration / Transfer Certificate
        ● Passport size photograph (at least 10)
        ● ID and Address proof (PAN card, Driving License, Passport, Voter ID)
        
        Note: In case if you cannot furnish your migration certificate, there is usually a window period within which you can submit. We recommend that you have printed copies of all documents beforehand for your own convenience.`,
    },
    {
        question: "Is there any provision for financial aid/assistance?",
        answer: `As an IIT Bombay student, there are a bunch of options regarding financial aid. Several banks usually have their stalls set up during the orientation and you may approach any for education loans. It is recommended that you bring a parent in case you are looking for an education loan.

        IIT Bombay Alumni Association also provides need-based education loans at a relatively lower interest rate (compared to Banks) with ease. IIT Bombay Student Benevolent Fund supports extremely poor/needy students based on the approval of a Deciding Committee for rare cases.`,
    },
    {
        question: "I’ve not taken vaccination yet, will there be a problem?",
        answer: `It’s better if you are already vaccinated but if you’re not, don’t worry! IITB Hospital regularly organises vaccination drives. You can take your vaccination there.

        If you’ve any medical problem with vaccination, consult a Physician of IITB Hospital. If you’ve any other proofs of vaccination apart from the format given by IIT Bombay, bring it with you.`,
    },
    {
        question: "Where can I get a new SIM Card?",
        answer: `Usually, a shop for new SIM cards is set up in some Hostel. You need a Residential Address for the SIM Card, which you can get from your Hall Manager.

        For SIM Card: You need one or two photos, Voter ID, residential certificate from Hall Manager.`,
    },
    {
        question: "What about ATM, Bank, Post Office, and Printing Facilities?",
        answer: `SBI ATM: One near Old SAC/H1 where SBI Powai Branch is located. One at Tansa House, Near H5.
        
        Canara Bank ATM and Saraswat Bank Building at Gulmohar Building.
        
        IIT Powai Post Office is situated at YPoint Gate. It also issues Railway Reservation Tickets.
        
        Every Hostel also has printing and xerox facilities.

        For any other help, don’t hesitate to contact IRSCP Members. We’re always ready to help you!
        Wish you a happy and successful journey in IIT Bombay.`,
    },
];


export default FAQ;
