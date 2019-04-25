import React from 'react';
import logo from '../assets/logo.png';

const Logo: React.SFC<React.ImgHTMLAttributes<HTMLImageElement>> = ({
  width = 200,
  ...props
}) => {
  return <img {...props} src={logo} alt="로고" width={width} />;
};

export default Logo;
