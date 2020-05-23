// 스낵바 타입

export interface Snackbar {
    isOpen?: boolean;   // 스낵바 오픈 여부
    msg?: string;    // 스낵바 메세지
    type?: 'positive' | 'negative'; // 스낵바 타입
}