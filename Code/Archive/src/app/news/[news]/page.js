import IndividualNewsView from "src/sections/individual-news/view";

export default function Page({ params }) {
  return <IndividualNewsView id={params.news} />;
}
