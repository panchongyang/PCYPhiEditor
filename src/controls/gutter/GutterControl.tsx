import { Row, Slider, Typography } from "antd";
import { useContext, useMemo } from "react";
import { EditorContext, EditorContextValue } from "../../EditorContext";
import { debounce } from "../../debounce";

export const GutterControl: React.FC = () => {
  const { set } = useContext(EditorContext);

  const callback = useMemo(
    () =>
      debounce((e) => {
        if(set) {
          set((value: EditorContextValue) => {
            return {
              ...value,
              beatGutter: e
            } as EditorContextValue
          });
        }
      }, 200),
    [set]
  );

  return (
    <>
      <Typography.Title level={5}>节拍间隔：</Typography.Title>
      <Row>
        <Slider
          onChange={(e) => {
            callback(e);
          }}
          defaultValue={240}
          min={80}
          max={2080}
          style={{
            width: 600
          }}
        />
      </Row>
    </>
  );
};
