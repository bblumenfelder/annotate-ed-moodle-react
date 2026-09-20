import styles from "./TextView.module.css";

interface TextViewProps {
    text: string;
  }
  
  // Shows the student text. Nothing but the text may live inside this container.
  function TextView({ text }: TextViewProps) {
    return <div className={styles.textView}>{text}</div>;
  }
  
  export default TextView;