import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { NextResponse } from "next/server";

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  endpoint: `https://s3.${process.env.AWS_REGION}.amazonaws.com`,
  forcePathStyle: false,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

export async function POST(req) {
  try {
    // Read the file from the request body as a Buffer
    const formData = await req.formData();
    const file = formData.get("file"); // Get the file

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    // Convert the file to Buffer
    const fileBuffer = Buffer.from(await file.arrayBuffer());

    // Generate a unique filename
    const fileName = `${Date.now()}-${file.name.replace(/\s+/g, "-")}`;

    // Upload to S3
    const uploadParams = {
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: `uploads/${fileName}`,
      Body: fileBuffer,
      ContentType: file.type,
      ACL: "public-read",
    };

    await s3.send(new PutObjectCommand(uploadParams));

    // Generate file URL
    const fileUrl = `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/uploads/${fileName}`;

    return NextResponse.json({ url: fileUrl }, { status: 200 });
  } catch (error) {
    console.error("Upload Error:", error);
    return NextResponse.json({ error: "S3 upload error" }, { status: 500 });
  }
}
