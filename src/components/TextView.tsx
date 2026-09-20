
interface TextViewProps {
    text: string;
  }
  
  // Shows the student text. Nothing but the text may live inside this container.
  function TextView({ text }: TextViewProps) {
    return <div className="atd-text-view">{text}</div>;
  }
  
  export default TextView;