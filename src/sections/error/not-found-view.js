"use client";

import { m } from "framer-motion";

import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import { RouterLink } from "src/routes/components";

import CompactLayout from "src/layouts/compact";
import { PageNotFoundIllustration } from "src/assets/illustrations";

import { varBounce, MotionContainer } from "src/components/animate";

// ----------------------------------------------------------------------

export default function NotFoundView() {
  return (
    <CompactLayout>
      <MotionContainer>
        <m.div variants={varBounce().in}>
          <Typography variant="h3" sx={{ mb: 2 }}>
            Уучлаарай, олдсонгүй
          </Typography>
        </m.div>

        <m.div variants={varBounce().in}>
          <Typography sx={{ color: "text.secondary" }}>
            Уучлаарай, бид таны хайж буй хуудсыг олж чадсангүй. Магадгүй та
            URL-г буруу бичсэн үү? Үг үсгийн алдаагаа шалгахаа мартуузай.
          </Typography>
        </m.div>

        <m.div variants={varBounce().in}>
          <PageNotFoundIllustration
            sx={{
              height: 260,
              my: { xs: 5, sm: 10 },
            }}
          />
        </m.div>

        <Button
          component={RouterLink}
          href="/"
          size="large"
          variant="contained"
        >
          Үндсэн цэс
        </Button>
      </MotionContainer>
    </CompactLayout>
  );
}
