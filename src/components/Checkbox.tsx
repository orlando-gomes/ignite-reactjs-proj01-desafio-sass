import { InputHTMLAttributes } from 'react';

import styles from './Checkbox.module.scss';

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  onCheckboxClick: () => void;
  isChecked: boolean;
}

export function Checkbox({onCheckboxClick, isChecked=false, ...props}: CheckboxProps) {
  return (
    <div>
      <input type='checkbox' className={isChecked ? styles.checked : styles.unchecked} onClick={onCheckboxClick} />
      <span className={styles.checkmark}></span>
    </div>
);
}