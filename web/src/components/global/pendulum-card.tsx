'use client';

import { useAtom } from 'jotai';

import { pendulumsConfigAtom } from '@/stores/general';

import { Card } from '../ui/card';
import { Slider } from '../ui/slider';
import { ColorPicker } from './color-picker';

interface Props {
  id: string;
}

export function PendulumCard({ id }: Props) {
  const [pendulumsConfig, setPendulumsConfig] = useAtom(pendulumsConfigAtom);
  const pendulumConfig = pendulumsConfig.find((config) => config.id === id);

  const setPendulumProperty = (property: string, value: number | string) => {
    const newPendulumsConfig = [...pendulumsConfig];
    newPendulumsConfig.map((pendulum) => {
      if (pendulum.id === id) {
        return { ...pendulum, [property]: value };
      }
      return pendulum;
    });
    setPendulumsConfig(newPendulumsConfig);
  };

  if (!pendulumConfig)
    return (
      <Card className="flex flex-col gap-2 p-4">
        {/* Header */}
        <div className="flex items-center">
          <div className="text-base font-semibold">Pendulum {id}</div>
          <span className="flex-1" />
          <div className="text-xs text-green-500">Connected</div>
        </div>
        <div className="text-sm">Error loading pendulum</div>
      </Card>
    );

  return (
    <Card className="flex flex-col gap-2 p-4">
      {/* Header */}
      <div className="flex items-center">
        <div className="text-base font-semibold">Pendulum {id}</div>
        <span className="flex-1" />
        <div className="text-xs text-green-500">Connected</div>
      </div>

      {/* Anchor Position */}
      <div className="flex items-center">
        <div className="text-xs">Anchor position (m)</div>
        <span className="flex-1" />
        <div className="text-xs text-slate-600">
          {pendulumConfig.anchorPosition} m
        </div>
      </div>
      <Slider
        defaultValue={[pendulumConfig.anchorPosition]}
        min={0}
        max={100}
        step={1}
        onValueChange={(value) =>
          setPendulumProperty('anchorPosition', value[0])
        }
      />

      {/* Starting Angle */}
      <div className="flex items-center">
        <div className="text-xs">Starting angle (°)</div>
        <span className="flex-1" />
        <div className="text-xs text-slate-600">
          {pendulumConfig.startingAngle}°
        </div>
      </div>
      <Slider
        defaultValue={[pendulumConfig.startingAngle]}
        min={-90}
        max={90}
        step={1}
        onValueChange={(value) =>
          setPendulumProperty('startingAngle', value[0])
        }
      />

      {/* Mass */}
      <div className="flex items-center">
        <div className="text-xs">Mass (kg)</div>
        <span className="flex-1" />
        <div className="text-xs text-slate-600">
          {pendulumConfig.mass.toFixed(1)} kg
        </div>
      </div>
      <Slider
        defaultValue={[pendulumConfig.mass]}
        min={0.1}
        max={10}
        step={0.1}
        onValueChange={(value) => setPendulumProperty('mass', value[0])}
      />

      {/* Length */}
      <div className="flex items-center">
        <div className="text-xs">Length (m)</div>
        <span className="flex-1" />
        <div className="text-xs text-slate-600">
          {pendulumConfig.length.toFixed(1)} m
        </div>
      </div>
      <Slider
        defaultValue={[pendulumConfig.length]}
        min={0.1}
        max={10}
        step={0.1}
        onValueChange={(value) => setPendulumProperty('length', value[0])}
      />

      {/* Radius */}
      <div className="flex items-center">
        <div className="text-xs">Radius (m)</div>
        <span className="flex-1" />
        <div className="text-xs text-slate-600">
          {pendulumConfig.radius.toFixed(2)} m
        </div>
      </div>
      <Slider
        defaultValue={[pendulumConfig.radius]}
        min={0.01}
        max={1}
        step={0.01}
        onValueChange={(value) => setPendulumProperty('radius', value[0])}
      />

      {/* Color */}
      <div>
        <div className="mb-1 text-xs">Color</div>
        <ColorPicker
          color={pendulumConfig.color}
          setColor={(color) => setPendulumProperty('color', color)}
        />
      </div>
    </Card>
  );
}
