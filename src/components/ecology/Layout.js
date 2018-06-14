/*@flow*/
import React from "react";
import { Card, CardHeader } from "material-ui/Card";

interface IWord {
  word: string;
}
const printHello = (word: IWord): string => {
  return word.word;
};

const Layout = () => {
  return (
    <Card style={styles.card}>
      <CardHeader
        title={printHello({ word: "Hello world" })}
        subtitle={"Submit the bug report, and we will get back to you shortly!"}
        subtitleStyle={{ fontSize: "16px", marginTop: "5px" }}
        style={{ padding: "30px 0px" }}
        actAsExpander={false}
        showExpandableButton={false}
      />
    </Card>
  );
};

const styles = {
  card: {
    margin: "0 auto",
    width: "1200px",
    marginTop: "120px",
    borderRadius: "2px",
    minHeight: "500px",
  },
};

export default Layout;
