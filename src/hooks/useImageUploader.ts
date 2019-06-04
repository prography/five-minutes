import { useCallback, RefObject } from 'react';
import { Cloudinary } from '../utils/cloudinary';
import { notifier } from '../utils/renoti';

interface ICallback {
  (err: any): void;
  (err: undefined | null, result: string): void;
}

const useImageUploader = <T extends Cloudinary>(
  inputRef: RefObject<HTMLInputElement>,
  imageUploader: T,
  callback?: ICallback,
) => {
  const openImageSelector = useCallback(() => {
    inputRef.current && inputRef.current.click();
  }, [inputRef]);
  const handleChange = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        const file = e.target.files[0];
        try {
          const { url } = await imageUploader.uploadImage(file);
          callback && callback(null, url);
        } catch (err) {
          notifier.notify({
            type: 'error',
            message: '이미지 업로드에 실패하였습니다.',
          });
          callback && callback(err);
        }
      }
    },
    [imageUploader, callback],
  );

  return [openImageSelector, handleChange] as const;
};

export default useImageUploader;
