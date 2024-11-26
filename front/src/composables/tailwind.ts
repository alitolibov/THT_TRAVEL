import { useMediaQuery } from 'react-responsive';

export function useTailwindBreakpoints() {
    const xs = useMediaQuery({query: '(max-width: 639px)'});
    const sm = useMediaQuery({query: '(min-width: 640px)'});
    const md = useMediaQuery({query: '(min-width: 768px)'});
    const lg = useMediaQuery({query: '(min-width: 1025px)'});
    const ptablet = useMediaQuery({query: '(min-width: 768px) and (max-width: 1024px) and (orientation: portrait)'},);
    const ltablet = useMediaQuery({query: '(min-width: 768px) and (max-width: 1024px) and (orientation: landscape)'},);
    const xl = useMediaQuery({query: '(min-width: 1280px)'});
    const doublexl = useMediaQuery({query: '(min-width: 1536px)'});

    return {
        xs,
        sm,
        md,
        lg,
        ptablet,
        ltablet,
        xl,
        doublexl,
    };
}