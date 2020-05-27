import React from "react";
import Paper from "@material-ui/core/Paper";
import { white, grey900 } from "material-ui/styles/colors";
import { LineChart, Line, ResponsiveContainer } from "recharts";
import { typography } from "material-ui/styles";

const NewOrders = props => {
  const { data } = props;
  const styles = {
    paper: {
      backgroundColor: grey900,
      height: 150
    },
    div: {
      height: 95,
      padding: "5px 15px 0 15px"
    },
    header: {
      fontSize: 24,
      fontWeight: typography.fontWeightLight,
      color: white,
      backgroundColor: grey900,
      padding: 10
    }
  };

  return (
    <Paper style={styles.paper}>
      <div style={{ ...styles.header }}>New Orders</div>
      <div style={styles.div}>
        <ResponsiveContainer>
          <LineChart data={data}>
            <Line type="monotone" dataKey="pv" stroke="#8884d8" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Paper>
  );
};

// NewOrders.propTypes = {
//   data: PropTypes.array
// };

export default NewOrders;
