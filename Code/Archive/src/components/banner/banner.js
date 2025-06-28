import { useEffect, useState } from "react";
import Image from "../image/image";
import axiosInstance from "src/utils/axios";

export default function Banner() {
  const [url, setUrl] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get("/api/banner");
        setUrl(response.data.body.url);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [url]);
  if (url != "") {
    return (
      <>
        <Image src={url} />
      </>
    );
  } else {
    return <></>;
  }
}
