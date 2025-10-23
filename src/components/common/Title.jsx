// 🧱 Title77 – Main Hero Heading
export const Title77 = ({ className = "", children }) => {
  return (
    <h1
      style={{
        textShadow: "-8px 6px 8px #5F8792",
      }}
      className={`${className} font-bold text-white 
        text-[32px] sm:text-[44px] md:text-[60px] lg:text-[77px] leading-tight`}
    >
      {children}
    </h1>
  );
};

// 🧱 Title32 – Section Subtitle or Highlight
export const Title32 = ({ className = "", children }) => {
  return (
    <h2
      className={`${className} font-semibold text-white 
        text-[16px] sm:text-[20px] md:text-[26px] lg:text-[32px] leading-relaxed`}
    >
      {children}
    </h2>
  );
};

// 🧱 Title97 – Big Decorative Heading
export const Title97 = ({ className = "", children }) => {
  return (
    <h1
      className={`${className} font-bold text-[#6A594D]
        text-[40px] sm:text-[60px] md:text-[80px] lg:text-[97px] leading-[1.1]`}
      style={{ textShadow: "-7px 3px 4px rgba(70, 65, 59, 0.3)" }}
    >
      {children}
    </h1>
  );
};

// 🧱 Title20 – Small Heading / Section Title
export const Title20 = ({ className = "", children }) => {
  return (
    <h3
      className={`${className} font-medium text-secondaryColor 
        text-[14px] sm:text-[16px] md:text-[18px] lg:text-[20px]`}
    >
      {children}
    </h3>
  );
};

// 🧱 Title16 – Small Paragraph Title / Caption
export const Title16 = ({ className = "", children }) => {
  return (
    <h4
      className={`${className} font-normal text-secondaryColor 
        text-[12px] sm:text-[14px] md:text-[15px] lg:text-[16px]`}
    >
      {children}
    </h4>
  );
};
