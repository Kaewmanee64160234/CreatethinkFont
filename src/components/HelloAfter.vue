<template>
    <div ref="videoContainer">
        <video ref="video" autoplay></video>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import * as faceapi from 'face-api.js';

const videoContainer = ref<HTMLDivElement | null>(null);
const video = ref<HTMLVideoElement | null>(null);

onMounted(async () => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: {} });
            if (video.value) {
                video.value.srcObject = stream;
            }

            await faceapi.nets.tinyFaceDetector.loadFromUri('/models');
            await faceapi.nets.faceLandmark68Net.loadFromUri('/models');
            await faceapi.nets.faceRecognitionNet.loadFromUri('/models');
            await faceapi.nets.faceExpressionNet.loadFromUri('/models');

            faceapi.matchDimensions(video.value!, videoContainer.value!);

            video.value!.addEventListener('play', () => {
                const canvas = faceapi.createCanvasFromMedia(video.value!);
                videoContainer.value!.appendChild(canvas);
                const displaySize = { width: video.value!.width, height: video.value!.height };
                faceapi.matchDimensions(canvas, displaySize);

                setInterval(async () => {
                    const detections = await faceapi.detectAllFaces(video.value!, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions();
                    const resizedDetections = faceapi.resizeResults(detections, displaySize);
                    canvas.getContext('2d')?.clearRect(0, 0, canvas.width, canvas.height);
                    faceapi.draw.drawDetections(canvas, resizedDetections);
                    faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
                    faceapi.draw.drawFaceExpressions(canvas, resizedDetections);
                }, 100);
            });
        } catch (err) {
            console.error('Error accessing camera:', err);
        }
    }
});
</script>
