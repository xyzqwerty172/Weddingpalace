"use client";
import { useEffect, useState } from "react";

import MainLayout from "src/layouts/main";
import { AuthGuard } from "src/auth/guard";
import axiosInstance from "src/utils/axios";
import { useSearchParams } from "src/routes/hooks";
import Image from "src/components/image";

import {
  Container,
  Input,
  InputLabel,
  Button,
  Typography,
  Select,
  MenuItem,
  FormControl,
} from "@mui/material";

import { useRouter } from "src/routes/hooks";
import dynamic from "next/dynamic";

const Editor = dynamic(
  () => import("@tinymce/tinymce-react").then((mod) => mod.Editor),
  { ssr: false }
);

export default function NewsUpdaterView(params) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const [newsData, setNewsData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [thumbnail_url, setThumbnailUrl] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [isPublished, setIsPublished] = useState(false);
  const [editorContent, setEditorContent] = useState(
    "Create your news content here"
  );
  const [type, setType] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  // Handlers
  const handleRedirect = () => {
    router.replace("/news");
  };

  const handleEditorChange = (content) => {
    setEditorContent(content);
  };

  const handleIsPublishedChange = () => {
    setIsPublished(!isPublished);
  };
  const handleChange = (e) => {
    setType(e.target.value);
  };

  const uploadThumbnail = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/upload-local", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to upload thumbnail");
      }

      const data = await response.json();
      setThumbnailUrl(data.url);
    } catch (error) {
      console.error("Thumbnail upload error", error);
    } finally {
      setIsUploading(false);
    }
  };

  const uploadHandler = (blobInfo, progress) =>
    new Promise(async (resolve, reject) => {
      try {
        const formData = new FormData();
        formData.append("file", blobInfo.blob(), blobInfo.filename());

        const response = await fetch("/api/upload-local", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          throw new Error("Failed to upload image");
        }

        const data = await response.json();

        if (data.url) {
          resolve(data.url); // Returns the uploaded image URL to TinyMCE
        } else {
          reject("Upload failed");
        }
      } catch (error) {
        reject("Upload error");
      }
    });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(`/api/news/${id}`);
        const body = response.data.body;
        setNewsData(body);

        // Setting invidual properties
        setTitle(body.title);
        setThumbnailUrl(body.thumbnail_url);
        setIsPublished(body.is_published);
        setSubtitle(body.subtitle);
        setEditorContent(body.body);

        setIsLoading(false);
      } catch (error) {
        console.log("Error fetchig data", error);
      }
    };
    fetchData();
  }, []);

  const submitData = async (e) => {
    e.preventDefault();
    try {
      const content = {
        title,
        editorContent,
        thumbnail_url,
        isPublished,
        subtitle,
        type,
      };
      const res = await fetch(`/api/news?id=${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
        },
        body: JSON.stringify(content),
      });

      if (res.status === 200) {
        router.replace(`/news/${id}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AuthGuard>
      <MainLayout>
        <Container sx={{ mt: "50px" }}>
          <Typography fontWeight={"bold"} textAlign={"center"}>
            Мэдээ шинэчлэх
          </Typography>

          {isLoading ? (
            <>Уншиж байна</>
          ) : (
            <form onSubmit={submitData}>
              <FormControl fullWidth margin="normal">
                <InputLabel htmlFor="title">Гарчиг</InputLabel>
                <Input
                  id="title"
                  aria-describedby="helper text"
                  type="text"
                  defaultValue={newsData.title || ""}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </FormControl>
              <FormControl fullWidth margin="normal">
                <InputLabel htmlFor="subtitle">Дэд гарчиг</InputLabel>
                <Input
                  id="subtitle"
                  type="text"
                  defaultValue={newsData.subtitle}
                  onChange={(e) => setSubtitle(e.target.value)}
                />
              </FormControl>
              <FormControl fullWidth margin="normal">
                <Typography>Thumbnail зураг сонгоно уу</Typography>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={uploadThumbnail}
                  disabled={isUploading}
                />
                {isUploading && <Typography>Uploading...</Typography>}
              </FormControl>
              {thumbnail_url && <Image src={thumbnail_url} maxWidth={600} />}
              <Editor
                apiKey={process.env.NEXT_PUBLIC_TINYMCE_KEY}
                init={{
                  //  "ai tinycomments mentions anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed permanentpen footnotes advtemplate advtable advcode editimage tableofcontents mergetags powerpaste tinymcespellchecker autocorrect a11ychecker typography inlinecss",
                  //"undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | align lineheight | tinycomments | checklist numlist bullist indent outdent | emoticons charmap | removeformat",

                  plugins:
                    "anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount",
                  toolbar:
                    "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | align lineheight | tinycomments | numlist bullist indent outdent | emoticons charmap | removeformat",
                  tinycomments_mode: "embedded",
                  tinycomments_author: "Author name",
                  mergetags_list: [
                    { value: "First.Name", title: "First Name" },
                    { value: "Email", title: "Email" },
                  ],
                  images_upload_url: "/api/upload-local",
                  images_upload_handler: uploadHandler,
                  ai_request: (request, respondWith) =>
                    respondWith.string(() =>
                      Promise.reject("See docs to implement AI Assistant")
                    ),
                  height: "720",
                  init_instance_callback: "insert_contents",
                  content_style: "img {max-width: 100%;}",
                  image_dimensions: false,
                  image_class_list: [
                    { title: "Responsive", value: "img-responsive" },
                  ],
                }}
                initialValue={newsData.body}
                onEditorChange={handleEditorChange}
              />

              <FormControl sx={{ marginY: "15px" }} fullWidth>
                <InputLabel id="blog-type">Төрөл</InputLabel>
                <Select
                  labelId="blog-type"
                  id="blog-type"
                  label="blog type"
                  defaultValue={newsData.type}
                  onChange={handleChange}
                >
                  <MenuItem value={0}>Мэдээлэл</MenuItem>
                  <MenuItem value={1}>Мэдээ</MenuItem>
                </Select>
              </FormControl>
              {/* <FormControlLabel
                control={
                  <Checkbox
                    defaultChecked={newsData.is_published === 1 ? true : false}
                    onChange={handleIsPublishedChange}
                    name="isPublished"
                    color="primary"
                  />
                }
                label="Publish"
              /> */}
              <Button
                type="submit"
                variant="contained"
                sx={{ paddingX: "50px", marginY: "30px", display: "block" }}
              >
                Submit
              </Button>
            </form>
          )}
        </Container>
      </MainLayout>
    </AuthGuard>
  );
}
