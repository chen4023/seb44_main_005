import tw from 'tailwind-styled-components';

export const HaederContainer = tw.header`
  h-[80px]
  flex
  justify-between
  border-b-[0.5px]
  border-[#4771B7]
  w-full
`;

export const LogoContainer = tw.div`
  flex
  items-center
  ml-5
`;

export const LoginContainer = tw.div`
  flex
  justify-center
  items-center
  w-[200px]
  text-sm
`;

export const UnLoginContainer = tw.div`
  flex
  justify-center
  w-[400px]
  text-sm
  leading-0
  items-center
`;
export const DropdownContainer = tw.div`
  relative
`;
