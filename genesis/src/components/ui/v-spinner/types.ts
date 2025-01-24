export type TSpinnerColor = 'white' | 'black';
export type TSpinnerSize =  'sm' | 'm' | 'l' | 'xl' 

export interface ISpinnerProps {
    color?: TSpinnerColor;
    size?: TSpinnerSize;
}

export const defaultProps = {
    color: 'white' as TSpinnerColor,
    size: 'm' as TSpinnerSize
}