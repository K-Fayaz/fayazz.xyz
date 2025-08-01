import React from 'react';
import { useNavigate } from 'react-router-dom';

const TwelveN12Page: React.FC = () => {
  const navigate = useNavigate();

  // Get current month and year
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  // Generate months array starting from June
  const months = Array.from({ length: 12 }, (_, i) => {
    const month = (5 + i) % 12; // Start from June (5)
    const year = currentYear + Math.floor((5 + i) / 12);
    return {
      month,
      year,
      isPast: (year < currentYear) || (year === currentYear && month < currentMonth),
      isCurrent: year === currentYear && month === currentMonth,
      isFuture: (year > currentYear) || (year === currentYear && month > currentMonth)
    };
  });

  const monthNames = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];

  const projects = [
    'LoremAPIs - An AI based mock API builder',
    'Journal-to-Tweet - The AI second brain for your online presence.',
    'Social Media Screenshot Tool',
    'To be decided',
    'To be decided',
    'To be decided',
    'To be decided',
    'To be decided',
    'To be decided',
    'To be decided',
    'To be decided',
    'To be decided'
  ];

  const handleMonthClick = (monthName: string) => {
    navigate(`/12n12/${monthName}`);
  };

  return (
    <div className="min-h-screen pt-24 px-4 md:px-8 pb-16">
      {/* Title Section */}
      <div className="max-w-4xl mx-auto mb-12 text-center">
        <h1 className="text-5xl font-light mb-6">12N12</h1>
        <p className="text-2xl text-gray-400 mb-8">
          Building 12 projects in 12 months
        </p>
      </div>

      {/* Description Section */}
      <div className="max-w-3xl mx-auto mb-12">
        <h2 className="text-2xl font-light mb-4">What is 12N12?</h2>
        <p className="text-gray-400 leading-relaxed">
          A personal challenge to build and launch 12 meaningful projects over 12 months, 
          starting from June. Each project will be a unique opportunity to learn, create, 
          and contribute something valuable to the community.
        </p>
      </div>

      {/* Mission Section */}
      <div className="max-w-3xl mx-auto mb-16">
        <h2 className="text-2xl font-light mb-4">Why 12N12?</h2>
        <p className="text-gray-400 leading-relaxed">
          The mission is simple: consistent growth through action. Instead of just learning 
          in theory, I'm committing to building real projects that solve real problems. 
          Each month brings a new challenge, a new technology to master, and a new opportunity 
          to make an impact. This journey is about pushing boundaries, embracing discomfort, 
          and turning ideas into reality.
        </p>
      </div>

      {/* Projects Grid */}
      <div className="max-w-3xl mx-auto">
        <div className="grid grid-cols-4 gap-4">
          {months.map(({ month, isPast, isCurrent, isFuture }, index) => (
            <div
              key={index}
              onClick={() => !isFuture && handleMonthClick(monthNames[month])}
              className={`
                relative h-12 rounded-lg p-4
                ${isPast ? 'bg-green-500/20 hover:bg-green-500/30 cursor-pointer' : ''}
                ${isCurrent ? 'bg-green-500/40 hover:bg-green-500/50 cursor-pointer' : ''}
                ${isFuture ? 'bg-[#121111] cursor-not-allowed' : ''}
                transition-all duration-300
                border border-[#121111]
                group
              `}
            >
              <div className="h-full flex flex-col justify-center items-center">
                <div className="text-sm text-gray-400 group-hover:text-white transition-colors">
                  {monthNames[month]}
                </div>
              </div>
              {/* Tooltip */}
              <div
                className={`
                  absolute bottom-full left-1/2 -translate-x-1/2 mb-2
                  bg-[#121111] text-white text-xs rounded-md py-1.5 px-3 whitespace-nowrap
                  opacity-0 pointer-events-none transition-all duration-300 z-50 transform translate-y-2
                  group-hover:opacity-100 group-hover:translate-y-0
                  before:content-[''] before:absolute before:left-1/2 before:top-full
                  before:-translate-x-1/2 before:border-t-[#121111] before:border-t-8
                  before:border-x-transparent before:border-x-4 before:border-b-0
                `}
              >
                {projects[index]}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TwelveN12Page; 