import { cn } from '@/lib/utils/utils'
import { sansFont } from '@/styles/fonts/fonts'

interface TextHeadingProps {
    children: React.ReactNode;
    className?: string;
    as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
    weight?: 'normal' | 'semibold' | 'medium' | 'bold' | 'light' | 'thin';
    margin?: 'mb-4 mt-6' | 'mb-3 mt-5' | 'mb-2 mt-4' | 'mb-1 mt-3' | 'mb-1 mt-2' | 'mb-1 mt-1';
    id?: string;
}

const defaultSizes = {
    h1: 'text-base sm:text-lg md:text-lg lg:text-xl',
    h2: 'text-sm sm:text-base md:text-base lg:text-lg',
    h3: 'text-xs sm:text-sm md:text-sm lg:text-base',
    h4: 'text-[10px] sm:text-xs md:text-xs lg:text-sm',
    h5: 'text-[9px] sm:text-[10px] md:text-[10px] lg:text-xs',
    h6: 'text-[8px] sm:text-[9px] md:text-[9px] lg:text-[10px]'
}

const fontWeights = {
    normal: 'font-normal',
    semibold: 'font-semibold',
    medium: 'font-medium',
    bold: 'font-bold',
    light: 'font-light',
    thin: 'font-thin'
}

const defaultMargin = {
    h1: 'mb-4 mt-6',
    h2: 'mb-3 mt-5',
    h3: 'mb-2 mt-4',
    h4: 'mb-1 mt-3',
    h5: 'mb-1 mt-2',
    h6: 'mb-1 mt-1'
}

export default function TextHeading({ children, className, as = 'h1', weight = 'semibold', margin = 'mb-4 mt-6', id }: TextHeadingProps) {
    const Component = as;
    return (
        <Component 
            id={id}
            className={cn(
                defaultSizes[as], 
                sansFont.className, 
                fontWeights[weight], 
                margin && defaultMargin[as],
                'text-foreground dark:text-white',
                className
            )}
        >
            {children}
        </Component>
    );
} 