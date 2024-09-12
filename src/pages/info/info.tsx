import { FC, memo, ReactNode } from 'react';

interface InfoProps {
  children: ReactNode;
  backToUrl?: string;
}

export const Info: FC<InfoProps> = memo(
  ({ children, backToUrl }: InfoProps) => (
    <>
      <div className='info'>
        <div className='info__content'>{children}</div>
        {backToUrl && <a href={backToUrl}></a>}
      </div>
    </>
  )
);
