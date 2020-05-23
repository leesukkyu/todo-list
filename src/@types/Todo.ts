// 할 일 타입

export interface Todo {
  id: string;       // 할 일 고유키
  content: string;  // 할 일 내용
  isComplete: boolean; // 할 일 완료 여부
  createdTimestamp: number; // 할 일 생성일
  toggleIsComplete?(): void; // 완료 여부 변경
}