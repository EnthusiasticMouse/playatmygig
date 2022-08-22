export interface User {
  id: number;
  username: string;
}
export interface UserDB{
  userID: number;
  isVenue: number;
  username: string;
  displayName: string;
  dates?: string;
  preview?: string;
  payment?: number;
  description?: string;
  published: number;
}
export interface ConvoDB{
  convoID: number;
  StarterID: number;
  recieverID: number;
}

export interface ServerToClientEvents {
  noArg: () => void;
  basicEmit: (a: number, b: string, c: Buffer) => void;
  withAck: (d: string, callback: (e: number) => void) => void;
  newIncomingMessage: (msg : Message) => void;
}

export interface ClientToServerEvents {
  createdMessage : (msg: Message, convoID : number) => void;
}

export interface InterServerEvents {
  ping: () => void;
}

export interface SocketData {
  name: string;
  age: number;
}
export type Message = {
  author: string;
  message: string;
  recipientID: number;
  authorID: number;
};