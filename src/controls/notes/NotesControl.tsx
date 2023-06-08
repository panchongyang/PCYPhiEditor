import { Radio, Row, Typography } from "antd";
import { useContext } from "react";
import { EditorContext, EditorContextValue } from "../../EditorContext";

export const NotesControl: React.FC = () => {
  const { set } = useContext(EditorContext);

  return (
    <>
      <Typography.Title level={5}>Note类型：</Typography.Title>
      <Row>
        <Radio.Group
          onChange={(e) => {
            if (set) {
              set((value: EditorContextValue) => {
                return {
                  ...value,
                  noteType: e.target.value,
                } as EditorContextValue;
              });
            }
          }}
          defaultValue="note"
          buttonStyle="solid"
        >
          <Radio.Button value="note">Note</Radio.Button>
          <Radio.Button value="hold">Hold</Radio.Button>
          <Radio.Button value="flicker">Flicker</Radio.Button>
          <Radio.Button value="drag">Drag</Radio.Button>
        </Radio.Group>
      </Row>
    </>
  );
};
