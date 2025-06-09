'use client';

import { ColorPicker } from './ColorPicker';

import { Input } from '@/(common)/_components/ui/input';
import { Label } from '@/(common)/_components/ui/label';
import { Textarea } from '@/(common)/_components/ui/textarea';

interface CategoryFormData {
  name: string;
  slug?: string;
  description?: string;
  color?: string;
}

interface CategoryFormFieldsProps {
  formData: CategoryFormData;
  isEditing: boolean;
  onInputChange: (field: keyof CategoryFormData, value: string) => void;
}

export function CategoryFormFields({
  formData,
  isEditing,
  onInputChange,
}: CategoryFormFieldsProps) {
  return (
    <div className='space-y-4'>
      {/* 카테고리 이름 */}
      <div className='space-y-2'>
        <Label htmlFor='name'>카테고리 이름 *</Label>
        <Input
          id='name'
          type='text'
          value={formData.name}
          onChange={(e) => onInputChange('name', e.target.value)}
          placeholder='카테고리 이름을 입력하세요'
          required
        />
      </div>

      {/* 슬러그 */}
      <div className='space-y-2'>
        <Label htmlFor='slug'>슬러그 (URL용)</Label>
        <Input
          id='slug'
          type='text'
          value={formData.slug || ''}
          onChange={(e) => onInputChange('slug', e.target.value)}
          placeholder='category-slug'
        />
        <p className='text-xs text-muted-foreground'>
          이름을 입력하면 자동으로 생성됩니다. 직접 수정도 가능합니다.
        </p>
      </div>

      {/* 설명 */}
      <div className='space-y-2'>
        <Label htmlFor='description'>설명</Label>
        <Textarea
          id='description'
          value={formData.description || ''}
          onChange={(e) => onInputChange('description', e.target.value)}
          placeholder='카테고리에 대한 설명을 입력하세요'
          rows={3}
          className='resize-none'
        />
      </div>

      {/* 색상 선택 */}
      <ColorPicker
        selectedColor={formData.color || ''}
        onColorChange={(color) => onInputChange('color', color)}
      />
    </div>
  );
}
