import CarouselAnimation from "../../components/carousel-view/carousel-animation";
import { dataPlaceholder } from "../../components/carousel-view/data-placeholder";

export default function HeroItem(params) {
  return (
    <CarouselAnimation
      sx={{ borderRarius: 0, border: 5, borderColor: "error.main" }}
      data={dataPlaceholder.slice(0, 3)}
    />
  );
}
