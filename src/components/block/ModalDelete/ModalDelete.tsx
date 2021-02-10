import React from 'react';
import styles from './ModalDelete.module.scss';

interface IModalProps {
  showModal: boolean;
  deleteHandle: any;
  hideModal: any;
}

const ModalDelete: React.FC<IModalProps> = ({ showModal, deleteHandle, hideModal }) =>
  showModal && (
    <div className={styles.modal}>
      <span className={styles.exclamation}>
        <svg
          viewBox="64 64 896 896"
          focusable="false"
          data-icon="exclamation-circle"
          width="1em"
          height="1em"
          fill="#FAAD14"
          aria-hidden="true"
        >
          <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm-32 232c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v272c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V296zm32 440a48.01 48.01 0 010-96 48.01 48.01 0 010 96z" />
        </svg>
        <span className={styles.confirm}>Are you sure to delete this article?</span>
      </span>
      <a className={styles.yesButton} href="" onClick={deleteHandle}>
        Yes
      </a>
      <a className={styles.noButton} href="" onClick={hideModal}>
        No
      </a>
    </div>
  );

export default ModalDelete;
