import React from 'react'
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import styles from './PlayHeader.module.scss';
import ProgressBar from './ProgressBar';
import useToggleStore from '../../../store/ToggleStore';
import { ProblemInfo } from '../PlayMultiPage';

interface Props {
  problemInfo: ProblemInfo;
  isLoading: boolean;
}

const PlayHeader = ({ problemInfo, isLoading }: Props) => {
  const navigate = useNavigate();
  const { isPeopleToggleActive, isChatToggleActive, handlePeopleToggle, handleChatToggle } = useToggleStore();

  const exitHandle = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    Swal.fire({
      title: "정말 나가시겠습니까?",
      showCancelButton: true,
      confirmButtonText: "나가기",
    }).then((result) => {
      if (result.isConfirmed) {
        // 이부분에 소켓 디스커넥트 로직
        navigate('/home');
      }
    });
  }

  return (
    <>
      {isLoading ? (
        <>
          <div className={styles.playmulti_page__header}>
            <div className={styles.header__logo_box}>
              <img className={styles.header__logo} src='/Imgs/CodeythonLogo_star.png' alt="codeythonLogo" />
              <button className={styles.header__button} onClick={exitHandle}>나가기</button>
            </div>
            <div className={styles.header__progressbar}>
              <ProgressBar limitTime={20} />
            </div>
            <div className={styles.header__toggle_box}>
              <img
                className={styles.header__toggle}
                src={isPeopleToggleActive ? '/Imgs/peopleToggle_full.png' : '/Imgs/peopleToggle.png'}
                alt="peopleToggle"
                onClick={handlePeopleToggle}
              />
              <img
                className={styles.header__toggle}
                src={isChatToggleActive ? '/Imgs/chatToggle_full.png' : '/Imgs/chatToggle.png'}
                alt="chatToggle"
                onClick={handleChatToggle}
              />
            </div>
          </div>
        </>
      ) : (
        <div className={styles.playmulti_page__header}>
          <div className={styles.header__logo_box}>
            <img className={styles.header__logo} src='/Imgs/CodeythonLogo_star.png' alt="codeythonLogo" />
            <button className={styles.header__button} onClick={exitHandle}>나가기</button>
          </div>
          <div className={styles.header__progressbar}>
            <ProgressBar limitTime={problemInfo.limitTime} />
          </div>
          <div className={styles.header__toggle_box}>
            <img
              className={styles.header__toggle}
              src={isPeopleToggleActive ? '/Imgs/peopleToggle_full.png' : '/Imgs/peopleToggle.png'}
              alt="peopleToggle"
              onClick={handlePeopleToggle}
            />
            <img
              className={styles.header__toggle}
              src={isChatToggleActive ? '/Imgs/chatToggle_full.png' : '/Imgs/chatToggle.png'}
              alt="chatToggle"
              onClick={handleChatToggle}
            />
          </div>
        </div>
      )}
    </>
  )
}

export default PlayHeader