import PropTypes from "prop-types";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Paper from "@mui/material/Paper";
import { alpha, useTheme } from "@mui/material/styles";

import { grey } from "src/theme/palette";

import Image from "src/components/image";
import { varFade, MotionContainer } from "src/components/animate";
import Carousel, {
  useCarousel,
  CarouselArrowIndex,
} from "src/components/carousel";
import { useResponsive } from "src/hooks/use-responsive";

// ----------------------------------------------------------------------

export default function CarouselAnimation({ data }) {
  const carousel = useCarousel({
    speed: 800,
    autoplay: true,
  });

  return (
    <Card sx={{ border: 0, borderRadius: 0 }}>
      <Carousel ref={carousel.carouselRef} {...carousel.carouselSettings}>
        {data.map((item, index) => (
          <CarouselItem
            key={item.id}
            item={item}
            active={index === carousel.currentIndex}
          />
        ))}
      </Carousel>

      <CarouselArrowIndex
        index={carousel.currentIndex}
        total={data.length}
        onNext={carousel.onNext}
        onPrev={carousel.onPrev}
      />
    </Card>
  );
}

CarouselAnimation.propTypes = {
  data: PropTypes.array,
};

// ----------------------------------------------------------------------

function CarouselItem({ item, active }) {
  const theme = useTheme();
  const mdUp = useResponsive("up", "md");

  const { coverUrl, title } = item;

  const variants =
    theme.direction === "rtl" ? varFade().inLeft : varFade().inRight;

  return (
    <Paper sx={{ position: "relative" }}>
      {mdUp && <Image dir="ltr" alt={title} src={coverUrl} ratio="24/9" />}
      {!mdUp && <Image dir="ltr" alt={title} src={coverUrl} ratio="3/4" />}
      <Box
        sx={{
          top: 0,
          width: 1,
          height: 1,
          position: "absolute",
        }}
      />
    </Paper>
  );
}

CarouselItem.propTypes = {
  active: PropTypes.bool,
  item: PropTypes.object,
};
