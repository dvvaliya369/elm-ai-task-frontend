import { useState, useEffect, useCallback, useRef } from "react";
import {
  Box,
  Typography,
  IconButton,
  TextField,
  Paper,
  CircularProgress,
} from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import { timerStyles } from "./styles";

interface TimerProps {
  initialMinutes?: number;
  initialSeconds?: number;
  onComplete?: () => void;
}

const Timer: React.FC<TimerProps> = ({
  initialMinutes = 5,
  initialSeconds = 0,
  onComplete,
}) => {
  const [minutes, setMinutes] = useState(initialMinutes);
  const [seconds, setSeconds] = useState(initialSeconds);
  const [isRunning, setIsRunning] = useState(false);
  const [inputMinutes, setInputMinutes] = useState(initialMinutes.toString());
  const [inputSeconds, setInputSeconds] = useState(initialSeconds.toString());
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const totalInitialSeconds = initialMinutes * 60 + initialSeconds;
  const currentTotalSeconds = minutes * 60 + seconds;
  const progress =
    totalInitialSeconds > 0
      ? ((totalInitialSeconds - currentTotalSeconds) / totalInitialSeconds) * 100
      : 0;

  const clearTimer = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const handleComplete = useCallback(() => {
    clearTimer();
    setIsRunning(false);
    if (onComplete) {
      onComplete();
    }
  }, [clearTimer, onComplete]);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setSeconds((prevSeconds) => {
          if (prevSeconds > 0) {
            return prevSeconds - 1;
          } else {
            setMinutes((prevMinutes) => {
              if (prevMinutes > 0) {
                return prevMinutes - 1;
              } else {
                handleComplete();
                return 0;
              }
            });
            return 59;
          }
        });
      }, 1000);
    } else {
      clearTimer();
    }

    return () => clearTimer();
  }, [isRunning, clearTimer, handleComplete]);

  const handleStartPause = () => {
    if (minutes === 0 && seconds === 0 && !isRunning) {
      return;
    }
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    clearTimer();
    setIsRunning(false);
    const mins = parseInt(inputMinutes) || 0;
    const secs = parseInt(inputSeconds) || 0;
    setMinutes(mins);
    setSeconds(secs);
  };

  const handleMinutesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === "" || /^\d+$/.test(value)) {
      setInputMinutes(value);
      if (!isRunning) {
        setMinutes(parseInt(value) || 0);
      }
    }
  };

  const handleSecondsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === "" || /^\d+$/.test(value)) {
      const numValue = parseInt(value) || 0;
      if (numValue < 60) {
        setInputSeconds(value);
        if (!isRunning) {
          setSeconds(numValue);
        }
      }
    }
  };

  const formatTime = (mins: number, secs: number) => {
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <Paper elevation={3} sx={timerStyles.container}>
      <Typography variant="h6" sx={timerStyles.title}>
        Timer
      </Typography>

      <Box sx={timerStyles.progressContainer}>
        <CircularProgress
          variant="determinate"
          value={progress}
          size={120}
          thickness={4}
          sx={timerStyles.circularProgress}
        />
        <Box sx={timerStyles.timeDisplay}>
          <Typography variant="h4" sx={timerStyles.timeText}>
            {formatTime(minutes, seconds)}
          </Typography>
        </Box>
      </Box>

      {!isRunning && (
        <Box sx={timerStyles.inputContainer}>
          <TextField
            label="Minutes"
            value={inputMinutes}
            onChange={handleMinutesChange}
            size="small"
            type="text"
            inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
            sx={timerStyles.input}
          />
          <TextField
            label="Seconds"
            value={inputSeconds}
            onChange={handleSecondsChange}
            size="small"
            type="text"
            inputProps={{ inputMode: "numeric", pattern: "[0-9]*", max: 59 }}
            sx={timerStyles.input}
          />
        </Box>
      )}

      <Box sx={timerStyles.controls}>
        <IconButton
          onClick={handleStartPause}
          color="primary"
          size="large"
          disabled={minutes === 0 && seconds === 0}
        >
          {isRunning ? <PauseIcon /> : <PlayArrowIcon />}
        </IconButton>
        <IconButton onClick={handleReset} color="secondary" size="large">
          <RestartAltIcon />
        </IconButton>
      </Box>
    </Paper>
  );
};

export default Timer;
