export type RobotBehavior = 'coding' | 'idle' | 'curious' | 'wave' | 'happy'

// Start with the laptop pose so the companion's new behavior is visible immediately.
const routine: { behavior: RobotBehavior; duration: number }[] = [
  { behavior: 'coding', duration: 10 },
  { behavior: 'idle', duration: 4 },
  { behavior: 'curious', duration: 5 },
  { behavior: 'wave', duration: 3 },
  { behavior: 'happy', duration: 4 },
]
const duration = routine.reduce((sum, scene) => sum + scene.duration, 0)

export function robotBehavior(seconds: number, animated: boolean, hovered: boolean): RobotBehavior {
  if (!animated) return 'idle'
  if (hovered) return 'wave'
  let time = Math.max(0, seconds) % duration
  for (const scene of routine) {
    if (time < scene.duration) return scene.behavior
    time -= scene.duration
  }
  return 'idle'
}
