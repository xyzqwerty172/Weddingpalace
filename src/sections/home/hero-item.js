import Box from "@mui/material/Box";
import CarouselAnimation from "../../components/carousel-view/carousel-animation";
import { dataPlaceholder } from "../../components/carousel-view/data-placeholder";
import PatternStrip from "../../components/pattern-strip";

export default function HeroItem(params) {
  return (
    <Box sx={{ position: "relative" }}>
      <CarouselAnimation
        sx={{ borderRarius: 0, border: 5, borderColor: "error.main" }}
        data={dataPlaceholder.slice(0, 3)}
      />
      
      {/* Pattern strip positioned below the carousel */}
      <PatternStrip 
        src="/logo/pattern.png"
        height={60}
        opacity={0.9}
        sx={{
          position: "relative",
          marginTop: 0,
          zIndex: 2,
        }}
      />
    </Box>
  );
}
