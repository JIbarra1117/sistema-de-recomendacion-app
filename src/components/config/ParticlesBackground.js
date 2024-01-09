import React, { useCallback } from "react";
import Particles from 'react-tsparticles'
import { loadFull } from 'tsparticles'
const ParticlesBackground = ({ productos, titulo }) => {

    const particlesInit = useCallback( async engine => {
        await loadFull(engine)
    }, [])
    const particlesLoaded = useCallback(async container => {
        // await console.log(container);
    }, []);
    return (
        <div>
            <Particles
                id="tsparticles"
                init={particlesInit}
                loaded={particlesLoaded}
                options={{
                    background: {
                        color: {
                            value: "#596FB7",
                        },
                    },
                    fpsLimit: 120,
                    interactivity: {
                        events: {
                            onClick: {
                                enable: false,
                            },
                            onHover: {
                                enable: false,
                                mode: "repulse",
                            },
                            resize: true,
                        },
                        modes: {
                            push: {
                                quantity: 4,
                            },
                            repulse: {
                                distance: 200,
                                duration: 0.4,
                            },
                        },
                    },
                    particles: {
                        color: {
                            value: "#ffffff",
                        },
                        links: {
                            color: "#ffffff",
                            distance: 150,
                            enable: true,
                            opacity: 0.5,
                            width: 1,
                        },
                        move: {
                            direction: "none",
                            enable: true,
                            outModes: {
                                default: "bounce",
                            },
                            random: false,
                            speed: 0.3,
                            straight: false,
                        },
                        number: {
                            density: {
                                enable: true,
                                area: 1000,
                            },
                            value: 80,
                        },
                        opacity: {
                            value: 1,
                        },
                        shape: {
                            type: "circle",
                        },
                        size: {
                            value: { min: 1, max: 5 },
                        },
                    },
                    detectRetina: true,
                }} F
            ></Particles>
        </div>
    );
};

export default ParticlesBackground;