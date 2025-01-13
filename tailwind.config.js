/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // Vite 프로젝트에 맞는 파일 확장자 추가
  ],
  theme: {
    extend: {
      // 우리만의 서비스에 사용할 색상 추가
      colors: {
        brand: {
          light: "#3B82F6",
          DEFAULT: "#1E40AF",
          dark: "#1E3A8A",
        },
      },
      spacing: {
        72: "18rem",
        84: "21rem",
        96: "24rem",
      },
    },
  },
  plugins: [],
};
