'use client';

import { Paintbrush } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';

interface Props {
  color: string;
  setColor: (background: string) => void;
  className?: string;
  disabled?: boolean;
}

export function ColorPicker(props: Props) {
  const { color, setColor, className, disabled } = props;

  const solids = [
    '#3b82f6', // blue-500
    '#f97316', // orange-500
    '#84cc16', // lime-500
    '#eab308', // yellow-500
    '#f43f5e', // rose-500
    '#8b5cf6', // violet-500
    '#10b981', // emerald-500
    '#ec4899', // pink-500
  ];

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          disabled={disabled}
          variant={'outline'}
          size={'sm'}
          className={cn(
            'w-[220px] justify-start text-left font-normal py-px',
            !color && 'text-muted-foreground',
            className,
          )}
        >
          <div className="flex w-full items-center gap-2">
            {color ? (
              <div
                className="size-4 rounded !bg-cover !bg-center transition-all"
                style={{ background: color }}
              ></div>
            ) : (
              <Paintbrush className="size-4" />
            )}
            <div className="flex-1 truncate">{color || 'Pick a color'}</div>
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64">
        <div className="mt-0 flex flex-wrap gap-1">
          {solids.map((s) => (
            <div
              key={s}
              style={{ background: s }}
              className="size-6 cursor-pointer rounded-md active:scale-105"
              onClick={() => setColor(s)}
            />
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
