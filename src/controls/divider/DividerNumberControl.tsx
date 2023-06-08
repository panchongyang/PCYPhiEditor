import { Row, Select, Typography } from "antd";
import { useContext } from "react";
import { EditorContext, EditorContextValue } from "../../EditorContext";

export const DividerNumberControl: React.FC = () => {
  const { set } = useContext(EditorContext);

  return (
    <>
      <Typography.Title level={5}>X分音符：</Typography.Title>
      <Row>
        <Select defaultValue={4} onChange={(e) => {
          if(set) {
            set((value: EditorContextValue) => {
              return {
                ...value,
                dividerNumber: e
              } as EditorContextValue
            });
          }
        }}>
          <Select.Option value={4}>4</Select.Option>
          <Select.Option value={8}>8</Select.Option>
          <Select.Option value={12}>12</Select.Option>
          <Select.Option value={16}>16</Select.Option>
          <Select.Option value={32}>32</Select.Option>
        </Select>
      </Row>
    </>
  );
};
