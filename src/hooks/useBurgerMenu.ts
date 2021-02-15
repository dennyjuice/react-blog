import { useEffect, useRef, useState } from 'react';

const useBurgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef(null);

  const setIsOpenBurger = (open: boolean) => {
    setIsOpen(open);
  };

  useEffect(() => {
    const handleCLickOutside = (event: any) => {
      if (
        (event.target as Element).closest('a') ||
        (wrapperRef.current && !wrapperRef.current.contains(event.target))
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleCLickOutside);

    return () => {
      document.removeEventListener('mousedown', handleCLickOutside);
    };
  }, [wrapperRef]);

  return {
    isOpen,
    setIsOpenBurger,
    wrapperRef,
  };
};

export default useBurgerMenu;
