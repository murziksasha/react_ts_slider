
import cl from 'classnames';
import style from './index.module.scss';
import { Photo, CommonClassProps } from "../types";


interface NavigationProps extends CommonClassProps{
  disabledNext: boolean;
  disabledPrev: boolean;
  onPrevClick: () => void;
  onNextClick: () => void;
}


export const Navigation: React.FC<NavigationProps> = ({
  disabledNext,
  disabledPrev,
  onPrevClick,
  onNextClick,
  className
}) => (
  <div className={cl(style.navigation, className)}>
    <button
    disabled={disabledPrev}
    className={cl(
      style.navigationBtn,
      style.navigationBtnLeft
      )}
      onClick={onPrevClick}
    >
      previous
    </button>
    <button
    disabled={disabledNext}
    className={cl(
      style.navigationBtn,
      style.navigationBtnRight
      )}
      onClick={onNextClick}
    >
      Next
    </button>
  </div>
);