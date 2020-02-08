
export interface IgorMessage {
  streamId: string;
  action: string;
  data: any;
  close?: boolean;
}
