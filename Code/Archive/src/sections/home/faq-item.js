"use client";

import { useState } from "react";

import Stack from "@mui/material/Stack";
import Container from "@mui/material/Container";
import Accordion from "@mui/material/Accordion";
import Typography from "@mui/material/Typography";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";

import { paths } from "src/routes/paths";

import { _mock } from "src/_mock";

import Iconify from "src/components/iconify";
import { caligraphicFont } from "src/theme/typography";
// import CustomBreadcrumbs from "src/components/custom-breadcrumbs";

// import ComponentHero from "src/sections/_examples/component-hero";

// import ComponentBlock from "../component-block";

// ----------------------------------------------------------------------

const _accordions = [
  {
    heading:
      "Гэрлэх ёслолын ордонд хуримын ёслолын захиалга өгөхөд бүрдүүлэх бичиг баримт болон шаардлагатай зүйс юу байдаг вэ?",
    detail: [
      "Албан ёсоор хосууд гэрлэлтээ бүртгүүлсэн байх шаардлагатай. /Эх хувиар болон Е-монголиараас файлаар байж болно/",
      "Та хуримын ёслол хийх өдөр, цагийг сонгон товлосон байх.",
    ],
  },
  {
    heading:
      "Гэрлэх ёслолын ордоны үйлчилгээний ёслолын  төлбөр хэд байдаг вэ?",
    detail: [
      "Ажлын өдөр ажлын цагаар  /6/1ээс – 8/31 хооронд 07:00-16:00 цаг, 9/1 – 5/31 хооронд 08:-17:00 цаг /- 1 690 000₮,",
      "Амралтын өдөр болон ажлын өдрийн морь цагт, ажлын бус цагаар - 1 890 000₮",
      "Нийтээр амрах баярын өдөр, дангаараа Дашнямтай, Балжиннямтай билэгт сайн өдөр 2 200 000₮,",
      "Намрын дунд сарын шинийн 17, намрын адаг сарын шинийн 3-ны Балжинням Дашням давхацсан өдөр 2 500 000₮,",
      "Явуулын хуримын үйлчилгээ, онлайн хуримын ёслолын үйлчилгээ - 2 500 000₮",
    ],
  },
  {
    heading: "Гэрлэх ёслолын ордонд хэдэн сарын өмнөөс захиалга өгч болдог вэ?",
    detail: ["Оны эхний ажлын өдрөөс эхлэн бүтэн жилийн захиалга авч байна."],
  },
  {
    heading: "Ёслолын төлбөрт юу ордог вэ?",
    detail: [
      "Ёслол удирдагч",
      "Ерөөлч, магтаалч, морин хуурч",
      "Дүрс бичлэг, флашин дээр буулгах",
      "Нэрийн зургийн цомог",
      "30х40 хэмжээтэй жаазтай зураг - 1ш",
      "Машины чимэглэл",
      "Ёслолд ирсэн зочдод идээний дээж /ааруул, сүү/",
      "Бэлэг дурсгал",
    ],
  },
  {
    heading: "Тэмдэглэлт ойн хурим гэж ямар хуримыг хэлэх вэ?",
    detail: [
      "Ган эрдэний хурим /10 жил/",
      "Танан эрдэний хурим /15 жил/",
      "Номин эрдэний хурим /20 жил/",
      "Мөнгөн эрдэний хурим /25 жил/",
      "Сувдан эрдэний хурим /30 жил/",
      "Шүр эрдэний хурим /35 жил/",
      "Оюу эрдэний хурим /40 жил/",
      "Зэс эрдэний хурим /45 жил/",
      "Алтан эрдэний хурим /50 жил/",
      "Очир эрдэний хурим /55 жил/",
    ],
  },
  {
    heading: "Бусад анхаарах зүйл юу байдаг вэ?",
    detail: [
      "Ёслолын өдөр 2 хос, 2 бэргэн захиалсан цагаасаа 30 - 40 минутын өмнө  ирж ёслолын бэлтгэлээ хангана.",
      "Хүргэн бэрийн тал нийтдээ 40 - өөс илүүгүй зочидтой  ирсэн байна. Энэ нь ёслолын болон зочлолын танхимын багтаамж бусад зүйлстэй холбоотой.",
      "Ёслол хийх өдрөөс 2 - 3 хоногийн өмнө /ажлын өдөр, ажлын цагаар/ үнийн дүн орсон машины чимэглэлээ ирж авах!",
      "Зогсоолд 3 машин үнэ төлбөргүй, бусад машин 1 цагийн 1000төгрөг",
    ],
  },
];

// ----------------------------------------------------------------------

export default function FAQItem() {
  const [controlled, setControlled] = useState(false);

  //   const handleChangeControlled = (panel) => (event, isExpanded) => {
  //     setControlled(isExpanded ? panel : false);
  //   };

  return (
    <Container sx={{ my: 10 }}>
      <Typography
        variant="h1"
        textAlign={"center"}
        fontFamily={caligraphicFont.style.fontFamily}
      >
        Түгээмэл Асуултууд
      </Typography>

      {_accordions.map((accordion, index) => (
        <Accordion key={index}>
          <AccordionSummary
            expandIcon={<Iconify icon="eva:arrow-ios-downward-fill" />}
          >
            <Typography variant="subtitle1">{accordion.heading}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            {accordion.detail.map((q, index) => (
              <Typography key={index}>● {q}</Typography>
            ))}
          </AccordionDetails>
        </Accordion>
      ))}
    </Container>
  );
}
