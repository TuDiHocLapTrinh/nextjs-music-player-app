'use client';

import Image from 'next/image';
import styles from './page.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBackward,
  faPlay,
  faForward,
  faPause,
} from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState, useRef } from 'react';

const songs = [
  {
    path: './assets/1.mp3',
    displayName: "Ther Charmer's Call",
    cover: './assets/1.jpg',
    artist: 'Hanu Dixit',
  },
  {
    path: './assets/2.mp3',
    displayName: 'Yo Will Never See Me Coming',
    cover: './assets/2.jpg',
    artist: 'NEFFEX',
  },
  {
    path: './assets/3.mp3',
    displayName: 'Intellect',
    cover: './assets/3.jpg',
    artist: 'Young Logos',
  },
];

export default function Home() {
  const [musicIndex, setMusicIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const [progressWidth, setProgressWidth] = useState('0%');
  const [durationText, setDurationText] = useState('00:00');
  const [currentTimeText, setCurrentTimeText] = useState('00:00');

  const audioRef = useRef();

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  const togglePlay = () => setIsPlaying(!isPlaying);

  const changeMusic = (direction) => {
    const newMusicIndex =
      (musicIndex + direction + songs.length) % songs.length;
    setMusicIndex(newMusicIndex);
  };

  function updateProgressBar(e) {
    const { duration, currentTime } = e.target;
    const progressPercent = (currentTime / duration) * 100;
    setProgressWidth(`${progressPercent}%`);

    const formatTime = (time) => String(Math.floor(time)).padStart(2, '0');
    const durationText = `${formatTime(duration / 60)}:${formatTime(
      duration % 60
    )}`;
    setDurationText(durationText);
    const currentTimeText = `${formatTime(currentTime / 60)}:${formatTime(
      currentTime % 60
    )}`;
    setCurrentTimeText(currentTimeText);
  }

  // const setProgressBar = (e) => {
  //   console.log(e);
  //   const width = e.target.clientWidth;
  //   const clickX = e.offsetX;
  //   audioRef.currentTime = (clickX / width) * audioRef.duration;
  // };

  return (
    <>
      <div className={styles.background}>
        <img
          src={songs[musicIndex].cover}
          id='bg-img'
          width={500}
          height={500}
        />
      </div>

      <div className={styles.container}>
        <div className={styles.playerImg}>
          <img
            src={songs[musicIndex].cover}
            className={styles.active}
            id='cover'
            width={500}
            height={500}
          />
        </div>

        <h2 id='music-title' className={styles.h2}>
          {songs[musicIndex].displayName}
        </h2>
        <h3 id='music-artist' className={styles.h3}>
          {songs[musicIndex].artist}
        </h3>

        <div
          className={styles.playerProgress}
          id='player-progress'
          onClick={(e) => setProgressBar(e)}
        >
          <div
            className={styles.progress}
            id='progress'
            style={{ width: progressWidth }}
          ></div>
          <div className={styles.musicDuration}>
            <span id='current-time'>{durationText}</span>
            <span id='duration'>{currentTimeText}</span>
          </div>
        </div>

        <div className={styles.playerControls}>
          <FontAwesomeIcon
            icon={faBackward}
            className={styles.faSolid}
            onClick={() => changeMusic(-1)}
          />
          <FontAwesomeIcon
            icon={isPlaying === true ? faPause : faPlay}
            className={`${styles.faSolid} ${styles.playButton}`}
            onClick={togglePlay}
          />
          <FontAwesomeIcon
            icon={faForward}
            className={styles.faSolid}
            onClick={() => changeMusic(1)}
          />
        </div>

        <audio
          allow='autoplay'
          src={songs[musicIndex].path}
          ref={audioRef}
          onTimeUpdate={(e) => updateProgressBar(e)}
          onEnded={() => changeMusic(1)}
        ></audio>
      </div>
    </>
  );
}
