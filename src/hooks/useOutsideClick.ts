import { useEffect } from 'react';


type UseOutsideClickProps = {
  refs: React.RefObject<HTMLElement>[];
  onOutsideClick: () => void;
};

/* 
* Hook that detects clicks outside of a specified element
* @param {UseOutsideClickProps} { refs, onOutsideClick } - Object containing the refs of the element to detect clicks outside of and the function to call when a click is detected outside of the element
* @param {() => void} onOutsideClick - Function to call when a click is detected outside of the element
* @return {void}
* @author Stéphane
* @example 
* const ref = useRef<HTMLDivElement>(null);
* useOutsideClick({ ref, onOutsideClick: () => console.log('Clicked outside') });
* <div ref={ref}>Click outside of this div</div>
* 
 */
const useOutsideClick = ({ refs, onOutsideClick }: UseOutsideClickProps) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (refs.every(ref => ref.current && !ref.current.contains(event.target as Node))) {
        onOutsideClick();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onOutsideClick]); 
}

export default useOutsideClick;
