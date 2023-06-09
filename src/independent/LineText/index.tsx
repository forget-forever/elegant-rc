const style = {
  lineHeight: '32px',
};

/** 设置16行高的一行 */
const LineText: React.FC = (props) => {
  return (
    <span style={style} {...props}>
      {props.children}
    </span>
  );
};

export default LineText;
