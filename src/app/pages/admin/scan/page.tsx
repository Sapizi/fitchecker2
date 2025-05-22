'use client';
import { useState, useEffect, useRef } from 'react';
import jsQR from 'jsqr';
import Header from '@/app/components/header/Header';
import { Title, MainContent, MainBlock, BigText, CardText, CardButton } from '../../../pages/admin/mainPage/MainStyles';
import { withAuth } from '@/app/withAuth';
import styled from 'styled-components';
import { Wrapper } from '@/app/GlobalStyles';
import { BackLink } from '../addClient/styles';

// Styled components for the QR scanner
const Video = styled.video`
  width: 100%;
  max-width: 400px;
  border-radius: 8px;
  margin-bottom: 16px;
`;

const Canvas = styled.canvas`
  display: none;
`;

const ErrorText = styled(BigText)`
  color: red;
`;

const QRScan = () => {
  const [scannedText, setScannedText] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    let animationFrameId: number;

    const startScanning = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'environment' }, 
        });
        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
          scanQRCode();
        }
      } catch (err) {
        console.error('Ошибка доступа к камере:', err);
        setError('Не удалось получить доступ к камере. Проверьте разрешения.');
        setIsScanning(false);
      }
    };

    const scanQRCode = () => {
      if (videoRef.current && canvasRef.current && isScanning) {
        const video = videoRef.current;
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');

        if (context && video.videoWidth > 0 && video.videoHeight > 0) {
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;
          context.drawImage(video, 0, 0, canvas.width, canvas.height);
          const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
          const code = jsQR(imageData.data, imageData.width, imageData.height, {
            inversionAttempts: 'dontInvert',
          });

          if (code) {
            setScannedText(code.data);
            stopScanning();
            return;
          }
        }
        animationFrameId = requestAnimationFrame(scanQRCode);
      }
    };

    if (isScanning) {
      startScanning();
    }

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
      stopScanning();
    };
  }, [isScanning]);

  const stopScanning = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    setIsScanning(false);
  };

  const handleToggleScanning = () => {
    if (isScanning) {
      stopScanning();
    } else {
      setScannedText(null);
      setError(null);
      setIsScanning(true);
    }
  };

  return (
    <>
      <Header />
      <Wrapper>
        <BackLink href="/pages/admin/mainPage">Назад</BackLink>
        <Title>Сканирование QR-кода</Title>
        <MainContent>
          <MainBlock>
            {error ? (
              <ErrorText>{error}</ErrorText>
            ) : scannedText ? (
              <>
                <BigText>QR-код отсканирован</BigText>
                <CardText>Содержимое: {scannedText}</CardText>
              </>
            ) : (
              <>
                <Video ref={videoRef} autoPlay playsInline />
                <Canvas ref={canvasRef} />
                {isScanning ? (
                  <CardText>Наведите камеру на QR-код</CardText>
                ) : (
                  <CardText>Нажмите кнопку для начала сканирования</CardText>
                )}
              </>
            )}
            <CardButton href="#" onClick={handleToggleScanning}>
              {isScanning ? 'Остановить сканирование' : 'Начать сканирование'}
            </CardButton>
            {scannedText && (
              <CardButton href="/pages/admin">Вернуться на главную</CardButton>
            )}
          </MainBlock>
        </MainContent>
      </Wrapper>
    </>
  );
};

export default withAuth(QRScan, true);