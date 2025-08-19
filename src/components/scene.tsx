"use client";

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const Scene = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const currentMount = mountRef.current;
    if (!currentMount) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.z = 1;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    currentMount.appendChild(renderer.domElement);

    const starGeo = new THREE.BufferGeometry();
    const starCount = 6000;
    const vertices = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount * 3; i+=3) {
      vertices[i] = (Math.random() - 0.5) * 2000;
      vertices[i+1] = (Math.random() - 0.5) * 2000;
      vertices[i+2] = (Math.random() - 0.5) * 2000;
    }
    starGeo.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
    
    const starMaterial = new THREE.PointsMaterial({
      color: 0xaaaaaa,
      size: 0.7,
      transparent: true,
      opacity: 0.8
    });

    const stars = new THREE.Points(starGeo, starMaterial);
    scene.add(stars);

    const handleMouseMove = (event: MouseEvent) => {
      mouse.current.y = event.clientY - window.innerHeight / 2;
      mouse.current.x = event.clientX - window.innerWidth / 2;
    };
    window.addEventListener('mousemove', handleMouseMove);

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    let animationFrameId: number;
    const animate = () => {
      stars.rotation.y += 0.00005;
      stars.rotation.x += 0.00002;

      camera.position.y += (-mouse.current.y * 0.00001 - camera.position.y) * 0.01;
      camera.position.x += (mouse.current.x * 0.00001 - camera.position.x) * 0.01;
      camera.lookAt(scene.position);
      
      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      currentMount.removeChild(renderer.domElement);
      renderer.dispose();
      starGeo.dispose();
      starMaterial.dispose();
    };
  }, []);

  return <div ref={mountRef} className="fixed top-0 left-0 w-full h-full -z-10" />;
};

export default Scene;
