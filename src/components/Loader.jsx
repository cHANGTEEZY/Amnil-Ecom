import { Card, Skeleton } from "antd";
import React from "react";

const { Meta } = Card;

const Loader = () => {
  return (
    <Card
      style={{ width: "100%", height: 400 }}
      cover={<Skeleton.Image active style={{ width: "100%", height: 200 }} />}
    >
      <Meta
        avatar={<Skeleton.Avatar active size="large" />}
        title={<Skeleton.Input active block />}
        description={
          <>
            <Skeleton paragraph={{ rows: 1 }} active />
            <Skeleton paragraph={{ rows: 1 }} active />
          </>
        }
      />
    </Card>
  );
};

export default Loader;
