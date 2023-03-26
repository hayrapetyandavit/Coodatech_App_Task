import { TFile } from "../types/fileTypes";

export const uploadFileService = async ({ file, userId, cardId }: TFile) => {
  const formData = new FormData();
  formData.append("file", file[0]);
  formData.append("userId", userId);
  formData.append("cardId", cardId);

  const response = await fetch("http://localhost:3001/upload", {
    method: "POST",
    credentials: "include",
    body: formData,
  });
  return response;
};
export const getAllFilesService = async (): Promise<Response> => {
  const response = await fetch(`http://localhost:3001/files`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response;
};

export const downLoadFileService = async (id: string, name: string) => {
  await fetch(`http://localhost:3001/download/${id}`).then((response) => {
    response.blob().then((blob) => {
      const fileURL = window.URL.createObjectURL(blob);
      let alink = document.createElement("a");
      alink.href = fileURL;
      alink.download = name;
      alink.click();
    });
  });
};

export const deleteFileByIdService = async (data: {
  id: number;
  userId: number;
}): Promise<Response> => {
  const response = await fetch(`http://localhost:3001/file/${data.id}`, {
    method: "DELETE",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return response;
};
