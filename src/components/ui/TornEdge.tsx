export function TornEdge({ position = "bottom", fill = "text-off-white" }: { position?: "top" | "bottom", fill?: string }) {
  // A jagged polygon to simulate torn paper
  return (
    <div className={`absolute left-0 w-full z-20 overflow-hidden leading-none ${position === "top" ? "top-0 -translate-y-[1px]" : "bottom-0 translate-y-[1px]"}`}>
      <svg
        viewBox="0 0 1200 20"
        preserveAspectRatio="none"
        className={`block w-full h-4 md:h-6 lg:h-8 ${fill} ${position === "top" ? "rotate-180" : ""}`}
      >
        <polygon 
          points="0,20 0,0 15,10 30,2 45,15 60,5 75,12 90,1 105,18 120,4 135,14 150,2 165,11 180,3 195,16 210,5 225,12 240,1 255,18 270,6 285,15 300,2 315,11 330,3 345,17 360,6 375,13 390,2 405,16 420,5 435,12 450,1 465,18 480,4 495,14 510,2 525,11 540,3 555,16 570,5 585,12 600,1 615,18 630,6 645,15 660,2 675,11 690,3 705,17 720,6 735,13 750,2 765,16 780,5 795,12 810,1 825,18 840,4 855,14 870,2 885,11 900,3 915,16 930,5 945,12 960,1 975,18 990,6 1005,15 1020,2 1035,11 1050,3 1065,17 1080,6 1095,13 1110,2 1125,16 1140,5 1155,12 1170,1 1185,18 1200,8 1200,20"
          fill="currentColor"
        />
      </svg>
    </div>
  );
}
