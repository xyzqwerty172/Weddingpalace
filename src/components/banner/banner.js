import { useEffect, useState } from "react";
import Image from "../image/image";
import { supabase } from "src/lib/supabase";

export default function Banner() {
  const [url, setUrl] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data, error } = await supabase
          .from('banners')
          .select('*')
          .eq('is_active', true)
          .order('created_at', { ascending: false })
          .limit(1);
        if (error) throw error;
        if (data && data.length > 0) {
          setUrl(data[0].url);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  if (url !== "") {
    return (
      <>
        <Image src={url} />
      </>
    );
  } else {
    return <></>;
  }
}
