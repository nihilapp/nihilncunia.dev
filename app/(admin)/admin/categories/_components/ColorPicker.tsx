'use client';

import { Label } from '@/(common)/_components/ui/label';

interface ColorPickerProps {
  selectedColor: string;
  onColorChange: (color: string) => void;
}

// 미리 정의된 색상 옵션
const colorOptions = [
  '#3B82F6', // 파란색
  '#10B981', // 초록색
  '#F59E0B', // 주황색
  '#EF4444', // 빨간색
  '#8B5CF6', // 보라색
  '#06B6D4', // 시안색
  '#84CC16', // 라임색
  '#F97316', // 오렌지색
  '#EC4899', // 핑크색
  '#6B7280', // 회색
];

export function ColorPicker({
  selectedColor,
  onColorChange,
}: ColorPickerProps) {
  return (
    <div className='space-y-3'>
      <Label>카테고리 색상</Label>
      <div className='grid grid-cols-5 gap-3'>
        {colorOptions.map((color) => (
          <button
            key={color}
            type='button'
            onClick={() => onColorChange(color)}
            className={`w-10 h-10 rounded-lg border-2 transition-all duration-200 cursor-pointer ${
              selectedColor === color
                ? 'border-gray-900 dark:border-gray-100 scale-110'
                : 'border-gray-300 dark:border-slate-600 hover:scale-105'
            }`}
            style={{ backgroundColor: color, }}
            title={color}
          />
        ))}
      </div>
      {selectedColor && (
        <div className='flex items-center gap-2'>
          <span className='text-sm text-muted-foreground'>
            선택된 색상:
          </span>
          <span className='text-sm font-mono bg-muted px-2 py-1 rounded'>
            {selectedColor}
          </span>
        </div>
      )}
    </div>
  );
}
