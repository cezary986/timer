import { Observable, Subject, BehaviorSubject } from 'rxjs';

export function fileToBase64(file: File): Observable<string | ArrayBuffer> {

    const result = new BehaviorSubject<string | ArrayBuffer>(undefined);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
        if (reader.result !== undefined && reader.result !== null) {
            result.next(reader.result);
        }
    };
    reader.onerror = (error) => {
        console.error('Error: ', error);
        result.error(error);
    };
    return result;
}
