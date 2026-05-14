import React, { useState } from 'react';

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: 'Do I get lifetime access for the course?',
      answer: 'Yes, once you enroll in any course, you get lifetime access to all the course materials including video lectures, assignments, and resources. You can revisit the content anytime at your own pace.',
    },
    {
      question: 'If I pay for a course now, will I able to start the course later?',
      answer: 'Absolutely! Your enrollment is valid for a lifetime. You can start the course whenever you are ready. There is no time limit to begin or complete the course.',
    },
    {
      question: 'How will I get certificates for my course?',
      answer: 'Upon successful completion of the course and all assignments, you will receive a digital certificate that you can download and share on your LinkedIn profile or resume.',
    },
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="w-full bg-white py-16 lg:py-20">
      <div className="max-w-225 mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-10">
          <h2 
            className="text-[32px] lg:text-[40px] font-bold text-[#1a1a2e] mb-4"
            style={{ fontFamily: "'Rubik', sans-serif" }}
          >
            Still have Doubts?
          </h2>
          <p 
            className="text-[16px] lg:text-[18px] text-gray-500"
            style={{ fontFamily: "'Rubik', sans-serif" }}
          >
            We have answered some of the frequent questions for you!
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="flex flex-col gap-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                openIndex === index
                  ? 'bg-[#e8eaff] border-[#c7d2fe] shadow-sm'
                  : 'bg-[#e8eaff] border-[#c7d2fe]'
              }`}
            >
              {/* Question Button */}
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex items-center justify-between px-6 py-5 text-left bg-transparent border-none cursor-pointer"
              >
                <span 
                  className="text-[16px] lg:text-[18px] font-semibold text-[#1a1a2e] pr-4"
                  style={{ fontFamily: "'Rubik', sans-serif" }}
                >
                  {faq.question}
                </span>
                <div 
                  className={`w-8 h-8 shrink-0 flex items-center justify-center rounded-full bg-white shadow-sm transition-transform duration-300 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                >
                  <svg 
                    viewBox="0 0 24 24" 
                    className="w-4 h-4 text-[#1a1a2e]"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </div>
              </button>

              {/* Answer Content */}
              <div 
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  openIndex === index ? 'max-h-75 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="px-6 pb-5">
                  <p 
                    className="text-[15px] text-gray-600 leading-relaxed"
                    style={{ fontFamily: "'Rubik', sans-serif" }}
                  >
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;

