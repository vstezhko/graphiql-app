interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
  style?: React.CSSProperties;
}

const TabPanel = ({ children, value, index }: TabPanelProps) => {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      className="editor-tabs__tab-panel"
    >
      {value === index && children}
    </div>
  );
};

export default TabPanel;
