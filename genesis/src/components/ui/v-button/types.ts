export type TButtonColor =  'red' | 'blue' | 'green' | 'transparent'

export interface IButtonProps {
    color?: TButtonColor,
    loading?: boolean,
    textSize?: number
}

export const defaultProps = {
  color: 'green' as TButtonColor,
  textSize: 16
};