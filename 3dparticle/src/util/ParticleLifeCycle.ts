import { Particle } from "../constructors/Particle";

class ParticleLifeCycleConstructor {
    ParticleEmitters: ParticleEmitter[] = [];
    Particles: Particle[] = []
    constructor() {
    }

    public addParticle(Particle: Particle) {
        this.Particles.push(Particle);
    }

    public addEmitter(Emitter: ParticleEmitter) {
        this.ParticleEmitters.push(Emitter);
    }

}

const ParticleLifeCycle = new ParticleLifeCycleConstructor();
game.GetService("RunService").BindToRenderStep("ParticleLifeCycleUpdate", 2, () => {
    ParticleLifeCycle.Particles.forEach(Particle => {
        Particle.Update()
    })
});

(async() => {
    while(true) {
        wait(1)
        ParticleLifeCycle.ParticleEmitters.forEach(Emitter => {
            if(Emitter.Enabled) Emitter.Emit()
        })
    }
})()

export { ParticleLifeCycle }