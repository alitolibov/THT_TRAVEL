import { useState, useEffect } from "react";
import { useAnimate, stagger, motion } from "framer-motion";
import { useRouter } from "next/router";
import { usePathname } from 'next/navigation';

const staggerMenuItems = stagger(0.1, { startDelay: 0.15 });

function useMenuAnimation(isOpen: boolean) {
  const [scope, animate] = useAnimate();

  useEffect(() => {
    animate(".arrow", { rotate: isOpen ? 180 : 0 }, { duration: 0.2 });

    animate(
      "ul",
      {
        clipPath: isOpen
          ? "inset(0% 0% 0% 0% round 10px)"
          : "inset(10% 50% 90% 50% round 10px)"
      },
      {
        type: "spring",
        bounce: 0,
        duration: 0.5
      }
    );

    animate(
      "li",
      isOpen
        ? { opacity: 1, scale: 1, filter: "blur(0px)" }
        : { opacity: 0, scale: 0.3, filter: "blur(20px)" },
      {
        duration: 0.2,
        delay: isOpen ? staggerMenuItems : 0
      }
    );
  }, [isOpen]);

  return scope;
}

export default function Language() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const scope = useMenuAnimation(isOpen);
  const [lang, setLang] = useState('ru')
  const {locale, push} = useRouter()
  const pathname = usePathname();
  

  useEffect(() => {
      setIsOpen(!open)
      push('/', '/', {locale: lang})
  }, [lang])

  return (
    <div className="menu relative" ref={scope}>
      <motion.button
        whileTap={{ scale: 0.97 }}
        onClick={() => setIsOpen(!isOpen)}
        className=""
      >

        <svg className="w-[30px] h-[30px]" viewBox="0 0 48 48"  xmlns="http://www.w3.org/2000/svg" fill="none"><path d="M0 0h48v48H0z" fill="none"/><path d="M23.99 4C12.94 4 4 12.95 4 24s8.94 20 19.99 20C35.04 44 44 35.05 44 24S35.04 4 23.99 4zm13.85 12h-5.9c-.65-2.5-1.56-4.9-2.76-7.12 3.68 1.26 6.74 3.81 8.66 7.12zM24 8.07c1.67 2.4 2.97 5.07 3.82 7.93h-7.64c.85-2.86 2.15-5.53 3.82-7.93zM8.52 28C8.19 26.72 8 25.38 8 24s.19-2.72.52-4h6.75c-.16 1.31-.27 2.64-.27 4 0 1.36.11 2.69.28 4H8.52zm1.63 4h5.9c.65 2.5 1.56 4.9 2.76 7.13-3.68-1.26-6.74-3.82-8.66-7.13zm5.9-16h-5.9c1.92-3.31 4.98-5.87 8.66-7.13-1.2 2.23-2.11 4.63-2.76 7.13zM24 39.93c-1.66-2.4-2.96-5.07-3.82-7.93h7.64c-.86 2.86-2.16 5.53-3.82 7.93zM28.68 28h-9.36c-.19-1.31-.32-2.64-.32-4 0-1.36.13-2.69.32-4h9.36c.19 1.31.32 2.64.32 4 0 1.36-.13 2.69-.32 4zm.51 11.12c1.2-2.23 2.11-4.62 2.76-7.12h5.9c-1.93 3.31-4.99 5.86-8.66 7.12zM32.72 28c.16-1.31.28-2.64.28-4 0-1.36-.11-2.69-.28-4h6.75c.33 1.28.53 2.62.53 4s-.19 2.72-.53 4h-6.75z" fill="var(--main-color-two)"/></svg>
        <div className="arrow" style={{ transformOrigin: "50% 55%" }}>
         
        </div>
      </motion.button>
      <ul
        style={{
          backgroundColor: 'var(--main-color)',
          position: 'absolute',
          pointerEvents: isOpen ? "auto" : "none",
          clipPath: "inset(10% 50% 90% 50% round 10px)"
        }}
        className="right-0 w-[45px]"
      >
        <li className="px-[10px] py-[5px] duration-300 lg:cursor-pointer lg:hover:bg-[#ffffff50]" onClick={(e) => setLang('ru')}><img className="w-[26px] h-[24px]" src="/images/rus.png" alt="" /></li>
        <li className="px-[10px] py-[5px] duration-300 lg:cursor-pointer lg:hover:bg-[#ffffff50]" onClick={(e) => setLang('uz')}><img className="w-[24px] h-[24px]" src="https://cdn0.iconfinder.com/data/icons/world-flags-1/100/uzbekistan-2-1024.png" alt="" /></li>
        <li className="px-[10px] py-[5px] duration-300 lg:cursor-pointer lg:hover:bg-[#ffffff50]" onClick={(e) => setLang('en')}><img className="w-[24px] h-[24px]" src="https://cdn1.iconfinder.com/data/icons/world-flags-circular/1000/Flag_of_United_Kingdom_-_Circle-1024.png" alt="" /></li>
      </ul>
    </div>
  );
}
