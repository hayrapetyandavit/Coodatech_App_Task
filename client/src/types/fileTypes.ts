export type TFile = {
  file: any;
  userId: string;
  cardId: string;
};

export interface IFile {
  type: string;
  payload: TFile;
}

export interface IFileDel {
  type: number;
  payload: {
    id: number;
    userId: number;
  };
}
