import React from 'react';
import { TiImageOutline, TiCodeOutline } from 'react-icons/ti';

const TIPS = {
  writing: () => (
    <div>
      <h3>작성 팁</h3>
      <div>
        <p><TiCodeOutline /> 를 클릭하여 바꾸고 싶은 <strong>코드</strong>를 선택하세요.</p>
        <p><TiImageOutline /> 를 클릭하면 <strong>이미지</strong>를 삽입할 수 있어요.</p>
        <p>/ 를 입력하면 <strong>커맨드</strong>를 사용할 수 있습니다.</p>
      </div>
    </div>
  ),
  markdown: () => (
    <div>
      <h3>마크다운 사용법</h3>
      <div>
        <h4>헤더</h4>
        <pre>
          # header 1<br />
          ## header 2
        </pre>
        <h4>이탤릭체, 볼드체</h4>
        <pre>
          *italic*<br />
          **bold**
        </pre>
        <h4>인라인 코드</h4>
        <pre>
          `inline code`
        </pre>
        <h4>블록 코드</h4>
        <pre>
          ```<br />
          code<br />
          blocks<br />
          ```
        </pre>
      </div>
    </div>
  )
}

export default TIPS;