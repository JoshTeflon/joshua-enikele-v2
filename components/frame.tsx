interface FrameProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const Frame = ({ children, ...props }: FrameProps) => {
  return (
    <div
      {...props}
      className={`relative inline-block ${props.className ?? ''}`}
    >
      <div className="corner-hover tl"></div>
      <div className="corner-hover tr"></div>
      <div className="corner-hover bl"></div>
      <div className="corner-hover br"></div>
      {children}
    </div>
  );
}

export default Frame;