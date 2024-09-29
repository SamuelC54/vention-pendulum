'use client';

import { useAtom } from 'jotai';
import { set } from 'lodash';

import { degreesToRads, radsToDegrees } from '@/helpers/angles';
import { useGetHealthcheck } from '@/services/get-healthcheck';
import { pendulumsConfigAtom } from '@/stores/general';

import { Card } from '../ui/card';
import { Slider } from '../ui/slider';
import { ColorPicker } from './color-picker';
import { LoadingSpinner } from './loading-spinner';

interface Props {
  id: string;
}

const PROPERTIES_LIMIT = {
  anchorPosition: { min: 0, max: 100, step: 1 },
  startingAngle: { min: -90, max: 90, step: 1 },
  length: { min: 5, max: 50, step: 0.1 },
  radius: { min: 4, max: 50, step: 0.1 },
  mass: { min: 0.1, max: 10, step: 0.1 },
};

export function PendulumCard({ id }: Props) {
  const [pendulumsConfig, setPendulumsConfig] = useAtom(pendulumsConfigAtom);
  const pendulumConfig = pendulumsConfig.find((config) => config.id === id);

  const {
    data: healthcheckData,
    error: healthcheckError,
    isLoading: healthcheckIsLoading,
  } = useGetHealthcheck(id);

  const setPendulumProperty = (property: string, value: number | string) => {
    let newPendulumsConfig = [...pendulumsConfig];
    newPendulumsConfig = newPendulumsConfig.map((pendulum) => {
      const newPendulum = { ...pendulum };
      if (pendulum.id === id) {
        set(newPendulum, property, value);
      }
      return newPendulum;
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
        {healthcheckIsLoading && (
          <LoadingSpinner className="h-4 text-gray-300" />
        )}
        {healthcheckError && (
          <div className="text-xs text-red-500">Connection Error</div>
        )}
        {!healthcheckError && healthcheckData && (
          <div className="text-xs text-green-500">Connected</div>
        )}
      </div>

      {/* Anchor Position */}
      <div className="flex items-center">
        <div className="text-xs">Anchor position (m)</div>
        <span className="flex-1" />
        <div className="text-xs text-slate-600">
          {pendulumConfig.anchorPosition.x} m
        </div>
      </div>
      <Slider
        defaultValue={[pendulumConfig.anchorPosition.x]}
        min={PROPERTIES_LIMIT.anchorPosition.min}
        max={PROPERTIES_LIMIT.anchorPosition.max}
        step={PROPERTIES_LIMIT.anchorPosition.step}
        onValueChange={(value) =>
          setPendulumProperty('anchorPosition.x', value[0])
        }
      />

      {/* Starting Angle */}
      <div className="flex items-center">
        <div className="text-xs">Starting angle (°)</div>
        <span className="flex-1" />
        <div className="text-xs text-slate-600">
          {radsToDegrees(pendulumConfig.angle).toFixed(0)}°
        </div>
      </div>
      <Slider
        defaultValue={[radsToDegrees(pendulumConfig.angle)]}
        min={PROPERTIES_LIMIT.startingAngle.min}
        max={PROPERTIES_LIMIT.startingAngle.max}
        step={PROPERTIES_LIMIT.startingAngle.step}
        onValueChange={(value) =>
          setPendulumProperty('angle', degreesToRads(value[0]))
        }
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
        min={PROPERTIES_LIMIT.length.min}
        max={PROPERTIES_LIMIT.length.max}
        step={PROPERTIES_LIMIT.length.step}
        onValueChange={(value) => setPendulumProperty('length', value[0])}
      />

      {/* Radius */}
      <div className="flex items-center">
        <div className="text-xs">Radius (m)</div>
        <span className="flex-1" />
        <div className="text-xs text-slate-600">
          {pendulumConfig.radius.toFixed(1)} m
        </div>
      </div>
      <Slider
        defaultValue={[pendulumConfig.radius]}
        min={PROPERTIES_LIMIT.radius.min}
        max={PROPERTIES_LIMIT.radius.max}
        step={PROPERTIES_LIMIT.radius.step}
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
