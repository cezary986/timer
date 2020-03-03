import { ColorTheme } from './color-theme';

export interface Event {
    id: number;
    date: number; // in ms
    title: string;
    theme: ColorTheme;
    backgroundImage: string;
}
