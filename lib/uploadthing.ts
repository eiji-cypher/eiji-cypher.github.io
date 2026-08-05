import { generateUploadButton } from "@uploadthing/react";
import type { FileRouter } from "uploadthing/types";

export const UploadButton = generateUploadButton<FileRouter>();
