
interface TextViewProps {
    text: string;
  }
  
  function TextView({ text }: TextViewProps) {
    // Hard-wired for now: "start" is included, "end" is not.
    const start = 19;
    const end = 30;
  
    const before = text.slice(0, start);
    const marked = text.slice(start, end);
    const after = text.slice(end);
  
    return (
      <div className="atd-text-view">
        {before}
        <mark className="atd-mark">{marked}</mark>
        {after}
      </div>
    );
  }
  
  export default TextView;