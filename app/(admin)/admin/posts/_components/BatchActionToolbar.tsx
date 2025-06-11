import { AnimatePresence, motion } from 'framer-motion';

import { Button } from '@/(common)/_components/ui/button';
import { PostStatus } from '@/_entities/posts';

interface BatchActionToolbarProps {
  selectedCount: number;
  onPublish: () => void;
  onArchive: () => void;
  onDelete: () => void;
  onCancel: () => void;
}

export function BatchActionToolbar({
  selectedCount,
  onPublish,
  onArchive,
  onDelete,
  onCancel,
}: BatchActionToolbarProps) {
  return (
    <AnimatePresence>
      {selectedCount > 0 && (
        <motion.div
          initial={{ y: 100, opacity: 0, }}
          animate={{ y: 0, opacity: 1, }}
          exit={{ y: 100, opacity: 0, }}
          transition={{ type: 'spring', stiffness: 300, damping: 30, }}
          className='fixed bottom-8 left-1/2 -translate-x-1/2 z-50'
        >
          <div className='bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border-2 border-blue-500 p-4 flex items-center space-x-6'>
            <p className='text-lg font-bold text-gray-800 dark:text-gray-200'>
              <span className='text-blue-600 dark:text-blue-400'>{selectedCount}</span>개 선택됨
            </p>
            <div className='flex space-x-3'>
              <Button
                variant='outline'
                size='sm'
                onClick={onPublish}
                className='border-green-400 text-green-600 hover:bg-green-50 dark:hover:bg-green-900/30'
              >
                발행
              </Button>
              <Button
                variant='outline'
                size='sm'
                onClick={onArchive}
                className='border-yellow-400 text-yellow-600 hover:bg-yellow-50 dark:hover:bg-yellow-900/30'
              >
                보관
              </Button>
              <Button
                variant='destructive'
                size='sm'
                onClick={onDelete}
                className='border-red-400 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30'
              >
                삭제
              </Button>
            </div>
            <Button
              variant='ghost'
              size='sm'
              onClick={onCancel}
              className='text-gray-500 hover:bg-gray-100 dark:hover:bg-slate-700'
            >
              취소
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
