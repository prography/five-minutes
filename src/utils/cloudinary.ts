import axios from 'axios';

interface ICloudinaryResponse {
  secure_url: string;
  public_id: string;
}
interface IResizeResult {
  url: string;
  tokens: string[];
}
abstract class Preset {
  folder: string;
  preset: string;
  constructor(folder: string, preset: string) {
    this.folder = folder;
    this.preset = preset;
  }
  abstract resizeImage(response: ICloudinaryResponse): IResizeResult;
}

class ProfilePreset extends Preset {
  constructor(preset: string) {
    super('profile', preset);
  }
  resizeImage(response: ICloudinaryResponse) {
    const url = response.secure_url;
    // Create a thumbnail of the uploaded image, with 150px width
    const tokens = url.split('/');
    tokens.splice(-2, 0, 'w_128, c_scale');
    return { url, tokens };
  }
}
class AnswerPreset extends Preset {
  constructor(preset: string) {
    super('answer', preset);
  }
  resizeImage(response: ICloudinaryResponse) {
    const url = response.secure_url;
    // Create a thumbnail of the uploaded image, with 150px width
    const tokens = url.split('/');
    tokens.splice(-2, 0, 'w_150,c_scale');
    return { url, tokens };
  }
}
class QuestionPreset extends Preset {
  constructor(preset: string) {
    super('question', preset);
  }
  resizeImage(response: ICloudinaryResponse) {
    const url = response.secure_url;
    // Create a thumbnail of the uploaded image, with 150px width
    const tokens = url.split('/');
    tokens.splice(-2, 0, 'w_150,c_scale');
    return { url, tokens };
  }
}

type FolderType = 'profile' | 'question' | 'answer';

// TODO: 환경변수 설정
export class Cloudinary {
  cloudname: string = 'godsenal';
  uploadApi: string;
  preset!: Preset;

  constructor(folderType: FolderType) {
    this.uploadApi = `https://api.cloudinary.com/v1_1/${
      this.cloudname
    }/image/upload`;
    if (folderType === 'profile') {
      this.preset = new ProfilePreset('g9lqwf8d');
    }
    if (folderType === 'answer') {
      this.preset = new AnswerPreset('zsfxllrf');
    }
    if (folderType === 'question') {
      this.preset = new QuestionPreset('aekdgwp4');
    }
  }
  // axios가 자동으로 authriazation 헤더를 넣어서 CORS에러가 떴음. 필요없을 때는 transfromRequest로 제거
  async uploadImage(file: File) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', this.preset.preset);
    const { data } = await axios.post<ICloudinaryResponse>(
      this.uploadApi,
      formData,
      {
        transformRequest: [
          (data, headers) => {
            delete headers.common.Authorization;
            return data;
          },
        ],
      },
    );
    return this.preset.resizeImage(data);
  }
}

export const profileUploader = new Cloudinary('profile');
export const questionUploader = new Cloudinary('question');
export const answerUploader = new Cloudinary('answer');
