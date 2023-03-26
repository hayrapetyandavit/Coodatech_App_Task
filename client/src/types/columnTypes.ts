export type TColumn = {
  id?: number;
  title: string;
};

export interface IColumn {
  type: string;
  payload: TColumn;
}
