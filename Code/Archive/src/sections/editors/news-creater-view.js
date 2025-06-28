"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "src/routes/hooks";
import { AuthGuard } from "src/auth/guard";

import MainLayout from "src/layouts/main";
import {
  Container,
  Input,
  InputLabel,
  Button,
  Typography,
  FormControlLabel,
  Checkbox,
  Select,
  MenuItem,
} from "@mui/material";
import FormControl from "@mui/material/FormControl";
import dynamic from "next/dynamic";
import Image from "src/components/image";

const Editor = dynamic(
  () => import("@tinymce/tinymce-react").then((mod) => mod.Editor),
  { ssr: false }
);

const NewsCreaterView = () => {
  const router = useRouter();

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
  const handleEditorChange = (content) => {
    setEditorContent(content);
  };

  const handleIsPublishedChange = () => {
    setIsPublished(!isPublished);
  };
  const handleChange = (e) => {
    setType(e.target.value);
  };

  const submitData = async (e) => {
    e.preventDefault();
    try {
      const content = {
        title,
        editorContent,
        thumbnail_url: thumbnail_url,
        isPublished,
        subtitle,
        type,
      };
      const res = await fetch("/api/createNews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
        },
        body: JSON.stringify(content),
      });

      // use Router to push to all news
      if (res.status === 200) {
        router.replace("/news");
      }
    } catch (error) {
      console.log(error);
    }
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

  return (
    <AuthGuard>
      <MainLayout>
        <Container sx={{ mt: "50px" }}>
          <Typography fontWeight={"bold"} textAlign={"center"}>
            Create a blog news
          </Typography>
          <form onSubmit={submitData}>
            <FormControl fullWidth margin="normal">
              <InputLabel htmlFor="title">Гарчиг</InputLabel>
              <Input
                id="title"
                aria-describedby="helper text"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </FormControl>
            <FormControl fullWidth margin="normal">
              <InputLabel htmlFor="subtitle">Дэд гарчиг</InputLabel>
              <Input
                id="subtitle"
                type="text"
                value={subtitle}
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

            {/* Show Thumbnail Preview */}
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
                content_style: "img {max-width: 100%;}",
                image_dimensions: false,
                image_class_list: [
                  { title: "Responsive", value: "img-responsive" },
                ],
              }}
              initialv
              alue="Happy writing draft!"
              value={editorContent}
              onEditorChange={handleEditorChange}
            />
            <FormControl sx={{ marginY: "15px" }} fullWidth>
              <InputLabel id="blog-type">Төрөл</InputLabel>
              <Select
                labelId="blog-type"
                id="blog-type"
                value={type}
                label="blog type"
                onChange={handleChange}
              >
                <MenuItem value={0}>Мэдээлэл</MenuItem>
                <MenuItem value={1}>Мэдээ</MenuItem>
              </Select>
            </FormControl>

            {/* <FormControlLabel
              control={
                <Checkbox
                  checked={isPublished}
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
        </Container>
      </MainLayout>
    </AuthGuard>
  );
};

export default NewsCreaterView;
