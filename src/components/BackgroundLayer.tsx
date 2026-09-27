import { CursorTrail } from './CursorTrail'
import { Particles } from './Particles'

export function BackgroundLayer() {
  return <div className="background-layer" aria-hidden="true"><Particles /><CursorTrail /></div>
}