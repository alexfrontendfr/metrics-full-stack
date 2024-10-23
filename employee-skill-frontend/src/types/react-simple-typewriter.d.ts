declare module "react-simple-typewriter" {
  export interface TypewriterProps {
    words: string[];
    loop?: boolean;
    cursor?: boolean;
    cursorStyle?: string;
    typeSpeed?: number;
    deleteSpeed?: number;
    delaySpeed?: number;
    onLoop?: () => void;
    onType?: () => void;
    onDelete?: () => void;
  }

  export function Typewriter(props: TypewriterProps): JSX.Element;
  export function useTypewriter(props: TypewriterProps): [string, boolean];
}
